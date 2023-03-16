goog.provide('shadow.dom');
shadow.dom.transition_supported_QMARK_ = (((typeof window !== 'undefined'))?goog.style.transition.isSupported():null);

/**
 * @interface
 */
shadow.dom.IElement = function(){};

var shadow$dom$IElement$_to_dom$dyn_18465 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.dom._to_dom[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.dom._to_dom["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IElement.-to-dom",this$);
}
}
});
shadow.dom._to_dom = (function shadow$dom$_to_dom(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$IElement$_to_dom$arity$1 == null)))))){
return this$.shadow$dom$IElement$_to_dom$arity$1(this$);
} else {
return shadow$dom$IElement$_to_dom$dyn_18465(this$);
}
});


/**
 * @interface
 */
shadow.dom.SVGElement = function(){};

var shadow$dom$SVGElement$_to_svg$dyn_18466 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.dom._to_svg[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.dom._to_svg["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("SVGElement.-to-svg",this$);
}
}
});
shadow.dom._to_svg = (function shadow$dom$_to_svg(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$SVGElement$_to_svg$arity$1 == null)))))){
return this$.shadow$dom$SVGElement$_to_svg$arity$1(this$);
} else {
return shadow$dom$SVGElement$_to_svg$dyn_18466(this$);
}
});

shadow.dom.lazy_native_coll_seq = (function shadow$dom$lazy_native_coll_seq(coll,idx){
if((idx < coll.length)){
return (new cljs.core.LazySeq(null,(function (){
return cljs.core.cons((coll[idx]),(function (){var G__16759 = coll;
var G__16760 = (idx + (1));
return (shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2 ? shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2(G__16759,G__16760) : shadow.dom.lazy_native_coll_seq.call(null,G__16759,G__16760));
})());
}),null,null));
} else {
return null;
}
});

/**
* @constructor
 * @implements {cljs.core.IIndexed}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IDeref}
 * @implements {shadow.dom.IElement}
*/
shadow.dom.NativeColl = (function (coll){
this.coll = coll;
this.cljs$lang$protocol_mask$partition0$ = 8421394;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.dom.NativeColl.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (this$,n){
var self__ = this;
var this$__$1 = this;
return (self__.coll[n]);
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (this$,n,not_found){
var self__ = this;
var this$__$1 = this;
var or__5045__auto__ = (self__.coll[n]);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return not_found;
}
}));

(shadow.dom.NativeColl.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll.length;
}));

(shadow.dom.NativeColl.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return shadow.dom.lazy_native_coll_seq(self__.coll,(0));
}));

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"coll","coll",-1006698606,null)], null);
}));

(shadow.dom.NativeColl.cljs$lang$type = true);

(shadow.dom.NativeColl.cljs$lang$ctorStr = "shadow.dom/NativeColl");

(shadow.dom.NativeColl.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.dom/NativeColl");
}));

/**
 * Positional factory function for shadow.dom/NativeColl.
 */
shadow.dom.__GT_NativeColl = (function shadow$dom$__GT_NativeColl(coll){
return (new shadow.dom.NativeColl(coll));
});

shadow.dom.native_coll = (function shadow$dom$native_coll(coll){
return (new shadow.dom.NativeColl(coll));
});
shadow.dom.dom_node = (function shadow$dom$dom_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$IElement$))))?true:false):false)){
return el.shadow$dom$IElement$_to_dom$arity$1(null);
} else {
if(typeof el === 'string'){
return document.createTextNode(el);
} else {
if(typeof el === 'number'){
return document.createTextNode(cljs.core.str.cljs$core$IFn$_invoke$arity$1(el));
} else {
return el;

}
}
}
}
});
shadow.dom.query_one = (function shadow$dom$query_one(var_args){
var G__16816 = arguments.length;
switch (G__16816) {
case 1:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return document.querySelector(sel);
}));

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return shadow.dom.dom_node(root).querySelector(sel);
}));

(shadow.dom.query_one.cljs$lang$maxFixedArity = 2);

