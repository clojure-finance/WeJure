goog.provide('wejure.components.titlePage');
wejure.components.titlePage.title_page = (function wejure$components$titlePage$title_page(p__12442){
var map__12443 = p__12442;
var map__12443__$1 = cljs.core.__destructure_map(map__12443);
var details = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12443__$1,new cljs.core.Keyword(null,"details","details",1956795411));
var step = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12443__$1,new cljs.core.Keyword(null,"step","step",1288888124));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(module$wejure$js$accSystem.isLogged(),true)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(details,cljs.core.assoc,new cljs.core.Keyword(null,"name","name",1843675177),module$wejure$js$accSystem.getUserName());

cljs.core.reset_BANG_(step,(3));
} else {
}

return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"height","height",1025178622),"100%",new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"column",new cljs.core.Keyword(null,"align-items","align-items",-267946462),"center",new cljs.core.Keyword(null,"justify-content","justify-content",-1990475787),"center"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"src","src",-1651076051),"logo_black.png",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"height","height",1025178622),"300px",new cljs.core.Keyword(null,"width","width",-384071477),"300px",new cljs.core.Keyword(null,"flex","flex",-1425124628),"0 1 auto"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.typography.typography,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h6",new cljs.core.Keyword(null,"component","component",1555936782),"div"], null),"A decentralized social media."], null)], null);
});

//# sourceMappingURL=wejure.components.titlePage.js.map
