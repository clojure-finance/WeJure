goog.provide('com.fulcrologic.guardrails.core');
goog.require('cljs.core');
goog.require('com.fulcrologic.guardrails.impl.externs');
goog.require('com.fulcrologic.guardrails.utils');
goog.require('cljs.core.async');
goog.require('cljs.spec.alpha');
goog.require('clojure.string');
goog.require('expound.alpha');
com.fulcrologic.guardrails.core._EQ__GT_ = new cljs.core.Keyword(null,"ret","ret",-468222814);
com.fulcrologic.guardrails.core._BAR_ = new cljs.core.Keyword(null,"st","st",1455255828);
com.fulcrologic.guardrails.core._LT__ = new cljs.core.Keyword(null,"gen","gen",142575302);
com.fulcrologic.guardrails.core.global_context = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.List.EMPTY);
/**
 * Push a global context, accessible from all threads, onto a stack.
 * Used to add information to what guardrails will report when a function failed a check.
 */
com.fulcrologic.guardrails.core.enter_global_context_BANG_ = (function com$fulcrologic$guardrails$core$enter_global_context_BANG_(ctx){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.guardrails.core.global_context,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.cons,ctx));
});
/**
 * Pops a global context (see `enter-global-context!`).
 * Should be passed the same context that was pushed, although is not enforced, as it's only to be easily compatible with fulcro-spec's hooks API.
 */