shadow.dom.query = (function shadow$dom$query(var_args){
var G__16839 = arguments.length;
switch (G__16839) {
case 1:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return (new shadow.dom.NativeColl(document.querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(root).querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$lang$maxFixedArity = 2);

shadow.dom.by_id = (function shadow$dom$by_id(var_args){
var G__16856 = arguments.length;
switch (G__16856) {
case 2:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2 = (function (id,el){
return shadow.dom.dom_node(el).getElementById(id);
}));

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1 = (function (id){
return document.getElementById(id);
}));

(shadow.dom.by_id.cljs$lang$maxFixedArity = 2);

shadow.dom.build = shadow.dom.dom_node;
shadow.dom.ev_stop = (function shadow$dom$ev_stop(var_args){
var G__16875 = arguments.length;
switch (G__16875) {
case 1:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1 = (function (e){
if(cljs.core.truth_(e.stopPropagation)){
e.stopPropagation();

e.preventDefault();
} else {
(e.cancelBubble = true);

(e.returnValue = false);
}

return e;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2 = (function (e,el){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4 = (function (e,el,scope,owner){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$lang$maxFixedArity = 4);

/**
 * check wether a parent node (or the document) contains the child
 */
shadow.dom.contains_QMARK_ = (function shadow$dom$contains_QMARK_(var_args){
var G__16910 = arguments.length;
switch (G__16910) {
case 1:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1 = (function (el){
return goog.dom.contains(document,shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (parent,el){
return goog.dom.contains(shadow.dom.dom_node(parent),shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$lang$maxFixedArity = 2);

shadow.dom.add_class = (function shadow$dom$add_class(el,cls){
return goog.dom.classlist.add(shadow.dom.dom_node(el),cls);
});
shadow.dom.remove_class = (function shadow$dom$remove_class(el,cls){
return goog.dom.classlist.remove(shadow.dom.dom_node(el),cls);
});
shadow.dom.toggle_class = (function shadow$dom$toggle_class(var_args){
var G__16942 = arguments.length;
switch (G__16942) {
case 2:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2 = (function (el,cls){
return goog.dom.classlist.toggle(shadow.dom.dom_node(el),cls);
}));

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3 = (function (el,cls,v){
if(cljs.core.truth_(v)){
return shadow.dom.add_class(el,cls);
} else {
return shadow.dom.remove_class(el,cls);
}
}));

(shadow.dom.toggle_class.cljs$lang$maxFixedArity = 3);

shadow.dom.dom_listen = (cljs.core.truth_((function (){var or__5045__auto__ = (!((typeof document !== 'undefined')));
if(or__5045__auto__){
return or__5045__auto__;
} else {
return document.addEventListener;
}
})())?(function shadow$dom$dom_listen_good(el,ev,handler){
return el.addEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_ie(el,ev,handler){
try{return el.attachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),(function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
}));
}catch (e16954){if((e16954 instanceof Object)){
var e = e16954;
return console.log("didnt support attachEvent",el,e);
} else {
throw e16954;

}
}}));
shadow.dom.dom_listen_remove = (cljs.core.truth_((function (){var or__5045__auto__ = (!((typeof document !== 'undefined')));
if(or__5045__auto__){
return or__5045__auto__;
} else {
return document.removeEventListener;
}
})())?(function shadow$dom$dom_listen_remove_good(el,ev,handler){
return el.removeEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_remove_ie(el,ev,handler){
return el.detachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),handler);
}));
shadow.dom.on_query = (function shadow$dom$on_query(root_el,ev,selector,handler){
var seq__16968 = cljs.core.seq(shadow.dom.query.cljs$core$IFn$_invoke$arity$2(selector,root_el));
var chunk__16969 = null;
var count__16970 = (0);
var i__16971 = (0);
while(true){
if((i__16971 < count__16970)){
var el = chunk__16969.cljs$core$IIndexed$_nth$arity$2(null,i__16971);
var handler_18550__$1 = ((function (seq__16968,chunk__16969,count__16970,i__16971,el){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__16968,chunk__16969,count__16970,i__16971,el))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_18550__$1);


var G__18553 = seq__16968;
var G__18554 = chunk__16969;
var G__18555 = count__16970;
var G__18556 = (i__16971 + (1));
seq__16968 = G__18553;
chunk__16969 = G__18554;
count__16970 = G__18555;
i__16971 = G__18556;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__16968);
if(temp__5804__auto__){
var seq__16968__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__16968__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__16968__$1);
var G__18557 = cljs.core.chunk_rest(seq__16968__$1);
var G__18558 = c__5568__auto__;
var G__18559 = cljs.core.count(c__5568__auto__);
var G__18560 = (0);
seq__16968 = G__18557;
chunk__16969 = G__18558;
count__16970 = G__18559;
i__16971 = G__18560;
continue;
} else {
var el = cljs.core.first(seq__16968__$1);
var handler_18561__$1 = ((function (seq__16968,chunk__16969,count__16970,i__16971,el,seq__16968__$1,temp__5804__auto__){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__16968,chunk__16969,count__16970,i__16971,el,seq__16968__$1,temp__5804__auto__))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_18561__$1);


var G__18562 = cljs.core.next(seq__16968__$1);
var G__18563 = null;
var G__18564 = (0);
var G__18565 = (0);
seq__16968 = G__18562;
chunk__16969 = G__18563;
count__16970 = G__18564;
i__16971 = G__18565;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.on = (function shadow$dom$on(var_args){
var G__17019 = arguments.length;
switch (G__17019) {
case 3:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.on.cljs$core$IFn$_invoke$arity$3 = (function (el,ev,handler){
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4(el,ev,handler,false);
}));

(shadow.dom.on.cljs$core$IFn$_invoke$arity$4 = (function (el,ev,handler,capture){
if(cljs.core.vector_QMARK_(ev)){
return shadow.dom.on_query(el,cljs.core.first(ev),cljs.core.second(ev),handler);
} else {
var handler__$1 = (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});
return shadow.dom.dom_listen(shadow.dom.dom_node(el),cljs.core.name(ev),handler__$1);
}
}));

(shadow.dom.on.cljs$lang$maxFixedArity = 4);

shadow.dom.remove_event_handler = (function shadow$dom$remove_event_handler(el,ev,handler){
return shadow.dom.dom_listen_remove(shadow.dom.dom_node(el),cljs.core.name(ev),handler);
});
shadow.dom.add_event_listeners = (function shadow$dom$add_event_listeners(el,events){
var seq__17060 = cljs.core.seq(events);
var chunk__17061 = null;
var count__17062 = (0);
var i__17063 = (0);
while(true){
if((i__17063 < count__17062)){
var vec__17087 = chunk__17061.cljs$core$IIndexed$_nth$arity$2(null,i__17063);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17087,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17087,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__18570 = seq__17060;
var G__18571 = chunk__17061;
var G__18572 = count__17062;
var G__18573 = (i__17063 + (1));
seq__17060 = G__18570;
chunk__17061 = G__18571;
count__17062 = G__18572;
i__17063 = G__18573;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__17060);
if(temp__5804__auto__){
var seq__17060__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__17060__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__17060__$1);
var G__18574 = cljs.core.chunk_rest(seq__17060__$1);
var G__18575 = c__5568__auto__;
var G__18576 = cljs.core.count(c__5568__auto__);
var G__18577 = (0);
seq__17060 = G__18574;
chunk__17061 = G__18575;
count__17062 = G__18576;
i__17063 = G__18577;
continue;
} else {
var vec__17109 = cljs.core.first(seq__17060__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17109,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17109,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__18578 = cljs.core.next(seq__17060__$1);
var G__18580 = null;
var G__18581 = (0);
var G__18583 = (0);
seq__17060 = G__18578;
chunk__17061 = G__18580;
count__17062 = G__18581;
i__17063 = G__18583;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_style = (function shadow$dom$set_style(el,styles){
var dom = shadow.dom.dom_node(el);
var seq__17117 = cljs.core.seq(styles);
var chunk__17118 = null;
var count__17119 = (0);
var i__17120 = (0);
while(true){
if((i__17120 < count__17119)){
var vec__17140 = chunk__17118.cljs$core$IIndexed$_nth$arity$2(null,i__17120);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17140,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17140,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__18586 = seq__17117;
var G__18587 = chunk__17118;
var G__18588 = count__17119;
var G__18589 = (i__17120 + (1));
seq__17117 = G__18586;
chunk__17118 = G__18587;
count__17119 = G__18588;
i__17120 = G__18589;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__17117);
if(temp__5804__auto__){
var seq__17117__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__17117__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__17117__$1);
var G__18590 = cljs.core.chunk_rest(seq__17117__$1);
var G__18591 = c__5568__auto__;
var G__18592 = cljs.core.count(c__5568__auto__);
var G__18593 = (0);
seq__17117 = G__18590;
chunk__17118 = G__18591;
count__17119 = G__18592;
i__17120 = G__18593;
continue;
} else {
var vec__17144 = cljs.core.first(seq__17117__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17144,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17144,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__18594 = cljs.core.next(seq__17117__$1);
var G__18595 = null;
var G__18596 = (0);
var G__18597 = (0);
seq__17117 = G__18594;
chunk__17118 = G__18595;
count__17119 = G__18596;
i__17120 = G__18597;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_attr_STAR_ = (function shadow$dom$set_attr_STAR_(el,key,value){
var G__17155_18604 = key;
var G__17155_18605__$1 = (((G__17155_18604 instanceof cljs.core.Keyword))?G__17155_18604.fqn:null);
switch (G__17155_18605__$1) {
case "id":
(el.id = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "class":
(el.className = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "for":
(el.htmlFor = value);

break;
case "cellpadding":
el.setAttribute("cellPadding",value);

break;
case "cellspacing":
el.setAttribute("cellSpacing",value);

break;
case "colspan":
el.setAttribute("colSpan",value);

break;
case "frameborder":
el.setAttribute("frameBorder",value);

break;
case "height":
el.setAttribute("height",value);

break;
case "maxlength":
el.setAttribute("maxLength",value);

break;
case "role":
el.setAttribute("role",value);

break;
case "rowspan":
el.setAttribute("rowSpan",value);

break;
case "type":
el.setAttribute("type",value);

break;
case "usemap":
el.setAttribute("useMap",value);

break;
case "valign":
el.setAttribute("vAlign",value);

break;
case "width":
el.setAttribute("width",value);

break;
case "on":
shadow.dom.add_event_listeners(el,value);

break;
case "style":
if((value == null)){
} else {
if(typeof value === 'string'){
el.setAttribute("style",value);
} else {
if(cljs.core.map_QMARK_(value)){
shadow.dom.set_style(el,value);
} else {
goog.style.setStyle(el,value);

}
}
}

break;
default:
var ks_18611 = cljs.core.name(key);
if(cljs.core.truth_((function (){var or__5045__auto__ = goog.string.startsWith(ks_18611,"data-");
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return goog.string.startsWith(ks_18611,"aria-");
}
})())){
el.setAttribute(ks_18611,value);
} else {
(el[ks_18611] = value);
}

}

return el;
});
shadow.dom.set_attrs = (function shadow$dom$set_attrs(el,attrs){
return cljs.core.reduce_kv((function (el__$1,key,value){
shadow.dom.set_attr_STAR_(el__$1,key,value);

return el__$1;
}),shadow.dom.dom_node(el),attrs);
});
shadow.dom.set_attr = (function shadow$dom$set_attr(el,key,value){
return shadow.dom.set_attr_STAR_(shadow.dom.dom_node(el),key,value);
});
shadow.dom.has_class_QMARK_ = (function shadow$dom$has_class_QMARK_(el,cls){
return goog.dom.classlist.contains(shadow.dom.dom_node(el),cls);
});
shadow.dom.merge_class_string = (function shadow$dom$merge_class_string(current,extra_class){
if(cljs.core.seq(current)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(current)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(extra_class)].join('');
} else {
return extra_class;
}
});
shadow.dom.parse_tag = (function shadow$dom$parse_tag(spec){
var spec__$1 = cljs.core.name(spec);
var fdot = spec__$1.indexOf(".");
var fhash = spec__$1.indexOf("#");
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1,null,null], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fdot),null,clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1))),null], null);
} else {
if((fhash > fdot)){
throw ["cant have id after class?",spec__$1].join('');
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1)),fdot),clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);

}
}
}
}
});
shadow.dom.create_dom_node = (function shadow$dom$create_dom_node(tag_def,p__17199){
var map__17202 = p__17199;
var map__17202__$1 = cljs.core.__destructure_map(map__17202);
var props = map__17202__$1;
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__17202__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var tag_props = ({});
var vec__17209 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17209,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17209,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17209,(2),null);
if(cljs.core.truth_(tag_id)){
(tag_props["id"] = tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
(tag_props["class"] = shadow.dom.merge_class_string(class$,tag_classes));
} else {
}

var G__17214 = goog.dom.createDom(tag_name,tag_props);
shadow.dom.set_attrs(G__17214,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"class","class",-2030961996)));

return G__17214;
});
shadow.dom.append = (function shadow$dom$append(var_args){
var G__17217 = arguments.length;
switch (G__17217) {
case 1:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.append.cljs$core$IFn$_invoke$arity$1 = (function (node){
if(cljs.core.truth_(node)){
var temp__5804__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5804__auto__)){
var n = temp__5804__auto__;
document.body.appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$core$IFn$_invoke$arity$2 = (function (el,node){
if(cljs.core.truth_(node)){
var temp__5804__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5804__auto__)){
var n = temp__5804__auto__;
shadow.dom.dom_node(el).appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$lang$maxFixedArity = 2);

shadow.dom.destructure_node = (function shadow$dom$destructure_node(create_fn,p__17246){
var vec__17249 = p__17246;
var seq__17250 = cljs.core.seq(vec__17249);
var first__17251 = cljs.core.first(seq__17250);
var seq__17250__$1 = cljs.core.next(seq__17250);
var nn = first__17251;
var first__17251__$1 = cljs.core.first(seq__17250__$1);
var seq__17250__$2 = cljs.core.next(seq__17250__$1);
var np = first__17251__$1;
var nc = seq__17250__$2;
var node = vec__17249;
if((nn instanceof cljs.core.Keyword)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid dom node",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"node","node",581201198),node], null));
}

if((((np == null)) && ((nc == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__17255 = nn;
var G__17256 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__17255,G__17256) : create_fn.call(null,G__17255,G__17256));
})(),cljs.core.List.EMPTY], null);
} else {
if(cljs.core.map_QMARK_(np)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(nn,np) : create_fn.call(null,nn,np)),nc], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__17259 = nn;
var G__17260 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__17259,G__17260) : create_fn.call(null,G__17259,G__17260));
})(),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(nc,np)], null);

}
}
});
shadow.dom.make_dom_node = (function shadow$dom$make_dom_node(structure){
var vec__17276 = shadow.dom.destructure_node(shadow.dom.create_dom_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17276,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17276,(1),null);
var seq__17279_18634 = cljs.core.seq(node_children);
var chunk__17281_18635 = null;
var count__17282_18636 = (0);
var i__17283_18637 = (0);
while(true){
if((i__17283_18637 < count__17282_18636)){
var child_struct_18638 = chunk__17281_18635.cljs$core$IIndexed$_nth$arity$2(null,i__17283_18637);
var children_18639 = shadow.dom.dom_node(child_struct_18638);
if(cljs.core.seq_QMARK_(children_18639)){
var seq__17345_18640 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_18639));
var chunk__17347_18641 = null;
var count__17348_18642 = (0);
var i__17349_18643 = (0);
while(true){
if((i__17349_18643 < count__17348_18642)){
var child_18644 = chunk__17347_18641.cljs$core$IIndexed$_nth$arity$2(null,i__17349_18643);
if(cljs.core.truth_(child_18644)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_18644);


var G__18646 = seq__17345_18640;
var G__18647 = chunk__17347_18641;
var G__18648 = count__17348_18642;
var G__18649 = (i__17349_18643 + (1));
seq__17345_18640 = G__18646;
chunk__17347_18641 = G__18647;
count__17348_18642 = G__18648;
i__17349_18643 = G__18649;
continue;
} else {
var G__18650 = seq__17345_18640;
var G__18651 = chunk__17347_18641;
var G__18652 = count__17348_18642;
var G__18653 = (i__17349_18643 + (1));
seq__17345_18640 = G__18650;
chunk__17347_18641 = G__18651;
count__17348_18642 = G__18652;
i__17349_18643 = G__18653;
continue;
}
} else {
var temp__5804__auto___18655 = cljs.core.seq(seq__17345_18640);
if(temp__5804__auto___18655){
var seq__17345_18657__$1 = temp__5804__auto___18655;
if(cljs.core.chunked_seq_QMARK_(seq__17345_18657__$1)){
var c__5568__auto___18658 = cljs.core.chunk_first(seq__17345_18657__$1);
var G__18659 = cljs.core.chunk_rest(seq__17345_18657__$1);
var G__18660 = c__5568__auto___18658;
var G__18661 = cljs.core.count(c__5568__auto___18658);
var G__18662 = (0);
seq__17345_18640 = G__18659;
chunk__17347_18641 = G__18660;
count__17348_18642 = G__18661;
i__17349_18643 = G__18662;
continue;
} else {
var child_18663 = cljs.core.first(seq__17345_18657__$1);
if(cljs.core.truth_(child_18663)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_18663);


var G__18664 = cljs.core.next(seq__17345_18657__$1);
var G__18665 = null;
var G__18666 = (0);
var G__18667 = (0);
seq__17345_18640 = G__18664;
chunk__17347_18641 = G__18665;
count__17348_18642 = G__18666;
i__17349_18643 = G__18667;
continue;
} else {
var G__18668 = cljs.core.next(seq__17345_18657__$1);
var G__18669 = null;
var G__18670 = (0);
var G__18671 = (0);
seq__17345_18640 = G__18668;
chunk__17347_18641 = G__18669;
count__17348_18642 = G__18670;
i__17349_18643 = G__18671;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_18639);
}


var G__18672 = seq__17279_18634;
var G__18673 = chunk__17281_18635;
var G__18674 = count__17282_18636;
var G__18675 = (i__17283_18637 + (1));
seq__17279_18634 = G__18672;
chunk__17281_18635 = G__18673;
count__17282_18636 = G__18674;
i__17283_18637 = G__18675;
continue;
} else {
var temp__5804__auto___18676 = cljs.core.seq(seq__17279_18634);
if(temp__5804__auto___18676){
var seq__17279_18677__$1 = temp__5804__auto___18676;
if(cljs.core.chunked_seq_QMARK_(seq__17279_18677__$1)){
var c__5568__auto___18678 = cljs.core.chunk_first(seq__17279_18677__$1);
var G__18679 = cljs.core.chunk_rest(seq__17279_18677__$1);
var G__18680 = c__5568__auto___18678;
var G__18681 = cljs.core.count(c__5568__auto___18678);
var G__18682 = (0);
seq__17279_18634 = G__18679;
chunk__17281_18635 = G__18680;
count__17282_18636 = G__18681;
i__17283_18637 = G__18682;
continue;
} else {
var child_struct_18683 = cljs.core.first(seq__17279_18677__$1);
var children_18684 = shadow.dom.dom_node(child_struct_18683);
if(cljs.core.seq_QMARK_(children_18684)){
var seq__17383_18685 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_18684));
var chunk__17385_18686 = null;
var count__17386_18687 = (0);
var i__17387_18688 = (0);
while(true){
if((i__17387_18688 < count__17386_18687)){
var child_18689 = chunk__17385_18686.cljs$core$IIndexed$_nth$arity$2(null,i__17387_18688);
if(cljs.core.truth_(child_18689)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_18689);


var G__18690 = seq__17383_18685;
var G__18691 = chunk__17385_18686;
var G__18692 = count__17386_18687;
var G__18693 = (i__17387_18688 + (1));
seq__17383_18685 = G__18690;
chunk__17385_18686 = G__18691;
count__17386_18687 = G__18692;
i__17387_18688 = G__18693;
continue;
} else {
var G__18694 = seq__17383_18685;
var G__18695 = chunk__17385_18686;
var G__18696 = count__17386_18687;
var G__18697 = (i__17387_18688 + (1));
seq__17383_18685 = G__18694;
chunk__17385_18686 = G__18695;
count__17386_18687 = G__18696;
i__17387_18688 = G__18697;
continue;
}
} else {
var temp__5804__auto___18701__$1 = cljs.core.seq(seq__17383_18685);
if(temp__5804__auto___18701__$1){
var seq__17383_18702__$1 = temp__5804__auto___18701__$1;
if(cljs.core.chunked_seq_QMARK_(seq__17383_18702__$1)){
var c__5568__auto___18703 = cljs.core.chunk_first(seq__17383_18702__$1);
var G__18704 = cljs.core.chunk_rest(seq__17383_18702__$1);
var G__18705 = c__5568__auto___18703;
var G__18706 = cljs.core.count(c__5568__auto___18703);
var G__18707 = (0);
seq__17383_18685 = G__18704;
chunk__17385_18686 = G__18705;
count__17386_18687 = G__18706;
i__17387_18688 = G__18707;
continue;
} else {
var child_18708 = cljs.core.first(seq__17383_18702__$1);
if(cljs.core.truth_(child_18708)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_18708);


var G__18709 = cljs.core.next(seq__17383_18702__$1);
var G__18710 = null;
var G__18711 = (0);
var G__18712 = (0);
seq__17383_18685 = G__18709;
chunk__17385_18686 = G__18710;
count__17386_18687 = G__18711;
i__17387_18688 = G__18712;
continue;
} else {
var G__18713 = cljs.core.next(seq__17383_18702__$1);
var G__18714 = null;
var G__18715 = (0);
var G__18716 = (0);
seq__17383_18685 = G__18713;
chunk__17385_18686 = G__18714;
count__17386_18687 = G__18715;
i__17387_18688 = G__18716;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_18684);
}


var G__18717 = cljs.core.next(seq__17279_18677__$1);
var G__18718 = null;
var G__18719 = (0);
var G__18720 = (0);
seq__17279_18634 = G__18717;
chunk__17281_18635 = G__18718;
count__17282_18636 = G__18719;
i__17283_18637 = G__18720;
continue;
}
} else {
}
}
break;
}

return node;
});
(cljs.core.Keyword.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.Keyword.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$__$1], null));
}));

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_dom,this$__$1);
}));
if(cljs.core.truth_(((typeof HTMLElement) != 'undefined'))){
(HTMLElement.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(HTMLElement.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
if(cljs.core.truth_(((typeof DocumentFragment) != 'undefined'))){
(DocumentFragment.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(DocumentFragment.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
/**
 * clear node children
 */
shadow.dom.reset = (function shadow$dom$reset(node){
return goog.dom.removeChildren(shadow.dom.dom_node(node));
});
shadow.dom.remove = (function shadow$dom$remove(node){
if((((!((node == null))))?(((((node.cljs$lang$protocol_mask$partition0$ & (8388608))) || ((cljs.core.PROTOCOL_SENTINEL === node.cljs$core$ISeqable$))))?true:false):false)){
var seq__17440 = cljs.core.seq(node);
var chunk__17441 = null;
var count__17442 = (0);
var i__17443 = (0);
while(true){
if((i__17443 < count__17442)){
var n = chunk__17441.cljs$core$IIndexed$_nth$arity$2(null,i__17443);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__18733 = seq__17440;
var G__18734 = chunk__17441;
var G__18735 = count__17442;
var G__18736 = (i__17443 + (1));
seq__17440 = G__18733;
chunk__17441 = G__18734;
count__17442 = G__18735;
i__17443 = G__18736;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__17440);
if(temp__5804__auto__){
var seq__17440__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__17440__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__17440__$1);
var G__18737 = cljs.core.chunk_rest(seq__17440__$1);
var G__18738 = c__5568__auto__;
var G__18739 = cljs.core.count(c__5568__auto__);
var G__18740 = (0);
seq__17440 = G__18737;
chunk__17441 = G__18738;
count__17442 = G__18739;
i__17443 = G__18740;
continue;
} else {
var n = cljs.core.first(seq__17440__$1);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__18741 = cljs.core.next(seq__17440__$1);
var G__18742 = null;
var G__18743 = (0);
var G__18744 = (0);
seq__17440 = G__18741;
chunk__17441 = G__18742;
count__17442 = G__18743;
i__17443 = G__18744;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return goog.dom.removeNode(node);
}
});
shadow.dom.replace_node = (function shadow$dom$replace_node(old,new$){
return goog.dom.replaceNode(shadow.dom.dom_node(new$),shadow.dom.dom_node(old));
});
shadow.dom.text = (function shadow$dom$text(var_args){
var G__17482 = arguments.length;
switch (G__17482) {
case 2:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.text.cljs$core$IFn$_invoke$arity$2 = (function (el,new_text){
return (shadow.dom.dom_node(el).innerText = new_text);
}));

(shadow.dom.text.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.dom_node(el).innerText;
}));

(shadow.dom.text.cljs$lang$maxFixedArity = 2);

shadow.dom.check = (function shadow$dom$check(var_args){
var G__17508 = arguments.length;
switch (G__17508) {
case 1:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.check.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2(el,true);
}));

(shadow.dom.check.cljs$core$IFn$_invoke$arity$2 = (function (el,checked){
return (shadow.dom.dom_node(el).checked = checked);
}));

(shadow.dom.check.cljs$lang$maxFixedArity = 2);

shadow.dom.checked_QMARK_ = (function shadow$dom$checked_QMARK_(el){
return shadow.dom.dom_node(el).checked;
});
shadow.dom.form_elements = (function shadow$dom$form_elements(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).elements));
});
shadow.dom.children = (function shadow$dom$children(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).children));
});
shadow.dom.child_nodes = (function shadow$dom$child_nodes(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).childNodes));
});
shadow.dom.attr = (function shadow$dom$attr(var_args){
var G__17527 = arguments.length;
switch (G__17527) {
case 2:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$2 = (function (el,key){
return shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
}));

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$3 = (function (el,key,default$){
var or__5045__auto__ = shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return default$;
}
}));

