goog.provide('shadow.cljs.devtools.client.browser');
shadow.cljs.devtools.client.browser.devtools_msg = (function shadow$cljs$devtools$client$browser$devtools_msg(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21290 = arguments.length;
var i__5770__auto___21291 = (0);
while(true){
if((i__5770__auto___21291 < len__5769__auto___21290)){
args__5775__auto__.push((arguments[i__5770__auto___21291]));

var G__21292 = (i__5770__auto___21291 + (1));
i__5770__auto___21291 = G__21292;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic = (function (msg,args){
if(shadow.cljs.devtools.client.env.log){
if(cljs.core.seq(shadow.cljs.devtools.client.env.log_style)){
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [["%cshadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join(''),shadow.cljs.devtools.client.env.log_style], null),args)));
} else {
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [["shadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join('')], null),args)));
}
} else {
return null;
}
}));

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$applyTo = (function (seq20645){
var G__20646 = cljs.core.first(seq20645);
var seq20645__$1 = cljs.core.next(seq20645);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__20646,seq20645__$1);
}));

shadow.cljs.devtools.client.browser.script_eval = (function shadow$cljs$devtools$client$browser$script_eval(code){
return goog.globalEval(code);
});
shadow.cljs.devtools.client.browser.do_js_load = (function shadow$cljs$devtools$client$browser$do_js_load(sources){
var seq__20653 = cljs.core.seq(sources);
var chunk__20654 = null;
var count__20655 = (0);
var i__20656 = (0);
while(true){
if((i__20656 < count__20655)){
var map__20661 = chunk__20654.cljs$core$IIndexed$_nth$arity$2(null,i__20656);
var map__20661__$1 = cljs.core.__destructure_map(map__20661);
var src = map__20661__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20661__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20661__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20661__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20661__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e20662){var e_21293 = e20662;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_21293);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_21293.message)].join('')));
}

var G__21296 = seq__20653;
var G__21297 = chunk__20654;
var G__21298 = count__20655;
var G__21299 = (i__20656 + (1));
seq__20653 = G__21296;
chunk__20654 = G__21297;
count__20655 = G__21298;
i__20656 = G__21299;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__20653);
if(temp__5804__auto__){
var seq__20653__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__20653__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__20653__$1);
var G__21300 = cljs.core.chunk_rest(seq__20653__$1);
var G__21301 = c__5568__auto__;
var G__21302 = cljs.core.count(c__5568__auto__);
var G__21303 = (0);
seq__20653 = G__21300;
chunk__20654 = G__21301;
count__20655 = G__21302;
i__20656 = G__21303;
continue;
} else {
var map__20665 = cljs.core.first(seq__20653__$1);
var map__20665__$1 = cljs.core.__destructure_map(map__20665);
var src = map__20665__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20665__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20665__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20665__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20665__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e20667){var e_21304 = e20667;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_21304);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_21304.message)].join('')));
}

var G__21306 = cljs.core.next(seq__20653__$1);
var G__21307 = null;
var G__21308 = (0);
var G__21309 = (0);
seq__20653 = G__21306;
chunk__20654 = G__21307;
count__20655 = G__21308;
i__20656 = G__21309;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.do_js_reload = (function shadow$cljs$devtools$client$browser$do_js_reload(msg,sources,complete_fn,failure_fn){
return shadow.cljs.devtools.client.env.do_js_reload.cljs$core$IFn$_invoke$arity$4(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(msg,new cljs.core.Keyword(null,"log-missing-fn","log-missing-fn",732676765),(function (fn_sym){
return null;
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"log-call-async","log-call-async",183826192),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call async ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
}),new cljs.core.Keyword(null,"log-call","log-call",412404391),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
})], 0)),(function (){
return shadow.cljs.devtools.client.browser.do_js_load(sources);
}),complete_fn,failure_fn);
});
/**
 * when (require '["some-str" :as x]) is done at the REPL we need to manually call the shadow.js.require for it
 * since the file only adds the shadow$provide. only need to do this for shadow-js.
 */
