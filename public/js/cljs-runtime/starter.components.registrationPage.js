goog.provide('starter.components.registrationPage');
starter.components.registrationPage.emptyField = (function starter$components$registrationPage$emptyField(field){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(cljs.core.deref(field)),(0));
});
starter.components.registrationPage.emptyPhoto = (function starter$components$registrationPage$emptyPhoto(photo){
return (cljs.core.deref(photo) == null);
});
starter.components.registrationPage.is_pwd_matched = (function starter$components$registrationPage$is_pwd_matched(password,pwdConfirm){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(password),cljs.core.deref(pwdConfirm));
});
starter.components.registrationPage.step_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1("");
starter.components.registrationPage.loading_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1("");
starter.components.registrationPage.toLoginPage = (function starter$components$registrationPage$toLoginPage(){
return cljs.core.reset_BANG_(cljs.core.deref(starter.components.registrationPage.step_ref),(2));
});
goog.exportSymbol('starter.components.registrationPage.toLoginPage', starter.components.registrationPage.toLoginPage);
starter.components.registrationPage.stopLoading = (function starter$components$registrationPage$stopLoading(){
return cljs.core.reset_BANG_(cljs.core.deref(starter.components.registrationPage.loading_ref),false);
});
goog.exportSymbol('starter.components.registrationPage.stopLoading', starter.components.registrationPage.stopLoading);
starter.components.registrationPage.submitProfile = (function starter$components$registrationPage$submitProfile(name,password,photo,details,loading,step){
cljs.core.reset_BANG_(starter.components.registrationPage.loading_ref,loading);

cljs.core.reset_BANG_(loading,true);

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["account: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"account","account",718006320).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(details)))," loading: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(loading))].join('')], 0));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(details,cljs.core.assoc,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.deref(name));

cljs_ipfs_api.files.add.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(photo),(function (err,files){
if(cljs.core.truth_(err)){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["err: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(err)].join('')], 0));
} else {
var hash = JSON.parse(files).Hash;
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([hash], 0));
}
}));

return module$starter$js$accSystem.register(cljs.core.deref(name),cljs.core.deref(password));
});
starter.components.registrationPage.registrationPage = (function starter$components$registrationPage$registrationPage(p__12092){
var map__12093 = p__12092;
var map__12093__$1 = cljs.core.__destructure_map(map__12093);
var details = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12093__$1,new cljs.core.Keyword(null,"details","details",1956795411));
var step = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12093__$1,new cljs.core.Keyword(null,"step","step",1288888124));
var name = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var password = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var pwdConfirm = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var profilePic = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var loading = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
cljs.core.reset_BANG_(starter.components.registrationPage.step_ref,step);

cljs_ipfs_api.core.init_ipfs.cljs$core$IFn$_invoke$arity$0();

