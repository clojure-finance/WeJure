goog.provide('cljs_ipfs_api.utils');
cljs_ipfs_api.utils.safe_case = (function cljs_ipfs_api$utils$safe_case(case_f){
return (function (x){
var G__13063 = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(cljs.core.name(x),(1));
var G__13063__$1 = clojure.string.replace(G__13063,"_","*")
;
var G__13063__$2 = (case_f.cljs$core$IFn$_invoke$arity$1 ? case_f.cljs$core$IFn$_invoke$arity$1(G__13063__$1) : case_f.call(null,G__13063__$1))
;
var G__13063__$3 = clojure.string.replace(G__13063__$2,"*","_")
;
var G__13063__$4 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.first(cljs.core.name(x))),G__13063__$3].join('')
;
if((x instanceof cljs.core.Keyword)){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(G__13063__$4);
} else {
return G__13063__$4;
}
});
});
cljs_ipfs_api.utils.camel_case = cljs_ipfs_api.utils.safe_case(camel_snake_kebab.core.__GT_camelCase);
cljs_ipfs_api.utils.kebab_case = cljs_ipfs_api.utils.safe_case(camel_snake_kebab.core.__GT_kebab_case);
cljs_ipfs_api.utils.js__GT_cljk = (function cljs_ipfs_api$utils$js__GT_cljk(p1__13064_SHARP_){
return cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(p1__13064_SHARP_,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true], 0));
});
/**
 * From JavaScript to Clojure with kekab-cased keywords.
 */
cljs_ipfs_api.utils.js__GT_cljkk = cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(camel_snake_kebab.extras.transform_keys,cljs_ipfs_api.utils.kebab_case),cljs_ipfs_api.utils.js__GT_cljk);
/**
 * From Clojure with kebab-cased keywords to JavaScript.
 */
