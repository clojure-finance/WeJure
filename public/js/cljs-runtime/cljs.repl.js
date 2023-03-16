goog.provide('cljs.repl');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__18111){
var map__18112 = p__18111;
var map__18112__$1 = cljs.core.__destructure_map(map__18112);
var m = map__18112__$1;
var n = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18112__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18112__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["-------------------------"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (){var or__5045__auto__ = new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return [(function (){var temp__5804__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__5804__auto__)){
var ns = temp__5804__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/"].join('');
} else {
return null;
}
})(),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('');
}
})()], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Protocol"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__18123_18468 = cljs.core.seq(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__18124_18469 = null;
var count__18125_18470 = (0);
var i__18126_18471 = (0);
while(true){
if((i__18126_18471 < count__18125_18470)){
var f_18472 = chunk__18124_18469.cljs$core$IIndexed$_nth$arity$2(null,i__18126_18471);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_18472], 0));


var G__18473 = seq__18123_18468;
var G__18474 = chunk__18124_18469;
var G__18475 = count__18125_18470;
var G__18476 = (i__18126_18471 + (1));
seq__18123_18468 = G__18473;
chunk__18124_18469 = G__18474;
count__18125_18470 = G__18475;
i__18126_18471 = G__18476;
continue;
} else {
var temp__5804__auto___18477 = cljs.core.seq(seq__18123_18468);
if(temp__5804__auto___18477){
var seq__18123_18478__$1 = temp__5804__auto___18477;
if(cljs.core.chunked_seq_QMARK_(seq__18123_18478__$1)){
var c__5568__auto___18479 = cljs.core.chunk_first(seq__18123_18478__$1);
var G__18480 = cljs.core.chunk_rest(seq__18123_18478__$1);
var G__18481 = c__5568__auto___18479;
var G__18482 = cljs.core.count(c__5568__auto___18479);
var G__18483 = (0);
seq__18123_18468 = G__18480;
chunk__18124_18469 = G__18481;
count__18125_18470 = G__18482;
i__18126_18471 = G__18483;
continue;
} else {
var f_18484 = cljs.core.first(seq__18123_18478__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_18484], 0));


var G__18485 = cljs.core.next(seq__18123_18478__$1);
var G__18486 = null;
var G__18487 = (0);
var G__18488 = (0);
seq__18123_18468 = G__18485;
chunk__18124_18469 = G__18486;
count__18125_18470 = G__18487;
i__18126_18471 = G__18488;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_18489 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__5045__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([arglists_18489], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first(arglists_18489)))?cljs.core.second(arglists_18489):arglists_18489)], 0));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Special Form"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.contains_QMARK_(m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
} else {
return null;
}
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/special_forms#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Macro"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["REPL Special Function"], 0));
} else {
}

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__18153_18495 = cljs.core.seq(new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__18154_18496 = null;
var count__18155_18497 = (0);
var i__18156_18498 = (0);
while(true){
if((i__18156_18498 < count__18155_18497)){
var vec__18167_18501 = chunk__18154_18496.cljs$core$IIndexed$_nth$arity$2(null,i__18156_18498);
var name_18502 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18167_18501,(0),null);
var map__18170_18503 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18167_18501,(1),null);
var map__18170_18504__$1 = cljs.core.__destructure_map(map__18170_18503);
var doc_18505 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18170_18504__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_18506 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18170_18504__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_18502], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_18506], 0));

if(cljs.core.truth_(doc_18505)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_18505], 0));
} else {
}


var G__18508 = seq__18153_18495;
var G__18509 = chunk__18154_18496;
var G__18510 = count__18155_18497;
var G__18511 = (i__18156_18498 + (1));
seq__18153_18495 = G__18508;
chunk__18154_18496 = G__18509;
count__18155_18497 = G__18510;
i__18156_18498 = G__18511;
continue;
} else {
var temp__5804__auto___18513 = cljs.core.seq(seq__18153_18495);
if(temp__5804__auto___18513){
var seq__18153_18514__$1 = temp__5804__auto___18513;
if(cljs.core.chunked_seq_QMARK_(seq__18153_18514__$1)){
var c__5568__auto___18515 = cljs.core.chunk_first(seq__18153_18514__$1);
var G__18516 = cljs.core.chunk_rest(seq__18153_18514__$1);
var G__18517 = c__5568__auto___18515;
var G__18518 = cljs.core.count(c__5568__auto___18515);
var G__18519 = (0);
seq__18153_18495 = G__18516;
chunk__18154_18496 = G__18517;
count__18155_18497 = G__18518;
i__18156_18498 = G__18519;
continue;
} else {
var vec__18188_18520 = cljs.core.first(seq__18153_18514__$1);
var name_18521 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18188_18520,(0),null);
var map__18191_18522 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18188_18520,(1),null);
var map__18191_18523__$1 = cljs.core.__destructure_map(map__18191_18522);
var doc_18524 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18191_18523__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_18525 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18191_18523__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_18521], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_18525], 0));