(shadow.dom.attr.cljs$lang$maxFixedArity = 3);

shadow.dom.del_attr = (function shadow$dom$del_attr(el,key){
return shadow.dom.dom_node(el).removeAttribute(cljs.core.name(key));
});
shadow.dom.data = (function shadow$dom$data(el,key){
return shadow.dom.dom_node(el).getAttribute(["data-",cljs.core.name(key)].join(''));
});
shadow.dom.set_data = (function shadow$dom$set_data(el,key,value){
return shadow.dom.dom_node(el).setAttribute(["data-",cljs.core.name(key)].join(''),cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));
});
shadow.dom.set_html = (function shadow$dom$set_html(node,text){
return (shadow.dom.dom_node(node).innerHTML = text);
});
shadow.dom.get_html = (function shadow$dom$get_html(node){
return shadow.dom.dom_node(node).innerHTML;
});
shadow.dom.fragment = (function shadow$dom$fragment(var_args){
var args__5775__auto__ = [];
var len__5769__auto___18758 = arguments.length;
var i__5770__auto___18759 = (0);
while(true){
if((i__5770__auto___18759 < len__5769__auto___18758)){
args__5775__auto__.push((arguments[i__5770__auto___18759]));

var G__18760 = (i__5770__auto___18759 + (1));
i__5770__auto___18759 = G__18760;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic = (function (nodes){
var fragment = document.createDocumentFragment();
var seq__17562_18761 = cljs.core.seq(nodes);
var chunk__17563_18762 = null;
var count__17564_18763 = (0);
var i__17565_18764 = (0);
while(true){
if((i__17565_18764 < count__17564_18763)){
var node_18765 = chunk__17563_18762.cljs$core$IIndexed$_nth$arity$2(null,i__17565_18764);
fragment.appendChild(shadow.dom._to_dom(node_18765));


var G__18766 = seq__17562_18761;
var G__18767 = chunk__17563_18762;
var G__18768 = count__17564_18763;
var G__18769 = (i__17565_18764 + (1));
seq__17562_18761 = G__18766;
chunk__17563_18762 = G__18767;
count__17564_18763 = G__18768;
i__17565_18764 = G__18769;
continue;
} else {
var temp__5804__auto___18770 = cljs.core.seq(seq__17562_18761);
if(temp__5804__auto___18770){
var seq__17562_18771__$1 = temp__5804__auto___18770;
if(cljs.core.chunked_seq_QMARK_(seq__17562_18771__$1)){
var c__5568__auto___18772 = cljs.core.chunk_first(seq__17562_18771__$1);
var G__18773 = cljs.core.chunk_rest(seq__17562_18771__$1);
var G__18774 = c__5568__auto___18772;
var G__18775 = cljs.core.count(c__5568__auto___18772);
var G__18776 = (0);
seq__17562_18761 = G__18773;
chunk__17563_18762 = G__18774;
count__17564_18763 = G__18775;
i__17565_18764 = G__18776;
continue;
} else {
var node_18777 = cljs.core.first(seq__17562_18771__$1);
fragment.appendChild(shadow.dom._to_dom(node_18777));


var G__18778 = cljs.core.next(seq__17562_18771__$1);
var G__18779 = null;
var G__18780 = (0);
var G__18781 = (0);
seq__17562_18761 = G__18778;
chunk__17563_18762 = G__18779;
count__17564_18763 = G__18780;
i__17565_18764 = G__18781;
continue;
}
} else {
}
}
break;
}

return (new shadow.dom.NativeColl(fragment));
}));

(shadow.dom.fragment.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(shadow.dom.fragment.cljs$lang$applyTo = (function (seq17554){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq17554));
}));

/**
 * given a html string, eval all <script> tags and return the html without the scripts
 * don't do this for everything, only content you trust.
 */
shadow.dom.eval_scripts = (function shadow$dom$eval_scripts(s){
var scripts = cljs.core.re_seq(/<script[^>]*?>(.+?)<\/script>/,s);
var seq__17588_18782 = cljs.core.seq(scripts);
var chunk__17589_18783 = null;
var count__17590_18784 = (0);
var i__17591_18785 = (0);
while(true){
if((i__17591_18785 < count__17590_18784)){
var vec__17619_18786 = chunk__17589_18783.cljs$core$IIndexed$_nth$arity$2(null,i__17591_18785);
var script_tag_18787 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17619_18786,(0),null);
var script_body_18788 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17619_18786,(1),null);
eval(script_body_18788);


var G__18789 = seq__17588_18782;
var G__18790 = chunk__17589_18783;
var G__18791 = count__17590_18784;
var G__18792 = (i__17591_18785 + (1));
seq__17588_18782 = G__18789;
chunk__17589_18783 = G__18790;
count__17590_18784 = G__18791;
i__17591_18785 = G__18792;
continue;
} else {
var temp__5804__auto___18793 = cljs.core.seq(seq__17588_18782);
if(temp__5804__auto___18793){
var seq__17588_18794__$1 = temp__5804__auto___18793;
if(cljs.core.chunked_seq_QMARK_(seq__17588_18794__$1)){
var c__5568__auto___18795 = cljs.core.chunk_first(seq__17588_18794__$1);
var G__18796 = cljs.core.chunk_rest(seq__17588_18794__$1);
var G__18797 = c__5568__auto___18795;
var G__18798 = cljs.core.count(c__5568__auto___18795);
var G__18799 = (0);
seq__17588_18782 = G__18796;
chunk__17589_18783 = G__18797;
count__17590_18784 = G__18798;
i__17591_18785 = G__18799;
continue;
} else {
var vec__17626_18800 = cljs.core.first(seq__17588_18794__$1);
var script_tag_18801 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17626_18800,(0),null);
var script_body_18802 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17626_18800,(1),null);
eval(script_body_18802);


var G__18803 = cljs.core.next(seq__17588_18794__$1);
var G__18804 = null;
var G__18805 = (0);
var G__18806 = (0);
seq__17588_18782 = G__18803;
chunk__17589_18783 = G__18804;
count__17590_18784 = G__18805;
i__17591_18785 = G__18806;
continue;
}
} else {
}
}
break;
}

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (s__$1,p__17631){
var vec__17632 = p__17631;
var script_tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17632,(0),null);
var script_body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17632,(1),null);
return clojure.string.replace(s__$1,script_tag,"");
}),s,scripts);
});
shadow.dom.str__GT_fragment = (function shadow$dom$str__GT_fragment(s){
var el = document.createElement("div");
(el.innerHTML = s);

return (new shadow.dom.NativeColl(goog.dom.childrenToNode_(document,el)));
});
shadow.dom.node_name = (function shadow$dom$node_name(el){
return shadow.dom.dom_node(el).nodeName;
});
shadow.dom.ancestor_by_class = (function shadow$dom$ancestor_by_class(el,cls){
return goog.dom.getAncestorByClass(shadow.dom.dom_node(el),cls);
});
shadow.dom.ancestor_by_tag = (function shadow$dom$ancestor_by_tag(var_args){
var G__17648 = arguments.length;
switch (G__17648) {
case 2:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2 = (function (el,tag){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag));
}));

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3 = (function (el,tag,cls){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag),cljs.core.name(cls));
}));

