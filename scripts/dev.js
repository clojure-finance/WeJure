// npm run dev: the shadow-cljs watch build (hot reload) plus the local server,
// which serves the app, the relay and media at http://localhost:8020.
import { spawn } from 'node:child_process';

const children = [
    spawn('npx', ['shadow-cljs', 'watch', 'app'], { stdio: 'inherit' }),
    spawn(process.execPath, ['server/index.js'], { stdio: 'inherit' }),
];
const stop = () => children.forEach((c) => c.kill());
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
children.forEach((c) => c.on('exit', (code) => { stop(); process.exitCode = code ?? 0; }));
