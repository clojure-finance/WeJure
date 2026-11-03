// The relay's event store, on Node's built-in SQLite (no native add-ons).
// Handles regular, replaceable and addressable events (NIP-01) and deletion
// requests (NIP-09): a deletion request is kept, the events it names are
// removed, and they are refused if anyone sends them again.
import { DatabaseSync } from 'node:sqlite';
import { EventRepository } from '@nostr-relay/common';

const DEFAULT_LIMIT = 500;
const MAX_LIMIT = 5000;

const isReplaceable = (k) => k === 0 || k === 3 || (k >= 10000 && k < 20000);
const isAddressable = (k) => k >= 30000 && k < 40000;
const dTag = (e) => e.tags.find((t) => t[0] === 'd')?.[1] ?? '';

export class SqliteEventStore extends EventRepository {
    constructor(file) {
        super();
        this.db = new DatabaseSync(file);
        this.db.exec(`
            PRAGMA journal_mode = WAL;
            -- no disk flush on every write; with WAL a crashed process loses
            -- nothing, a power cut at most the last writes (4x faster writes)
            PRAGMA synchronous = NORMAL;
            CREATE TABLE IF NOT EXISTS events (
                id TEXT PRIMARY KEY, pubkey TEXT NOT NULL, created_at INTEGER NOT NULL,
                kind INTEGER NOT NULL, tags TEXT NOT NULL, content TEXT NOT NULL, sig TEXT NOT NULL,
                d TEXT);
            CREATE INDEX IF NOT EXISTS events_kind_time ON events (kind, created_at);
            CREATE INDEX IF NOT EXISTS events_pubkey_kind ON events (pubkey, kind, d);
            CREATE TABLE IF NOT EXISTS tags (event_id TEXT NOT NULL, name TEXT NOT NULL, value TEXT NOT NULL);
            CREATE INDEX IF NOT EXISTS tags_name_value ON tags (name, value);
            CREATE INDEX IF NOT EXISTS tags_event ON tags (event_id);
            CREATE TABLE IF NOT EXISTS deleted (id TEXT NOT NULL, pubkey TEXT NOT NULL, PRIMARY KEY (id, pubkey));
        `);
        this.insertEvent = this.db.prepare('INSERT OR IGNORE INTO events VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        this.insertTag = this.db.prepare('INSERT INTO tags VALUES (?, ?, ?)');
        this.deleteEvent = this.db.prepare('DELETE FROM events WHERE id = ? AND pubkey = ?');
        this.deleteTags = this.db.prepare('DELETE FROM tags WHERE event_id = ?');
        this.isDeleted = this.db.prepare('SELECT 1 FROM deleted WHERE id = ? AND pubkey = ?');
        this.markDeleted = this.db.prepare('INSERT OR IGNORE INTO deleted VALUES (?, ?)');
        this.exists = this.db.prepare('SELECT 1 FROM events WHERE id = ?');
        this.findSlot = this.db.prepare('SELECT id, created_at FROM events WHERE pubkey = ? AND kind = ? AND d IS ?');
    }

    isSearchSupported() {
        return false;
    }

    #insert(e) {
        this.insertEvent.run(e.id, e.pubkey, e.created_at, e.kind, JSON.stringify(e.tags), e.content, e.sig,
            isAddressable(e.kind) ? dTag(e) : null);
        for (const t of e.tags) {
            if (typeof t[0] === 'string' && t[0].length === 1 && typeof t[1] === 'string') this.insertTag.run(e.id, t[0], t[1]);
        }
    }

    #remove(id, pubkey) {
        const { changes } = this.deleteEvent.run(id, pubkey);
        if (changes) this.deleteTags.run(id);
    }

    upsert(e) {
        if (this.isDeleted.get(e.id, e.pubkey)) return { isDuplicate: true };   // deleted by its author
        if (isReplaceable(e.kind) || isAddressable(e.kind)) {
            const old = this.findSlot.get(e.pubkey, e.kind, isAddressable(e.kind) ? dTag(e) : null);
            if (old) {
                const newer = e.created_at > old.created_at || (e.created_at === old.created_at && e.id < old.id);
                if (!newer) return { isDuplicate: true };
                this.#remove(old.id, e.pubkey);
            }
        }
        if (this.exists.get(e.id)) return { isDuplicate: true };
        this.#insert(e);
        return { isDuplicate: false };
    }

    deleteByDeletionRequest(e) {
        this.#insert(e);
        for (const [name, id] of e.tags) {
            if (name !== 'e' || typeof id !== 'string') continue;
            this.markDeleted.run(id, e.pubkey);
            this.#remove(id, e.pubkey);
        }
    }

    find(filter) {
        const where = [];
        const params = [];
        const list = (column, values) => {
            where.push(`${column} IN (${values.map(() => '?').join(',')})`);
            params.push(...values);
        };
        if (filter.ids) list('e.id', filter.ids);
        if (filter.authors) list('e.pubkey', filter.authors);
        if (filter.kinds) list('e.kind', filter.kinds);
        if (filter.since !== undefined) { where.push('e.created_at >= ?'); params.push(filter.since); }
        if (filter.until !== undefined) { where.push('e.created_at <= ?'); params.push(filter.until); }
        for (const [key, values] of Object.entries(filter)) {
            if (!/^#[a-zA-Z]$/.test(key) || !Array.isArray(values)) continue;
            where.push(`EXISTS (SELECT 1 FROM tags t WHERE t.event_id = e.id AND t.name = ? AND t.value IN (${values.map(() => '?').join(',')}))`);
            params.push(key.slice(1), ...values);
        }
        if (Object.values(filter).some((v) => Array.isArray(v) && v.length === 0)) return [];
        const limit = Math.min(filter.limit ?? DEFAULT_LIMIT, MAX_LIMIT);
        const sql = `SELECT * FROM events e ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
                     ORDER BY e.created_at DESC, e.id ASC LIMIT ?`;
        return this.db.prepare(sql).all(...params, limit).map((r) => ({
            id: r.id, pubkey: r.pubkey, created_at: r.created_at, kind: r.kind,
            tags: JSON.parse(r.tags), content: r.content, sig: r.sig,
        }));
    }

    async destroy() {
        this.db.close();
    }
}