(shadow.dom.ancestor_by_tag.cljs$lang$maxFixedArity = 3);

shadow.dom.get_value = (function shadow$dom$get_value(dom){
return goog.dom.forms.getValue(shadow.dom.dom_node(dom));
});
shadow.dom.set_value = (function shadow$dom$set_value(dom,value){
return goog.dom.forms.setValue(shadow.dom.dom_node(dom),value);
});
shadow.dom.px = (function shadow$dom$px(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((value | (0))),"px"].join('');
});
shadow.dom.pct = (function shadow$dom$pct(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(value),"%"].join('');
});
shadow.dom.remove_style_STAR_ = (function shadow$dom$remove_style_STAR_(el,style){
return el.style.removeProperty(cljs.core.name(style));
});
shadow.dom.remove_style = (function shadow$dom$remove_style(el,style){
var el__$1 = shadow.dom.dom_node(el);
return shadow.dom.remove_style_STAR_(el__$1,style);
});
shadow.dom.remove_styles = (function shadow$dom$remove_styles(el,style_keys){
var el__$1 = shadow.dom.dom_node(el);
var seq__17711 = cljs.core.seq(style_keys);
var chunk__17712 = null;
var count__17713 = (0);
var i__17714 = (0);
while(true){
if((i__17714 < count__17713)){
var it = chunk__17712.cljs$core$IIndexed$_nth$arity$2(null,i__17714);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__18811 = seq__17711;
var G__18812 = chunk__17712;
var G__18813 = count__17713;
var G__18814 = (i__17714 + (1));
seq__17711 = G__18811;
chunk__17712 = G__18812;
count__17713 = G__18813;
i__17714 = G__18814;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__17711);
if(temp__5804__auto__){
var seq__17711__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__17711__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__17711__$1);
var G__18815 = cljs.core.chunk_rest(seq__17711__$1);
var G__18816 = c__5568__auto__;
var G__18817 = cljs.core.count(c__5568__auto__);
var G__18818 = (0);
seq__17711 = G__18815;
chunk__17712 = G__18816;
count__17713 = G__18817;
i__17714 = G__18818;
continue;
} else {
var it = cljs.core.first(seq__17711__$1);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__18819 = cljs.core.next(seq__17711__$1);
var G__18821 = null;
var G__18822 = (0);
var G__18823 = (0);
seq__17711 = G__18819;
chunk__17712 = G__18821;
count__17713 = G__18822;
i__17714 = G__18823;
continue;
}
} else {
return null;
}
}
break;
}
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Coordinate = (function (x,y,__meta,__extmap,__hash){
this.x = x;
this.y = y;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5343__auto__,k__5344__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return this__5343__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5344__auto__,null);
}));