return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"height","height",1025178622),"100%",new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"justify-content","justify-content",-1990475787),"center",new cljs.core.Keyword(null,"align-items","align-items",-267946462),"center"], null)], null),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.box.box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"height","height",1025178622),"500px",new cljs.core.Keyword(null,"width","width",-384071477),"350px",new cljs.core.Keyword(null,"background-color","background-color",570434026),"#FFFEF7",new cljs.core.Keyword(null,"border-radius","border-radius",419594011),"30px",new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"column",new cljs.core.Keyword(null,"justify-content","justify-content",-1990475787),"space-between",new cljs.core.Keyword(null,"padding","padding",1660304693),"50px 30px"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.typography.typography,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h5",new cljs.core.Keyword(null,"component","component",1555936782),"div"], null),"Create your WeJure profile"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"column"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.typography.typography,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h6",new cljs.core.Keyword(null,"component","component",1555936782),"div"], null),"1. Create a username"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.text_field.text_field,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"variant","variant",-424354234),"filled",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(name),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (e){
return cljs.core.reset_BANG_(name,e.target.value);
}),new cljs.core.Keyword(null,"error","error",-978969032),starter.components.registrationPage.emptyField(name),new cljs.core.Keyword(null,"helper-text","helper-text",-1920318309),((starter.components.registrationPage.emptyField(name))?"no text entered (20 characters max)":" "),new cljs.core.Keyword(null,"input-props","input-props",-1504868202),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-length","max-length",-254826109),(20)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"column"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.typography.typography,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h6",new cljs.core.Keyword(null,"component","component",1555936782),"div"], null),"2. Create a password (at least 8 digits)"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.text_field.text_field,new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"variant","variant",-424354234),"filled",new cljs.core.Keyword(null,"type","type",1174270348),"password",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(password),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (e){
return cljs.core.reset_BANG_(password,e.target.value);
}),new cljs.core.Keyword(null,"error","error",-978969032),starter.components.registrationPage.emptyField(password),new cljs.core.Keyword(null,"helper-text","helper-text",-1920318309),((starter.components.registrationPage.emptyField(password))?"no text entered (20 characters max)":" "),new cljs.core.Keyword(null,"input-props","input-props",-1504868202),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-length","max-length",-254826109),(20)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"column"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.typography.typography,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h6",new cljs.core.Keyword(null,"component","component",1555936782),"div"], null),"3. Confirm your password"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.text_field.text_field,new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"variant","variant",-424354234),"filled",new cljs.core.Keyword(null,"type","type",1174270348),"password",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(pwdConfirm),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (e){
return cljs.core.reset_BANG_(pwdConfirm,e.target.value);
}),new cljs.core.Keyword(null,"error","error",-978969032),starter.components.registrationPage.emptyField(pwdConfirm),new cljs.core.Keyword(null,"helper-text","helper-text",-1920318309),((starter.components.registrationPage.emptyField(pwdConfirm))?"no text entered (20 characters max)":((starter.components.registrationPage.is_pwd_matched(password,pwdConfirm))?" ":"Passwords do not match")),new cljs.core.Keyword(null,"input-props","input-props",-1504868202),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-length","max-length",-254826109),(20)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"column"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.typography.typography,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h6",new cljs.core.Keyword(null,"component","component",1555936782),"div"], null),"3. Upload a profile picture"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"html-for","html-for",594503920),"upload-image",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin","margin",-995903681),"0 auto"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"accept","accept",1874130431),"image/*",new cljs.core.Keyword(null,"id","id",-1388402092),"upload-image",new cljs.core.Keyword(null,"type","type",1174270348),"file",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),"none"], null),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__12091_SHARP_){
var uploaded = (p1__12091_SHARP_.target.files[(0)]);
return cljs.core.reset_BANG_(profilePic,uploaded);
})], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.icon_button.icon_button,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"component","component",1555936782),"span"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.icons.add_a_photo_sharp.add_a_photo_sharp], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.typography.typography,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h6",new cljs.core.Keyword(null,"component","component",1555936782),"div",new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"color","color",1011675173),((starter.components.registrationPage.emptyPhoto(profilePic))?"#d32f2f":"#070707"),new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"12px",new cljs.core.Keyword(null,"font-weight","font-weight",2085804583),"500",new cljs.core.Keyword(null,"text-align","text-align",1786091845),"center"], null)], null),((starter.components.registrationPage.emptyPhoto(profilePic))?"no photo uploaded":cljs.core.deref(profilePic).name)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"column",new cljs.core.Keyword(null,"align-items","align-items",-267946462),"center"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.button.button,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"variant","variant",-424354234),"contained",new cljs.core.Keyword(null,"disable-elevation","disable-elevation",-597366875),true,new cljs.core.Keyword(null,"disabled","disabled",-1529784218),(function (){var or__5045__auto__ = starter.components.registrationPage.emptyField(name);
if(or__5045__auto__){
return or__5045__auto__;
} else {
var or__5045__auto____$1 = starter.components.registrationPage.emptyField(password);
if(or__5045__auto____$1){
return or__5045__auto____$1;
} else {
var or__5045__auto____$2 = starter.components.registrationPage.emptyPhoto(profilePic);
if(or__5045__auto____$2){
return or__5045__auto____$2;
} else {
var or__5045__auto____$3 = (!(starter.components.registrationPage.is_pwd_matched(password,pwdConfirm)));
if(or__5045__auto____$3){
return or__5045__auto____$3;
} else {
return cljs.core.deref(loading);
}
}
}
}
})(),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return starter.components.registrationPage.submitProfile(name,password,profilePic,details,loading,step);
})], null),"Submit"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.circular_progress.circular_progress,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin","margin",-995903681),"10px",new cljs.core.Keyword(null,"visibility","visibility",1338380893),((cljs.core.not(cljs.core.deref(loading)))?"hidden":null)], null)], null)], null)], null)], null)], null);
});
});

//# sourceMappingURL=starter.components.registrationPage.js.map
