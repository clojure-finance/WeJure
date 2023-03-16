goog.provide('wejure.components.testPage');
wejure.components.testPage.profilePic = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
wejure.components.testPage.emptyPhoto = (function wejure$components$testPage$emptyPhoto(photo){
return (cljs.core.deref(photo) == null);
});
wejure.components.testPage.ipfs_add_image = (function wejure$components$testPage$ipfs_add_image(filename,file_data){
var blob = (new Blob(cljs.core.clj__GT_js(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_data], null)),({"type": "image/*"})));
return cljs_ipfs_api.files.add.cljs$core$IFn$_invoke$arity$3(blob,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",-188191168),filename], null),(function (err,files){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [err,files], null)], 0));
}));
});
wejure.components.testPage.submitProfile = (function wejure$components$testPage$submitProfile(name,photo,details){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.deref(photo).name], 0));

var blob = (new Blob(cljs.core.clj__GT_js(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref(photo)], null)),({"type": "image/*"})));
return cljs_ipfs_api.files.add.cljs$core$IFn$_invoke$arity$3(blob,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",-188191168),cljs.core.deref(photo).name], null),(function (err,files){
if(cljs.core.truth_(err)){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["err: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(err)].join('')], 0));
} else {
var hash = JSON.parse(files).Hash;
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["files: ",files], 0));

return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["hash: ",hash], 0));
}
}));
});
wejure.components.testPage.testPage = (function wejure$components$testPage$testPage(p__11912){
var map__11913 = p__11912;
var map__11913__$1 = cljs.core.__destructure_map(map__11913);
var details = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11913__$1,new cljs.core.Keyword(null,"details","details",1956795411));
var step = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11913__$1,new cljs.core.Keyword(null,"step","step",1288888124));
cljs_ipfs_api.core.init_ipfs.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"host","host",-1558485167),"http://127.0.0.1:5001"], null));

return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.typography.typography,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h6",new cljs.core.Keyword(null,"component","component",1555936782),"div"], null),"3. Upload a profile picture"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"html-for","html-for",594503920),"upload-image",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin","margin",-995903681),"0 auto"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"accept","accept",1874130431),"image/*",new cljs.core.Keyword(null,"id","id",-1388402092),"upload-image",new cljs.core.Keyword(null,"type","type",1174270348),"file",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),"none"], null),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__11911_SHARP_){
var uploaded = (p1__11911_SHARP_.target.files[(0)]);
return cljs.core.reset_BANG_(wejure.components.testPage.profilePic,uploaded);
})], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.icon_button.icon_button,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"component","component",1555936782),"span"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.add_a_photo_sharp.add_a_photo_sharp], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.typography.typography,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h6",new cljs.core.Keyword(null,"component","component",1555936782),"div",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"color","color",1011675173),((wejure.components.testPage.emptyPhoto(wejure.components.testPage.profilePic))?"#d32f2f":"#070707"),new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"12px",new cljs.core.Keyword(null,"font-weight","font-weight",2085804583),"500"], null)], null),((wejure.components.testPage.emptyPhoto(wejure.components.testPage.profilePic))?"no photo uploaded":cljs.core.deref(wejure.components.testPage.profilePic).name)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.button.button,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"variant","variant",-424354234),"contained",new cljs.core.Keyword(null,"disable-elevation","disable-elevation",-597366875),true,new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return wejure.components.testPage.submitProfile(cljs.core.name,wejure.components.testPage.profilePic,details);
})], null),"Submit"], null)], null)], null);
});

//# sourceMappingURL=wejure.components.testPage.js.map