shadow.cljs.devtools.client.browser.do_js_requires = (function shadow$cljs$devtools$client$browser$do_js_requires(js_requires){
var seq__20669 = cljs.core.seq(js_requires);
var chunk__20670 = null;
var count__20671 = (0);
var i__20672 = (0);
while(true){
if((i__20672 < count__20671)){
var js_ns = chunk__20670.cljs$core$IIndexed$_nth$arity$2(null,i__20672);
var require_str_21312 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_21312);


var G__21313 = seq__20669;
var G__21314 = chunk__20670;
var G__21315 = count__20671;
var G__21316 = (i__20672 + (1));
seq__20669 = G__21313;
chunk__20670 = G__21314;
count__20671 = G__21315;
i__20672 = G__21316;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__20669);
if(temp__5804__auto__){
var seq__20669__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__20669__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__20669__$1);
var G__21317 = cljs.core.chunk_rest(seq__20669__$1);
var G__21318 = c__5568__auto__;
var G__21319 = cljs.core.count(c__5568__auto__);
var G__21320 = (0);
seq__20669 = G__21317;
chunk__20670 = G__21318;
count__20671 = G__21319;
i__20672 = G__21320;
continue;
} else {
var js_ns = cljs.core.first(seq__20669__$1);
var require_str_21321 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_21321);


var G__21322 = cljs.core.next(seq__20669__$1);
var G__21323 = null;
var G__21324 = (0);
var G__21325 = (0);
seq__20669 = G__21322;
chunk__20670 = G__21323;
count__20671 = G__21324;
i__20672 = G__21325;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.handle_build_complete = (function shadow$cljs$devtools$client$browser$handle_build_complete(runtime,p__20674){
var map__20675 = p__20674;
var map__20675__$1 = cljs.core.__destructure_map(map__20675);
var msg = map__20675__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20675__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20675__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var warnings = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1((function (){var iter__5523__auto__ = (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__20676(s__20677){
return (new cljs.core.LazySeq(null,(function (){
var s__20677__$1 = s__20677;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__20677__$1);
if(temp__5804__auto__){
var xs__6360__auto__ = temp__5804__auto__;
var map__20682 = cljs.core.first(xs__6360__auto__);
var map__20682__$1 = cljs.core.__destructure_map(map__20682);
var src = map__20682__$1;
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20682__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var warnings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20682__$1,new cljs.core.Keyword(null,"warnings","warnings",-735437651));
if(cljs.core.not(new cljs.core.Keyword(null,"from-jar","from-jar",1050932827).cljs$core$IFn$_invoke$arity$1(src))){
var iterys__5519__auto__ = ((function (s__20677__$1,map__20682,map__20682__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__20675,map__20675__$1,msg,info,reload_info){
return (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__20676_$_iter__20678(s__20679){
return (new cljs.core.LazySeq(null,((function (s__20677__$1,map__20682,map__20682__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__20675,map__20675__$1,msg,info,reload_info){
return (function (){
var s__20679__$1 = s__20679;
while(true){
var temp__5804__auto____$1 = cljs.core.seq(s__20679__$1);
if(temp__5804__auto____$1){
var s__20679__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__20679__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__20679__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__20681 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__20680 = (0);
while(true){
if((i__20680 < size__5522__auto__)){
var warning = cljs.core._nth(c__5521__auto__,i__20680);
cljs.core.chunk_append(b__20681,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name));

var G__21329 = (i__20680 + (1));
i__20680 = G__21329;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__20681),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__20676_$_iter__20678(cljs.core.chunk_rest(s__20679__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__20681),null);
}
} else {
var warning = cljs.core.first(s__20679__$2);
return cljs.core.cons(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__20676_$_iter__20678(cljs.core.rest(s__20679__$2)));
}
} else {
return null;
}
break;
}
});})(s__20677__$1,map__20682,map__20682__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__20675,map__20675__$1,msg,info,reload_info))
,null,null));
});})(s__20677__$1,map__20682,map__20682__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__20675,map__20675__$1,msg,info,reload_info))
;
var fs__5520__auto__ = cljs.core.seq(iterys__5519__auto__(warnings));
if(fs__5520__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5520__auto__,shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__20676(cljs.core.rest(s__20677__$1)));
} else {
var G__21334 = cljs.core.rest(s__20677__$1);
s__20677__$1 = G__21334;
continue;
}
} else {
var G__21336 = cljs.core.rest(s__20677__$1);
s__20677__$1 = G__21336;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(new cljs.core.Keyword(null,"sources","sources",-321166424).cljs$core$IFn$_invoke$arity$1(info));
})()));
if(shadow.cljs.devtools.client.env.log){
var seq__20683_21337 = cljs.core.seq(warnings);
var chunk__20684_21338 = null;
var count__20685_21339 = (0);
var i__20686_21340 = (0);
while(true){
if((i__20686_21340 < count__20685_21339)){
var map__20689_21341 = chunk__20684_21338.cljs$core$IIndexed$_nth$arity$2(null,i__20686_21340);
var map__20689_21342__$1 = cljs.core.__destructure_map(map__20689_21341);
var w_21343 = map__20689_21342__$1;
var msg_21344__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20689_21342__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_21345 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20689_21342__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_21346 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20689_21342__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_21347 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20689_21342__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_21347)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_21345),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_21346),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_21344__$1)].join(''));


var G__21348 = seq__20683_21337;
var G__21349 = chunk__20684_21338;
var G__21350 = count__20685_21339;
var G__21351 = (i__20686_21340 + (1));
seq__20683_21337 = G__21348;
chunk__20684_21338 = G__21349;
count__20685_21339 = G__21350;
i__20686_21340 = G__21351;
continue;
} else {
var temp__5804__auto___21352 = cljs.core.seq(seq__20683_21337);
if(temp__5804__auto___21352){
var seq__20683_21353__$1 = temp__5804__auto___21352;
if(cljs.core.chunked_seq_QMARK_(seq__20683_21353__$1)){
var c__5568__auto___21354 = cljs.core.chunk_first(seq__20683_21353__$1);
var G__21355 = cljs.core.chunk_rest(seq__20683_21353__$1);
var G__21356 = c__5568__auto___21354;
var G__21357 = cljs.core.count(c__5568__auto___21354);
var G__21358 = (0);
seq__20683_21337 = G__21355;
chunk__20684_21338 = G__21356;
count__20685_21339 = G__21357;
i__20686_21340 = G__21358;
continue;
} else {
var map__20690_21359 = cljs.core.first(seq__20683_21353__$1);
var map__20690_21360__$1 = cljs.core.__destructure_map(map__20690_21359);
var w_21361 = map__20690_21360__$1;
var msg_21362__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20690_21360__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_21363 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20690_21360__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_21364 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20690_21360__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_21365 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20690_21360__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_21365)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_21363),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_21364),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_21362__$1)].join(''));


var G__21366 = cljs.core.next(seq__20683_21353__$1);
var G__21367 = null;
var G__21368 = (0);
var G__21369 = (0);
seq__20683_21337 = G__21366;
chunk__20684_21338 = G__21367;
count__20685_21339 = G__21368;
i__20686_21340 = G__21369;
continue;
}
} else {
}
}
break;
}
} else {
}

if((!(shadow.cljs.devtools.client.env.autoload))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(((cljs.core.empty_QMARK_(warnings)) || (shadow.cljs.devtools.client.env.ignore_warnings))){
var sources_to_get = shadow.cljs.devtools.client.env.filter_reload_sources(info,reload_info);
if(cljs.core.not(cljs.core.seq(sources_to_get))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"after-load","after-load",-1278503285)], null)))){
} else {
shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("reloading code but no :after-load hooks are configured!",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["https://shadow-cljs.github.io/docs/UsersGuide.html#_lifecycle_hooks"], 0));
}

