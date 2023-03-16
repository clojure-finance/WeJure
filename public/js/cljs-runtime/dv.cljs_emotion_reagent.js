goog.provide('dv.cljs_emotion_reagent');
goog.require('cljs.core');
var module$node_modules$react$index=shadow.js.require("module$node_modules$react$index", {});
var module$node_modules$$emotion$hash$dist$hash_browser_cjs=shadow.js.require("module$node_modules$$emotion$hash$dist$hash_browser_cjs", {});
var module$node_modules$$emotion$styled$dist$emotion_styled_browser_cjs=shadow.js.require("module$node_modules$$emotion$styled$dist$emotion_styled_browser_cjs", {});
var module$node_modules$$emotion$react$dist$emotion_react_browser_cjs=shadow.js.require("module$node_modules$$emotion$react$dist$emotion_react_browser_cjs", {});
goog.require('borkdude.dynaload');
goog.require('goog.object');
goog.require('camel_snake_kebab.core');
goog.require('clojure.walk');
goog.require('clojure.string');
goog.require('com.fulcrologic.guardrails.core');
dv.cljs_emotion_reagent.r_as_element = (new borkdude.dynaload.LazyVar((function (){
if((typeof reagent !== 'undefined') && (typeof reagent.core !== 'undefined') && (typeof reagent.core.as_element !== 'undefined')){
return reagent.core.as_element;
} else {
var temp__5718__auto__ = cljs.core.find(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"default","default",-1987822328));
if(cljs.core.truth_(temp__5718__auto__)){
var e__19981__auto__ = temp__5718__auto__;
return cljs.core.val(e__19981__auto__);
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("reagent.core","as-element","reagent.core/as-element",-1369748434,null))," does not exist, ",cljs.core.namespace(new cljs.core.Symbol("reagent.core","as-element","reagent.core/as-element",-1369748434,null))," never required"].join('')));
}
}
}),null));
dv.cljs_emotion_reagent.r_convert_prop_value = (new borkdude.dynaload.LazyVar((function (){
if((typeof reagent !== 'undefined') && (typeof reagent.impl !== 'undefined') && (typeof reagent.impl.template !== 'undefined') && (typeof reagent.impl.template.convert_prop_value !== 'undefined')){
return reagent.impl.template.convert_prop_value;
} else {
var temp__5718__auto__ = cljs.core.find(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"default","default",-1987822328));
if(cljs.core.truth_(temp__5718__auto__)){
var e__19981__auto__ = temp__5718__auto__;
return cljs.core.val(e__19981__auto__);
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("reagent.impl.template","convert-prop-value","reagent.impl.template/convert-prop-value",-1656332442,null))," does not exist, ",cljs.core.namespace(new cljs.core.Symbol("reagent.impl.template","convert-prop-value","reagent.impl.template/convert-prop-value",-1656332442,null))," never required"].join('')));
}
}
}),null));
dv.cljs_emotion_reagent.r_class_names = (new borkdude.dynaload.LazyVar((function (){
if((typeof reagent !== 'undefined') && (typeof reagent.impl !== 'undefined') && (typeof reagent.impl.util !== 'undefined') && (typeof reagent.impl.util.class_names !== 'undefined')){
return reagent.impl.util.class_names;
} else {
var temp__5718__auto__ = cljs.core.find(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"default","default",-1987822328));
if(cljs.core.truth_(temp__5718__auto__)){
var e__19981__auto__ = temp__5718__auto__;
return cljs.core.val(e__19981__auto__);
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("reagent.impl.util","class-names","reagent.impl.util/class-names",714492372,null))," does not exist, ",cljs.core.namespace(new cljs.core.Symbol("reagent.impl.util","class-names","reagent.impl.util/class-names",714492372,null))," never required"].join('')));
}
}
}),null));
dv.cljs_emotion_reagent.emotion_hash = goog.object.get(module$node_modules$$emotion$hash$dist$hash_browser_cjs,"default");
dv.cljs_emotion_reagent.styled = goog.object.get(module$node_modules$$emotion$styled$dist$emotion_styled_browser_cjs,"default");
dv.cljs_emotion_reagent.jsx = module$node_modules$$emotion$react$dist$emotion_react_browser_cjs.jsx;
dv.cljs_emotion_reagent.obj_set = (function dv$cljs_emotion_reagent$obj_set(o,k,v){
return goog.object.set(o,k,v);
});
dv.cljs_emotion_reagent.obj_get = (function dv$cljs_emotion_reagent$obj_get(o,k){
return goog.object.get(o,k);
});
/**
 * Is it a reagent vector? (or a best effort guess at least.)
 */
