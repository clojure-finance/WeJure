goog.provide('starter.components.photos');
starter.components.photos.ipfsUrl = "https://ipfs.infura.io/ipfs/";
starter.components.photos.photos = (function starter$components$photos$photos(p__22108){
var map__22109 = p__22108;
var map__22109__$1 = cljs.core.__destructure_map(map__22109);
var contractInstance = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22109__$1,new cljs.core.Keyword(null,"contractInstance","contractInstance",-1686123611));
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22109__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var photo = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var creator = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
contractInstance.methods.pics(id).call((function (error,result){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(photo,cljs.core.assoc,new cljs.core.Keyword(null,"picHash","picHash",-1280055398),cljs.core.str.cljs$core$IFn$_invoke$arity$1(result.picHash));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(photo,cljs.core.assoc,new cljs.core.Keyword(null,"description","description",-1428560544),cljs.core.str.cljs$core$IFn$_invoke$arity$1(result.description));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["user: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(result.user)], 0));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(photo,cljs.core.assoc,new cljs.core.Keyword(null,"user","user",1532431356),cljs.core.str.cljs$core$IFn$_invoke$arity$1(result.user));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["photo"], 0));

return console.log(result);
})).then((function (){
return contractInstance.methods.profiles(new cljs.core.Keyword(null,"user","user",1532431356).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(photo))).call((function (error,result){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(creator,cljs.core.assoc,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.str.cljs$core$IFn$_invoke$arity$1(result.name));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(creator,cljs.core.assoc,new cljs.core.Keyword(null,"profile","profile",-545963874),cljs.core.str.cljs$core$IFn$_invoke$arity$1(result.picHash));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["creator"], 0));

return console.log(result);
}));
}));

return (function (){
(window.tamp = cljs.core.clj__GT_js(cljs.core.deref(photo)));

return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.box.box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"align-items","align-items",-267946462),new cljs.core.Keyword(null,"background-color","background-color",570434026),new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"display","display",242065432),new cljs.core.Keyword(null,"border-radius","border-radius",419594011),"&>div",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"height","height",1025178622),new cljs.core.Keyword(null,"margin","margin",-995903681)],["center","white","600px","flex","25px",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin","margin",-995903681),"2px"], null),"column","800px","20px 0"])], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.box.box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"align-items","align-items",-267946462),"center",new cljs.core.Keyword(null,"width","width",-384071477),"100%","&>*",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin","margin",-995903681),"0 5px"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"src","src",-1651076051),[starter.components.photos.ipfsUrl,cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"profile","profile",-545963874).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(creator)))].join(''),new cljs.core.Keyword(null,"width","width",-384071477),(50),new cljs.core.Keyword(null,"height","height",1025178622),(50),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"border-radius","border-radius",419594011),"50%"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.typography.typography,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h6",new cljs.core.Keyword(null,"component","component",1555936782),"div",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"17px"], null)], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(creator))], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.box.box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"width","width",-384071477),"100%",new cljs.core.Keyword(null,"background-color","background-color",570434026),"#404040",new cljs.core.Keyword(null,"height","height",1025178622),"90%"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"src","src",-1651076051),[starter.components.photos.ipfsUrl,cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"picHash","picHash",-1280055398).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(photo)))].join(''),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"width","width",-384071477),"100%",new cljs.core.Keyword(null,"height","height",1025178622),"100%",new cljs.core.Keyword(null,"object-fit","object-fit",-429593694),"contain"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.typography.typography,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h6",new cljs.core.Keyword(null,"component","component",1555936782),"div",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"17px",new cljs.core.Keyword(null,"white-space","white-space",-707351930),"pre-line"], null)], null),new cljs.core.Keyword(null,"description","description",-1428560544).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(photo))], null)], null);
});
});

//# sourceMappingURL=starter.components.photos.js.map
