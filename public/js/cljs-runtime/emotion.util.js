goog.provide('emotion.util');
goog.require('cljs.core');
goog.require('clojure.string');
/**
 * Convert keyworded component name to string.
 */
emotion.util.convert_component_name = (function emotion$util$convert_component_name(component_name){
if((component_name instanceof cljs.core.Keyword)){
return cljs.core.name(component_name);
} else {
return component_name;
}
});
/**
 * Returns camel case version of the string, e.g. "font-size"
 *   becomes "fontSize".
 */
emotion.util.string__GT_camel_case = (function emotion$util$string__GT_camel_case(value){
var vec__20014 = clojure.string.split.cljs$core$IFn$_invoke$arity$2(value,/-/);
var seq__20015 = cljs.core.seq(vec__20014);
var first__20016 = cljs.core.first(seq__20015);
var seq__20015__$1 = cljs.core.next(seq__20015);
var first_word = first__20016;
var words = seq__20015__$1;
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(first_word,"data")) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(first_word,"area")))){
return value;
} else {
return clojure.string.join.cljs$core$IFn$_invoke$arity$1(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.string.capitalize,words),first_word));
}
});
/**
 * Returns camel case version of the keyword, e.g. :font-size
 *   becomes "fontSize".
 */
emotion.util.kwd__GT_camel_case = (function emotion$util$kwd__GT_camel_case(value){
if((value instanceof cljs.core.Keyword)){
return emotion.util.string__GT_camel_case(cljs.core.name(value));
} else {
return value;
}
});
/**
 * Convert keys of map to camel case version.
 */
emotion.util.map__GT_camel_map = (function emotion$util$map__GT_camel_map(props){
return cljs.core.reduce_kv((function (p1__20018_SHARP_,p2__20020_SHARP_,p3__20022_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__20018_SHARP_,emotion.util.kwd__GT_camel_case(p2__20020_SHARP_),((cljs.core.map_QMARK_(p3__20022_SHARP_))?(emotion.util.map__GT_camel_map.cljs$core$IFn$_invoke$arity$1 ? emotion.util.map__GT_camel_map.cljs$core$IFn$_invoke$arity$1(p3__20022_SHARP_) : emotion.util.map__GT_camel_map.call(null,p3__20022_SHARP_)):p3__20022_SHARP_));
}),cljs.core.PersistentArrayMap.EMPTY,props);
});

//# sourceMappingURL=emotion.util.js.map
