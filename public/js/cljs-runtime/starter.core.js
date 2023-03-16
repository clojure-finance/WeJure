goog.provide('starter.core');
starter.core.app = (function starter$core$app(){
var step = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((-1));
var details = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"height","height",1025178622),"100%",new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"column"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [starter.components.navBar.navBar,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"step","step",1288888124),step,new cljs.core.Keyword(null,"details","details",1956795411),details], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"height","height",1025178622),"100%"], null)], null),(function (){var G__12085 = cljs.core.deref(step);
switch (G__12085) {
case (-2):
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [starter.components.ipfsTest.ipfsTest], null);

break;
case (-1):
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [starter.components.testPage.testPage,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"details","details",1956795411),details], null)], null);

break;
case (0):
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [starter.components.titlePage.titlePage], null);

break;
case (1):
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [starter.components.registrationPage.registrationPage,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"details","details",1956795411),details,new cljs.core.Keyword(null,"step","step",1288888124),step], null)], null);

break;
case (2):
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [starter.components.loginPage.loginPage,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"details","details",1956795411),details,new cljs.core.Keyword(null,"step","step",1288888124),step], null)], null);

break;
case (3):
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [starter.components.mainPage.mainPage,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"details","details",1956795411),details], null)], null);

break;
case (4):
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [starter.components.chatPage.chatPage,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"details","details",1956795411),details], null)], null);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__12085)].join('')));

}
})()], null)], null);
});
});
starter.core.stop = (function starter$core$stop(){
return console.log("Stopping...");
});
starter.core.start = (function starter$core$start(){
console.log("Starting...");

return reagent.dom.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [starter.core.app], null),document.getElementById("app"));
});
starter.core.init = (function starter$core$init(){
return starter.core.start();
});
goog.exportSymbol('starter.core.init', starter.core.init);

//# sourceMappingURL=starter.core.js.map