(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5345__auto__,k17724,else__5346__auto__){
var self__ = this;
var this__5345__auto____$1 = this;
var G__17736 = k17724;
var G__17736__$1 = (((G__17736 instanceof cljs.core.Keyword))?G__17736.fqn:null);
switch (G__17736__$1) {
case "x":
return self__.x;

break;
case "y":
return self__.y;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k17724,else__5346__auto__);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5363__auto__,f__5364__auto__,init__5365__auto__){
var self__ = this;
var this__5363__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5366__auto__,p__17741){
var vec__17742 = p__17741;
var k__5367__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17742,(0),null);
var v__5368__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17742,(1),null);
return (f__5364__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5364__auto__.cljs$core$IFn$_invoke$arity$3(ret__5366__auto__,k__5367__auto__,v__5368__auto__) : f__5364__auto__.call(null,ret__5366__auto__,k__5367__auto__,v__5368__auto__));
}),init__5365__auto__,this__5363__auto____$1);
}));

(shadow.dom.Coordinate.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5358__auto__,writer__5359__auto__,opts__5360__auto__){
var self__ = this;
var this__5358__auto____$1 = this;
var pr_pair__5361__auto__ = (function (keyval__5362__auto__){
return cljs.core.pr_sequential_writer(writer__5359__auto__,cljs.core.pr_writer,""," ","",opts__5360__auto__,keyval__5362__auto__);
});
return cljs.core.pr_sequential_writer(writer__5359__auto__,pr_pair__5361__auto__,"#shadow.dom.Coordinate{",", ","}",opts__5360__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"x","x",2099068185),self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"y","y",-1757859776),self__.y],null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__17723){
var self__ = this;
var G__17723__$1 = this;
return (new cljs.core.RecordIter((0),G__17723__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y","y",-1757859776)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5341__auto__){
var self__ = this;
var this__5341__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5338__auto__){
var self__ = this;
var this__5338__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5347__auto__){
var self__ = this;
var this__5347__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5339__auto__){
var self__ = this;
var this__5339__auto____$1 = this;
var h__5154__auto__ = self__.__hash;
if((!((h__5154__auto__ == null)))){
return h__5154__auto__;
} else {
var h__5154__auto____$1 = (function (coll__5340__auto__){
return (145542109 ^ cljs.core.hash_unordered_coll(coll__5340__auto__));
})(this__5339__auto____$1);
(self__.__hash = h__5154__auto____$1);

return h__5154__auto____$1;
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this17725,other17726){
var self__ = this;
var this17725__$1 = this;
return (((!((other17726 == null)))) && ((((this17725__$1.constructor === other17726.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this17725__$1.x,other17726.x)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this17725__$1.y,other17726.y)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this17725__$1.__extmap,other17726.__extmap)))))))));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5353__auto__,k__5354__auto__){
var self__ = this;
var this__5353__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"y","y",-1757859776),null,new cljs.core.Keyword(null,"x","x",2099068185),null], null), null),k__5354__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5353__auto____$1),self__.__meta),k__5354__auto__);
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5354__auto__)),null));
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5350__auto__,k17724){
var self__ = this;
var this__5350__auto____$1 = this;
var G__17782 = k17724;
var G__17782__$1 = (((G__17782 instanceof cljs.core.Keyword))?G__17782.fqn:null);
switch (G__17782__$1) {
case "x":
case "y":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k17724);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5351__auto__,k__5352__auto__,G__17723){
var self__ = this;
var this__5351__auto____$1 = this;
var pred__17789 = cljs.core.keyword_identical_QMARK_;
var expr__17790 = k__5352__auto__;
if(cljs.core.truth_((pred__17789.cljs$core$IFn$_invoke$arity$2 ? pred__17789.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),expr__17790) : pred__17789.call(null,new cljs.core.Keyword(null,"x","x",2099068185),expr__17790)))){
return (new shadow.dom.Coordinate(G__17723,self__.y,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__17789.cljs$core$IFn$_invoke$arity$2 ? pred__17789.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"y","y",-1757859776),expr__17790) : pred__17789.call(null,new cljs.core.Keyword(null,"y","y",-1757859776),expr__17790)))){
return (new shadow.dom.Coordinate(self__.x,G__17723,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5352__auto__,G__17723),null));
}
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5356__auto__){
var self__ = this;
var this__5356__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"x","x",2099068185),self__.x,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"y","y",-1757859776),self__.y,null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5342__auto__,G__17723){
var self__ = this;
var this__5342__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,G__17723,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5348__auto__,entry__5349__auto__){
var self__ = this;
var this__5348__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5349__auto__)){
return this__5348__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5349__auto__,(0)),cljs.core._nth(entry__5349__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5348__auto____$1,entry__5349__auto__);
}
}));

(shadow.dom.Coordinate.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null),new cljs.core.Symbol(null,"y","y",-117328249,null)], null);
}));

(shadow.dom.Coordinate.cljs$lang$type = true);

(shadow.dom.Coordinate.cljs$lang$ctorPrSeq = (function (this__5389__auto__){
return (new cljs.core.List(null,"shadow.dom/Coordinate",null,(1),null));
}));

(shadow.dom.Coordinate.cljs$lang$ctorPrWriter = (function (this__5389__auto__,writer__5390__auto__){
return cljs.core._write(writer__5390__auto__,"shadow.dom/Coordinate");
}));

/**
 * Positional factory function for shadow.dom/Coordinate.
 */
shadow.dom.__GT_Coordinate = (function shadow$dom$__GT_Coordinate(x,y){
return (new shadow.dom.Coordinate(x,y,null,null,null));
});