dv.cljs_emotion_reagent.relement_QMARK_ = (function dv$cljs_emotion_reagent$relement_QMARK_(el){
var and__4120__auto__ = cljs.core.vector_QMARK_(el);
if(and__4120__auto__){
var item = cljs.core.first(el);
return (((item instanceof cljs.core.Keyword)) || ((item instanceof cljs.core.Symbol)) || (cljs.core.fn_QMARK_(item)));
} else {
return and__4120__auto__;
}
});
/**
 * Utility function that will force a lazy sequence of children (recursively) into realized
 *   vectors (React cannot deal with lazy seqs in production mode)
 */
dv.cljs_emotion_reagent.force_children = (function dv$cljs_emotion_reagent$force_children(x){
if(cljs.core.seq_QMARK_(x)){
return cljs.core.to_array(cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(dv.cljs_emotion_reagent.force_children,x));
} else {
if(dv.cljs_emotion_reagent.relement_QMARK_(x)){
var fexpr__21515 = cljs.core.deref(dv.cljs_emotion_reagent.r_as_element);
return (fexpr__21515.cljs$core$IFn$_invoke$arity$1 ? fexpr__21515.cljs$core$IFn$_invoke$arity$1(x) : fexpr__21515.call(null,x));
} else {
return x;
}
}
});
dv.cljs_emotion_reagent.kebab__GT_camel = (function dv$cljs_emotion_reagent$kebab__GT_camel(prop){
if(clojure.string.starts_with_QMARK_(prop,".")){
return prop;
} else {
if(clojure.string.includes_QMARK_(prop,"-")){
var words = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(clojure.string.capitalize,cljs.core.re_seq(/[a-zA-Z]+/,prop));
return clojure.string.join.cljs$core$IFn$_invoke$arity$1(cljs.core.update.cljs$core$IFn$_invoke$arity$3(words,(0),clojure.string.lower_case));
} else {
return prop;
}
}
});
/**
 * Takes a clj map and returns that map modified.
 *   Postwalk replaces kebab keywords with camel case version as is expected by React.
 * 
 *   Also replaces styled components with their CSS classname when they appear in key position.
 */
dv.cljs_emotion_reagent.camelize_keys = (function dv$cljs_emotion_reagent$camelize_keys(style_map){
return clojure.walk.postwalk((function (v){
if((v instanceof cljs.core.Keyword)){
return dv.cljs_emotion_reagent.kebab__GT_camel(cljs.core.name(v));
} else {
if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.core.meta(v);
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core.contains_QMARK_(cljs.core.meta(v),new cljs.core.Keyword("dv.cljs-emotion-reagent","hashed-name","dv.cljs-emotion-reagent/hashed-name",-314507080));
} else {
return and__4120__auto__;
}
})())){
return [".",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("dv.cljs-emotion-reagent","hashed-name","dv.cljs-emotion-reagent/hashed-name",-314507080).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(v)))].join('');
} else {
return v;

}
}
}),style_map);
});
dv.cljs_emotion_reagent.keyframes = (function dv$cljs_emotion_reagent$keyframes(anim_map){
var G__21516 = cljs.core.clj__GT_js(dv.cljs_emotion_reagent.camelize_keys(anim_map));
return module$node_modules$$emotion$react$dist$emotion_react_browser_cjs.keyframes(G__21516);
});
dv.cljs_emotion_reagent.cljs_props_key = "dv.cljs-emotion/props";