if(cljs.core.truth_(doc_18524)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_18524], 0));
} else {
}


var G__18527 = cljs.core.next(seq__18153_18514__$1);
var G__18528 = null;
var G__18529 = (0);
var G__18530 = (0);
seq__18153_18495 = G__18527;
chunk__18154_18496 = G__18528;
count__18155_18497 = G__18529;
i__18156_18498 = G__18530;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__5804__auto__ = cljs.spec.alpha.get_spec(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name(n)),cljs.core.name(nm)));
if(cljs.core.truth_(temp__5804__auto__)){
var fnspec = temp__5804__auto__;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));

var seq__18194 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__18195 = null;
var count__18196 = (0);
var i__18197 = (0);
while(true){
if((i__18197 < count__18196)){
var role = chunk__18195.cljs$core$IIndexed$_nth$arity$2(null,i__18197);
var temp__5804__auto___18532__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5804__auto___18532__$1)){
var spec_18533 = temp__5804__auto___18532__$1;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_18533)], 0));
} else {
}


var G__18534 = seq__18194;
var G__18535 = chunk__18195;
var G__18536 = count__18196;
var G__18537 = (i__18197 + (1));
seq__18194 = G__18534;
chunk__18195 = G__18535;
count__18196 = G__18536;
i__18197 = G__18537;
continue;
} else {
var temp__5804__auto____$1 = cljs.core.seq(seq__18194);
if(temp__5804__auto____$1){
var seq__18194__$1 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__18194__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__18194__$1);
var G__18539 = cljs.core.chunk_rest(seq__18194__$1);
var G__18540 = c__5568__auto__;
var G__18541 = cljs.core.count(c__5568__auto__);
var G__18542 = (0);
seq__18194 = G__18539;
chunk__18195 = G__18540;
count__18196 = G__18541;
i__18197 = G__18542;
continue;
} else {
var role = cljs.core.first(seq__18194__$1);
var temp__5804__auto___18543__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5804__auto___18543__$2)){
var spec_18544 = temp__5804__auto___18543__$2;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_18544)], 0));
} else {
}


var G__18546 = cljs.core.next(seq__18194__$1);
var G__18547 = null;
var G__18548 = (0);
var G__18549 = (0);
seq__18194 = G__18546;
chunk__18195 = G__18547;
count__18196 = G__18548;
i__18197 = G__18549;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Constructs a data representation for a Error with keys:
 *  :cause - root cause message
 *  :phase - error phase
 *  :via - cause chain, with cause keys:
 *           :type - exception class symbol
 *           :message - exception message
 *           :data - ex-data
 *           :at - top stack element
 *  :trace - root cause stack elements
 */
cljs.repl.Error__GT_map = (function cljs$repl$Error__GT_map(o){
var base = (function (t){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),(((t instanceof cljs.core.ExceptionInfo))?new cljs.core.Symbol("cljs.core","ExceptionInfo","cljs.core/ExceptionInfo",701839050,null):(((t instanceof Error))?cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("js",t.name):null
))], null),(function (){var temp__5804__auto__ = cljs.core.ex_message(t);
if(cljs.core.truth_(temp__5804__auto__)){
var msg = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),msg], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = cljs.core.ex_data(t);
if(cljs.core.truth_(temp__5804__auto__)){
var ed = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),ed], null);
} else {
return null;
}
})()], 0));
});
var via = (function (){var via = cljs.core.PersistentVector.EMPTY;
var t = o;
while(true){
if(cljs.core.truth_(t)){
var G__18551 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(via,t);
var G__18552 = cljs.core.ex_cause(t);
via = G__18551;
t = G__18552;
continue;
} else {
return via;
}
break;
}
})();
var root = cljs.core.peek(via);
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"via","via",-1904457336),cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(base,via)),new cljs.core.Keyword(null,"trace","trace",-1082747415),null], null),(function (){var temp__5804__auto__ = cljs.core.ex_message(root);
if(cljs.core.truth_(temp__5804__auto__)){
var root_msg = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cause","cause",231901252),root_msg], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = cljs.core.ex_data(root);
if(cljs.core.truth_(temp__5804__auto__)){
var data = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),data], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358).cljs$core$IFn$_invoke$arity$1(cljs.core.ex_data(o));
if(cljs.core.truth_(temp__5804__auto__)){
var phase = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"phase","phase",575722892),phase], null);
} else {
return null;
}
})()], 0));
});
/**
 * Returns an analysis of the phase, error, cause, and location of an error that occurred
 *   based on Throwable data, as returned by Throwable->map. All attributes other than phase
 *   are optional:
 *  :clojure.error/phase - keyword phase indicator, one of:
 *    :read-source :compile-syntax-check :compilation :macro-syntax-check :macroexpansion
 *    :execution :read-eval-result :print-eval-result
 *  :clojure.error/source - file name (no path)
 *  :clojure.error/line - integer line number
 *  :clojure.error/column - integer column number
 *  :clojure.error/symbol - symbol being expanded/compiled/invoked
 *  :clojure.error/class - cause exception class symbol
 *  :clojure.error/cause - cause exception message
 *  :clojure.error/spec - explain-data for spec error
 */