/**
 * Factory function for shadow.dom/Coordinate, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Coordinate = (function shadow$dom$map__GT_Coordinate(G__17728){
var extmap__5385__auto__ = (function (){var G__17801 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__17728,new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"y","y",-1757859776)], 0));
if(cljs.core.record_QMARK_(G__17728)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__17801);
} else {
return G__17801;
}
})();
return (new shadow.dom.Coordinate(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(G__17728),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(G__17728),null,cljs.core.not_empty(extmap__5385__auto__),null));
});

shadow.dom.get_position = (function shadow$dom$get_position(el){
var pos = goog.style.getPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_client_position = (function shadow$dom$get_client_position(el){
var pos = goog.style.getClientPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_page_offset = (function shadow$dom$get_page_offset(el){
var pos = goog.style.getPageOffset(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Size = (function (w,h,__meta,__extmap,__hash){
this.w = w;
this.h = h;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5343__auto__,k__5344__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return this__5343__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5344__auto__,null);
}));

(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5345__auto__,k17824,else__5346__auto__){
var self__ = this;
var this__5345__auto____$1 = this;
var G__17840 = k17824;
var G__17840__$1 = (((G__17840 instanceof cljs.core.Keyword))?G__17840.fqn:null);
switch (G__17840__$1) {
case "w":
return self__.w;

break;
case "h":
return self__.h;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k17824,else__5346__auto__);

}
}));

(shadow.dom.Size.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5363__auto__,f__5364__auto__,init__5365__auto__){
var self__ = this;
var this__5363__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5366__auto__,p__17849){
var vec__17850 = p__17849;
var k__5367__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17850,(0),null);
var v__5368__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17850,(1),null);
return (f__5364__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5364__auto__.cljs$core$IFn$_invoke$arity$3(ret__5366__auto__,k__5367__auto__,v__5368__auto__) : f__5364__auto__.call(null,ret__5366__auto__,k__5367__auto__,v__5368__auto__));
}),init__5365__auto__,this__5363__auto____$1);
}));

(shadow.dom.Size.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5358__auto__,writer__5359__auto__,opts__5360__auto__){
var self__ = this;
var this__5358__auto____$1 = this;
var pr_pair__5361__auto__ = (function (keyval__5362__auto__){
return cljs.core.pr_sequential_writer(writer__5359__auto__,cljs.core.pr_writer,""," ","",opts__5360__auto__,keyval__5362__auto__);
});
return cljs.core.pr_sequential_writer(writer__5359__auto__,pr_pair__5361__auto__,"#shadow.dom.Size{",", ","}",opts__5360__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"w","w",354169001),self__.w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"h","h",1109658740),self__.h],null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__17823){
var self__ = this;
var G__17823__$1 = this;
return (new cljs.core.RecordIter((0),G__17823__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"w","w",354169001),new cljs.core.Keyword(null,"h","h",1109658740)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Size.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5341__auto__){
var self__ = this;
var this__5341__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Size.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5338__auto__){
var self__ = this;
var this__5338__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5347__auto__){
var self__ = this;
var this__5347__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5339__auto__){
var self__ = this;
var this__5339__auto____$1 = this;
var h__5154__auto__ = self__.__hash;
if((!((h__5154__auto__ == null)))){
return h__5154__auto__;
} else {
var h__5154__auto____$1 = (function (coll__5340__auto__){
return (-1228019642 ^ cljs.core.hash_unordered_coll(coll__5340__auto__));
})(this__5339__auto____$1);
(self__.__hash = h__5154__auto____$1);

return h__5154__auto____$1;
}
}));

(shadow.dom.Size.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this17825,other17826){
var self__ = this;
var this17825__$1 = this;
return (((!((other17826 == null)))) && ((((this17825__$1.constructor === other17826.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this17825__$1.w,other17826.w)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this17825__$1.h,other17826.h)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this17825__$1.__extmap,other17826.__extmap)))))))));
}));

(shadow.dom.Size.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5353__auto__,k__5354__auto__){
var self__ = this;
var this__5353__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"w","w",354169001),null,new cljs.core.Keyword(null,"h","h",1109658740),null], null), null),k__5354__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5353__auto____$1),self__.__meta),k__5354__auto__);
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5354__auto__)),null));
}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5350__auto__,k17824){
var self__ = this;
var this__5350__auto____$1 = this;
var G__17923 = k17824;
var G__17923__$1 = (((G__17923 instanceof cljs.core.Keyword))?G__17923.fqn:null);
switch (G__17923__$1) {
case "w":
case "h":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k17824);

}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5351__auto__,k__5352__auto__,G__17823){
var self__ = this;
var this__5351__auto____$1 = this;
var pred__17935 = cljs.core.keyword_identical_QMARK_;
var expr__17936 = k__5352__auto__;
if(cljs.core.truth_((pred__17935.cljs$core$IFn$_invoke$arity$2 ? pred__17935.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"w","w",354169001),expr__17936) : pred__17935.call(null,new cljs.core.Keyword(null,"w","w",354169001),expr__17936)))){
return (new shadow.dom.Size(G__17823,self__.h,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__17935.cljs$core$IFn$_invoke$arity$2 ? pred__17935.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"h","h",1109658740),expr__17936) : pred__17935.call(null,new cljs.core.Keyword(null,"h","h",1109658740),expr__17936)))){
return (new shadow.dom.Size(self__.w,G__17823,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5352__auto__,G__17823),null));
}
}
}));

(shadow.dom.Size.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5356__auto__){
var self__ = this;
var this__5356__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"w","w",354169001),self__.w,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"h","h",1109658740),self__.h,null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5342__auto__,G__17823){
var self__ = this;
var this__5342__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,G__17823,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5348__auto__,entry__5349__auto__){
var self__ = this;
var this__5348__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5349__auto__)){
return this__5348__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5349__auto__,(0)),cljs.core._nth(entry__5349__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5348__auto____$1,entry__5349__auto__);
}
}));

(shadow.dom.Size.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"w","w",1994700528,null),new cljs.core.Symbol(null,"h","h",-1544777029,null)], null);
}));

(shadow.dom.Size.cljs$lang$type = true);

(shadow.dom.Size.cljs$lang$ctorPrSeq = (function (this__5389__auto__){
return (new cljs.core.List(null,"shadow.dom/Size",null,(1),null));
}));

(shadow.dom.Size.cljs$lang$ctorPrWriter = (function (this__5389__auto__,writer__5390__auto__){
return cljs.core._write(writer__5390__auto__,"shadow.dom/Size");
}));

/**
 * Positional factory function for shadow.dom/Size.
 */
shadow.dom.__GT_Size = (function shadow$dom$__GT_Size(w,h){
return (new shadow.dom.Size(w,h,null,null,null));
});

