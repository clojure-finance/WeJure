goog.provide('starter.helper.function$');
starter.helper.function$.text = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("Hello world");
starter.helper.function$.message = (function starter$helper$function$message(){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Hello"], 0));
});
starter.helper.function$.function$ = (function starter$helper$function$function(p__12134){
var map__12135 = p__12134;
var map__12135__$1 = cljs.core.__destructure_map(map__12135);
var details = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12135__$1,new cljs.core.Keyword(null,"details","details",1956795411));
var step = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12135__$1,new cljs.core.Keyword(null,"step","step",1288888124));
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632)], null);
});
starter.helper.function$.atom_set = (function starter$helper$function$atom_set(target_atom,value){
cljs.core.reset_BANG_(target_atom,value);

return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.deref(target_atom)], 0));
});

//# sourceMappingURL=starter.helper.function.js.map
