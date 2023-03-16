goog.provide('starter.helper.atom');
starter.helper.atom.text = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("Hello world");
starter.helper.atom.message = (function starter$helper$atom$message(){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Hello"], 0));
});
starter.helper.atom.function$ = (function starter$helper$atom$function(p__12138){
var map__12139 = p__12138;
var map__12139__$1 = cljs.core.__destructure_map(map__12139);
var details = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12139__$1,new cljs.core.Keyword(null,"details","details",1956795411));
var step = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12139__$1,new cljs.core.Keyword(null,"step","step",1288888124));
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632)], null);
});
starter.helper.atom.atom_set = (function starter$helper$atom$atom_set(target_atom,value){
cljs.core.reset_BANG_(target_atom,value);

return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.deref(target_atom)], 0));
});

//# sourceMappingURL=starter.helper.atom.js.map