return shadow.cljs.devtools.client.shared.load_sources(runtime,sources_to_get,(function (p1__20673_SHARP_){
return shadow.cljs.devtools.client.browser.do_js_reload(msg,p1__20673_SHARP_,shadow.cljs.devtools.client.hud.load_end_success,shadow.cljs.devtools.client.hud.load_failure);
}));
}
} else {
return null;
}
}
});
shadow.cljs.devtools.client.browser.page_load_uri = (cljs.core.truth_(goog.global.document)?goog.Uri.parse(document.location.href):null);
shadow.cljs.devtools.client.browser.match_paths = (function shadow$cljs$devtools$client$browser$match_paths(old,new$){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("file",shadow.cljs.devtools.client.browser.page_load_uri.getScheme())){
var rel_new = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(new$,(1));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(old,rel_new)) || (clojure.string.starts_with_QMARK_(old,[rel_new,"?"].join(''))))){
return rel_new;
} else {
return null;
}
} else {
var node_uri = goog.Uri.parse(old);
var node_uri_resolved = shadow.cljs.devtools.client.browser.page_load_uri.resolve(node_uri);
var node_abs = node_uri_resolved.getPath();
var and__5043__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$1(shadow.cljs.devtools.client.browser.page_load_uri.hasSameDomainAs(node_uri))) || (cljs.core.not(node_uri.hasDomain())));
if(and__5043__auto__){
var and__5043__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(node_abs,new$);
if(and__5043__auto____$1){
return new$;
} else {
return and__5043__auto____$1;
}
} else {
return and__5043__auto__;
}
}
});
shadow.cljs.devtools.client.browser.handle_asset_update = (function shadow$cljs$devtools$client$browser$handle_asset_update(p__20697){
var map__20698 = p__20697;
var map__20698__$1 = cljs.core.__destructure_map(map__20698);
var msg = map__20698__$1;
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20698__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20698__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var seq__20699 = cljs.core.seq(updates);
var chunk__20701 = null;
var count__20702 = (0);
var i__20703 = (0);
while(true){
if((i__20703 < count__20702)){
var path = chunk__20701.cljs$core$IIndexed$_nth$arity$2(null,i__20703);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__20937_21372 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__20941_21373 = null;
var count__20942_21374 = (0);
var i__20943_21375 = (0);
while(true){
if((i__20943_21375 < count__20942_21374)){
var node_21376 = chunk__20941_21373.cljs$core$IIndexed$_nth$arity$2(null,i__20943_21375);
if(cljs.core.not(node_21376.shadow$old)){
var path_match_21379 = shadow.cljs.devtools.client.browser.match_paths(node_21376.getAttribute("href"),path);
if(cljs.core.truth_(path_match_21379)){
var new_link_21381 = (function (){var G__21028 = node_21376.cloneNode(true);
G__21028.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_21379),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__21028;
})();
(node_21376.shadow$old = true);

(new_link_21381.onload = ((function (seq__20937_21372,chunk__20941_21373,count__20942_21374,i__20943_21375,seq__20699,chunk__20701,count__20702,i__20703,new_link_21381,path_match_21379,node_21376,path,map__20698,map__20698__$1,msg,updates,reload_info){
return (function (e){
var seq__21029_21383 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__21031_21384 = null;
var count__21032_21385 = (0);
var i__21033_21386 = (0);
while(true){
if((i__21033_21386 < count__21032_21385)){
var map__21049_21388 = chunk__21031_21384.cljs$core$IIndexed$_nth$arity$2(null,i__21033_21386);
var map__21049_21389__$1 = cljs.core.__destructure_map(map__21049_21388);
var task_21390 = map__21049_21389__$1;
var fn_str_21391 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21049_21389__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21392 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21049_21389__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21393 = goog.getObjectByName(fn_str_21391,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21392)].join(''));

(fn_obj_21393.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21393.cljs$core$IFn$_invoke$arity$2(path,new_link_21381) : fn_obj_21393.call(null,path,new_link_21381));


var G__21395 = seq__21029_21383;
var G__21396 = chunk__21031_21384;
var G__21397 = count__21032_21385;
var G__21398 = (i__21033_21386 + (1));
seq__21029_21383 = G__21395;
chunk__21031_21384 = G__21396;
count__21032_21385 = G__21397;
i__21033_21386 = G__21398;
continue;
} else {
var temp__5804__auto___21400 = cljs.core.seq(seq__21029_21383);
if(temp__5804__auto___21400){
var seq__21029_21401__$1 = temp__5804__auto___21400;
if(cljs.core.chunked_seq_QMARK_(seq__21029_21401__$1)){
var c__5568__auto___21402 = cljs.core.chunk_first(seq__21029_21401__$1);
var G__21403 = cljs.core.chunk_rest(seq__21029_21401__$1);
var G__21404 = c__5568__auto___21402;
var G__21405 = cljs.core.count(c__5568__auto___21402);
var G__21406 = (0);
seq__21029_21383 = G__21403;
chunk__21031_21384 = G__21404;
count__21032_21385 = G__21405;
i__21033_21386 = G__21406;
continue;
} else {
var map__21056_21408 = cljs.core.first(seq__21029_21401__$1);
var map__21056_21409__$1 = cljs.core.__destructure_map(map__21056_21408);
var task_21410 = map__21056_21409__$1;
var fn_str_21411 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21056_21409__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21412 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21056_21409__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21413 = goog.getObjectByName(fn_str_21411,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21412)].join(''));

(fn_obj_21413.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21413.cljs$core$IFn$_invoke$arity$2(path,new_link_21381) : fn_obj_21413.call(null,path,new_link_21381));


var G__21416 = cljs.core.next(seq__21029_21401__$1);
var G__21417 = null;
var G__21418 = (0);
var G__21419 = (0);
seq__21029_21383 = G__21416;
chunk__21031_21384 = G__21417;
count__21032_21385 = G__21418;
i__21033_21386 = G__21419;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_21376);
});})(seq__20937_21372,chunk__20941_21373,count__20942_21374,i__20943_21375,seq__20699,chunk__20701,count__20702,i__20703,new_link_21381,path_match_21379,node_21376,path,map__20698,map__20698__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_21379], 0));

goog.dom.insertSiblingAfter(new_link_21381,node_21376);


var G__21420 = seq__20937_21372;
var G__21421 = chunk__20941_21373;
var G__21422 = count__20942_21374;
var G__21423 = (i__20943_21375 + (1));
seq__20937_21372 = G__21420;
chunk__20941_21373 = G__21421;
count__20942_21374 = G__21422;
i__20943_21375 = G__21423;
continue;
} else {
var G__21424 = seq__20937_21372;
var G__21425 = chunk__20941_21373;
var G__21426 = count__20942_21374;
var G__21427 = (i__20943_21375 + (1));
seq__20937_21372 = G__21424;
chunk__20941_21373 = G__21425;
count__20942_21374 = G__21426;
i__20943_21375 = G__21427;
continue;
}
} else {
var G__21428 = seq__20937_21372;
var G__21429 = chunk__20941_21373;
var G__21430 = count__20942_21374;
var G__21431 = (i__20943_21375 + (1));
seq__20937_21372 = G__21428;
chunk__20941_21373 = G__21429;
count__20942_21374 = G__21430;
i__20943_21375 = G__21431;
continue;
}
} else {
var temp__5804__auto___21432 = cljs.core.seq(seq__20937_21372);
if(temp__5804__auto___21432){
var seq__20937_21433__$1 = temp__5804__auto___21432;
if(cljs.core.chunked_seq_QMARK_(seq__20937_21433__$1)){
var c__5568__auto___21434 = cljs.core.chunk_first(seq__20937_21433__$1);
var G__21435 = cljs.core.chunk_rest(seq__20937_21433__$1);
var G__21436 = c__5568__auto___21434;
var G__21437 = cljs.core.count(c__5568__auto___21434);
var G__21438 = (0);
seq__20937_21372 = G__21435;
chunk__20941_21373 = G__21436;
count__20942_21374 = G__21437;
i__20943_21375 = G__21438;
continue;
} else {
var node_21439 = cljs.core.first(seq__20937_21433__$1);
if(cljs.core.not(node_21439.shadow$old)){
var path_match_21440 = shadow.cljs.devtools.client.browser.match_paths(node_21439.getAttribute("href"),path);
if(cljs.core.truth_(path_match_21440)){
var new_link_21441 = (function (){var G__21070 = node_21439.cloneNode(true);
G__21070.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_21440),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__21070;
})();
(node_21439.shadow$old = true);

(new_link_21441.onload = ((function (seq__20937_21372,chunk__20941_21373,count__20942_21374,i__20943_21375,seq__20699,chunk__20701,count__20702,i__20703,new_link_21441,path_match_21440,node_21439,seq__20937_21433__$1,temp__5804__auto___21432,path,map__20698,map__20698__$1,msg,updates,reload_info){
return (function (e){
var seq__21073_21444 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__21075_21445 = null;
var count__21076_21446 = (0);
var i__21077_21447 = (0);
while(true){
if((i__21077_21447 < count__21076_21446)){
var map__21091_21448 = chunk__21075_21445.cljs$core$IIndexed$_nth$arity$2(null,i__21077_21447);
var map__21091_21449__$1 = cljs.core.__destructure_map(map__21091_21448);
var task_21450 = map__21091_21449__$1;
var fn_str_21451 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21091_21449__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21452 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21091_21449__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21453 = goog.getObjectByName(fn_str_21451,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21452)].join(''));

(fn_obj_21453.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21453.cljs$core$IFn$_invoke$arity$2(path,new_link_21441) : fn_obj_21453.call(null,path,new_link_21441));


var G__21454 = seq__21073_21444;
var G__21455 = chunk__21075_21445;
var G__21456 = count__21076_21446;
var G__21457 = (i__21077_21447 + (1));
seq__21073_21444 = G__21454;
chunk__21075_21445 = G__21455;
count__21076_21446 = G__21456;
i__21077_21447 = G__21457;
continue;
} else {
var temp__5804__auto___21458__$1 = cljs.core.seq(seq__21073_21444);
if(temp__5804__auto___21458__$1){
var seq__21073_21459__$1 = temp__5804__auto___21458__$1;
if(cljs.core.chunked_seq_QMARK_(seq__21073_21459__$1)){
var c__5568__auto___21460 = cljs.core.chunk_first(seq__21073_21459__$1);
var G__21461 = cljs.core.chunk_rest(seq__21073_21459__$1);
var G__21462 = c__5568__auto___21460;
var G__21463 = cljs.core.count(c__5568__auto___21460);
var G__21464 = (0);
seq__21073_21444 = G__21461;
chunk__21075_21445 = G__21462;
count__21076_21446 = G__21463;
i__21077_21447 = G__21464;
continue;
} else {
var map__21094_21465 = cljs.core.first(seq__21073_21459__$1);
var map__21094_21466__$1 = cljs.core.__destructure_map(map__21094_21465);
var task_21467 = map__21094_21466__$1;
var fn_str_21468 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21094_21466__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21469 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21094_21466__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21473 = goog.getObjectByName(fn_str_21468,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21469)].join(''));

(fn_obj_21473.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21473.cljs$core$IFn$_invoke$arity$2(path,new_link_21441) : fn_obj_21473.call(null,path,new_link_21441));


var G__21474 = cljs.core.next(seq__21073_21459__$1);
var G__21475 = null;
var G__21476 = (0);
var G__21477 = (0);
seq__21073_21444 = G__21474;
chunk__21075_21445 = G__21475;
count__21076_21446 = G__21476;
i__21077_21447 = G__21477;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_21439);
});})(seq__20937_21372,chunk__20941_21373,count__20942_21374,i__20943_21375,seq__20699,chunk__20701,count__20702,i__20703,new_link_21441,path_match_21440,node_21439,seq__20937_21433__$1,temp__5804__auto___21432,path,map__20698,map__20698__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_21440], 0));

goog.dom.insertSiblingAfter(new_link_21441,node_21439);


var G__21478 = cljs.core.next(seq__20937_21433__$1);
var G__21479 = null;
var G__21480 = (0);
var G__21481 = (0);
seq__20937_21372 = G__21478;
chunk__20941_21373 = G__21479;
count__20942_21374 = G__21480;
i__20943_21375 = G__21481;
continue;
} else {
var G__21482 = cljs.core.next(seq__20937_21433__$1);
var G__21483 = null;
var G__21484 = (0);
var G__21485 = (0);
seq__20937_21372 = G__21482;
chunk__20941_21373 = G__21483;
count__20942_21374 = G__21484;
i__20943_21375 = G__21485;
continue;
}
} else {
var G__21486 = cljs.core.next(seq__20937_21433__$1);
var G__21487 = null;
var G__21488 = (0);
var G__21489 = (0);
seq__20937_21372 = G__21486;
chunk__20941_21373 = G__21487;
count__20942_21374 = G__21488;
i__20943_21375 = G__21489;
continue;
}
}
} else {
}
}
break;
}


