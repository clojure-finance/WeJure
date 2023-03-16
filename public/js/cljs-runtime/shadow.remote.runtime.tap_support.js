goog.provide('shadow.remote.runtime.tap_support');
shadow.remote.runtime.tap_support.tap_subscribe = (function shadow$remote$runtime$tap_support$tap_subscribe(p__19708,p__19709){
var map__19711 = p__19708;
var map__19711__$1 = cljs.core.__destructure_map(map__19711);
var svc = map__19711__$1;
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19711__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
var obj_support = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19711__$1,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19711__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var map__19712 = p__19709;
var map__19712__$1 = cljs.core.__destructure_map(map__19712);
var msg = map__19712__$1;
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19712__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var summary = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19712__$1,new cljs.core.Keyword(null,"summary","summary",380847952));
var history__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19712__$1,new cljs.core.Keyword(null,"history","history",-247395220));
var num = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__19712__$1,new cljs.core.Keyword(null,"num","num",1985240673),(10));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(subs_ref,cljs.core.assoc,from,msg);

if(cljs.core.truth_(history__$1)){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap-subscribed","tap-subscribed",-1882247432),new cljs.core.Keyword(null,"history","history",-247395220),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (oid){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"oid","oid",-768692334),oid,new cljs.core.Keyword(null,"summary","summary",380847952),shadow.remote.runtime.obj_support.obj_describe_STAR_(obj_support,oid)], null);
}),shadow.remote.runtime.obj_support.get_tap_history(obj_support,num)))], null));
} else {
return null;
}
});
shadow.remote.runtime.tap_support.tap_unsubscribe = (function shadow$remote$runtime$tap_support$tap_unsubscribe(p__19721,p__19722){
var map__19724 = p__19721;
var map__19724__$1 = cljs.core.__destructure_map(map__19724);
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19724__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
var map__19725 = p__19722;
var map__19725__$1 = cljs.core.__destructure_map(map__19725);
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19725__$1,new cljs.core.Keyword(null,"from","from",1815293044));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(subs_ref,cljs.core.dissoc,from);
});
shadow.remote.runtime.tap_support.request_tap_history = (function shadow$remote$runtime$tap_support$request_tap_history(p__19732,p__19733){
var map__19734 = p__19732;
var map__19734__$1 = cljs.core.__destructure_map(map__19734);
var obj_support = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19734__$1,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19734__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var map__19735 = p__19733;
var map__19735__$1 = cljs.core.__destructure_map(map__19735);
var msg = map__19735__$1;
var num = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__19735__$1,new cljs.core.Keyword(null,"num","num",1985240673),(10));
var tap_ids = shadow.remote.runtime.obj_support.get_tap_history(obj_support,num);
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap-history","tap-history",-282803347),new cljs.core.Keyword(null,"oids","oids",-1580877688),tap_ids], null));
});
shadow.remote.runtime.tap_support.tool_disconnect = (function shadow$remote$runtime$tap_support$tool_disconnect(p__19738,tid){
var map__19740 = p__19738;
var map__19740__$1 = cljs.core.__destructure_map(map__19740);
var svc = map__19740__$1;
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19740__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(subs_ref,cljs.core.dissoc,tid);
});
shadow.remote.runtime.tap_support.start = (function shadow$remote$runtime$tap_support$start(runtime,obj_support){
var subs_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var tap_fn = (function shadow$remote$runtime$tap_support$start_$_runtime_tap(obj){
if((!((obj == null)))){
var oid = shadow.remote.runtime.obj_support.register(obj_support,obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"from","from",1815293044),new cljs.core.Keyword(null,"tap","tap",-1086702463)], null));
var seq__19772 = cljs.core.seq(cljs.core.deref(subs_ref));
var chunk__19773 = null;
var count__19774 = (0);
var i__19775 = (0);
while(true){
if((i__19775 < count__19774)){
var vec__19814 = chunk__19773.cljs$core$IIndexed$_nth$arity$2(null,i__19775);
var tid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19814,(0),null);
var tap_config = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19814,(1),null);
shadow.remote.runtime.api.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap","tap",-1086702463),new cljs.core.Keyword(null,"to","to",192099007),tid,new cljs.core.Keyword(null,"oid","oid",-768692334),oid], null));


var G__19983 = seq__19772;
var G__19984 = chunk__19773;
var G__19985 = count__19774;
var G__19986 = (i__19775 + (1));
seq__19772 = G__19983;
chunk__19773 = G__19984;
count__19774 = G__19985;
i__19775 = G__19986;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__19772);
if(temp__5804__auto__){
var seq__19772__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__19772__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__19772__$1);
var G__19987 = cljs.core.chunk_rest(seq__19772__$1);
var G__19988 = c__5568__auto__;
var G__19989 = cljs.core.count(c__5568__auto__);
var G__19990 = (0);
seq__19772 = G__19987;
chunk__19773 = G__19988;
count__19774 = G__19989;
i__19775 = G__19990;
continue;
} else {
var vec__19826 = cljs.core.first(seq__19772__$1);
var tid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19826,(0),null);
var tap_config = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19826,(1),null);
shadow.remote.runtime.api.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap","tap",-1086702463),new cljs.core.Keyword(null,"to","to",192099007),tid,new cljs.core.Keyword(null,"oid","oid",-768692334),oid], null));


var G__19991 = cljs.core.next(seq__19772__$1);
var G__19992 = null;
var G__19993 = (0);
var G__19994 = (0);
seq__19772 = G__19991;
chunk__19773 = G__19992;
count__19774 = G__19993;
i__19775 = G__19994;
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
});
var svc = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229),obj_support,new cljs.core.Keyword(null,"tap-fn","tap-fn",1573556461),tap_fn,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911),subs_ref], null);
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.tap-support","ext","shadow.remote.runtime.tap-support/ext",1019069674),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"tap-subscribe","tap-subscribe",411179050),(function (p1__19754_SHARP_){
return shadow.remote.runtime.tap_support.tap_subscribe(svc,p1__19754_SHARP_);
}),new cljs.core.Keyword(null,"tap-unsubscribe","tap-unsubscribe",1183890755),(function (p1__19756_SHARP_){
return shadow.remote.runtime.tap_support.tap_unsubscribe(svc,p1__19756_SHARP_);
}),new cljs.core.Keyword(null,"request-tap-history","request-tap-history",-670837812),(function (p1__19757_SHARP_){
return shadow.remote.runtime.tap_support.request_tap_history(svc,p1__19757_SHARP_);
})], null),new cljs.core.Keyword(null,"on-tool-disconnect","on-tool-disconnect",693464366),(function (p1__19758_SHARP_){
return shadow.remote.runtime.tap_support.tool_disconnect(svc,p1__19758_SHARP_);
})], null));

cljs.core.add_tap(tap_fn);

return svc;
});
shadow.remote.runtime.tap_support.stop = (function shadow$remote$runtime$tap_support$stop(p__19858){
var map__19859 = p__19858;
var map__19859__$1 = cljs.core.__destructure_map(map__19859);
var svc = map__19859__$1;
var tap_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19859__$1,new cljs.core.Keyword(null,"tap-fn","tap-fn",1573556461));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19859__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
cljs.core.remove_tap(tap_fn);

return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.tap-support","ext","shadow.remote.runtime.tap-support/ext",1019069674));
});

//# sourceMappingURL=shadow.remote.runtime.tap_support.js.map
