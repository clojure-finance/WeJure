goog.provide('cljs_ipfs_api.core');
cljs_ipfs_api.core._STAR_ipfs_instance_STAR_ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs_ipfs_api.core.init_ipfs = (function cljs_ipfs_api$core$init_ipfs(var_args){
var G__11451 = arguments.length;
switch (G__11451) {
case 0:
return cljs_ipfs_api.core.init_ipfs.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs_ipfs_api.core.init_ipfs.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs_ipfs_api.core.init_ipfs.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs_ipfs_api.core.init_ipfs.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs_ipfs_api.core.init_ipfs.cljs$core$IFn$_invoke$arity$1 = (function (params){
var i = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"host","host",-1558485167),"http://127.0.0.1:5001",new cljs.core.Keyword(null,"endpoint","endpoint",447890044),"/api/v0"], null),params], 0));
cljs.core.reset_BANG_(cljs_ipfs_api.core._STAR_ipfs_instance_STAR_,i);

return i;
}));

(cljs_ipfs_api.core.init_ipfs.cljs$lang$maxFixedArity = 1);


//# sourceMappingURL=cljs_ipfs_api.core.js.map