var G__21492 = seq__20699;
var G__21493 = chunk__20701;
var G__21494 = count__20702;
var G__21495 = (i__20703 + (1));
seq__20699 = G__21492;
chunk__20701 = G__21493;
count__20702 = G__21494;
i__20703 = G__21495;
continue;
} else {
var G__21496 = seq__20699;
var G__21497 = chunk__20701;
var G__21498 = count__20702;
var G__21499 = (i__20703 + (1));
seq__20699 = G__21496;
chunk__20701 = G__21497;
count__20702 = G__21498;
i__20703 = G__21499;
continue;
}
} else {
var temp__5804__auto__ = cljs.core.seq(seq__20699);
if(temp__5804__auto__){
var seq__20699__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__20699__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__20699__$1);
var G__21502 = cljs.core.chunk_rest(seq__20699__$1);
var G__21503 = c__5568__auto__;
var G__21504 = cljs.core.count(c__5568__auto__);
var G__21505 = (0);
seq__20699 = G__21502;
chunk__20701 = G__21503;
count__20702 = G__21504;
i__20703 = G__21505;
continue;
} else {
var path = cljs.core.first(seq__20699__$1);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__21097_21507 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__21101_21508 = null;
var count__21102_21509 = (0);
var i__21103_21510 = (0);
while(true){
if((i__21103_21510 < count__21102_21509)){
var node_21511 = chunk__21101_21508.cljs$core$IIndexed$_nth$arity$2(null,i__21103_21510);
if(cljs.core.not(node_21511.shadow$old)){
var path_match_21512 = shadow.cljs.devtools.client.browser.match_paths(node_21511.getAttribute("href"),path);
if(cljs.core.truth_(path_match_21512)){
var new_link_21513 = (function (){var G__21193 = node_21511.cloneNode(true);
G__21193.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_21512),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__21193;
})();
(node_21511.shadow$old = true);

(new_link_21513.onload = ((function (seq__21097_21507,chunk__21101_21508,count__21102_21509,i__21103_21510,seq__20699,chunk__20701,count__20702,i__20703,new_link_21513,path_match_21512,node_21511,path,seq__20699__$1,temp__5804__auto__,map__20698,map__20698__$1,msg,updates,reload_info){
return (function (e){
var seq__21194_21514 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__21196_21515 = null;
var count__21197_21516 = (0);
var i__21198_21517 = (0);
while(true){
if((i__21198_21517 < count__21197_21516)){
var map__21217_21518 = chunk__21196_21515.cljs$core$IIndexed$_nth$arity$2(null,i__21198_21517);
var map__21217_21519__$1 = cljs.core.__destructure_map(map__21217_21518);
var task_21520 = map__21217_21519__$1;
var fn_str_21521 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21217_21519__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21522 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21217_21519__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21523 = goog.getObjectByName(fn_str_21521,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21522)].join(''));

(fn_obj_21523.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21523.cljs$core$IFn$_invoke$arity$2(path,new_link_21513) : fn_obj_21523.call(null,path,new_link_21513));


var G__21524 = seq__21194_21514;
var G__21525 = chunk__21196_21515;
var G__21526 = count__21197_21516;
var G__21527 = (i__21198_21517 + (1));
seq__21194_21514 = G__21524;
chunk__21196_21515 = G__21525;
count__21197_21516 = G__21526;
i__21198_21517 = G__21527;
continue;
} else {
var temp__5804__auto___21528__$1 = cljs.core.seq(seq__21194_21514);
if(temp__5804__auto___21528__$1){
var seq__21194_21529__$1 = temp__5804__auto___21528__$1;
if(cljs.core.chunked_seq_QMARK_(seq__21194_21529__$1)){
var c__5568__auto___21530 = cljs.core.chunk_first(seq__21194_21529__$1);
var G__21531 = cljs.core.chunk_rest(seq__21194_21529__$1);
var G__21532 = c__5568__auto___21530;
var G__21533 = cljs.core.count(c__5568__auto___21530);
var G__21534 = (0);
seq__21194_21514 = G__21531;
chunk__21196_21515 = G__21532;
count__21197_21516 = G__21533;
i__21198_21517 = G__21534;
continue;
} else {
var map__21223_21535 = cljs.core.first(seq__21194_21529__$1);
var map__21223_21536__$1 = cljs.core.__destructure_map(map__21223_21535);
var task_21537 = map__21223_21536__$1;
var fn_str_21538 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21223_21536__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21539 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21223_21536__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21541 = goog.getObjectByName(fn_str_21538,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21539)].join(''));

(fn_obj_21541.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21541.cljs$core$IFn$_invoke$arity$2(path,new_link_21513) : fn_obj_21541.call(null,path,new_link_21513));


var G__21542 = cljs.core.next(seq__21194_21529__$1);
var G__21543 = null;
var G__21544 = (0);
var G__21545 = (0);
seq__21194_21514 = G__21542;
chunk__21196_21515 = G__21543;
count__21197_21516 = G__21544;
i__21198_21517 = G__21545;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_21511);
});})(seq__21097_21507,chunk__21101_21508,count__21102_21509,i__21103_21510,seq__20699,chunk__20701,count__20702,i__20703,new_link_21513,path_match_21512,node_21511,path,seq__20699__$1,temp__5804__auto__,map__20698,map__20698__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_21512], 0));

goog.dom.insertSiblingAfter(new_link_21513,node_21511);


var G__21546 = seq__21097_21507;
var G__21547 = chunk__21101_21508;
var G__21548 = count__21102_21509;
var G__21549 = (i__21103_21510 + (1));
seq__21097_21507 = G__21546;
chunk__21101_21508 = G__21547;
count__21102_21509 = G__21548;
i__21103_21510 = G__21549;
continue;
} else {
var G__21550 = seq__21097_21507;
var G__21551 = chunk__21101_21508;
var G__21552 = count__21102_21509;
var G__21553 = (i__21103_21510 + (1));
seq__21097_21507 = G__21550;
chunk__21101_21508 = G__21551;
count__21102_21509 = G__21552;
i__21103_21510 = G__21553;
continue;
}
} else {
var G__21554 = seq__21097_21507;
var G__21555 = chunk__21101_21508;
var G__21556 = count__21102_21509;
var G__21557 = (i__21103_21510 + (1));
seq__21097_21507 = G__21554;
chunk__21101_21508 = G__21555;
count__21102_21509 = G__21556;
i__21103_21510 = G__21557;
continue;
}
} else {
var temp__5804__auto___21558__$1 = cljs.core.seq(seq__21097_21507);
if(temp__5804__auto___21558__$1){
var seq__21097_21561__$1 = temp__5804__auto___21558__$1;
if(cljs.core.chunked_seq_QMARK_(seq__21097_21561__$1)){
var c__5568__auto___21562 = cljs.core.chunk_first(seq__21097_21561__$1);
var G__21563 = cljs.core.chunk_rest(seq__21097_21561__$1);
var G__21564 = c__5568__auto___21562;
var G__21565 = cljs.core.count(c__5568__auto___21562);
var G__21566 = (0);
seq__21097_21507 = G__21563;
chunk__21101_21508 = G__21564;
count__21102_21509 = G__21565;
i__21103_21510 = G__21566;
continue;
} else {
var node_21567 = cljs.core.first(seq__21097_21561__$1);
if(cljs.core.not(node_21567.shadow$old)){
var path_match_21568 = shadow.cljs.devtools.client.browser.match_paths(node_21567.getAttribute("href"),path);
if(cljs.core.truth_(path_match_21568)){
var new_link_21570 = (function (){var G__21224 = node_21567.cloneNode(true);
G__21224.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_21568),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__21224;
})();
(node_21567.shadow$old = true);

(new_link_21570.onload = ((function (seq__21097_21507,chunk__21101_21508,count__21102_21509,i__21103_21510,seq__20699,chunk__20701,count__20702,i__20703,new_link_21570,path_match_21568,node_21567,seq__21097_21561__$1,temp__5804__auto___21558__$1,path,seq__20699__$1,temp__5804__auto__,map__20698,map__20698__$1,msg,updates,reload_info){
return (function (e){
var seq__21231_21571 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__21233_21572 = null;
var count__21234_21573 = (0);
var i__21235_21574 = (0);
while(true){
if((i__21235_21574 < count__21234_21573)){
var map__21244_21575 = chunk__21233_21572.cljs$core$IIndexed$_nth$arity$2(null,i__21235_21574);
var map__21244_21576__$1 = cljs.core.__destructure_map(map__21244_21575);
var task_21577 = map__21244_21576__$1;
var fn_str_21578 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21244_21576__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21579 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21244_21576__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21580 = goog.getObjectByName(fn_str_21578,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21579)].join(''));

(fn_obj_21580.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21580.cljs$core$IFn$_invoke$arity$2(path,new_link_21570) : fn_obj_21580.call(null,path,new_link_21570));


var G__21581 = seq__21231_21571;
var G__21582 = chunk__21233_21572;
var G__21583 = count__21234_21573;
var G__21584 = (i__21235_21574 + (1));
seq__21231_21571 = G__21581;
chunk__21233_21572 = G__21582;
count__21234_21573 = G__21583;
i__21235_21574 = G__21584;
continue;
} else {
var temp__5804__auto___21585__$2 = cljs.core.seq(seq__21231_21571);
if(temp__5804__auto___21585__$2){
var seq__21231_21586__$1 = temp__5804__auto___21585__$2;
if(cljs.core.chunked_seq_QMARK_(seq__21231_21586__$1)){
var c__5568__auto___21587 = cljs.core.chunk_first(seq__21231_21586__$1);
var G__21588 = cljs.core.chunk_rest(seq__21231_21586__$1);
var G__21589 = c__5568__auto___21587;
var G__21590 = cljs.core.count(c__5568__auto___21587);
var G__21591 = (0);
seq__21231_21571 = G__21588;
chunk__21233_21572 = G__21589;
count__21234_21573 = G__21590;
i__21235_21574 = G__21591;
continue;
} else {
var map__21245_21594 = cljs.core.first(seq__21231_21586__$1);
var map__21245_21595__$1 = cljs.core.__destructure_map(map__21245_21594);
var task_21596 = map__21245_21595__$1;
var fn_str_21597 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21245_21595__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_21598 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21245_21595__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_21599 = goog.getObjectByName(fn_str_21597,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_21598)].join(''));

(fn_obj_21599.cljs$core$IFn$_invoke$arity$2 ? fn_obj_21599.cljs$core$IFn$_invoke$arity$2(path,new_link_21570) : fn_obj_21599.call(null,path,new_link_21570));


var G__21602 = cljs.core.next(seq__21231_21586__$1);
var G__21603 = null;
var G__21604 = (0);
var G__21605 = (0);
seq__21231_21571 = G__21602;
chunk__21233_21572 = G__21603;
count__21234_21573 = G__21604;
i__21235_21574 = G__21605;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_21567);
});})(seq__21097_21507,chunk__21101_21508,count__21102_21509,i__21103_21510,seq__20699,chunk__20701,count__20702,i__20703,new_link_21570,path_match_21568,node_21567,seq__21097_21561__$1,temp__5804__auto___21558__$1,path,seq__20699__$1,temp__5804__auto__,map__20698,map__20698__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_21568], 0));

goog.dom.insertSiblingAfter(new_link_21570,node_21567);


var G__21606 = cljs.core.next(seq__21097_21561__$1);
var G__21607 = null;
var G__21608 = (0);
var G__21609 = (0);
seq__21097_21507 = G__21606;
chunk__21101_21508 = G__21607;
count__21102_21509 = G__21608;
i__21103_21510 = G__21609;
continue;
} else {
var G__21610 = cljs.core.next(seq__21097_21561__$1);
var G__21611 = null;
var G__21612 = (0);
var G__21613 = (0);
seq__21097_21507 = G__21610;
chunk__21101_21508 = G__21611;
count__21102_21509 = G__21612;
i__21103_21510 = G__21613;
continue;
}
} else {
var G__21614 = cljs.core.next(seq__21097_21561__$1);
var G__21615 = null;
var G__21616 = (0);
var G__21617 = (0);
seq__21097_21507 = G__21614;
chunk__21101_21508 = G__21615;
count__21102_21509 = G__21616;
i__21103_21510 = G__21617;
continue;
}
}
} else {
}
}
break;
}