/**
 * Factory function for shadow.dom/Size, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Size = (function shadow$dom$map__GT_Size(G__17832){
var extmap__5385__auto__ = (function (){var G__17954 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__17832,new cljs.core.Keyword(null,"w","w",354169001),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"h","h",1109658740)], 0));
if(cljs.core.record_QMARK_(G__17832)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__17954);
} else {
return G__17954;
}
})();
return (new shadow.dom.Size(new cljs.core.Keyword(null,"w","w",354169001).cljs$core$IFn$_invoke$arity$1(G__17832),new cljs.core.Keyword(null,"h","h",1109658740).cljs$core$IFn$_invoke$arity$1(G__17832),null,cljs.core.not_empty(extmap__5385__auto__),null));
});

shadow.dom.size__GT_clj = (function shadow$dom$size__GT_clj(size){
return (new shadow.dom.Size(size.width,size.height,null,null,null));
});
shadow.dom.get_size = (function shadow$dom$get_size(el){
return shadow.dom.size__GT_clj(goog.style.getSize(shadow.dom.dom_node(el)));
});
shadow.dom.get_height = (function shadow$dom$get_height(el){
return shadow.dom.get_size(el).h;
});
shadow.dom.get_viewport_size = (function shadow$dom$get_viewport_size(){
return shadow.dom.size__GT_clj(goog.dom.getViewportSize());
});
shadow.dom.first_child = (function shadow$dom$first_child(el){
return (shadow.dom.dom_node(el).children[(0)]);
});
shadow.dom.select_option_values = (function shadow$dom$select_option_values(el){
var native$ = shadow.dom.dom_node(el);
var opts = (native$["options"]);
var a__5633__auto__ = opts;
var l__5634__auto__ = a__5633__auto__.length;
var i = (0);
var ret = cljs.core.PersistentVector.EMPTY;
while(true){
if((i < l__5634__auto__)){
var G__18880 = (i + (1));
var G__18881 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,(opts[i]["value"]));
i = G__18880;
ret = G__18881;
continue;
} else {
return ret;
}
break;
}
});
shadow.dom.build_url = (function shadow$dom$build_url(path,query_params){
if(cljs.core.empty_QMARK_(query_params)){
return path;
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(path),"?",clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__17988){
var vec__17989 = p__17988;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17989,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__17989,(1),null);
return [cljs.core.name(k),"=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(encodeURIComponent(cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)))].join('');
}),query_params))].join('');
}
});
shadow.dom.redirect = (function shadow$dom$redirect(var_args){
var G__17997 = arguments.length;
switch (G__17997) {
case 1:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1 = (function (path){
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2(path,cljs.core.PersistentArrayMap.EMPTY);
}));

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2 = (function (path,query_params){
return (document["location"]["href"] = shadow.dom.build_url(path,query_params));
}));

(shadow.dom.redirect.cljs$lang$maxFixedArity = 2);

shadow.dom.reload_BANG_ = (function shadow$dom$reload_BANG_(){
return (document.location.href = document.location.href);
});
shadow.dom.tag_name = (function shadow$dom$tag_name(el){
var dom = shadow.dom.dom_node(el);
return dom.tagName;
});
shadow.dom.insert_after = (function shadow$dom$insert_after(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingAfter(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_before = (function shadow$dom$insert_before(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingBefore(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_first = (function shadow$dom$insert_first(ref,new$){
var temp__5802__auto__ = shadow.dom.dom_node(ref).firstChild;
if(cljs.core.truth_(temp__5802__auto__)){
var child = temp__5802__auto__;
return shadow.dom.insert_before(child,new$);
} else {
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2(ref,new$);
}
});
shadow.dom.index_of = (function shadow$dom$index_of(el){
var el__$1 = shadow.dom.dom_node(el);
var i = (0);
while(true){
var ps = el__$1.previousSibling;
if((ps == null)){
return i;
} else {
var G__18898 = ps;
var G__18899 = (i + (1));
el__$1 = G__18898;
i = G__18899;
continue;
}
break;
}
});
shadow.dom.get_parent = (function shadow$dom$get_parent(el){
return goog.dom.getParentElement(shadow.dom.dom_node(el));
});
shadow.dom.parents = (function shadow$dom$parents(el){
var parent = shadow.dom.get_parent(el);
if(cljs.core.truth_(parent)){
return cljs.core.cons(parent,(new cljs.core.LazySeq(null,(function (){
return (shadow.dom.parents.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.parents.cljs$core$IFn$_invoke$arity$1(parent) : shadow.dom.parents.call(null,parent));
}),null,null)));
} else {
return null;
}
});
shadow.dom.matches = (function shadow$dom$matches(el,sel){
return shadow.dom.dom_node(el).matches(sel);
});
shadow.dom.get_next_sibling = (function shadow$dom$get_next_sibling(el){
return goog.dom.getNextElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.get_previous_sibling = (function shadow$dom$get_previous_sibling(el){
return goog.dom.getPreviousElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.xmlns = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, ["svg","http://www.w3.org/2000/svg","xlink","http://www.w3.org/1999/xlink"], null));
shadow.dom.create_svg_node = (function shadow$dom$create_svg_node(tag_def,props){
var vec__18062 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18062,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18062,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18062,(2),null);
var el = document.createElementNS("http://www.w3.org/2000/svg",tag_name);
if(cljs.core.truth_(tag_id)){
el.setAttribute("id",tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
el.setAttribute("class",shadow.dom.merge_class_string(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(props),tag_classes));
} else {
}

var seq__18067_18900 = cljs.core.seq(props);
var chunk__18068_18901 = null;
var count__18069_18902 = (0);
var i__18070_18903 = (0);
while(true){
if((i__18070_18903 < count__18069_18902)){
var vec__18106_18906 = chunk__18068_18901.cljs$core$IIndexed$_nth$arity$2(null,i__18070_18903);
var k_18907 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18106_18906,(0),null);
var v_18909 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18106_18906,(1),null);
el.setAttributeNS((function (){var temp__5804__auto__ = cljs.core.namespace(k_18907);
if(cljs.core.truth_(temp__5804__auto__)){
var ns = temp__5804__auto__;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_18907),v_18909);


var G__18910 = seq__18067_18900;
var G__18911 = chunk__18068_18901;
var G__18912 = count__18069_18902;
var G__18913 = (i__18070_18903 + (1));
seq__18067_18900 = G__18910;
chunk__18068_18901 = G__18911;
count__18069_18902 = G__18912;
i__18070_18903 = G__18913;
continue;
} else {
var temp__5804__auto___18914 = cljs.core.seq(seq__18067_18900);
if(temp__5804__auto___18914){
var seq__18067_18915__$1 = temp__5804__auto___18914;
if(cljs.core.chunked_seq_QMARK_(seq__18067_18915__$1)){
var c__5568__auto___18916 = cljs.core.chunk_first(seq__18067_18915__$1);
var G__18917 = cljs.core.chunk_rest(seq__18067_18915__$1);
var G__18918 = c__5568__auto___18916;
var G__18919 = cljs.core.count(c__5568__auto___18916);
var G__18920 = (0);
seq__18067_18900 = G__18917;
chunk__18068_18901 = G__18918;
count__18069_18902 = G__18919;
i__18070_18903 = G__18920;
continue;
} else {
var vec__18119_18921 = cljs.core.first(seq__18067_18915__$1);
var k_18922 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18119_18921,(0),null);
var v_18923 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18119_18921,(1),null);
el.setAttributeNS((function (){var temp__5804__auto____$1 = cljs.core.namespace(k_18922);
if(cljs.core.truth_(temp__5804__auto____$1)){
var ns = temp__5804__auto____$1;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_18922),v_18923);


var G__18924 = cljs.core.next(seq__18067_18915__$1);
var G__18925 = null;
var G__18926 = (0);
var G__18927 = (0);
seq__18067_18900 = G__18924;
chunk__18068_18901 = G__18925;
count__18069_18902 = G__18926;
i__18070_18903 = G__18927;
continue;
}
} else {
}
}
break;
}

return el;
});
shadow.dom.svg_node = (function shadow$dom$svg_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$SVGElement$))))?true:false):false)){
return el.shadow$dom$SVGElement$_to_svg$arity$1(null);
} else {
return el;

}
}
});
shadow.dom.make_svg_node = (function shadow$dom$make_svg_node(structure){
var vec__18134 = shadow.dom.destructure_node(shadow.dom.create_svg_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18134,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__18134,(1),null);
var seq__18137_18928 = cljs.core.seq(node_children);
var chunk__18139_18929 = null;
var count__18140_18930 = (0);
var i__18141_18931 = (0);
while(true){
if((i__18141_18931 < count__18140_18930)){
var child_struct_18932 = chunk__18139_18929.cljs$core$IIndexed$_nth$arity$2(null,i__18141_18931);
if((!((child_struct_18932 == null)))){
if(typeof child_struct_18932 === 'string'){
var text_18933 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_18933),child_struct_18932].join(''));
} else {
var children_18934 = shadow.dom.svg_node(child_struct_18932);
if(cljs.core.seq_QMARK_(children_18934)){
var seq__18198_18937 = cljs.core.seq(children_18934);
var chunk__18200_18938 = null;
var count__18201_18939 = (0);
var i__18202_18940 = (0);
while(true){
if((i__18202_18940 < count__18201_18939)){
var child_18942 = chunk__18200_18938.cljs$core$IIndexed$_nth$arity$2(null,i__18202_18940);
if(cljs.core.truth_(child_18942)){
node.appendChild(child_18942);


var G__18943 = seq__18198_18937;
var G__18944 = chunk__18200_18938;
var G__18945 = count__18201_18939;
var G__18946 = (i__18202_18940 + (1));
seq__18198_18937 = G__18943;
chunk__18200_18938 = G__18944;
count__18201_18939 = G__18945;
i__18202_18940 = G__18946;
continue;
} else {
var G__18947 = seq__18198_18937;
var G__18948 = chunk__18200_18938;
var G__18949 = count__18201_18939;
var G__18950 = (i__18202_18940 + (1));
seq__18198_18937 = G__18947;
chunk__18200_18938 = G__18948;
count__18201_18939 = G__18949;
i__18202_18940 = G__18950;
continue;
}
} else {
var temp__5804__auto___18951 = cljs.core.seq(seq__18198_18937);
if(temp__5804__auto___18951){
var seq__18198_18952__$1 = temp__5804__auto___18951;
if(cljs.core.chunked_seq_QMARK_(seq__18198_18952__$1)){
var c__5568__auto___18953 = cljs.core.chunk_first(seq__18198_18952__$1);
var G__18954 = cljs.core.chunk_rest(seq__18198_18952__$1);
var G__18955 = c__5568__auto___18953;
var G__18956 = cljs.core.count(c__5568__auto___18953);
var G__18957 = (0);
seq__18198_18937 = G__18954;
chunk__18200_18938 = G__18955;
count__18201_18939 = G__18956;
i__18202_18940 = G__18957;
continue;
} else {
var child_18961 = cljs.core.first(seq__18198_18952__$1);
if(cljs.core.truth_(child_18961)){
node.appendChild(child_18961);


var G__18962 = cljs.core.next(seq__18198_18952__$1);
var G__18963 = null;
var G__18964 = (0);
var G__18965 = (0);
seq__18198_18937 = G__18962;
chunk__18200_18938 = G__18963;
count__18201_18939 = G__18964;
i__18202_18940 = G__18965;
continue;
} else {
var G__18966 = cljs.core.next(seq__18198_18952__$1);
var G__18967 = null;
var G__18968 = (0);
var G__18969 = (0);
seq__18198_18937 = G__18966;
chunk__18200_18938 = G__18967;
count__18201_18939 = G__18968;
i__18202_18940 = G__18969;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_18934);
}
}


var G__18970 = seq__18137_18928;
var G__18971 = chunk__18139_18929;
var G__18972 = count__18140_18930;
var G__18973 = (i__18141_18931 + (1));
seq__18137_18928 = G__18970;
chunk__18139_18929 = G__18971;
count__18140_18930 = G__18972;
i__18141_18931 = G__18973;
continue;
} else {
var G__18974 = seq__18137_18928;
var G__18975 = chunk__18139_18929;
var G__18976 = count__18140_18930;
var G__18977 = (i__18141_18931 + (1));
seq__18137_18928 = G__18974;
chunk__18139_18929 = G__18975;
count__18140_18930 = G__18976;
i__18141_18931 = G__18977;
continue;
}
} else {
var temp__5804__auto___18978 = cljs.core.seq(seq__18137_18928);
if(temp__5804__auto___18978){
var seq__18137_18979__$1 = temp__5804__auto___18978;
if(cljs.core.chunked_seq_QMARK_(seq__18137_18979__$1)){
var c__5568__auto___18980 = cljs.core.chunk_first(seq__18137_18979__$1);
var G__18981 = cljs.core.chunk_rest(seq__18137_18979__$1);
var G__18982 = c__5568__auto___18980;
var G__18983 = cljs.core.count(c__5568__auto___18980);
var G__18984 = (0);
seq__18137_18928 = G__18981;
chunk__18139_18929 = G__18982;
count__18140_18930 = G__18983;
i__18141_18931 = G__18984;
continue;
} else {
var child_struct_18985 = cljs.core.first(seq__18137_18979__$1);
if((!((child_struct_18985 == null)))){
if(typeof child_struct_18985 === 'string'){
var text_18986 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_18986),child_struct_18985].join(''));
} else {
var children_18987 = shadow.dom.svg_node(child_struct_18985);
if(cljs.core.seq_QMARK_(children_18987)){
var seq__18234_18988 = cljs.core.seq(children_18987);
var chunk__18236_18989 = null;
var count__18237_18990 = (0);
var i__18238_18991 = (0);
while(true){
if((i__18238_18991 < count__18237_18990)){
var child_18992 = chunk__18236_18989.cljs$core$IIndexed$_nth$arity$2(null,i__18238_18991);
if(cljs.core.truth_(child_18992)){
node.appendChild(child_18992);


var G__18993 = seq__18234_18988;
var G__18994 = chunk__18236_18989;
var G__18995 = count__18237_18990;
var G__18996 = (i__18238_18991 + (1));
seq__18234_18988 = G__18993;
chunk__18236_18989 = G__18994;
count__18237_18990 = G__18995;
i__18238_18991 = G__18996;
continue;
} else {
var G__18997 = seq__18234_18988;
var G__18998 = chunk__18236_18989;
var G__18999 = count__18237_18990;
var G__19000 = (i__18238_18991 + (1));
seq__18234_18988 = G__18997;
chunk__18236_18989 = G__18998;
count__18237_18990 = G__18999;
i__18238_18991 = G__19000;
continue;
}
} else {
var temp__5804__auto___19001__$1 = cljs.core.seq(seq__18234_18988);
if(temp__5804__auto___19001__$1){
var seq__18234_19002__$1 = temp__5804__auto___19001__$1;
if(cljs.core.chunked_seq_QMARK_(seq__18234_19002__$1)){
var c__5568__auto___19003 = cljs.core.chunk_first(seq__18234_19002__$1);
var G__19004 = cljs.core.chunk_rest(seq__18234_19002__$1);
var G__19005 = c__5568__auto___19003;
var G__19006 = cljs.core.count(c__5568__auto___19003);
var G__19007 = (0);
seq__18234_18988 = G__19004;
chunk__18236_18989 = G__19005;
count__18237_18990 = G__19006;
i__18238_18991 = G__19007;
continue;
} else {
var child_19012 = cljs.core.first(seq__18234_19002__$1);
if(cljs.core.truth_(child_19012)){
node.appendChild(child_19012);


var G__19013 = cljs.core.next(seq__18234_19002__$1);
var G__19014 = null;
var G__19015 = (0);
var G__19016 = (0);
seq__18234_18988 = G__19013;
chunk__18236_18989 = G__19014;
count__18237_18990 = G__19015;
i__18238_18991 = G__19016;
continue;
} else {
var G__19017 = cljs.core.next(seq__18234_19002__$1);
var G__19018 = null;
var G__19019 = (0);
var G__19020 = (0);
seq__18234_18988 = G__19017;
chunk__18236_18989 = G__19018;
count__18237_18990 = G__19019;
i__18238_18991 = G__19020;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_18987);
}
}


var G__19021 = cljs.core.next(seq__18137_18979__$1);
var G__19022 = null;
var G__19023 = (0);
var G__19024 = (0);
seq__18137_18928 = G__19021;
chunk__18139_18929 = G__19022;
count__18140_18930 = G__19023;
i__18141_18931 = G__19024;
continue;
} else {
var G__19025 = cljs.core.next(seq__18137_18979__$1);
var G__19026 = null;
var G__19027 = (0);
var G__19028 = (0);
seq__18137_18928 = G__19025;
chunk__18139_18929 = G__19026;
count__18140_18930 = G__19027;
i__18141_18931 = G__19028;
continue;
}
}
} else {
}
}
break;
}

return node;
});
(shadow.dom.SVGElement["string"] = true);

(shadow.dom._to_svg["string"] = (function (this$){
if((this$ instanceof cljs.core.Keyword)){
return shadow.dom.make_svg_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$], null));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("strings cannot be in svgs",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"this","this",-611633625),this$], null));
}
}));

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_svg_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_svg,this$__$1);
}));

(shadow.dom.SVGElement["null"] = true);

(shadow.dom._to_svg["null"] = (function (_){
return null;
}));
shadow.dom.svg = (function shadow$dom$svg(var_args){
var args__5775__auto__ = [];
var len__5769__auto___19029 = arguments.length;
var i__5770__auto___19030 = (0);
while(true){
if((i__5770__auto___19030 < len__5769__auto___19029)){
args__5775__auto__.push((arguments[i__5770__auto___19030]));

var G__19032 = (i__5770__auto___19030 + (1));
i__5770__auto___19030 = G__19032;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic = (function (attrs,children){
return shadow.dom._to_svg(cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"svg","svg",856789142),attrs], null),children)));
}));

(shadow.dom.svg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.dom.svg.cljs$lang$applyTo = (function (seq18327){
var G__18328 = cljs.core.first(seq18327);
var seq18327__$1 = cljs.core.next(seq18327);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__18328,seq18327__$1);
}));

/**
 * returns a channel for events on el
 * transform-fn should be a (fn [e el] some-val) where some-val will be put on the chan
 * once-or-cleanup handles the removal of the event handler
 * - true: remove after one event
 * - false: never removed
 * - chan: remove on msg/close
 */
