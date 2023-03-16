goog.provide('dv.cljs_emotion');
goog.require('cljs.core');
var module$node_modules$react$index=shadow.js.require("module$node_modules$react$index", {});
var module$node_modules$$emotion$hash$dist$hash_browser_cjs=shadow.js.require("module$node_modules$$emotion$hash$dist$hash_browser_cjs", {});
var module$node_modules$$emotion$styled$dist$emotion_styled_browser_cjs=shadow.js.require("module$node_modules$$emotion$styled$dist$emotion_styled_browser_cjs", {});
var module$node_modules$$emotion$react$dist$emotion_react_browser_cjs=shadow.js.require("module$node_modules$$emotion$react$dist$emotion_react_browser_cjs", {});
goog.require('goog.object');
goog.require('clojure.string');
goog.require('clojure.walk');
goog.require('com.fulcrologic.guardrails.core');
dv.cljs_emotion.emotion_hash = goog.object.get(module$node_modules$$emotion$hash$dist$hash_browser_cjs,"default");
dv.cljs_emotion.styled = goog.object.get(module$node_modules$$emotion$styled$dist$emotion_styled_browser_cjs,"default");
dv.cljs_emotion.jsx = module$node_modules$$emotion$react$dist$emotion_react_browser_cjs.jsx;
dv.cljs_emotion.obj_set = (function dv$cljs_emotion$obj_set(o,k,v){
return goog.object.set(o,k,v);
});
dv.cljs_emotion.obj_get = (function dv$cljs_emotion$obj_get(o,k){
return goog.object.get(o,k);
});
/**
 * Utility function that will force a lazy sequence of children (recursively) into realized
 *   vectors (React cannot deal with lazy seqs in production mode)
 */
dv.cljs_emotion.force_children = (function dv$cljs_emotion$force_children(x){
if(cljs.core.seq_QMARK_(x)){
return cljs.core.to_array(cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(dv.cljs_emotion.force_children,x));
} else {
return x;
}
});
dv.cljs_emotion.kebab__GT_camel = (function dv$cljs_emotion$kebab__GT_camel(prop){
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
 * Also replaces styled components with their css classname is key position.
 */
dv.cljs_emotion.camelize_keys = (function dv$cljs_emotion$camelize_keys(style_map){
return clojure.walk.postwalk((function dv$cljs_emotion$camelize_keys_$_in_walk(v){
if((v instanceof cljs.core.Keyword)){
return dv.cljs_emotion.kebab__GT_camel(cljs.core.name(v));
} else {
if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.core.meta(v);
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core.contains_QMARK_(cljs.core.meta(v),new cljs.core.Keyword("dv.cljs-emotion","hashed-name","dv.cljs-emotion/hashed-name",-795044661));
} else {
return and__4120__auto__;
}
})())){
return [".",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("dv.cljs-emotion","hashed-name","dv.cljs-emotion/hashed-name",-795044661).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(v)))].join('');
} else {
return v;

}
}
}),style_map);
});
dv.cljs_emotion.keyframes = (function dv$cljs_emotion$keyframes(anim_map){
var G__21691 = cljs.core.clj__GT_js(dv.cljs_emotion.camelize_keys(anim_map));
return module$node_modules$$emotion$react$dist$emotion_react_browser_cjs.keyframes(G__21691);
});
dv.cljs_emotion.cljs_props_key = "dv.cljs-emotion/props";