var G__21618 = cljs.core.next(seq__20699__$1);
var G__21619 = null;
var G__21620 = (0);
var G__21621 = (0);
seq__20699 = G__21618;
chunk__20701 = G__21619;
count__20702 = G__21620;
i__20703 = G__21621;
continue;
} else {
var G__21622 = cljs.core.next(seq__20699__$1);
var G__21623 = null;
var G__21624 = (0);
var G__21625 = (0);
seq__20699 = G__21622;
chunk__20701 = G__21623;
count__20702 = G__21624;
i__20703 = G__21625;
continue;
}
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.global_eval = (function shadow$cljs$devtools$client$browser$global_eval(js){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("undefined",typeof(module))){
return eval(js);
} else {
return (0,eval)(js);;
}
});
shadow.cljs.devtools.client.browser.repl_init = (function shadow$cljs$devtools$client$browser$repl_init(runtime,p__21248){
var map__21249 = p__21248;
var map__21249__$1 = cljs.core.__destructure_map(map__21249);
var repl_state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21249__$1,new cljs.core.Keyword(null,"repl-state","repl-state",-1733780387));
return shadow.cljs.devtools.client.shared.load_sources(runtime,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535).cljs$core$IFn$_invoke$arity$1(repl_state))),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return shadow.cljs.devtools.client.browser.devtools_msg("ready!");
}));
});
shadow.cljs.devtools.client.browser.runtime_info = (((typeof SHADOW_CONFIG !== 'undefined'))?shadow.json.to_clj.cljs$core$IFn$_invoke$arity$1(SHADOW_CONFIG):null);
shadow.cljs.devtools.client.browser.client_info = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([shadow.cljs.devtools.client.browser.runtime_info,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"host","host",-1558485167),(cljs.core.truth_(goog.global.document)?new cljs.core.Keyword(null,"browser","browser",828191719):new cljs.core.Keyword(null,"browser-worker","browser-worker",1638998282)),new cljs.core.Keyword(null,"user-agent","user-agent",1220426212),[(cljs.core.truth_(goog.userAgent.OPERA)?"Opera":(cljs.core.truth_(goog.userAgent.product.CHROME)?"Chrome":(cljs.core.truth_(goog.userAgent.IE)?"MSIE":(cljs.core.truth_(goog.userAgent.EDGE)?"Edge":(cljs.core.truth_(goog.userAgent.GECKO)?"Firefox":(cljs.core.truth_(goog.userAgent.SAFARI)?"Safari":(cljs.core.truth_(goog.userAgent.WEBKIT)?"Webkit":null)))))))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.VERSION)," [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.PLATFORM),"]"].join(''),new cljs.core.Keyword(null,"dom","dom",-1236537922),(!((goog.global.document == null)))], null)], 0));
if((typeof shadow !== 'undefined') && (typeof shadow.cljs !== 'undefined') && (typeof shadow.cljs.devtools !== 'undefined') && (typeof shadow.cljs.devtools.client !== 'undefined') && (typeof shadow.cljs.devtools.client.browser !== 'undefined') && (typeof shadow.cljs.devtools.client.browser.ws_was_welcome_ref !== 'undefined')){
} else {
shadow.cljs.devtools.client.browser.ws_was_welcome_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false);
}
if(((shadow.cljs.devtools.client.env.enabled) && ((shadow.cljs.devtools.client.env.worker_client_id > (0))))){
(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$_js_eval$arity$2 = (function (this$,code){
var this$__$1 = this;
return shadow.cljs.devtools.client.browser.global_eval(code);
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_invoke$arity$2 = (function (this$,p__21258){
var map__21259 = p__21258;
var map__21259__$1 = cljs.core.__destructure_map(map__21259);
var _ = map__21259__$1;
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21259__$1,new cljs.core.Keyword(null,"js","js",1768080579));
var this$__$1 = this;
return shadow.cljs.devtools.client.browser.global_eval(js);
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_init$arity$4 = (function (runtime,p__21260,done,error){
var map__21261 = p__21260;
var map__21261__$1 = cljs.core.__destructure_map(map__21261);
var repl_sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21261__$1,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535));
var runtime__$1 = this;
return shadow.cljs.devtools.client.shared.load_sources(runtime__$1,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,repl_sources)),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_require$arity$4 = (function (runtime,p__21266,done,error){
var map__21267 = p__21266;
var map__21267__$1 = cljs.core.__destructure_map(map__21267);
var msg = map__21267__$1;
var sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21267__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
var reload_namespaces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21267__$1,new cljs.core.Keyword(null,"reload-namespaces","reload-namespaces",250210134));
var js_requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21267__$1,new cljs.core.Keyword(null,"js-requires","js-requires",-1311472051));
var runtime__$1 = this;
var sources_to_load = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__21268){
var map__21269 = p__21268;
var map__21269__$1 = cljs.core.__destructure_map(map__21269);
var src = map__21269__$1;
var provides = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21269__$1,new cljs.core.Keyword(null,"provides","provides",-1634397992));
var and__5043__auto__ = shadow.cljs.devtools.client.env.src_is_loaded_QMARK_(src);
if(cljs.core.truth_(and__5043__auto__)){
return cljs.core.not(cljs.core.some(reload_namespaces,provides));
} else {
return and__5043__auto__;
}
}),sources));
if(cljs.core.not(cljs.core.seq(sources_to_load))){
var G__21272 = cljs.core.PersistentVector.EMPTY;
return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(G__21272) : done.call(null,G__21272));
} else {
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3(runtime__$1,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"cljs-load-sources","cljs-load-sources",-1458295962),new cljs.core.Keyword(null,"to","to",192099007),shadow.cljs.devtools.client.env.worker_client_id,new cljs.core.Keyword(null,"sources","sources",-321166424),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582)),sources_to_load)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs-sources","cljs-sources",31121610),(function (p__21273){
var map__21274 = p__21273;
var map__21274__$1 = cljs.core.__destructure_map(map__21274);
var msg__$1 = map__21274__$1;
var sources__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21274__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
try{shadow.cljs.devtools.client.browser.do_js_load(sources__$1);

if(cljs.core.seq(js_requires)){
shadow.cljs.devtools.client.browser.do_js_requires(js_requires);
} else {
}

return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(sources_to_load) : done.call(null,sources_to_load));
}catch (e21275){var ex = e21275;
return (error.cljs$core$IFn$_invoke$arity$1 ? error.cljs$core$IFn$_invoke$arity$1(ex) : error.call(null,ex));
}})], null));
}
}));

