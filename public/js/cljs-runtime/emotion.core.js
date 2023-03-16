goog.provide('emotion.core');
goog.require('cljs.core');
goog.require('cljs_bean.core');
var module$node_modules$react$index=shadow.js.require("module$node_modules$react$index", {});
var module$node_modules$$emotion$react$dist$emotion_react_browser_cjs=shadow.js.require("module$node_modules$$emotion$react$dist$emotion_react_browser_cjs", {});
var module$node_modules$$emotion$styled$dist$emotion_styled_browser_cjs=shadow.js.require("module$node_modules$$emotion$styled$dist$emotion_styled_browser_cjs", {});
var module$node_modules$$emotion$is_prop_valid$dist$emotion_is_prop_valid_browser_cjs=shadow.js.require("module$node_modules$$emotion$is_prop_valid$dist$emotion_is_prop_valid_browser_cjs", {});
goog.require('emotion.props');
goog.require('emotion.util');
emotion.core.create_element = module$node_modules$react$index.createElement;
emotion.core.forward_ref = module$node_modules$react$index.forwardRef;
emotion.core.styled_component = module$node_modules$$emotion$styled$dist$emotion_styled_browser_cjs.default;
emotion.core.prop_valid_QMARK_ = module$node_modules$$emotion$is_prop_valid$dist$emotion_is_prop_valid_browser_cjs.default;
emotion.core.valid_class_props = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, ["class",null,"className",null,"class-name",null], null), null);
emotion.core.emotion_class_prop = "className";
emotion.core.default_class_prop = "class-name";
/**
 * Simple check that component which we need to styled is a simple html tag.
 */
emotion.core.html_tag_QMARK_ = (function emotion$core$html_tag_QMARK_(component){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.type(component),String);
});
/**
 * Check that component is emotion component.
 */
emotion.core.emotion_QMARK_ = (function emotion$core$emotion_QMARK_(component){
return (!((component.__emotion_base == null)));
});
/**
 * Convert keys of js object to camel case react props.
 */
emotion.core.object__GT_camel_props = (function emotion$core$object__GT_camel_props(props){
return Object.keys(props).reduce((function (acc,prop_name){
var new_prop_name_20363 = (cljs.core.truth_((emotion.core.valid_class_props.cljs$core$IFn$_invoke$arity$1 ? emotion.core.valid_class_props.cljs$core$IFn$_invoke$arity$1(prop_name) : emotion.core.valid_class_props.call(null,prop_name)))?emotion.core.emotion_class_prop:(cljs.core.truth_(emotion.props.camel_props.includes(prop_name))?emotion.util.string__GT_camel_case(prop_name):prop_name
));
if(cljs.core.truth_((emotion.core.prop_valid_QMARK_.cljs$core$IFn$_invoke$arity$1 ? emotion.core.prop_valid_QMARK_.cljs$core$IFn$_invoke$arity$1(new_prop_name_20363) : emotion.core.prop_valid_QMARK_.call(null,new_prop_name_20363)))){
var prop_value_20364 = (props[prop_name]);
var prop_value_20365__$1 = ((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new_prop_name_20363,emotion.core.emotion_class_prop)) && ((!(((acc[emotion.core.emotion_class_prop]) == null))))))?[cljs.core.str.cljs$core$IFn$_invoke$arity$1((acc[emotion.core.emotion_class_prop]))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop_value_20364)].join(''):prop_value_20364);
(acc[new_prop_name_20363] = prop_value_20365__$1);
} else {
}

return acc;
}),({}));
});
/**
 * Create React component wrapped with React.forwardRef
 */
