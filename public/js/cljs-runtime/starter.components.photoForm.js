goog.provide('starter.components.photoForm');
starter.components.photoForm.emptyDescription = (function starter$components$photoForm$emptyDescription(description){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(cljs.core.deref(description)),(0));
});
starter.components.photoForm.emptyPhoto = (function starter$components$photoForm$emptyPhoto(photo){
return (cljs.core.deref(photo) == null);
});
starter.components.photoForm.submitPhoto = (function starter$components$photoForm$submitPhoto(photo,description,contractInstance,loading,open,details){
cljs.core.reset_BANG_(loading,true);

return cljs_ipfs_api.files.add.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(photo),(function (err,files){
if(cljs.core.truth_(err)){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["err: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(err)].join('')], 0));
} else {
var hash = JSON.parse(files).Hash;
return contractInstance.methods.setPicture(hash,cljs.core.deref(description)).send((function (){var obj23591 = ({"from":new cljs.core.Keyword(null,"account","account",718006320).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(details))});
return obj23591;
})(),(function (error,txHash){
if(cljs.core.truth_(error)){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([error], 0));
} else {
cljs.core.reset_BANG_(loading,false);

return cljs.core.reset_BANG_(open,false);
}
}));
}
}));
});
starter.components.photoForm.photoForm = (function starter$components$photoForm$photoForm(p__23593){
var map__23594 = p__23593;
var map__23594__$1 = cljs.core.__destructure_map(map__23594);
var open = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23594__$1,new cljs.core.Keyword(null,"open","open",-1763596448));
var contractInstance = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23594__$1,new cljs.core.Keyword(null,"contractInstance","contractInstance",-1686123611));
var details = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__23594__$1,new cljs.core.Keyword(null,"details","details",1956795411));
var photo = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var description = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var error = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var loading = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
cljs_ipfs_api.core.init_ipfs.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"host","host",-1558485167),"https://ipfs.infura.io:5001"], null));

return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.modal.modal,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"open","open",-1763596448),cljs.core.deref(open),new cljs.core.Keyword(null,"on-close","on-close",-761178394),(function (){
cljs.core.reset_BANG_(photo,null);

cljs.core.reset_BANG_(description,null);

return cljs.core.reset_BANG_(open,false);
})], null),new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.box.box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"align-items","align-items",-267946462),new cljs.core.Keyword(null,"box-shadow","box-shadow",1600206755),new cljs.core.Keyword(null,"transform","transform",1381301764),new cljs.core.Keyword(null,"top","top",-1856271961),new cljs.core.Keyword(null,"background-color","background-color",570434026),new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"padding","padding",1660304693),new cljs.core.Keyword(null,"display","display",242065432),new cljs.core.Keyword(null,"position","position",-2011731912),new cljs.core.Keyword(null,"border","border",1444987323),new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"height","height",1025178622),new cljs.core.Keyword(null,"left","left",-399115937)],["center","20","translate(-50%, -50%)","50%","#CAF0F8","400px","30px","flex","absolute","5px solid #5F939A","column","350px","50%"])], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.typography.typography,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h6",new cljs.core.Keyword(null,"component","component",1555936782),"div",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),"#070707",new cljs.core.Keyword(null,"font-weight","font-weight",2085804583),"100"], null)], null),"Step 1: upload a photo"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"hr","hr",1377740067),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),"50%"], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"column",new cljs.core.Keyword(null,"align-items","align-items",-267946462),"center"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"html-for","html-for",594503920),"upload-image"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"accept","accept",1874130431),"image/*",new cljs.core.Keyword(null,"id","id",-1388402092),"upload-image",new cljs.core.Keyword(null,"type","type",1174270348),"file",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),"none"], null),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__23592_SHARP_){
var uploaded = (p1__23592_SHARP_.target.files[(0)]);
return cljs.core.reset_BANG_(photo,uploaded);
})], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.icon_button.icon_button,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"component","component",1555936782),"span"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.add_a_photo_sharp.add_a_photo_sharp], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.typography.typography,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h6",new cljs.core.Keyword(null,"component","component",1555936782),"div",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"color","color",1011675173),((starter.components.photoForm.emptyPhoto(photo))?"#d32f2f":"#070707"),new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"12px",new cljs.core.Keyword(null,"font-weight","font-weight",2085804583),"500"], null)], null),((starter.components.photoForm.emptyPhoto(photo))?"no photo uploaded":cljs.core.deref(photo).name)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin","margin",-995903681),"10px"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.typography.typography,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h6",new cljs.core.Keyword(null,"component","component",1555936782),"div",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),"#070707",new cljs.core.Keyword(null,"font-weight","font-weight",2085804583),"100"], null)], null),"Step 2: add a decription to your photo"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"hr","hr",1377740067),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin","margin",-995903681),"10px",new cljs.core.Keyword(null,"width","width",-384071477),"50%"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"height","height",1025178622),"120px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.text_field.text_field,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"multiline","multiline",-1084693234),true,new cljs.core.Keyword(null,"rows","rows",850049680),(2),new cljs.core.Keyword(null,"error","error",-978969032),starter.components.photoForm.emptyDescription(description),new cljs.core.Keyword(null,"helper-text","helper-text",-1920318309),((starter.components.photoForm.emptyDescription(description))?"description cannot be empty":null),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(description),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (e){
return cljs.core.reset_BANG_(description,e.target.value);
})], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin","margin",-995903681),"10px"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.button.button,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"variant","variant",-424354234),"contained",new cljs.core.Keyword(null,"disabled","disabled",-1529784218),(function (){var or__5045__auto__ = starter.components.photoForm.emptyDescription(description);
if(or__5045__auto__){
return or__5045__auto__;
} else {
var or__5045__auto____$1 = starter.components.photoForm.emptyPhoto(photo);
if(or__5045__auto____$1){
return or__5045__auto____$1;
} else {
return cljs.core.deref(loading);
}
}
})(),new cljs.core.Keyword(null,"disable-elevation","disable-elevation",-597366875),true,new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return starter.components.photoForm.submitPhoto(photo,description,contractInstance,loading,open,details);
})], null),"Submit"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.circular_progress.circular_progress,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin","margin",-995903681),"10px",new cljs.core.Keyword(null,"visibility","visibility",1338380893),((cljs.core.not(cljs.core.deref(loading)))?"hidden":null)], null)], null)], null)], null)], null)], null);
});
});

//# sourceMappingURL=starter.components.photoForm.js.map