/** @define {string} */
goog.define("dv.cljs_emotion_reagent.ADD_CLASSNAMES","INITIAL");
dv.cljs_emotion_reagent.add_class_names_QMARK_ = (function dv$cljs_emotion_reagent$add_class_names_QMARK_(){
if(cljs.core.boolean_QMARK_(dv.cljs_emotion_reagent.ADD_CLASSNAMES)){
return dv.cljs_emotion_reagent.ADD_CLASSNAMES;
} else {
return goog.DEBUG;
}
});
dv.cljs_emotion_reagent.add_class_name = (function dv$cljs_emotion_reagent$add_class_name(props,class_name){
if(cljs.core.object_QMARK_(props)){
var G__21521 = props;
dv.cljs_emotion_reagent.obj_set(G__21521,"className",clojure.string.trim(clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [class_name,dv.cljs_emotion_reagent.obj_get(props,"className")], null))));

return G__21521;
} else {
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(props,new cljs.core.Keyword(null,"className","className",-1983287057),(function (p1__21520_SHARP_){
if((p1__21520_SHARP_ == null)){
return class_name;
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(class_name)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__21520_SHARP_)].join('');
}
}));
}
});
dv.cljs_emotion_reagent.hashit = (function dv$cljs_emotion_reagent$hashit(string){
return ["dvcss-",cljs.core.str.cljs$core$IFn$_invoke$arity$1((dv.cljs_emotion_reagent.emotion_hash.cljs$core$IFn$_invoke$arity$1 ? dv.cljs_emotion_reagent.emotion_hash.cljs$core$IFn$_invoke$arity$1(string) : dv.cljs_emotion_reagent.emotion_hash.call(null,string)))].join('');
});
dv.cljs_emotion_reagent.set_class_name = (function dv$cljs_emotion_reagent$set_class_name(props,class_name){
if(cljs.core.truth_(class_name)){
var hashed_name = dv.cljs_emotion_reagent.hashit(class_name);
var props__$1 = dv.cljs_emotion_reagent.add_class_name(props,hashed_name);
if(cljs.core.truth_(dv.cljs_emotion_reagent.add_class_names_QMARK_())){
return dv.cljs_emotion_reagent.add_class_name(props__$1,class_name);
} else {
return props__$1;
}
} else {
return props;
}
});
dv.cljs_emotion_reagent.map__GT_obj = (function dv$cljs_emotion_reagent$map__GT_obj(m){
return cljs.core.reduce_kv((function (o,k,v){
var new_k = (function (){var G__21522 = k;
if((((!((k == null))))?(((((k.cljs$lang$protocol_mask$partition1$ & (4096))) || ((cljs.core.PROTOCOL_SENTINEL === k.cljs$core$INamed$))))?true:false):false)){
return cljs.core.name(G__21522);
} else {
return G__21522;
}
})();
var new_v = (function (){var G__21524 = v;
if(cljs.core.map_QMARK_(v)){
return (dv.cljs_emotion_reagent.map__GT_obj.cljs$core$IFn$_invoke$arity$1 ? dv.cljs_emotion_reagent.map__GT_obj.cljs$core$IFn$_invoke$arity$1(G__21524) : dv.cljs_emotion_reagent.map__GT_obj.call(null,G__21524));
} else {
return G__21524;
}
})();
var G__21525 = o;
dv.cljs_emotion_reagent.obj_set(G__21525,new_k,new_v);

return G__21525;
}),({}),m);
});
/**
 * Allows using kebab-case prop names.
 */