shadow.dom.event_chan = (function shadow$dom$event_chan(var_args){
var G__18356 = arguments.length;
switch (G__18356) {
case 2:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$2 = (function (el,event){
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4(el,event,null,false);
}));

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$3 = (function (el,event,xf){
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4(el,event,xf,false);
}));

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4 = (function (el,event,xf,once_or_cleanup){
var buf = cljs.core.async.sliding_buffer((1));
var chan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(buf,xf);
var event_fn = (function shadow$dom$event_fn(e){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(chan,e);

if(once_or_cleanup === true){
shadow.dom.remove_event_handler(el,event,shadow$dom$event_fn);

return cljs.core.async.close_BANG_(chan);
} else {
return null;
}
});
shadow.dom.dom_listen(shadow.dom.dom_node(el),cljs.core.name(event),event_fn);

if(cljs.core.truth_((function (){var and__5043__auto__ = once_or_cleanup;
if(cljs.core.truth_(and__5043__auto__)){
return (!(once_or_cleanup === true));
} else {
return and__5043__auto__;
}
})())){
var c__13428__auto___19038 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = (function (state_18390){
var state_val_18391 = (state_18390[(1)]);
if((state_val_18391 === (1))){
var state_18390__$1 = state_18390;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_18390__$1,(2),once_or_cleanup);
} else {
if((state_val_18391 === (2))){
var inst_18387 = (state_18390[(2)]);
var inst_18388 = shadow.dom.remove_event_handler(el,event,event_fn);
var state_18390__$1 = (function (){var statearr_18397 = state_18390;
(statearr_18397[(7)] = inst_18387);

return statearr_18397;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_18390__$1,inst_18388);
} else {
return null;
}
}
});
return (function() {
var shadow$dom$state_machine__12860__auto__ = null;
var shadow$dom$state_machine__12860__auto____0 = (function (){
var statearr_18398 = [null,null,null,null,null,null,null,null];
(statearr_18398[(0)] = shadow$dom$state_machine__12860__auto__);

(statearr_18398[(1)] = (1));

return statearr_18398;
});
var shadow$dom$state_machine__12860__auto____1 = (function (state_18390){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_18390);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e18399){var ex__12863__auto__ = e18399;
var statearr_18400_19041 = state_18390;
(statearr_18400_19041[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_18390[(4)]))){
var statearr_18405_19044 = state_18390;
(statearr_18405_19044[(1)] = cljs.core.first((state_18390[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19046 = state_18390;
state_18390 = G__19046;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
shadow$dom$state_machine__12860__auto__ = function(state_18390){
switch(arguments.length){
case 0:
return shadow$dom$state_machine__12860__auto____0.call(this);
case 1:
return shadow$dom$state_machine__12860__auto____1.call(this,state_18390);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
shadow$dom$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = shadow$dom$state_machine__12860__auto____0;
shadow$dom$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = shadow$dom$state_machine__12860__auto____1;
return shadow$dom$state_machine__12860__auto__;
})()
})();
var state__13430__auto__ = (function (){var statearr_18414 = f__13429__auto__();
(statearr_18414[(6)] = c__13428__auto___19038);

return statearr_18414;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
}));

} else {
}

return chan;
}));

(shadow.dom.event_chan.cljs$lang$maxFixedArity = 4);


//# sourceMappingURL=shadow.dom.js.map
