goog.provide('starter.components.ipfsTest');
starter.components.ipfsTest.add_file_to_ipfs = (function starter$components$ipfsTest$add_file_to_ipfs(filename,file_data){
var blob = (new Blob(cljs.core.clj__GT_js(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_data], null)),({"type": "image/*"})));
return cljs_ipfs_api.files.add.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(file_data),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",-188191168),filename], null),(function (err,files){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [err,files], null)], 0));
}));
});
starter.components.ipfsTest.ipfsTest = (function starter$components$ipfsTest$ipfsTest(){
cljs_ipfs_api.core.init_ipfs.cljs$core$IFn$_invoke$arity$0();

var f = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-submit","on-submit",1227871159),(function (e){
e.preventDefault();

return starter.components.ipfsTest.add_file_to_ipfs(cljs.core.deref(f).name,cljs.core.deref(f));
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"file",new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__11965_SHARP_){
var v = (p1__11965_SHARP_.target.files[(0)]);
return cljs.core.reset_BANG_(f,v);
})], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"submit",new cljs.core.Keyword(null,"value","value",305978217),"Import"], null)], null)], null);
});
});

//# sourceMappingURL=starter.components.ipfsTest.js.map
