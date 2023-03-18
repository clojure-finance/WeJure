goog.provide('wejure.core');
wejure.core.app = (function wejure$core$app(){
var step = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((0));
var details = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"height","height",1025178622),"100%",new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"column"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [wejure.components.navigationBar.navigation_bar,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"step","step",1288888124),step,new cljs.core.Keyword(null,"details","details",1956795411),details], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"height","height",1025178622),"100%"], null)], null),(function (){var G__12444 = cljs.core.deref(step);
switch (G__12444) {
case (0):
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [wejure.components.titlePage.title_page,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"details","details",1956795411),details,new cljs.core.Keyword(null,"step","step",1288888124),step], null)], null);

break;
case (1):
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [wejure.components.registrationPage.registration_page,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"details","details",1956795411),details,new cljs.core.Keyword(null,"step","step",1288888124),step], null)], null);

break;
case (2):
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [wejure.components.loginPage.login_page,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"details","details",1956795411),details,new cljs.core.Keyword(null,"step","step",1288888124),step], null)], null);

break;
case (3):
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [wejure.components.mainPage.main_page,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"details","details",1956795411),details], null)], null);

break;
case (4):
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [wejure.components.chatPage.chat_page,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"details","details",1956795411),details], null)], null);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__12444)].join('')));

}
})()], null)], null);
});
});
wejure.core.stop = (function wejure$core$stop(){
return console.log("Stopping...");
});
wejure.core.start = (function wejure$core$start(){
console.log("Starting...");

return reagent.dom.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [wejure.core.app], null),document.getElementById("app"));
});
wejure.core.init = (function wejure$core$init(){
return wejure.core.start();
});
goog.exportSymbol('wejure.core.init', wejure.core.init);

//# sourceMappingURL=wejure.core.js.map