/** @define {string} */
goog.define("dv.cljs_emotion.ADD_CLASSNAMES","INITIAL");
dv.cljs_emotion.add_class_names_QMARK_ = (function dv$cljs_emotion$add_class_names_QMARK_(){
if(cljs.core.boolean_QMARK_(dv.cljs_emotion.ADD_CLASSNAMES)){
return dv.cljs_emotion.ADD_CLASSNAMES;
} else {
return goog.DEBUG;
}
});
dv.cljs_emotion.add_class_name = (function dv$cljs_emotion$add_class_name(props,class_name){
if(cljs.core.object_QMARK_(props)){
var G__21696 = props;
var G__21697_21727 = G__21696;
var G__21698_21728 = "className";
var G__21699_21729 = clojure.string.trim(clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [class_name,goog.object.get(props,"className")], null)));
goog.object.set(G__21697_21727,G__21698_21728,G__21699_21729);

return G__21696;
} else {
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(props,new cljs.core.Keyword(null,"className","className",-1983287057),(function (p1__21695_SHARP_){
if((p1__21695_SHARP_ == null)){
return class_name;
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(class_name)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__21695_SHARP_)].join('');
}
}));
}
});
dv.cljs_emotion.hashit = (function dv$cljs_emotion$hashit(string){
return ["dvcss-",cljs.core.str.cljs$core$IFn$_invoke$arity$1((dv.cljs_emotion.emotion_hash.cljs$core$IFn$_invoke$arity$1 ? dv.cljs_emotion.emotion_hash.cljs$core$IFn$_invoke$arity$1(string) : dv.cljs_emotion.emotion_hash.call(null,string)))].join('');
});
dv.cljs_emotion.set_class_name = (function dv$cljs_emotion$set_class_name(props,class_name){
if(cljs.core.truth_(class_name)){
var hashed_name = dv.cljs_emotion.hashit(class_name);
var props__$1 = dv.cljs_emotion.add_class_name(props,hashed_name);
if(cljs.core.truth_(dv.cljs_emotion.add_class_names_QMARK_())){
return dv.cljs_emotion.add_class_name(props__$1,class_name);
} else {
return props__$1;
}
} else {
return props;
}
});
dv.cljs_emotion.map__GT_obj = (function dv$cljs_emotion$map__GT_obj(m){
return cljs.core.reduce_kv((function (o,k,v){
var new_k = (function (){var G__21700 = k;
if((((!((k == null))))?(((((k.cljs$lang$protocol_mask$partition1$ & (4096))) || ((cljs.core.PROTOCOL_SENTINEL === k.cljs$core$INamed$))))?true:false):false)){
return cljs.core.name(G__21700);
} else {
return G__21700;
}
})();
var new_v = (function (){var G__21702 = v;
if(cljs.core.map_QMARK_(v)){
return (dv.cljs_emotion.map__GT_obj.cljs$core$IFn$_invoke$arity$1 ? dv.cljs_emotion.map__GT_obj.cljs$core$IFn$_invoke$arity$1(G__21702) : dv.cljs_emotion.map__GT_obj.call(null,G__21702));
} else {
return G__21702;
}
})();
var G__21703 = o;
dv.cljs_emotion.obj_set(G__21703,new_k,new_v);

return G__21703;
}),({}),m);
});
dv.cljs_emotion.make_js_props = (function dv$cljs_emotion$make_js_props(props,class_name){
if(cljs.core.object_QMARK_(props)){
return props;
} else {
var clj_props = dv.cljs_emotion.set_class_name(props,class_name);
var js_props = dv.cljs_emotion.map__GT_obj(clj_props);
var G__21704 = js_props;
dv.cljs_emotion.obj_set(G__21704,dv.cljs_emotion.cljs_props_key,clj_props);

return G__21704;
}
});
dv.cljs_emotion.react_factory = (function dv$cljs_emotion$react_factory(el,class_name){
return (function() {
var G__21730 = null;
var G__21730__0 = (function (){
var G__21705 = el;
var G__21706 = cljs.core.clj__GT_js(dv.cljs_emotion.set_class_name(cljs.core.PersistentArrayMap.EMPTY,class_name));
return module$node_modules$react$index.createElement(G__21705,G__21706);
});
var G__21730__1 = (function (props){
try{if(cljs.core.truth_((function (){var or__4131__auto__ = module$node_modules$react$index.isValidElement(props);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return typeof props === 'string';
}
})())){
var G__21708 = el;
var G__21709 = dv.cljs_emotion.set_class_name(({}),class_name);
var G__21710 = props;
return module$node_modules$react$index.createElement(G__21708,G__21709,G__21710);
} else {
if(cljs.core.map_QMARK_(props)){
var G__21711 = el;
var G__21712 = dv.cljs_emotion.make_js_props(props,class_name);
return module$node_modules$react$index.createElement(G__21711,G__21712);
} else {
if(cljs.core.object_QMARK_(props)){
var G__21713 = el;
var G__21714 = dv.cljs_emotion.set_class_name(props,class_name);
return module$node_modules$react$index.createElement(G__21713,G__21714);
} else {
if(((cljs.core.array_QMARK_(props)) || (cljs.core.coll_QMARK_(props)))){
var G__21715 = el;
var G__21716 = dv.cljs_emotion.set_class_name(({}),class_name);
var G__21717 = dv.cljs_emotion.force_children(props);
return module$node_modules$react$index.createElement(G__21715,G__21716,G__21717);
} else {
var G__21718 = el;
var G__21719 = dv.cljs_emotion.set_class_name(({}),class_name);
return module$node_modules$react$index.createElement(G__21718,G__21719);

}
}
}
}
}catch (e21707){if((e21707 instanceof Object)){
var e = e21707;
return console.error("Error invoking an emotion styled component: ",e);
} else {
throw e21707;

}
}});
var G__21730__2 = (function() { 
var G__21731__delegate = function (props,children){
if(((((cljs.core.object_QMARK_(props)) && (cljs.core.not(module$node_modules$react$index.isValidElement(props))))) || (cljs.core.map_QMARK_(props)))){
var js_props = dv.cljs_emotion.make_js_props(props,class_name);
if(cljs.core.seq(children)){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$4(module$node_modules$react$index.createElement,el,js_props,dv.cljs_emotion.force_children(children));
} else {
return module$node_modules$react$index.createElement(el,js_props);
}
} else {
return cljs.core.apply.cljs$core$IFn$_invoke$arity$4(module$node_modules$react$index.createElement,el,dv.cljs_emotion.set_class_name(({}),class_name),dv.cljs_emotion.force_children(cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$2(props,children)));
}
};
var G__21731 = function (props,var_args){
var children = null;
if (arguments.length > 1) {
var G__21732__i = 0, G__21732__a = new Array(arguments.length -  1);
while (G__21732__i < G__21732__a.length) {G__21732__a[G__21732__i] = arguments[G__21732__i + 1]; ++G__21732__i;}
  children = new cljs.core.IndexedSeq(G__21732__a,0,null);
} 
return G__21731__delegate.call(this,props,children);};
G__21731.cljs$lang$maxFixedArity = 1;
G__21731.cljs$lang$applyTo = (function (arglist__21733){
var props = cljs.core.first(arglist__21733);
var children = cljs.core.rest(arglist__21733);
return G__21731__delegate(props,children);
});
G__21731.cljs$core$IFn$_invoke$arity$variadic = G__21731__delegate;
return G__21731;
})()
;
G__21730 = function(props,var_args){
var children = var_args;
switch(arguments.length){
case 0:
return G__21730__0.call(this);
case 1:
return G__21730__1.call(this,props);
default:
var G__21734 = null;
if (arguments.length > 1) {
var G__21735__i = 0, G__21735__a = new Array(arguments.length -  1);
while (G__21735__i < G__21735__a.length) {G__21735__a[G__21735__i] = arguments[G__21735__i + 1]; ++G__21735__i;}
G__21734 = new cljs.core.IndexedSeq(G__21735__a,0,null);
}
return G__21730__2.cljs$core$IFn$_invoke$arity$variadic(props, G__21734);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__21730.cljs$lang$maxFixedArity = 1;
G__21730.cljs$lang$applyTo = G__21730__2.cljs$lang$applyTo;
G__21730.cljs$core$IFn$_invoke$arity$0 = G__21730__0;
G__21730.cljs$core$IFn$_invoke$arity$1 = G__21730__1;
G__21730.cljs$core$IFn$_invoke$arity$variadic = G__21730__2.cljs$core$IFn$_invoke$arity$variadic;
return G__21730;
})()
});
dv.cljs_emotion.global_STAR_ = dv.cljs_emotion.react_factory(module$node_modules$$emotion$react$dist$emotion_react_browser_cjs.Global,null);
dv.cljs_emotion.global_style = (function dv$cljs_emotion$global_style(props){
var G__21721 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"styles","styles",1954480375),dv.cljs_emotion.camelize_keys(props)], null);
return (dv.cljs_emotion.global_STAR_.cljs$core$IFn$_invoke$arity$1 ? dv.cljs_emotion.global_STAR_.cljs$core$IFn$_invoke$arity$1(G__21721) : dv.cljs_emotion.global_STAR_.call(null,G__21721));
});
dv.cljs_emotion.theme_provider = (function dv$cljs_emotion$theme_provider(var_args){
var args__4736__auto__ = [];
var len__4730__auto___21736 = arguments.length;
var i__4731__auto___21737 = (0);
while(true){
if((i__4731__auto___21737 < len__4730__auto___21736)){
args__4736__auto__.push((arguments[i__4731__auto___21737]));

var G__21738 = (i__4731__auto___21737 + (1));
i__4731__auto___21737 = G__21738;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((1) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((1)),(0),null)):null);
return dv.cljs_emotion.theme_provider.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4737__auto__);
});

dv.cljs_emotion.theme_provider.cljs$core$IFn$_invoke$arity$variadic = (function (props,children){
if(cljs.core.contains_QMARK_(props,new cljs.core.Keyword(null,"theme","theme",-1247880880))){
} else {
throw (new Error("You must pass a :theme to the theme-provider."));
}

return cljs.core.apply.cljs$core$IFn$_invoke$arity$4(module$node_modules$react$index.createElement,module$node_modules$$emotion$react$dist$emotion_react_browser_cjs.ThemeProvider,cljs.core.clj__GT_js(props),dv.cljs_emotion.force_children(children));
});

dv.cljs_emotion.theme_provider.cljs$lang$maxFixedArity = (1);

/** @this {Function} */
dv.cljs_emotion.theme_provider.cljs$lang$applyTo = (function (seq21722){
var G__21723 = cljs.core.first(seq21722);
var seq21722__$1 = cljs.core.next(seq21722);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21723,seq21722__$1);
});


//# sourceMappingURL=dv.cljs_emotion.js.map
