goog.provide('wejure.components.loginPage');
wejure.components.loginPage.emptyField = (function wejure$components$loginPage$emptyField(field){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(cljs.core.deref(field)),(0));
});
wejure.components.loginPage.step_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1("");
wejure.components.loginPage.loading_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1("");
wejure.components.loginPage.toMainPage = (function wejure$components$loginPage$toMainPage(){
return cljs.core.reset_BANG_(cljs.core.deref(wejure.components.loginPage.step_ref),(3));
});
goog.exportSymbol('wejure.components.loginPage.toMainPage', wejure.components.loginPage.toMainPage);
wejure.components.loginPage.stopLoading = (function wejure$components$loginPage$stopLoading(){
return cljs.core.reset_BANG_(cljs.core.deref(wejure.components.loginPage.loading_ref),false);
});
goog.exportSymbol('wejure.components.loginPage.stopLoading', wejure.components.loginPage.stopLoading);
wejure.components.loginPage.authenticate = (function wejure$components$loginPage$authenticate(name,password,details,loading,step){
cljs.core.reset_BANG_(wejure.components.loginPage.loading_ref,loading);

cljs.core.reset_BANG_(loading,true);

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["account: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"account","account",718006320).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(details)))," loading: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(loading))].join('')], 0));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(details,cljs.core.assoc,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.deref(name));

return module$wejure$js$accSystem.login(cljs.core.deref(name),cljs.core.deref(password));
});
wejure.components.loginPage.login_page = (function wejure$components$loginPage$login_page(p__12033){
var map__12034 = p__12033;
var map__12034__$1 = cljs.core.__destructure_map(map__12034);
var details = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12034__$1,new cljs.core.Keyword(null,"details","details",1956795411));
var step = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12034__$1,new cljs.core.Keyword(null,"step","step",1288888124));
var name = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var password = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var loading = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
cljs.core.reset_BANG_(wejure.components.loginPage.step_ref,step);

return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"height","height",1025178622),"100%",new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"justify-content","justify-content",-1990475787),"center",new cljs.core.Keyword(null,"align-items","align-items",-267946462),"center"], null)], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.box.box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"height","height",1025178622),"300px",new cljs.core.Keyword(null,"width","width",-384071477),"350px",new cljs.core.Keyword(null,"background-color","background-color",570434026),"#FFFEF7",new cljs.core.Keyword(null,"border-radius","border-radius",419594011),"30px",new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"column",new cljs.core.Keyword(null,"justify-content","justify-content",-1990475787),"space-between",new cljs.core.Keyword(null,"padding","padding",1660304693),"50px 30px"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.typography.typography,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h5",new cljs.core.Keyword(null,"component","component",1555936782),"div"], null),"Login your WeJure account"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"column"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.typography.typography,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h6",new cljs.core.Keyword(null,"component","component",1555936782),"div"], null),"1. Enter your username"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.text_field.text_field,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"variant","variant",-424354234),"filled",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(name),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (e){
return cljs.core.reset_BANG_(name,e.target.value);
}),new cljs.core.Keyword(null,"error","error",-978969032),wejure.components.loginPage.emptyField(name),new cljs.core.Keyword(null,"helper-text","helper-text",-1920318309),((wejure.components.loginPage.emptyField(name))?"no text entered (20 characters max)":" "),new cljs.core.Keyword(null,"input-props","input-props",-1504868202),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-length","max-length",-254826109),(20)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"column"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.typography.typography,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h6",new cljs.core.Keyword(null,"component","component",1555936782),"div"], null),"2. Enter your password"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.text_field.text_field,new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"variant","variant",-424354234),"filled",new cljs.core.Keyword(null,"type","type",1174270348),"password",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(password),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (e){
return cljs.core.reset_BANG_(password,e.target.value);
}),new cljs.core.Keyword(null,"error","error",-978969032),wejure.components.loginPage.emptyField(password),new cljs.core.Keyword(null,"helper-text","helper-text",-1920318309),((wejure.components.loginPage.emptyField(password))?"no text entered (20 characters max)":" "),new cljs.core.Keyword(null,"input-props","input-props",-1504868202),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-length","max-length",-254826109),(20)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"column",new cljs.core.Keyword(null,"align-items","align-items",-267946462),"center"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.button.button,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"variant","variant",-424354234),"contained",new cljs.core.Keyword(null,"disable-elevation","disable-elevation",-597366875),true,new cljs.core.Keyword(null,"disabled","disabled",-1529784218),(function (){var or__5045__auto__ = wejure.components.loginPage.emptyField(name);
if(or__5045__auto__){
return or__5045__auto__;
} else {
var or__5045__auto____$1 = wejure.components.loginPage.emptyField(password);
if(or__5045__auto____$1){
return or__5045__auto____$1;
} else {
return cljs.core.deref(loading);
}
}
})(),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return wejure.components.loginPage.authenticate(name,password,details,loading,step);
})], null),"Submit"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.circular_progress.circular_progress,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sx","sx",-403071592),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin","margin",-995903681),"10px",new cljs.core.Keyword(null,"visibility","visibility",1338380893),((cljs.core.not(cljs.core.deref(loading)))?"hidden":null)], null)], null)], null)], null)], null)], null);
});
});

//# sourceMappingURL=wejure.components.loginPage.js.map
