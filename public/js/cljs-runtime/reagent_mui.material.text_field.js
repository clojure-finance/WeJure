goog.provide('reagent_mui.material.text_field');
var module$node_modules$react$index=shadow.js.require("module$node_modules$react$index", {});
var module$node_modules$$mui$material$node$TextField$index=shadow.js.require("module$node_modules$$mui$material$node$TextField$index", {});
reagent_mui.material.text_field.input_props = (function reagent_mui$material$text_field$input_props(props,ref){
return reagent_mui.util.remove_undefined_vals(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(reagent_mui.util.js__GT_clj_SINGLEQUOTE_(props),new cljs.core.Keyword(null,"ref","ref",1289896967),ref));
});
reagent_mui.material.text_field.input = module$node_modules$react$index.forwardRef((function reagent_mui$material$text_field$input(props,ref){
return reagent.core.as_element.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),reagent_mui.material.text_field.input_props(props,ref)], null));
}));
reagent_mui.material.text_field.textarea = module$node_modules$react$index.forwardRef((function reagent_mui$material$text_field$textarea(props,ref){
return reagent.core.as_element.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"textarea","textarea",-650375824),reagent_mui.material.text_field.input_props(props,ref)], null));
}));
reagent_mui.material.text_field.mui_text_field = reagent_mui.util.adapt_react_class.cljs$core$IFn$_invoke$arity$2(module$node_modules$$mui$material$node$TextField$index.default,"mui-text-field");
reagent_mui.material.text_field.text_field = (function reagent_mui$material$text_field$text_field(var_args){
var args__5775__auto__ = [];
var len__5769__auto___12178 = arguments.length;
var i__5770__auto___12179 = (0);
while(true){
if((i__5770__auto___12179 < len__5769__auto___12178)){
args__5775__auto__.push((arguments[i__5770__auto___12179]));

var G__12180 = (i__5770__auto___12179 + (1));
i__5770__auto___12179 = G__12180;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return reagent_mui.material.text_field.text_field.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(reagent_mui.material.text_field.text_field.cljs$core$IFn$_invoke$arity$variadic = (function (props,children){
var min_rows = reagent_mui.util.get_anycase.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"min-rows","min-rows",1428640765));
var max_rows = reagent_mui.util.get_anycase.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"max-rows","max-rows",-2131113613));
var autosize_QMARK_ = (function (){var and__5043__auto__ = new cljs.core.Keyword(null,"multiline","multiline",-1084693234).cljs$core$IFn$_invoke$arity$1(props);
if(cljs.core.truth_(and__5043__auto__)){
return cljs.core.not(new cljs.core.Keyword(null,"rows","rows",850049680).cljs$core$IFn$_invoke$arity$1(props));
} else {
return and__5043__auto__;
}
})();
var input_component = (function (){var or__5045__auto__ = reagent_mui.util.get_anycase.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"InputProps","InputProps",-1485068760).cljs$core$IFn$_invoke$arity$1(props),new cljs.core.Keyword(null,"input-component","input-component",-745892912));
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
if(cljs.core.truth_(autosize_QMARK_)){
return reagent_mui.material.textarea_autosize.react_textarea_autosize;
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"multiline","multiline",-1084693234).cljs$core$IFn$_invoke$arity$1(props))){
return reagent_mui.material.text_field.textarea;
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"select","select",1147833503).cljs$core$IFn$_invoke$arity$1(props))){
return null;
} else {
return reagent_mui.material.text_field.input;

}
}
}
}
})();
var props__$1 = (function (){var G__12177 = props;
var G__12177__$1 = (cljs.core.truth_(input_component)?cljs.core.update.cljs$core$IFn$_invoke$arity$3(G__12177,new cljs.core.Keyword(null,"InputProps","InputProps",-1485068760),(function (p1__12174_SHARP_){
return reagent_mui.util.assoc_anycase.cljs$core$IFn$_invoke$arity$3(p1__12174_SHARP_,new cljs.core.Keyword(null,"input-component","input-component",-745892912),input_component);
})):G__12177);
if(cljs.core.truth_(autosize_QMARK_)){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(G__12177__$1,new cljs.core.Keyword(null,"input-props","input-props",-1504868202),cljs.core.merge,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"max-rows","max-rows",-2131113613),max_rows,new cljs.core.Keyword(null,"min-rows","min-rows",1428640765),min_rows], null));
} else {
return G__12177__$1;
}
})();
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.text_field.mui_text_field,props__$1], null),children);
}));

(reagent_mui.material.text_field.text_field.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(reagent_mui.material.text_field.text_field.cljs$lang$applyTo = (function (seq12175){
var G__12176 = cljs.core.first(seq12175);
var seq12175__$1 = cljs.core.next(seq12175);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__12176,seq12175__$1);
}));


//# sourceMappingURL=reagent_mui.material.text_field.js.map
