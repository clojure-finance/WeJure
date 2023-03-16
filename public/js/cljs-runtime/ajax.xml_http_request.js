goog.provide('ajax.xml_http_request');
ajax.xml_http_request.ready_state = (function ajax$xml_http_request$ready_state(e){
var G__11771 = e.target.readyState;
var fexpr__11770 = new cljs.core.PersistentArrayMap(null, 5, [(0),new cljs.core.Keyword(null,"not-initialized","not-initialized",-1937378906),(1),new cljs.core.Keyword(null,"connection-established","connection-established",-1403749733),(2),new cljs.core.Keyword(null,"request-received","request-received",2110590540),(3),new cljs.core.Keyword(null,"processing-request","processing-request",-264947221),(4),new cljs.core.Keyword(null,"response-ready","response-ready",245208276)], null);
return (fexpr__11770.cljs$core$IFn$_invoke$arity$1 ? fexpr__11770.cljs$core$IFn$_invoke$arity$1(G__11771) : fexpr__11770.call(null,G__11771));
});
ajax.xml_http_request.append = (function ajax$xml_http_request$append(current,next){
if(cljs.core.truth_(current)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(current),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(next)].join('');
} else {
return next;
}
});
ajax.xml_http_request.process_headers = (function ajax$xml_http_request$process_headers(header_str){
if(cljs.core.truth_(header_str)){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (headers,header_line){
if(cljs.core.truth_(goog.string.isEmptyOrWhitespace(header_line))){
return headers;
} else {
var key_value = goog.string.splitLimit(header_line,": ",(2));
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(headers,(key_value[(0)]),ajax.xml_http_request.append,(key_value[(1)]));
}
}),cljs.core.PersistentArrayMap.EMPTY,header_str.split("\r\n"));
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
});
ajax.xml_http_request.xmlhttprequest = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core._STAR_target_STAR_,"nodejs"))?(function (){var xmlhttprequest = require("xmlhttprequest").XMLHttpRequest;
ajax.xml_http_request.goog$module$goog$object.set(global,"XMLHttpRequest",xmlhttprequest);

return xmlhttprequest;
})():XMLHttpRequest);
(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxImpl$ = cljs.core.PROTOCOL_SENTINEL);

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxImpl$_js_ajax_request$arity$3 = (function (this$,p__11781,handler){
var map__11782 = p__11781;
var map__11782__$1 = cljs.core.__destructure_map(map__11782);
var uri = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11782__$1,new cljs.core.Keyword(null,"uri","uri",-774711847));
var method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11782__$1,new cljs.core.Keyword(null,"method","method",55703592));
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11782__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var headers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11782__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var timeout = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__11782__$1,new cljs.core.Keyword(null,"timeout","timeout",-318625318),(0));
var with_credentials = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__11782__$1,new cljs.core.Keyword(null,"with-credentials","with-credentials",-1163127235),false);
var response_format = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11782__$1,new cljs.core.Keyword(null,"response-format","response-format",1664465322));
var this$__$1 = this;
(this$__$1.withCredentials = with_credentials);

(this$__$1.onreadystatechange = (function (p1__11777_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"response-ready","response-ready",245208276),ajax.xml_http_request.ready_state(p1__11777_SHARP_))){
return (handler.cljs$core$IFn$_invoke$arity$1 ? handler.cljs$core$IFn$_invoke$arity$1(this$__$1) : handler.call(null,this$__$1));
} else {
return null;
}
}));

this$__$1.open(method,uri,true);

(this$__$1.timeout = timeout);

var temp__5804__auto___11867 = new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(response_format);
if(cljs.core.truth_(temp__5804__auto___11867)){
var response_type_11868 = temp__5804__auto___11867;
(this$__$1.responseType = cljs.core.name(response_type_11868));
} else {
}

var seq__11789_11869 = cljs.core.seq(headers);
var chunk__11790_11870 = null;
var count__11791_11871 = (0);
var i__11792_11872 = (0);
while(true){
if((i__11792_11872 < count__11791_11871)){
var vec__11820_11873 = chunk__11790_11870.cljs$core$IIndexed$_nth$arity$2(null,i__11792_11872);
var k_11874 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11820_11873,(0),null);
var v_11875 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11820_11873,(1),null);
this$__$1.setRequestHeader(k_11874,v_11875);


var G__11876 = seq__11789_11869;
var G__11877 = chunk__11790_11870;
var G__11878 = count__11791_11871;
var G__11879 = (i__11792_11872 + (1));
seq__11789_11869 = G__11876;
chunk__11790_11870 = G__11877;
count__11791_11871 = G__11878;
i__11792_11872 = G__11879;
continue;
} else {
var temp__5804__auto___11880 = cljs.core.seq(seq__11789_11869);
if(temp__5804__auto___11880){
var seq__11789_11881__$1 = temp__5804__auto___11880;
if(cljs.core.chunked_seq_QMARK_(seq__11789_11881__$1)){
var c__5568__auto___11882 = cljs.core.chunk_first(seq__11789_11881__$1);
var G__11883 = cljs.core.chunk_rest(seq__11789_11881__$1);
var G__11884 = c__5568__auto___11882;
var G__11885 = cljs.core.count(c__5568__auto___11882);
var G__11886 = (0);
seq__11789_11869 = G__11883;
chunk__11790_11870 = G__11884;
count__11791_11871 = G__11885;
i__11792_11872 = G__11886;
continue;
} else {
var vec__11842_11887 = cljs.core.first(seq__11789_11881__$1);
var k_11888 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11842_11887,(0),null);
var v_11889 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11842_11887,(1),null);
this$__$1.setRequestHeader(k_11888,v_11889);


var G__11890 = cljs.core.next(seq__11789_11881__$1);
var G__11891 = null;
var G__11892 = (0);
var G__11893 = (0);
seq__11789_11869 = G__11890;
chunk__11790_11870 = G__11891;
count__11791_11871 = G__11892;
i__11792_11872 = G__11893;
continue;
}
} else {
}
}
break;
}

this$__$1.send((function (){var or__5045__auto__ = body;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "";
}
})());

return this$__$1;
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxRequest$ = cljs.core.PROTOCOL_SENTINEL);

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxRequest$_abort$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.abort();
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$ = cljs.core.PROTOCOL_SENTINEL);

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_body$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.response;
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_status$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.status;
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_status_text$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.statusText;
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_get_all_headers$arity$1 = (function (this$){
var this$__$1 = this;
return ajax.xml_http_request.process_headers(this$__$1.getAllResponseHeaders());
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_get_response_header$arity$2 = (function (this$,header){
var this$__$1 = this;
return this$__$1.getResponseHeader(header);
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_was_aborted$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),this$__$1.readyState);
}));

//# sourceMappingURL=ajax.xml_http_request.js.map