cljs.repl.ex_triage = (function cljs$repl$ex_triage(datafied_throwable){
var map__18291 = datafied_throwable;
var map__18291__$1 = cljs.core.__destructure_map(map__18291);
var via = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18291__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18291__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__18291__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__18292 = cljs.core.last(via);
var map__18292__$1 = cljs.core.__destructure_map(map__18292);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18292__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18292__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18292__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__18293 = data;
var map__18293__$1 = cljs.core.__destructure_map(map__18293);
var problems = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18293__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18293__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18293__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__18294 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first(via));
var map__18294__$1 = cljs.core.__destructure_map(map__18294);
var top_data = map__18294__$1;
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18294__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3((function (){var G__18316 = phase;
var G__18316__$1 = (((G__18316 instanceof cljs.core.Keyword))?G__18316.fqn:null);
switch (G__18316__$1) {
case "read-source":
var map__18325 = data;
var map__18325__$1 = cljs.core.__destructure_map(map__18325);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18325__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18325__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__18326 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second(via)),top_data], 0));
var G__18326__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__18326,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__18326);
var G__18326__$2 = (cljs.core.truth_((function (){var fexpr__18333 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__18333.cljs$core$IFn$_invoke$arity$1 ? fexpr__18333.cljs$core$IFn$_invoke$arity$1(source) : fexpr__18333.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__18326__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__18326__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__18326__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__18326__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__18335 = top_data;
var G__18335__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__18335,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__18335);
var G__18335__$2 = (cljs.core.truth_((function (){var fexpr__18337 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__18337.cljs$core$IFn$_invoke$arity$1 ? fexpr__18337.cljs$core$IFn$_invoke$arity$1(source) : fexpr__18337.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__18335__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__18335__$1);
var G__18335__$3 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__18335__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__18335__$2);
var G__18335__$4 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__18335__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__18335__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__18335__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__18335__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__18339 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18339,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18339,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18339,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18339,(3),null);
var G__18342 = top_data;
var G__18342__$1 = (cljs.core.truth_(line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__18342,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__18342);
var G__18342__$2 = (cljs.core.truth_(file)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__18342__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__18342__$1);
var G__18342__$3 = (cljs.core.truth_((function (){var and__5043__auto__ = source__$1;
if(cljs.core.truth_(and__5043__auto__)){
return method;
} else {
return and__5043__auto__;
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__18342__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__18342__$2);
var G__18342__$4 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__18342__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__18342__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__18342__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__18342__$4;
}

break;
case "execution":
var vec__18357 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18357,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18357,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18357,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18357,(3),null);
var file__$1 = cljs.core.first(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__18283_SHARP_){
var or__5045__auto__ = (p1__18283_SHARP_ == null);
if(or__5045__auto__){
return or__5045__auto__;
} else {
var fexpr__18362 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__18362.cljs$core$IFn$_invoke$arity$1 ? fexpr__18362.cljs$core$IFn$_invoke$arity$1(p1__18283_SHARP_) : fexpr__18362.call(null,p1__18283_SHARP_));
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return line;
}
})();
var G__18364 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__18364__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__18364,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__18364);
var G__18364__$2 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__18364__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__18364__$1);
var G__18364__$3 = (cljs.core.truth_((function (){var or__5045__auto__ = fn;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
var and__5043__auto__ = source__$1;
if(cljs.core.truth_(and__5043__auto__)){
return method;
} else {
return and__5043__auto__;
}
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__18364__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__5045__auto__ = fn;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__18364__$2);
var G__18364__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__18364__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__18364__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__18364__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__18364__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__18316__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__18395){
var map__18396 = p__18395;
var map__18396__$1 = cljs.core.__destructure_map(map__18396);
var triage_data = map__18396__$1;
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18396__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18396__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18396__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18396__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18396__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18396__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18396__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__18396__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
var loc = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5045__auto__ = source;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "<cljs repl>";
}
})()),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5045__auto__ = line;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (1);
}
})()),(cljs.core.truth_(column)?[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join(''):"")].join('');
var class_name = cljs.core.name((function (){var or__5045__auto__ = class$;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "";
}
})());
var simple_class = class_name;
var cause_type = ((cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["RuntimeException",null,"Exception",null], null), null),simple_class))?"":[" (",simple_class,")"].join(''));
var format = goog.string.format;
var G__18404 = phase;
var G__18404__$1 = (((G__18404 instanceof cljs.core.Keyword))?G__18404.fqn:null);
switch (G__18404__$1) {
case "read-source":
return (format.cljs$core$IFn$_invoke$arity$3 ? format.cljs$core$IFn$_invoke$arity$3("Syntax error reading source at (%s).\n%s\n",loc,cause) : format.call(null,"Syntax error reading source at (%s).\n%s\n",loc,cause));

break;
case "macro-syntax-check":
var G__18410 = "Syntax error macroexpanding %sat (%s).\n%s";
var G__18411 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__18412 = loc;
var G__18413 = (cljs.core.truth_(spec)?(function (){var sb__5690__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__18417_18625 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__18418_18626 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__18419_18627 = true;
var _STAR_print_fn_STAR__temp_val__18420_18628 = (function (x__5691__auto__){
return sb__5690__auto__.append(x__5691__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__18419_18627);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__18420_18628);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__18392_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__18392_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__18418_18626);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__18417_18625);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5690__auto__);
})():(format.cljs$core$IFn$_invoke$arity$2 ? format.cljs$core$IFn$_invoke$arity$2("%s\n",cause) : format.call(null,"%s\n",cause)));
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__18410,G__18411,G__18412,G__18413) : format.call(null,G__18410,G__18411,G__18412,G__18413));