dv.cljs_emotion_reagent.make_js_props = (function dv$cljs_emotion_reagent$make_js_props(props,class_name){
if(cljs.core.object_QMARK_(props)){
return props;
} else {
var clss = new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(props);
var props__$1 = (function (){var G__21526 = props;
if(cljs.core.truth_(clss)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__21526,new cljs.core.Keyword(null,"class","class",-2030961996),(function (){var fexpr__21527 = cljs.core.deref(dv.cljs_emotion_reagent.r_class_names);
return (fexpr__21527.cljs$core$IFn$_invoke$arity$1 ? fexpr__21527.cljs$core$IFn$_invoke$arity$1(clss) : fexpr__21527.call(null,clss));
})());
} else {
return G__21526;
}
})();
var clj_props = dv.cljs_emotion_reagent.set_class_name(props__$1,class_name);
var js_props = (function (){var fexpr__21528 = cljs.core.deref(dv.cljs_emotion_reagent.r_convert_prop_value);
return (fexpr__21528.cljs$core$IFn$_invoke$arity$1 ? fexpr__21528.cljs$core$IFn$_invoke$arity$1(props__$1) : fexpr__21528.call(null,props__$1));
})();
var js_props__$1 = dv.cljs_emotion_reagent.set_class_name(js_props,class_name);
var G__21529 = js_props__$1;
dv.cljs_emotion_reagent.obj_set(G__21529,dv.cljs_emotion_reagent.cljs_props_key,clj_props);

return G__21529;
}
});
dv.cljs_emotion_reagent.react_factory = (function dv$cljs_emotion_reagent$react_factory(el,class_name){
return (function() {
var G__21554 = null;
var G__21554__0 = (function (){
var G__21530 = el;
var G__21531 = cljs.core.clj__GT_js(dv.cljs_emotion_reagent.set_class_name(cljs.core.PersistentArrayMap.EMPTY,class_name));
return module$node_modules$react$index.createElement(G__21530,G__21531);
});
var G__21554__1 = (function (props){
try{if(cljs.core.truth_((function (){var or__4131__auto__ = module$node_modules$react$index.isValidElement(props);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return typeof props === 'string';
}
})())){
var G__21533 = el;
var G__21534 = dv.cljs_emotion_reagent.set_class_name(({}),class_name);
var G__21535 = props;
return module$node_modules$react$index.createElement(G__21533,G__21534,G__21535);
} else {
if(cljs.core.map_QMARK_(props)){
var props__$1 = dv.cljs_emotion_reagent.make_js_props(props,class_name);
return module$node_modules$react$index.createElement(el,props__$1);
} else {
if(cljs.core.object_QMARK_(props)){
var G__21536 = el;
var G__21537 = dv.cljs_emotion_reagent.set_class_name(props,class_name);
return module$node_modules$react$index.createElement(G__21536,G__21537);
} else {
if(dv.cljs_emotion_reagent.relement_QMARK_(props)){
var G__21538 = el;
var G__21539 = dv.cljs_emotion_reagent.set_class_name(({}),class_name);
var G__21540 = (function (){var fexpr__21541 = cljs.core.deref(dv.cljs_emotion_reagent.r_as_element);
return (fexpr__21541.cljs$core$IFn$_invoke$arity$1 ? fexpr__21541.cljs$core$IFn$_invoke$arity$1(props) : fexpr__21541.call(null,props));
})();
return module$node_modules$react$index.createElement(G__21538,G__21539,G__21540);
} else {
if(cljs.core.seq_QMARK_(props)){
var G__21542 = el;
var G__21543 = dv.cljs_emotion_reagent.set_class_name(({}),class_name);
var G__21544 = dv.cljs_emotion_reagent.force_children(props);
return module$node_modules$react$index.createElement(G__21542,G__21543,G__21544);
} else {
if(cljs.core.array_QMARK_(props)){
var G__21545 = el;
var G__21546 = dv.cljs_emotion_reagent.set_class_name(({}),class_name);
var G__21547 = props;
return module$node_modules$react$index.createElement(G__21545,G__21546,G__21547);
} else {
var G__21548 = el;
var G__21549 = dv.cljs_emotion_reagent.set_class_name(({}),class_name);
return module$node_modules$react$index.createElement(G__21548,G__21549);

}
}
}
}
}
}
}catch (e21532){if((e21532 instanceof Object)){
var e = e21532;
return console.error("Error invoking an emotion styled component: ",e);
} else {
throw e21532;

}
}});
var G__21554__2 = (function() { 
var G__21555__delegate = function (props,children){
if(((((cljs.core.object_QMARK_(props)) && (cljs.core.not(module$node_modules$react$index.isValidElement(props))))) || (cljs.core.map_QMARK_(props)))){
var js_props = dv.cljs_emotion_reagent.make_js_props(props,class_name);
if(cljs.core.seq(children)){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$4(module$node_modules$react$index.createElement,el,js_props,dv.cljs_emotion_reagent.force_children(children));
} else {
return module$node_modules$react$index.createElement(el,js_props);
}
} else {
return cljs.core.apply.cljs$core$IFn$_invoke$arity$4(module$node_modules$react$index.createElement,el,dv.cljs_emotion_reagent.set_class_name(({}),class_name),dv.cljs_emotion_reagent.force_children(cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$2(props,children)));
}
};
var G__21555 = function (props,var_args){
var children = null;
if (arguments.length > 1) {
var G__21556__i = 0, G__21556__a = new Array(arguments.length -  1);
while (G__21556__i < G__21556__a.length) {G__21556__a[G__21556__i] = arguments[G__21556__i + 1]; ++G__21556__i;}
  children = new cljs.core.IndexedSeq(G__21556__a,0,null);
} 
return G__21555__delegate.call(this,props,children);};
G__21555.cljs$lang$maxFixedArity = 1;
G__21555.cljs$lang$applyTo = (function (arglist__21557){
var props = cljs.core.first(arglist__21557);
var children = cljs.core.rest(arglist__21557);
return G__21555__delegate(props,children);
});
G__21555.cljs$core$IFn$_invoke$arity$variadic = G__21555__delegate;
return G__21555;
})()
;
G__21554 = function(props,var_args){
var children = var_args;
switch(arguments.length){
case 0:
return G__21554__0.call(this);
case 1:
return G__21554__1.call(this,props);
default:
var G__21558 = null;
if (arguments.length > 1) {
var G__21559__i = 0, G__21559__a = new Array(arguments.length -  1);
while (G__21559__i < G__21559__a.length) {G__21559__a[G__21559__i] = arguments[G__21559__i + 1]; ++G__21559__i;}
G__21558 = new cljs.core.IndexedSeq(G__21559__a,0,null);
}
return G__21554__2.cljs$core$IFn$_invoke$arity$variadic(props, G__21558);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__21554.cljs$lang$maxFixedArity = 1;
G__21554.cljs$lang$applyTo = G__21554__2.cljs$lang$applyTo;
G__21554.cljs$core$IFn$_invoke$arity$0 = G__21554__0;
G__21554.cljs$core$IFn$_invoke$arity$1 = G__21554__1;
G__21554.cljs$core$IFn$_invoke$arity$variadic = G__21554__2.cljs$core$IFn$_invoke$arity$variadic;
return G__21554;
})()
});
dv.cljs_emotion_reagent.global_STAR_ = dv.cljs_emotion_reagent.react_factory(module$node_modules$$emotion$react$dist$emotion_react_browser_cjs.Global,null);
dv.cljs_emotion_reagent.global_style = (function dv$cljs_emotion_reagent$global_style(props){
var G__21551 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"styles","styles",1954480375),dv.cljs_emotion_reagent.camelize_keys(props)], null);
return (dv.cljs_emotion_reagent.global_STAR_.cljs$core$IFn$_invoke$arity$1 ? dv.cljs_emotion_reagent.global_STAR_.cljs$core$IFn$_invoke$arity$1(G__21551) : dv.cljs_emotion_reagent.global_STAR_.call(null,G__21551));
});
dv.cljs_emotion_reagent.theme_provider = (function dv$cljs_emotion_reagent$theme_provider(var_args){
var args__4736__auto__ = [];
var len__4730__auto___21560 = arguments.length;
var i__4731__auto___21561 = (0);
while(true){
if((i__4731__auto___21561 < len__4730__auto___21560)){
args__4736__auto__.push((arguments[i__4731__auto___21561]));

var G__21562 = (i__4731__auto___21561 + (1));
i__4731__auto___21561 = G__21562;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((1) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((1)),(0),null)):null);
return dv.cljs_emotion_reagent.theme_provider.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4737__auto__);
});

dv.cljs_emotion_reagent.theme_provider.cljs$core$IFn$_invoke$arity$variadic = (function (props,children){
if(cljs.core.contains_QMARK_(props,new cljs.core.Keyword(null,"theme","theme",-1247880880))){
} else {
throw (new Error("You must pass a :theme to the theme-provider."));
}

return cljs.core.apply.cljs$core$IFn$_invoke$arity$4(module$node_modules$react$index.createElement,module$node_modules$$emotion$react$dist$emotion_react_browser_cjs.ThemeProvider,cljs.core.clj__GT_js(props),dv.cljs_emotion_reagent.force_children(children));
});

dv.cljs_emotion_reagent.theme_provider.cljs$lang$maxFixedArity = (1);

/** @this {Function} */
dv.cljs_emotion_reagent.theme_provider.cljs$lang$applyTo = (function (seq21552){
var G__21553 = cljs.core.first(seq21552);
var seq21552__$1 = cljs.core.next(seq21552);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21553,seq21552__$1);
});


//# sourceMappingURL=dv.cljs_emotion_reagent.js.map