emotion.core.create_forwarded_element = (function emotion$core$create_forwarded_element(var_args){
var G__20344 = arguments.length;
switch (G__20344) {
case 2:
return emotion.core.create_forwarded_element.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return emotion.core.create_forwarded_element.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

emotion.core.create_forwarded_element.cljs$core$IFn$_invoke$arity$2 = (function (component,fn_convert){
return emotion.core.create_forwarded_element.cljs$core$IFn$_invoke$arity$3(component,fn_convert,component);
});

emotion.core.create_forwarded_element.cljs$core$IFn$_invoke$arity$3 = (function (component,fn_convert,display_name){
var component_wrapper = (function (p1__20339_SHARP_,p2__20340_SHARP_){
var G__20345 = component;
var G__20346 = Object.assign((fn_convert.cljs$core$IFn$_invoke$arity$1 ? fn_convert.cljs$core$IFn$_invoke$arity$1(p1__20339_SHARP_) : fn_convert.call(null,p1__20339_SHARP_)),({"ref": p2__20340_SHARP_}));
return (emotion.core.create_element.cljs$core$IFn$_invoke$arity$2 ? emotion.core.create_element.cljs$core$IFn$_invoke$arity$2(G__20345,G__20346) : emotion.core.create_element.call(null,G__20345,G__20346));
});
(component_wrapper["displayName"] = display_name);

return (emotion.core.forward_ref.cljs$core$IFn$_invoke$arity$1 ? emotion.core.forward_ref.cljs$core$IFn$_invoke$arity$1(component_wrapper) : emotion.core.forward_ref.call(null,component_wrapper));
});

emotion.core.create_forwarded_element.cljs$lang$maxFixedArity = 3;

/**
 * Convert component properties with `className` or `class` which
 *   will converted to `class-name` kebab-case style.
 */
emotion.core.convert_class_name = (function emotion$core$convert_class_name(var_args){
var G__20348 = arguments.length;
switch (G__20348) {
case 1:
return emotion.core.convert_class_name.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return emotion.core.convert_class_name.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

emotion.core.convert_class_name.cljs$core$IFn$_invoke$arity$1 = (function (props){
return emotion.core.convert_class_name.cljs$core$IFn$_invoke$arity$2(props,emotion.core.default_class_prop);
});

emotion.core.convert_class_name.cljs$core$IFn$_invoke$arity$2 = (function (props,class_name_prop){
return Object.keys(props).reduce((function (acc,prop_name){
if(cljs.core.truth_((emotion.core.valid_class_props.cljs$core$IFn$_invoke$arity$1 ? emotion.core.valid_class_props.cljs$core$IFn$_invoke$arity$1(prop_name) : emotion.core.valid_class_props.call(null,prop_name)))){
(acc[class_name_prop] = (function (){var temp__5718__auto__ = (acc[class_name_prop]);
if(cljs.core.truth_(temp__5718__auto__)){
var current_class_name = temp__5718__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(current_class_name)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((props[prop_name]))].join('');
} else {
return (props[prop_name]);
}
})());
} else {
(acc[prop_name] = (props[prop_name]));
}

return acc;
}),({}));
});

emotion.core.convert_class_name.cljs$lang$maxFixedArity = 2;

/**
 * Create styled component.
 */
emotion.core.create_styled = (function emotion$core$create_styled(display_name,component,options,styles){
var wrap = cljs.core.get.cljs$core$IFn$_invoke$arity$2(options,"wrap");
var camel_casing_props_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(options,"camelCasingProps?",true);
var class_name_prop = cljs.core.name(cljs.core.get.cljs$core$IFn$_invoke$arity$3(options,"classNameProp",emotion.core.default_class_prop));
var wrapper_component = ((cljs.core.not(camel_casing_props_QMARK_))?component:((emotion.core.emotion_QMARK_(component))?component:((emotion.core.html_tag_QMARK_(component))?emotion.core.create_forwarded_element.cljs$core$IFn$_invoke$arity$2(component,emotion.core.object__GT_camel_props):((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(class_name_prop,emotion.core.emotion_class_prop))?component:emotion.core.create_forwarded_element.cljs$core$IFn$_invoke$arity$2(component,((function (wrap,camel_casing_props_QMARK_,class_name_prop){
return (function (p1__20350_SHARP_){
return emotion.core.convert_class_name.cljs$core$IFn$_invoke$arity$2(p1__20350_SHARP_,class_name_prop);
});})(wrap,camel_casing_props_QMARK_,class_name_prop))
)
))));
(wrapper_component["displayName"] = display_name);

var result = (function (){var G__20354 = ((function (wrap,camel_casing_props_QMARK_,class_name_prop,wrapper_component){
return (function (props){
return cljs_bean.core.__GT_js(styles).concat(props.css);
});})(wrap,camel_casing_props_QMARK_,class_name_prop,wrapper_component))
;
var fexpr__20353 = (function (){var G__20355 = wrapper_component;
var G__20356 = cljs_bean.core.__GT_js(options);
return (emotion.core.styled_component.cljs$core$IFn$_invoke$arity$2 ? emotion.core.styled_component.cljs$core$IFn$_invoke$arity$2(G__20355,G__20356) : emotion.core.styled_component.call(null,G__20355,G__20356));
})();
return (fexpr__20353.cljs$core$IFn$_invoke$arity$1 ? fexpr__20353.cljs$core$IFn$_invoke$arity$1(G__20354) : fexpr__20353.call(null,G__20354));
})();
if(cljs.core.truth_(wrap)){
return (wrap.cljs$core$IFn$_invoke$arity$1 ? wrap.cljs$core$IFn$_invoke$arity$1(result) : wrap.call(null,result));
} else {
return result;
}
});
/**
 * Create Emotion css.
 */
emotion.core.create_css = (function emotion$core$create_css(styles){
var G__20357 = cljs_bean.core.__GT_js(styles);
return module$node_modules$$emotion$react$dist$emotion_react_browser_cjs.css(G__20357);
});
emotion.core.keyframes = module$node_modules$$emotion$react$dist$emotion_react_browser_cjs.keyframes;
/**
 * Change component/tag in styled component with help of `withComponent`.
 */
emotion.core.with_component = (function emotion$core$with_component(var_args){
var G__20359 = arguments.length;
switch (G__20359) {
case 2:
return emotion.core.with_component.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return emotion.core.with_component.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

emotion.core.with_component.cljs$core$IFn$_invoke$arity$2 = (function (styled_component,new_component){
return emotion.core.with_component.cljs$core$IFn$_invoke$arity$3(styled_component,new_component,null);
});

emotion.core.with_component.cljs$core$IFn$_invoke$arity$3 = (function (styled_component,new_component,p__20360){
var map__20361 = p__20360;
var map__20361__$1 = (((((!((map__20361 == null))))?(((((map__20361.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20361.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__20361):map__20361);
var display_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__20361__$1,new cljs.core.Keyword(null,"display-name","display-name",694513143));
var new_component__$1 = emotion.util.convert_component_name(new_component);
var html_tag_QMARK_ = emotion.core.html_tag_QMARK_(new_component__$1);
var component_wrapper = emotion.core.create_forwarded_element.cljs$core$IFn$_invoke$arity$3(new_component__$1,((html_tag_QMARK_)?emotion.core.object__GT_camel_props:emotion.core.convert_class_name),display_name);
if(html_tag_QMARK_){
} else {
(component_wrapper["defaultProps"] = new_component__$1.defaultProps);

(component_wrapper["displayName"] = (function (){var or__4131__auto__ = display_name;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return new_component__$1.displayName;
}
})());
}

return styled_component.withComponent(component_wrapper);
});

emotion.core.with_component.cljs$lang$maxFixedArity = 3;

/**
 * Add global css.
 */
emotion.core.Global = (function emotion$core$Global(props){
return module$node_modules$$emotion$react$dist$emotion_react_browser_cjs.Global.render(({"styles": props.children}));
});
emotion.core.Global.displayName = "GlobalStyled";

//# sourceMappingURL=emotion.core.js.map