break;
case "macroexpansion":
var G__18427 = "Unexpected error%s macroexpanding %sat (%s).\n%s\n";
var G__18428 = cause_type;
var G__18429 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__18430 = loc;
var G__18431 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__18427,G__18428,G__18429,G__18430,G__18431) : format.call(null,G__18427,G__18428,G__18429,G__18430,G__18431));

break;
case "compile-syntax-check":
var G__18433 = "Syntax error%s compiling %sat (%s).\n%s\n";
var G__18434 = cause_type;
var G__18436 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__18437 = loc;
var G__18438 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__18433,G__18434,G__18436,G__18437,G__18438) : format.call(null,G__18433,G__18434,G__18436,G__18437,G__18438));

break;
case "compilation":
var G__18441 = "Unexpected error%s compiling %sat (%s).\n%s\n";
var G__18442 = cause_type;
var G__18443 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__18444 = loc;
var G__18445 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__18441,G__18442,G__18443,G__18444,G__18445) : format.call(null,G__18441,G__18442,G__18443,G__18444,G__18445));

break;
case "read-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "print-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "execution":
if(cljs.core.truth_(spec)){
var G__18447 = "Execution error - invalid arguments to %s at (%s).\n%s";
var G__18448 = symbol;
var G__18449 = loc;
var G__18450 = (function (){var sb__5690__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__18452_18630 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__18453_18631 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__18454_18632 = true;
var _STAR_print_fn_STAR__temp_val__18455_18633 = (function (x__5691__auto__){
return sb__5690__auto__.append(x__5691__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__18454_18632);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__18455_18633);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__18394_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__18394_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__18453_18631);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__18452_18630);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5690__auto__);
})();
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__18447,G__18448,G__18449,G__18450) : format.call(null,G__18447,G__18448,G__18449,G__18450));
} else {
var G__18460 = "Execution error%s at %s(%s).\n%s\n";
var G__18461 = cause_type;
var G__18462 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__18463 = loc;
var G__18464 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__18460,G__18461,G__18462,G__18463,G__18464) : format.call(null,G__18460,G__18461,G__18462,G__18463,G__18464));
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__18404__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str(cljs.repl.ex_triage(cljs.repl.Error__GT_map(error)));
});

//# sourceMappingURL=cljs.repl.js.map