shadow.cljs.devtools.client.shared.add_plugin_BANG_(new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),cljs.core.PersistentHashSet.EMPTY,(function (p__21276){
var map__21277 = p__21276;
var map__21277__$1 = cljs.core.__destructure_map(map__21277);
var env = map__21277__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21277__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var svc = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null);
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125),(function (){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,true);

shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.env.patch_goog_BANG_();

return shadow.cljs.devtools.client.browser.devtools_msg(["#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(new cljs.core.Keyword(null,"state-ref","state-ref",2127874952).cljs$core$IFn$_invoke$arity$1(runtime))))," ready!"].join(''));
}),new cljs.core.Keyword(null,"on-disconnect","on-disconnect",-809021814),(function (e){
if(cljs.core.truth_(cljs.core.deref(shadow.cljs.devtools.client.browser.ws_was_welcome_ref))){
shadow.cljs.devtools.client.hud.connection_error("The Websocket connection was closed!");

return cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);
} else {
return null;
}
}),new cljs.core.Keyword(null,"on-reconnect","on-reconnect",1239988702),(function (e){
return shadow.cljs.devtools.client.hud.connection_error("Reconnecting ...");
}),new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"access-denied","access-denied",959449406),(function (msg){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);

return shadow.cljs.devtools.client.hud.connection_error(["Stale Output! Your loaded JS was not produced by the running shadow-cljs instance."," Is the watch for this build running?"].join(''));
}),new cljs.core.Keyword(null,"cljs-runtime-init","cljs-runtime-init",1305890232),(function (msg){
return shadow.cljs.devtools.client.browser.repl_init(runtime,msg);
}),new cljs.core.Keyword(null,"cljs-asset-update","cljs-asset-update",1224093028),(function (msg){
return shadow.cljs.devtools.client.browser.handle_asset_update(msg);
}),new cljs.core.Keyword(null,"cljs-build-configure","cljs-build-configure",-2089891268),(function (msg){
return null;
}),new cljs.core.Keyword(null,"cljs-build-start","cljs-build-start",-725781241),(function (msg){
shadow.cljs.devtools.client.hud.hud_hide();

shadow.cljs.devtools.client.hud.load_start();

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-start","build-start",-959649480)));
}),new cljs.core.Keyword(null,"cljs-build-complete","cljs-build-complete",273626153),(function (msg){
var msg__$1 = shadow.cljs.devtools.client.env.add_warnings_to_info(msg);
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.hud.hud_warnings(msg__$1);

shadow.cljs.devtools.client.browser.handle_build_complete(runtime,msg__$1);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg__$1,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-complete","build-complete",-501868472)));
}),new cljs.core.Keyword(null,"cljs-build-failure","cljs-build-failure",1718154990),(function (msg){
shadow.cljs.devtools.client.hud.load_end();

shadow.cljs.devtools.client.hud.hud_error(msg);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-failure","build-failure",-2107487466)));
}),new cljs.core.Keyword("shadow.cljs.devtools.client.env","worker-notify","shadow.cljs.devtools.client.env/worker-notify",-1456820670),(function (p__21282){
var map__21283 = p__21282;
var map__21283__$1 = cljs.core.__destructure_map(map__21283);
var event_op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21283__$1,new cljs.core.Keyword(null,"event-op","event-op",200358057));
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21283__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-disconnect","client-disconnect",640227957),event_op)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(client_id,shadow.cljs.devtools.client.env.worker_client_id)))){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was stopped!");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-connect","client-connect",-1113973888),event_op)){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was restarted. Reload required!");
} else {
return null;
}
}
})], null)], null));

return svc;
}),(function (p__21284){
var map__21285 = p__21284;
var map__21285__$1 = cljs.core.__destructure_map(map__21285);
var svc = map__21285__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21285__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282));
}));

shadow.cljs.devtools.client.shared.init_runtime_BANG_(shadow.cljs.devtools.client.browser.client_info,shadow.cljs.devtools.client.websocket.start,shadow.cljs.devtools.client.websocket.send,shadow.cljs.devtools.client.websocket.stop);
} else {
}

//# sourceMappingURL=shadow.cljs.devtools.client.browser.js.map