cljs_ipfs_api.utils.cljkk__GT_js = cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.clj__GT_js,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(camel_snake_kebab.extras.transform_keys,cljs_ipfs_api.utils.camel_case));
cljs_ipfs_api.utils.callback_js__GT_clj = (function cljs_ipfs_api$utils$callback_js__GT_clj(x){
if(cljs.core.fn_QMARK_(x)){
return (function (err,res){
if(cljs.core.truth_((function (){var and__5043__auto__ = res;
if(cljs.core.truth_(and__5043__auto__)){
return (res["v"]);
} else {
return and__5043__auto__;
}
})())){
(res["v"] = (res["v"]));
} else {
}

var G__13065 = err;
var G__13066 = cljs_ipfs_api.utils.js__GT_cljkk(res);
return (x.cljs$core$IFn$_invoke$arity$2 ? x.cljs$core$IFn$_invoke$arity$2(G__13065,G__13066) : x.call(null,G__13065,G__13066));
});
} else {
return x;
}
});
cljs_ipfs_api.utils.args_cljkk__GT_js = (function cljs_ipfs_api$utils$args_cljkk__GT_js(args){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs_ipfs_api.utils.cljkk__GT_js,cljs_ipfs_api.utils.callback_js__GT_clj),args);
});
cljs_ipfs_api.utils.js_apply = (function cljs_ipfs_api$utils$js_apply(var_args){
var G__13068 = arguments.length;
switch (G__13068) {
case 2:
return cljs_ipfs_api.utils.js_apply.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs_ipfs_api.utils.js_apply.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs_ipfs_api.utils.js_apply.cljs$core$IFn$_invoke$arity$2 = (function (this$,method_name){
return cljs_ipfs_api.utils.js_apply.cljs$core$IFn$_invoke$arity$3(this$,method_name,null);
}));

(cljs_ipfs_api.utils.js_apply.cljs$core$IFn$_invoke$arity$3 = (function (this$,method_name,args){
if(cljs.core.truth_((this$[method_name]))){
return cljs_ipfs_api.utils.js__GT_cljkk(cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.js_invoke,this$,method_name,cljs_ipfs_api.utils.args_cljkk__GT_js(args)));
} else {
throw ["Method: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(method_name)," was not found in object."].join('');
}
}));

(cljs_ipfs_api.utils.js_apply.cljs$lang$maxFixedArity = 3);

cljs_ipfs_api.utils.js_prototype_apply = (function cljs_ipfs_api$utils$js_prototype_apply(js_obj,method_name,args){
return cljs_ipfs_api.utils.js_apply.cljs$core$IFn$_invoke$arity$3((js_obj["prototype"]),method_name,args);
});
cljs_ipfs_api.utils.wrap_callback = (function cljs_ipfs_api$utils$wrap_callback(f_n){
var callback = (function cljs_ipfs_api$utils$wrap_callback_$_callback(err,res){
if((f_n instanceof cljs.core.async.impl.channels.ManyToManyChannel)){
var c__11255__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__11256__auto__ = (function (){var switch__11138__auto__ = (function (state_13077){
var state_val_13078 = (state_13077[(1)]);
if((state_val_13078 === (1))){
var inst_13069 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_13070 = cljs_ipfs_api.utils.js__GT_cljkk(err);
var inst_13071 = cljs_ipfs_api.utils.js__GT_cljkk(res);
var inst_13072 = [inst_13070,inst_13071];
var inst_13073 = (new cljs.core.PersistentVector(null,2,(5),inst_13069,inst_13072,null));
var state_13077__$1 = state_13077;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_13077__$1,(2),f_n,inst_13073);
} else {
if((state_val_13078 === (2))){
var inst_13075 = (state_13077[(2)]);
var state_13077__$1 = state_13077;
return cljs.core.async.impl.ioc_helpers.return_chan(state_13077__$1,inst_13075);
} else {
return null;
}
}
});
return (function() {
var cljs_ipfs_api$utils$wrap_callback_$_callback_$_state_machine__11139__auto__ = null;
var cljs_ipfs_api$utils$wrap_callback_$_callback_$_state_machine__11139__auto____0 = (function (){
var statearr_13079 = [null,null,null,null,null,null,null];
(statearr_13079[(0)] = cljs_ipfs_api$utils$wrap_callback_$_callback_$_state_machine__11139__auto__);

(statearr_13079[(1)] = (1));

return statearr_13079;
});
var cljs_ipfs_api$utils$wrap_callback_$_callback_$_state_machine__11139__auto____1 = (function (state_13077){
while(true){
var ret_value__11140__auto__ = (function (){try{while(true){
var result__11141__auto__ = switch__11138__auto__(state_13077);
if(cljs.core.keyword_identical_QMARK_(result__11141__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__11141__auto__;
}
break;
}
}catch (e13080){var ex__11142__auto__ = e13080;
var statearr_13081_13102 = state_13077;
(statearr_13081_13102[(2)] = ex__11142__auto__);


if(cljs.core.seq((state_13077[(4)]))){
var statearr_13082_13103 = state_13077;
(statearr_13082_13103[(1)] = cljs.core.first((state_13077[(4)])));

} else {
throw ex__11142__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__11140__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13106 = state_13077;
state_13077 = G__13106;
continue;
} else {
return ret_value__11140__auto__;
}
break;
}
});
cljs_ipfs_api$utils$wrap_callback_$_callback_$_state_machine__11139__auto__ = function(state_13077){
switch(arguments.length){
case 0:
return cljs_ipfs_api$utils$wrap_callback_$_callback_$_state_machine__11139__auto____0.call(this);
case 1:
return cljs_ipfs_api$utils$wrap_callback_$_callback_$_state_machine__11139__auto____1.call(this,state_13077);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs_ipfs_api$utils$wrap_callback_$_callback_$_state_machine__11139__auto__.cljs$core$IFn$_invoke$arity$0 = cljs_ipfs_api$utils$wrap_callback_$_callback_$_state_machine__11139__auto____0;
cljs_ipfs_api$utils$wrap_callback_$_callback_$_state_machine__11139__auto__.cljs$core$IFn$_invoke$arity$1 = cljs_ipfs_api$utils$wrap_callback_$_callback_$_state_machine__11139__auto____1;
return cljs_ipfs_api$utils$wrap_callback_$_callback_$_state_machine__11139__auto__;
})()
})();
var state__11257__auto__ = (function (){var statearr_13083 = f__11256__auto__();
(statearr_13083[(6)] = c__11255__auto__);

return statearr_13083;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__11257__auto__);
}));

return c__11255__auto__;
} else {
if(cljs.core.fn_QMARK_(f_n)){
var G__13084 = cljs_ipfs_api.utils.js__GT_cljkk(err);
var G__13085 = cljs_ipfs_api.utils.js__GT_cljkk(res);
return (f_n.cljs$core$IFn$_invoke$arity$2 ? f_n.cljs$core$IFn$_invoke$arity$2(G__13084,G__13085) : f_n.call(null,G__13084,G__13085));
} else {
return f_n;
}
}
});
return callback;
});
cljs_ipfs_api.utils.is_blob_QMARK_ = (function cljs_ipfs_api$utils$is_blob_QMARK_(x){

if((typeof Blob !== 'undefined')){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.type(x),Blob);
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.type(x).name,"Blob");
}
});
cljs_ipfs_api.utils.last_response = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs_ipfs_api.utils.web_http_call = (function cljs_ipfs_api$utils$web_http_call(url,args,p__13086){
var map__13087 = p__13086;
var map__13087__$1 = cljs.core.__destructure_map(map__13087);
var params = map__13087__$1;
var opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13087__$1,new cljs.core.Keyword(null,"opts","opts",155075701));
var callback = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13087__$1,new cljs.core.Keyword(null,"callback","callback",-705136228));
var opts__$1 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(opts,new cljs.core.Keyword(null,"req-opts","req-opts",236427321));
var blobless_args = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs_ipfs_api.utils.is_blob_QMARK_,args);
var basic_opts = ((cljs.core.empty_QMARK_(blobless_args))?null:new cljs.core.PersistentArrayMap(null, 1, ["arg",clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",blobless_args)], null));
var url_extra_opts = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([basic_opts,opts__$1], 0));
var url_with_params = district.format.format_url(url,url_extra_opts);
var possible_blob = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs_ipfs_api.utils.is_blob_QMARK_,args));
var request_body = (cljs.core.truth_(possible_blob)?(function (){var G__13088 = (new FormData());
G__13088.append("file",possible_blob);

return G__13088;
})():null);
var update_response_run_callback = (function (response){
cljs.core.reset_BANG_(cljs_ipfs_api.utils.last_response,response);

var G__13089 = null;
var G__13090 = cljs_ipfs_api.utils.js__GT_cljkk(response);
return (callback.cljs$core$IFn$_invoke$arity$2 ? callback.cljs$core$IFn$_invoke$arity$2(G__13089,G__13090) : callback.call(null,G__13089,G__13090));
});
var request_settings = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"handler","handler",-195596612),update_response_run_callback,new cljs.core.Keyword(null,"error-handler","error-handler",-484945776),(function (err){
return (callback.cljs$core$IFn$_invoke$arity$2 ? callback.cljs$core$IFn$_invoke$arity$2(err,null) : callback.call(null,err,null));
}),new cljs.core.Keyword(null,"response-format","response-format",1664465322),(ajax.core.raw_response_format.cljs$core$IFn$_invoke$arity$0 ? ajax.core.raw_response_format.cljs$core$IFn$_invoke$arity$0() : ajax.core.raw_response_format.call(null)),new cljs.core.Keyword(null,"body","body",-2049205669),request_body], null);
return ajax.core.POST.cljs$core$IFn$_invoke$arity$variadic(url_with_params,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([request_settings], 0));
});
cljs_ipfs_api.utils.node_http_call = (function cljs_ipfs_api$utils$node_http_call(url,args,params){
var temp__5802__auto__ = new cljs.core.Keyword(null,"callback","callback",-705136228).cljs$core$IFn$_invoke$arity$1(params);
if(cljs.core.truth_(temp__5802__auto__)){
var cb = temp__5802__auto__;
var rm = require("request");
var fs = require("fs");
var on_done = (function (err,oresp,obody){
var err__$1 = cljs_ipfs_api.utils.js__GT_cljkk(err);
var resp = cljs_ipfs_api.utils.js__GT_cljkk(oresp);
if(cljs.core.truth_(err__$1)){
return (cb.cljs$core$IFn$_invoke$arity$2 ? cb.cljs$core$IFn$_invoke$arity$2(err__$1,null) : cb.call(null,err__$1,null));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(resp.statusCode,(200))){
if(cljs.core.truth_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"opts","opts",155075701),new cljs.core.Keyword(null,"binary?","binary?",-589404570)], null)))){
return (cb.cljs$core$IFn$_invoke$arity$2 ? cb.cljs$core$IFn$_invoke$arity$2(null,obody) : cb.call(null,null,obody));
} else {
var G__13091 = null;
var G__13092 = (function (){try{return JSON.parse(cljs_ipfs_api.utils.js__GT_cljkk(obody));
}catch (e13093){if((e13093 instanceof SyntaxError)){
var e = e13093;
return cljs_ipfs_api.utils.js__GT_cljkk(obody);
} else {
throw e13093;

}
}})();
return (cb.cljs$core$IFn$_invoke$arity$2 ? cb.cljs$core$IFn$_invoke$arity$2(G__13091,G__13092) : cb.call(null,G__13091,G__13092));
}
} else {
var G__13094 = resp.statusMessage;
var G__13095 = null;
return (cb.cljs$core$IFn$_invoke$arity$2 ? cb.cljs$core$IFn$_invoke$arity$2(G__13094,G__13095) : cb.call(null,G__13094,G__13095));

}
}
});
var form = (function (){var temp__5804__auto__ = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs_ipfs_api.utils.is_blob_QMARK_,args));
if(cljs.core.truth_(temp__5804__auto__)){
var b = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"formData","formData",-1155796695),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"file","file",-1269645878),b], null)], null);
} else {
return null;
}
})();
var req_options = cljs.core.clj__GT_js(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"url","url",276297046),url,new cljs.core.Keyword(null,"qs","qs",-1900687691),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"arg","arg",-1747261837),clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs_ipfs_api.utils.is_blob_QMARK_,args))], null),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"opts","opts",155075701),new cljs.core.Keyword(null,"req-opts","req-opts",236427321)], null))], 0))], null),(cljs.core.truth_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"opts","opts",155075701),new cljs.core.Keyword(null,"binary?","binary?",-589404570)], null)))?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"encoding","encoding",1728578272),null], null):null),form], 0)));
var req = rm.post(req_options,on_done);
var temp__5804__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"opts","opts",155075701),new cljs.core.Keyword(null,"pipe-to","pipe-to",477119458)], null));
if(cljs.core.truth_(temp__5804__auto__)){
var out = temp__5804__auto__;
return req.pipe(out);
} else {
return null;
}
} else {
return null;
}
});
cljs_ipfs_api.utils.http_call = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core._STAR_target_STAR_,"nodejs"))?cljs_ipfs_api.utils.node_http_call:cljs_ipfs_api.utils.web_http_call);
cljs_ipfs_api.utils.api_call = (function cljs_ipfs_api$utils$api_call(inst,func,args,p__13096){
var map__13097 = p__13096;
var map__13097__$1 = cljs.core.__destructure_map(map__13097);
var params = map__13097__$1;
var options = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13097__$1,new cljs.core.Keyword(null,"options","options",99638489));
var opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13097__$1,new cljs.core.Keyword(null,"opts","opts",155075701));
var G__13098 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"host","host",-1558485167).cljs$core$IFn$_invoke$arity$1(inst)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"endpoint","endpoint",447890044).cljs$core$IFn$_invoke$arity$1(inst)),"/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(func)].join('');
var G__13099 = args;
var G__13100 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([inst,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"opts","opts",155075701),(function (){var or__5045__auto__ = opts;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return options;
}
})(),new cljs.core.Keyword(null,"callback","callback",-705136228),new cljs.core.Keyword(null,"callback","callback",-705136228).cljs$core$IFn$_invoke$arity$1(params)], null)], 0));
return (cljs_ipfs_api.utils.http_call.cljs$core$IFn$_invoke$arity$3 ? cljs_ipfs_api.utils.http_call.cljs$core$IFn$_invoke$arity$3(G__13098,G__13099,G__13100) : cljs_ipfs_api.utils.http_call.call(null,G__13098,G__13099,G__13100));
});

//# sourceMappingURL=cljs_ipfs_api.utils.js.map