com.fulcrologic.guardrails.core.leave_global_context_BANG_ = (function com$fulcrologic$guardrails$core$leave_global_context_BANG_(ctx){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.guardrails.core.global_context,cljs.core.rest);
});
com.fulcrologic.guardrails.core.get_global_context = (function com$fulcrologic$guardrails$core$get_global_context(){
return cljs.core.first(cljs.core.deref(com.fulcrologic.guardrails.core.global_context));
});
if((typeof com !== 'undefined') && (typeof com.fulcrologic !== 'undefined') && (typeof com.fulcrologic.guardrails !== 'undefined') && (typeof com.fulcrologic.guardrails.core !== 'undefined') && (typeof com.fulcrologic.guardrails.core.pending_check_channel !== 'undefined')){
} else {
com.fulcrologic.guardrails.core.pending_check_channel = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.async.dropping_buffer((10000)));
}
if((typeof com !== 'undefined') && (typeof com.fulcrologic !== 'undefined') && (typeof com.fulcrologic.guardrails !== 'undefined') && (typeof com.fulcrologic.guardrails.core !== 'undefined') && (typeof com.fulcrologic.guardrails.core.async_go_channel !== 'undefined')){
} else {
com.fulcrologic.guardrails.core.async_go_channel = (function (){var c__19343__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__19343__auto__){
return (function (){
var f__19344__auto__ = (function (){var switch__19298__auto__ = ((function (c__19343__auto__){
return (function (state_21418){
var state_val_21419 = (state_21418[(1)]);
if((state_val_21419 === (7))){
var inst_21414 = (state_21418[(2)]);
var state_21418__$1 = state_21418;
var statearr_21420_21468 = state_21418__$1;
(statearr_21420_21468[(2)] = inst_21414);

(statearr_21420_21468[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21419 === (1))){
var state_21418__$1 = state_21418;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_21418__$1,(2),com.fulcrologic.guardrails.core.pending_check_channel);
} else {
if((state_val_21419 === (4))){
var inst_21416 = (state_21418[(2)]);
var state_21418__$1 = state_21418;
return cljs.core.async.impl.ioc_helpers.return_chan(state_21418__$1,inst_21416);
} else {
if((state_val_21419 === (6))){
var inst_21412 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Guardrails ASYNC LOOP STOPPED ****************************************"], 0));
var state_21418__$1 = state_21418;
var statearr_21421_21469 = state_21418__$1;
(statearr_21421_21469[(2)] = inst_21412);

(statearr_21421_21469[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21419 === (3))){
var inst_21398 = (state_21418[(7)]);
var state_21418__$1 = state_21418;
if(cljs.core.truth_(inst_21398)){
var statearr_21422_21471 = state_21418__$1;
(statearr_21422_21471[(1)] = (5));

} else {
var statearr_21423_21472 = state_21418__$1;
(statearr_21423_21472[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21419 === (2))){
var inst_21397 = (state_21418[(2)]);
var inst_21398 = inst_21397;
var state_21418__$1 = (function (){var statearr_21424 = state_21418;
(statearr_21424[(7)] = inst_21398);

return statearr_21424;
})();
var statearr_21425_21474 = state_21418__$1;
(statearr_21425_21474[(2)] = null);

(statearr_21425_21474[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21419 === (11))){
var inst_21409 = (state_21418[(2)]);
var inst_21398 = inst_21409;
var state_21418__$1 = (function (){var statearr_21426 = state_21418;
(statearr_21426[(7)] = inst_21398);

return statearr_21426;
})();
var statearr_21427_21475 = state_21418__$1;
(statearr_21427_21475[(2)] = null);

(statearr_21427_21475[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21419 === (9))){
var inst_21401 = (state_21418[(2)]);
var state_21418__$1 = (function (){var statearr_21428 = state_21418;
(statearr_21428[(8)] = inst_21401);

return statearr_21428;
})();
var statearr_21429_21476 = state_21418__$1;
(statearr_21429_21476[(2)] = null);


cljs.core.async.impl.ioc_helpers.process_exception(state_21418__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21419 === (5))){
var state_21418__$1 = state_21418;
var statearr_21430_21480 = state_21418__$1;
(statearr_21430_21480[(2)] = null);

(statearr_21430_21480[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21419 === (10))){
var inst_21398 = (state_21418[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame(state_21418,(9),new cljs.core.Keyword(null,"default","default",-1987822328),null,(8));
var inst_21405 = (inst_21398.cljs$core$IFn$_invoke$arity$0 ? inst_21398.cljs$core$IFn$_invoke$arity$0() : inst_21398.call(null));
var state_21418__$1 = state_21418;
var statearr_21431_21481 = state_21418__$1;
(statearr_21431_21481[(2)] = inst_21405);


cljs.core.async.impl.ioc_helpers.process_exception(state_21418__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_21419 === (8))){
var inst_21407 = (state_21418[(2)]);
var state_21418__$1 = (function (){var statearr_21432 = state_21418;
(statearr_21432[(9)] = inst_21407);

return statearr_21432;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_21418__$1,(11),com.fulcrologic.guardrails.core.pending_check_channel);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__19343__auto__))
;
return ((function (switch__19298__auto__,c__19343__auto__){
return (function() {
var com$fulcrologic$guardrails$core$state_machine__19299__auto__ = null;
var com$fulcrologic$guardrails$core$state_machine__19299__auto____0 = (function (){
var statearr_21433 = [null,null,null,null,null,null,null,null,null,null];
(statearr_21433[(0)] = com$fulcrologic$guardrails$core$state_machine__19299__auto__);

(statearr_21433[(1)] = (1));

return statearr_21433;
});
var com$fulcrologic$guardrails$core$state_machine__19299__auto____1 = (function (state_21418){
while(true){
var ret_value__19300__auto__ = (function (){try{while(true){
var result__19301__auto__ = switch__19298__auto__(state_21418);
if(cljs.core.keyword_identical_QMARK_(result__19301__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19301__auto__;
}
break;
}
}catch (e21434){if((e21434 instanceof Object)){
var ex__19302__auto__ = e21434;
var statearr_21435_21487 = state_21418;
(statearr_21435_21487[(5)] = ex__19302__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_21418);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e21434;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__19300__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__21489 = state_21418;
state_21418 = G__21489;
continue;
} else {
return ret_value__19300__auto__;
}
break;
}
});
com$fulcrologic$guardrails$core$state_machine__19299__auto__ = function(state_21418){
switch(arguments.length){
case 0:
return com$fulcrologic$guardrails$core$state_machine__19299__auto____0.call(this);
case 1:
return com$fulcrologic$guardrails$core$state_machine__19299__auto____1.call(this,state_21418);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
com$fulcrologic$guardrails$core$state_machine__19299__auto__.cljs$core$IFn$_invoke$arity$0 = com$fulcrologic$guardrails$core$state_machine__19299__auto____0;
com$fulcrologic$guardrails$core$state_machine__19299__auto__.cljs$core$IFn$_invoke$arity$1 = com$fulcrologic$guardrails$core$state_machine__19299__auto____1;
return com$fulcrologic$guardrails$core$state_machine__19299__auto__;
})()
;})(switch__19298__auto__,c__19343__auto__))
})();
var state__19345__auto__ = (function (){var statearr_21436 = (f__19344__auto__.cljs$core$IFn$_invoke$arity$0 ? f__19344__auto__.cljs$core$IFn$_invoke$arity$0() : f__19344__auto__.call(null));
(statearr_21436[(6)] = c__19343__auto__);

return statearr_21436;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__19345__auto__);
});})(c__19343__auto__))
);

return c__19343__auto__;
})();
}
com.fulcrologic.guardrails.core.output_fn = (function com$fulcrologic$guardrails$core$output_fn(data){
var map__21437 = data;
var map__21437__$1 = (((((!((map__21437 == null))))?(((((map__21437.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__21437.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__21437):map__21437);
var level = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21437__$1,new cljs.core.Keyword(null,"level","level",1290497552));
var _QMARK_err = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21437__$1,new cljs.core.Keyword(null,"?err","?err",549653299));
var msg_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21437__$1,new cljs.core.Keyword(null,"msg_","msg_",-1925147000));
var _QMARK_ns_str = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21437__$1,new cljs.core.Keyword(null,"?ns-str","?ns-str",2012733966));
var _QMARK_file = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21437__$1,new cljs.core.Keyword(null,"?file","?file",1533429675));
var hostname_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21437__$1,new cljs.core.Keyword(null,"hostname_","hostname_",-2091647379));
var timestamp_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21437__$1,new cljs.core.Keyword(null,"timestamp_","timestamp_",-954533417));
var _QMARK_line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21437__$1,new cljs.core.Keyword(null,"?line","?line",-631853385));
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.upper_case(cljs.core.name(level)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.force(msg_)),(function (){var temp__5720__auto__ = _QMARK_err;
if(cljs.core.truth_(temp__5720__auto__)){
var err = temp__5720__auto__;
return ["\n",cljs.core.str.cljs$core$IFn$_invoke$arity$1(com.fulcrologic.guardrails.utils.stacktrace.cljs$core$IFn$_invoke$arity$1(err))].join('');
} else {
return null;
}
})()].join('');
});
com.fulcrologic.guardrails.core.now_ms = (function com$fulcrologic$guardrails$core$now_ms(){
return cljs.core.inst_ms((new Date()));
});
com.fulcrologic.guardrails.core.tap = (((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.tap_GT_ !== 'undefined'))?(new cljs.core.Var((function (){
return cljs.core.tap_GT_;
}),cljs.core.with_meta(new cljs.core.Symbol("cljs.core","tap>","cljs.core/tap>",895722640,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("cljs.analyzer","no-resolve","cljs.analyzer/no-resolve",-1872351017),true], null)),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null),new cljs.core.Symbol(null,"tap>","tap>",1822490677,null),"cljs/core.cljs",(20),(1),(11546),(11546),new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null)], null)),"Sends x to any taps. Returns the result of *exec-tap-fn*, a Boolean value.",((cljs.core.tap_GT_)?cljs.core.tap_GT_.cljs$lang$test:null)]))):null);
com.fulcrologic.guardrails.core.run_check = (function com$fulcrologic$guardrails$core$run_check(p__21439,spec,value){
var map__21440 = p__21439;
var map__21440__$1 = (((((!((map__21440 == null))))?(((((map__21440.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__21440.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__21440):map__21440);
var tap_GT__QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21440__$1,new cljs.core.Keyword(null,"tap>?","tap>?",212454486));
var args_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21440__$1,new cljs.core.Keyword(null,"args?","args?",-1963723548));
var vararg_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21440__$1,new cljs.core.Keyword(null,"vararg?","vararg?",1908105777));
var callsite = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21440__$1,new cljs.core.Keyword(null,"callsite","callsite",243654023));
var throw_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21440__$1,new cljs.core.Keyword(null,"throw?","throw?",-2036749118));
var fn_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21440__$1,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004));
var expound_opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21440__$1,new cljs.core.Keyword(null,"expound-opts","expound-opts",623087481));
var start_21504 = com.fulcrologic.guardrails.core.now_ms();
var vargs_QMARK__21505 = (function (){var and__4120__auto__ = args_QMARK_;
if(cljs.core.truth_(and__4120__auto__)){
return vararg_QMARK_;
} else {
return and__4120__auto__;
}
})();
var varg_21506 = (cljs.core.truth_(vargs_QMARK__21505)?cljs.core.last(cljs.core.seq(value)):null);
var specable_args_21507 = (cljs.core.truth_(vargs_QMARK__21505)?((cljs.core.map_QMARK_(varg_21506))?cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.vec(cljs.core.butlast(value)),cljs.core.flatten(cljs.core.seq(varg_21506))):cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.vec(cljs.core.butlast(value)),cljs.core.seq(varg_21506))):value);
var valid_exception_21508 = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
try{if(cljs.spec.alpha.valid_QMARK_.cljs$core$IFn$_invoke$arity$2(spec,specable_args_21507)){
} else {
var problem_21509 = expound.alpha.expound_str(spec,specable_args_21507,expound_opts);
var description_21510 = ["\n",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_name),(cljs.core.truth_(args_QMARK_)?" argument list":" return type"),"\n",cljs.core.str.cljs$core$IFn$_invoke$arity$1(problem_21509)].join('');
var context_21511 = com.fulcrologic.guardrails.core.get_global_context();
if(cljs.core.truth_((function (){var and__4120__auto__ = com.fulcrologic.guardrails.core.tap;
if(cljs.core.truth_(and__4120__auto__)){
return tap_GT__QMARK_;
} else {
return and__4120__auto__;
}
})())){
var G__21443_21512 = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("com.fulcrologic.guardrails","validation-error","com.fulcrologic.guardrails/validation-error",776351266),new cljs.core.Keyword("com.fulcrologic.guardrails","fn-name","com.fulcrologic.guardrails/fn-name",-762819408),fn_name,new cljs.core.Keyword("com.fulcrologic.guardrails","failure-point","com.fulcrologic.guardrails/failure-point",340797326),(cljs.core.truth_(args_QMARK_)?new cljs.core.Keyword(null,"args","args",1315556576):new cljs.core.Keyword(null,"ret","ret",-468222814)),new cljs.core.Keyword("com.fulcrologic.guardrails","spec","com.fulcrologic.guardrails/spec",343160061),spec,new cljs.core.Keyword("com.fulcrologic.guardrails","explain-data","com.fulcrologic.guardrails/explain-data",-1120944464),cljs.spec.alpha.explain_data(spec,specable_args_21507)], null);
(com.fulcrologic.guardrails.core.tap.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.guardrails.core.tap.cljs$core$IFn$_invoke$arity$1(G__21443_21512) : com.fulcrologic.guardrails.core.tap.call(null,G__21443_21512));
} else {
}

if(cljs.core.truth_(throw_QMARK_)){
cljs.core.reset_BANG_(valid_exception_21508,cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2((function (){var G__21444 = description_21510;
if(cljs.core.truth_(context_21511)){
return ["\nContext: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(context_21511),G__21444].join('');
} else {
return G__21444;
}
})(),cljs.core.with_meta(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("com.fulcrologic.guardrails","validation-error","com.fulcrologic.guardrails/validation-error",776351266),new cljs.core.Keyword("com.fulcrologic.guardrails","fn-name","com.fulcrologic.guardrails/fn-name",-762819408),fn_name,new cljs.core.Keyword("com.fulcrologic.guardrails","failure-point","com.fulcrologic.guardrails/failure-point",340797326),(cljs.core.truth_(args_QMARK_)?new cljs.core.Keyword(null,"args","args",1315556576):new cljs.core.Keyword(null,"ret","ret",-468222814)),new cljs.core.Keyword("com.fulcrologic.guardrails","spec","com.fulcrologic.guardrails/spec",343160061),spec,new cljs.core.Keyword("com.fulcrologic.guardrails","context","com.fulcrologic.guardrails/context",-834538901),context_21511], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.guardrails","val","com.fulcrologic.guardrails/val",132345656),specable_args_21507], null))));
} else {
com.fulcrologic.guardrails.utils.report_problem([description_21510,"\n",cljs.core.str.cljs$core$IFn$_invoke$arity$1(com.fulcrologic.guardrails.utils.stacktrace.cljs$core$IFn$_invoke$arity$1((function (){var or__4131__auto__ = callsite;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("",cljs.core.PersistentArrayMap.EMPTY);
}
})()))].join(''));
}
}
}catch (e21442){var e_21513 = e21442;
com.fulcrologic.guardrails.utils.report_exception(e_21513,"BUG: Internal error in expound or clojure spec.\n");
}finally {var duration_21514 = (com.fulcrologic.guardrails.core.now_ms() - start_21504);
if((duration_21514 > (100))){
com.fulcrologic.guardrails.utils.report_problem(["WARNING: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_name)," ",(cljs.core.truth_(args_QMARK_)?"argument specs":"return spec")," took ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(duration_21514),"ms to run."].join(''));
} else {
}
}
if(cljs.core.truth_(cljs.core.deref(valid_exception_21508))){
throw cljs.core.deref(valid_exception_21508);
} else {
}

return null;
});
com.fulcrologic.guardrails.core.callsite_exception = (function com$fulcrologic$guardrails$core$callsite_exception(){
return (new Error(""));
});

//# sourceMappingURL=com.fulcrologic.guardrails.core.js.map
