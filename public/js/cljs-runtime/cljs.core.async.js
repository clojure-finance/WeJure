goog.provide('cljs.core.async');
goog.scope(function(){
  cljs.core.async.goog$module$goog$array = goog.module.get('goog.array');
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async13545 = (function (f,blockable,meta13546){
this.f = f;
this.blockable = blockable;
this.meta13546 = meta13546;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async13545.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_13547,meta13546__$1){
var self__ = this;
var _13547__$1 = this;
return (new cljs.core.async.t_cljs$core$async13545(self__.f,self__.blockable,meta13546__$1));
}));

(cljs.core.async.t_cljs$core$async13545.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_13547){
var self__ = this;
var _13547__$1 = this;
return self__.meta13546;
}));

(cljs.core.async.t_cljs$core$async13545.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async13545.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async13545.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
}));

(cljs.core.async.t_cljs$core$async13545.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
}));

(cljs.core.async.t_cljs$core$async13545.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta13546","meta13546",-456089614,null)], null);
}));

(cljs.core.async.t_cljs$core$async13545.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async13545.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async13545");

(cljs.core.async.t_cljs$core$async13545.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async13545");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async13545.
 */
cljs.core.async.__GT_t_cljs$core$async13545 = (function cljs$core$async$__GT_t_cljs$core$async13545(f,blockable,meta13546){
return (new cljs.core.async.t_cljs$core$async13545(f,blockable,meta13546));
});


cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__13537 = arguments.length;
switch (G__13537) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(f,true);
}));

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
return (new cljs.core.async.t_cljs$core$async13545(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
}));

(cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2);

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer(n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if((!((buff == null)))){
if(((false) || ((cljs.core.PROTOCOL_SENTINEL === buff.cljs$core$async$impl$protocols$UnblockingBuffer$)))){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var G__13575 = arguments.length;
switch (G__13575) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,null,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,xform,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error(["Assert failed: ","buffer must be supplied when transducer is","\n","buf-or-n"].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.cljs$core$IFn$_invoke$arity$3(((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer(buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
}));

(cljs.core.async.chan.cljs$lang$maxFixedArity = 3);

/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed. See chan for the semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var G__13587 = arguments.length;
switch (G__13587) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2(xform,null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(cljs.core.async.impl.buffers.promise_buffer(),xform,ex_handler);
}));

(cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout(msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var G__13598 = arguments.length;
switch (G__13598) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3(port,fn1,true);
}));

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(ret)){
var val_16716 = cljs.core.deref(ret);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_16716) : fn1.call(null,val_16716));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_16716) : fn1.call(null,val_16716));
}));
}
} else {
}

return null;
}));

(cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3);

cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn1 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn1 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var G__13611 = arguments.length;
switch (G__13611) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__5802__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__5802__auto__)){
var ret = temp__5802__auto__;
return cljs.core.deref(ret);
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4(port,val,fn1,true);
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__5802__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(temp__5802__auto__)){
var retb = temp__5802__auto__;
var ret = cljs.core.deref(retb);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
}));
}

return ret;
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4);

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_(port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__5636__auto___16729 = n;
var x_16730 = (0);
while(true){
if((x_16730 < n__5636__auto___16729)){
(a[x_16730] = x_16730);

var G__16731 = (x_16730 + (1));
x_16730 = G__16731;
continue;
} else {
}
break;
}

cljs.core.async.goog$module$goog$array.shuffle(a);

return a;
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async13636 = (function (flag,meta13637){
this.flag = flag;
this.meta13637 = meta13637;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async13636.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_13638,meta13637__$1){
var self__ = this;
var _13638__$1 = this;
return (new cljs.core.async.t_cljs$core$async13636(self__.flag,meta13637__$1));
}));

(cljs.core.async.t_cljs$core$async13636.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_13638){
var self__ = this;
var _13638__$1 = this;
return self__.meta13637;
}));

(cljs.core.async.t_cljs$core$async13636.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async13636.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref(self__.flag);
}));

(cljs.core.async.t_cljs$core$async13636.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async13636.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.flag,null);

return true;
}));

(cljs.core.async.t_cljs$core$async13636.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta13637","meta13637",1489008743,null)], null);
}));

(cljs.core.async.t_cljs$core$async13636.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async13636.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async13636");

(cljs.core.async.t_cljs$core$async13636.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async13636");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async13636.
 */
cljs.core.async.__GT_t_cljs$core$async13636 = (function cljs$core$async$__GT_t_cljs$core$async13636(flag,meta13637){
return (new cljs.core.async.t_cljs$core$async13636(flag,meta13637));
});


cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true);
return (new cljs.core.async.t_cljs$core$async13636(flag,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async13682 = (function (flag,cb,meta13683){
this.flag = flag;
this.cb = cb;
this.meta13683 = meta13683;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async13682.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_13684,meta13683__$1){
var self__ = this;
var _13684__$1 = this;
return (new cljs.core.async.t_cljs$core$async13682(self__.flag,self__.cb,meta13683__$1));
}));

(cljs.core.async.t_cljs$core$async13682.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_13684){
var self__ = this;
var _13684__$1 = this;
return self__.meta13683;
}));

(cljs.core.async.t_cljs$core$async13682.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async13682.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
}));

(cljs.core.async.t_cljs$core$async13682.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async13682.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit(self__.flag);

return self__.cb;
}));

(cljs.core.async.t_cljs$core$async13682.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta13683","meta13683",771740994,null)], null);
}));

(cljs.core.async.t_cljs$core$async13682.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async13682.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async13682");

(cljs.core.async.t_cljs$core$async13682.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async13682");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async13682.
 */
cljs.core.async.__GT_t_cljs$core$async13682 = (function cljs$core$async$__GT_t_cljs$core$async13682(flag,cb,meta13683){
return (new cljs.core.async.t_cljs$core$async13682(flag,cb,meta13683));
});


cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
return (new cljs.core.async.t_cljs$core$async13682(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
if((cljs.core.count(ports) > (0))){
} else {
throw (new Error(["Assert failed: ","alts must have at least one channel operation","\n","(pos? (count ports))"].join('')));
}

var flag = cljs.core.async.alt_flag();
var n = cljs.core.count(ports);
var idxs = cljs.core.async.random_array(n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports,idx);
var wport = ((cljs.core.vector_QMARK_(port))?(port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((0)) : port.call(null,(0))):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = (port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((1)) : port.call(null,(1)));
return cljs.core.async.impl.protocols.put_BANG_(wport,val,cljs.core.async.alt_handler(flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__13694_SHARP_){
var G__13698 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__13694_SHARP_,wport], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__13698) : fret.call(null,G__13698));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__13695_SHARP_){
var G__13699 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__13695_SHARP_,port], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__13699) : fret.call(null,G__13699));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref(vbox),(function (){var or__5045__auto__ = wport;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return port;
}
})()], null));
} else {
var G__16737 = (i + (1));
i = G__16737;
continue;
}
} else {
return null;
}
break;
}
})();
var or__5045__auto__ = ret;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
if(cljs.core.contains_QMARK_(opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__5804__auto__ = (function (){var and__5043__auto__ = flag.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1(null);
if(cljs.core.truth_(and__5043__auto__)){
return flag.cljs$core$async$impl$protocols$Handler$commit$arity$1(null);
} else {
return and__5043__auto__;
}
})();
if(cljs.core.truth_(temp__5804__auto__)){
var got = temp__5804__auto__;
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___16738 = arguments.length;
var i__5770__auto___16739 = (0);
while(true){
if((i__5770__auto___16739 < len__5769__auto___16738)){
args__5775__auto__.push((arguments[i__5770__auto___16739]));

var G__16740 = (i__5770__auto___16739 + (1));
i__5770__auto___16739 = G__16740;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__13830){
var map__13831 = p__13830;
var map__13831__$1 = cljs.core.__destructure_map(map__13831);
var opts = map__13831__$1;
throw (new Error("alts! used not in (go ...) block"));
}));

(cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq13815){
var G__13816 = cljs.core.first(seq13815);
var seq13815__$1 = cljs.core.next(seq13815);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__13816,seq13815__$1);
}));

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var G__13855 = arguments.length;
switch (G__13855) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3(from,to,true);
}));

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__13428__auto___16749 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = (function (state_13927){
var state_val_13929 = (state_13927[(1)]);
if((state_val_13929 === (7))){
var inst_13917 = (state_13927[(2)]);
var state_13927__$1 = state_13927;
var statearr_13938_16754 = state_13927__$1;
(statearr_13938_16754[(2)] = inst_13917);

(statearr_13938_16754[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13929 === (1))){
var state_13927__$1 = state_13927;
var statearr_13945_16758 = state_13927__$1;
(statearr_13945_16758[(2)] = null);

(statearr_13945_16758[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13929 === (4))){
var inst_13880 = (state_13927[(7)]);
var inst_13880__$1 = (state_13927[(2)]);
var inst_13891 = (inst_13880__$1 == null);
var state_13927__$1 = (function (){var statearr_13949 = state_13927;
(statearr_13949[(7)] = inst_13880__$1);

return statearr_13949;
})();
if(cljs.core.truth_(inst_13891)){
var statearr_13951_16765 = state_13927__$1;
(statearr_13951_16765[(1)] = (5));

} else {
var statearr_13952_16766 = state_13927__$1;
(statearr_13952_16766[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13929 === (13))){
var state_13927__$1 = state_13927;
var statearr_13958_16777 = state_13927__$1;
(statearr_13958_16777[(2)] = null);

(statearr_13958_16777[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13929 === (6))){
var inst_13880 = (state_13927[(7)]);
var state_13927__$1 = state_13927;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_13927__$1,(11),to,inst_13880);
} else {
if((state_val_13929 === (3))){
var inst_13919 = (state_13927[(2)]);
var state_13927__$1 = state_13927;
return cljs.core.async.impl.ioc_helpers.return_chan(state_13927__$1,inst_13919);
} else {
if((state_val_13929 === (12))){
var state_13927__$1 = state_13927;
var statearr_13962_16781 = state_13927__$1;
(statearr_13962_16781[(2)] = null);

(statearr_13962_16781[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13929 === (2))){
var state_13927__$1 = state_13927;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_13927__$1,(4),from);
} else {
if((state_val_13929 === (11))){
var inst_13910 = (state_13927[(2)]);
var state_13927__$1 = state_13927;
if(cljs.core.truth_(inst_13910)){
var statearr_13970_16782 = state_13927__$1;
(statearr_13970_16782[(1)] = (12));

} else {
var statearr_13972_16783 = state_13927__$1;
(statearr_13972_16783[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13929 === (9))){
var state_13927__$1 = state_13927;
var statearr_13976_16784 = state_13927__$1;
(statearr_13976_16784[(2)] = null);

(statearr_13976_16784[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13929 === (5))){
var state_13927__$1 = state_13927;
if(cljs.core.truth_(close_QMARK_)){
var statearr_13977_16785 = state_13927__$1;
(statearr_13977_16785[(1)] = (8));

} else {
var statearr_13978_16786 = state_13927__$1;
(statearr_13978_16786[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13929 === (14))){
var inst_13915 = (state_13927[(2)]);
var state_13927__$1 = state_13927;
var statearr_13980_16788 = state_13927__$1;
(statearr_13980_16788[(2)] = inst_13915);

(statearr_13980_16788[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13929 === (10))){
var inst_13899 = (state_13927[(2)]);
var state_13927__$1 = state_13927;
var statearr_13983_16791 = state_13927__$1;
(statearr_13983_16791[(2)] = inst_13899);

(statearr_13983_16791[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_13929 === (8))){
var inst_13896 = cljs.core.async.close_BANG_(to);
var state_13927__$1 = state_13927;
var statearr_13985_16793 = state_13927__$1;
(statearr_13985_16793[(2)] = inst_13896);

(statearr_13985_16793[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
}
}
}
});
return (function() {
var cljs$core$async$state_machine__12860__auto__ = null;
var cljs$core$async$state_machine__12860__auto____0 = (function (){
var statearr_13991 = [null,null,null,null,null,null,null,null];
(statearr_13991[(0)] = cljs$core$async$state_machine__12860__auto__);

(statearr_13991[(1)] = (1));

return statearr_13991;
});
var cljs$core$async$state_machine__12860__auto____1 = (function (state_13927){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_13927);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e13992){var ex__12863__auto__ = e13992;
var statearr_13994_16795 = state_13927;
(statearr_13994_16795[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_13927[(4)]))){
var statearr_13997_16796 = state_13927;
(statearr_13997_16796[(1)] = cljs.core.first((state_13927[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16799 = state_13927;
state_13927 = G__16799;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
cljs$core$async$state_machine__12860__auto__ = function(state_13927){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12860__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12860__auto____1.call(this,state_13927);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12860__auto____0;
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12860__auto____1;
return cljs$core$async$state_machine__12860__auto__;
})()
})();
var state__13430__auto__ = (function (){var statearr_14002 = f__13429__auto__();
(statearr_14002[(6)] = c__13428__auto___16749);

return statearr_14002;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
}));


return to;
}));

(cljs.core.async.pipe.cljs$lang$maxFixedArity = 3);

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error("Assert failed: (pos? n)"));
}

var jobs = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var results = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var process__$1 = (function (p__14011){
var vec__14012 = p__14011;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14012,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14012,(1),null);
var job = vec__14012;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((1),xf,ex_handler);
var c__13428__auto___16801 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = (function (state_14020){
var state_val_14021 = (state_14020[(1)]);
if((state_val_14021 === (1))){
var state_14020__$1 = state_14020;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_14020__$1,(2),res,v);
} else {
if((state_val_14021 === (2))){
var inst_14017 = (state_14020[(2)]);
var inst_14018 = cljs.core.async.close_BANG_(res);
var state_14020__$1 = (function (){var statearr_14023 = state_14020;
(statearr_14023[(7)] = inst_14017);

return statearr_14023;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_14020__$1,inst_14018);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____0 = (function (){
var statearr_14024 = [null,null,null,null,null,null,null,null];
(statearr_14024[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__);

(statearr_14024[(1)] = (1));

return statearr_14024;
});
var cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____1 = (function (state_14020){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_14020);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e14025){var ex__12863__auto__ = e14025;
var statearr_14026_16804 = state_14020;
(statearr_14026_16804[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_14020[(4)]))){
var statearr_14027_16805 = state_14020;
(statearr_14027_16805[(1)] = cljs.core.first((state_14020[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16806 = state_14020;
state_14020 = G__16806;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__ = function(state_14020){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____1.call(this,state_14020);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__;
})()
})();
var state__13430__auto__ = (function (){var statearr_14029 = f__13429__auto__();
(statearr_14029[(6)] = c__13428__auto___16801);

return statearr_14029;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
}));


cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var async = (function (p__14030){
var vec__14031 = p__14030;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14031,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14031,(1),null);
var job = vec__14031;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
(xf.cljs$core$IFn$_invoke$arity$2 ? xf.cljs$core$IFn$_invoke$arity$2(v,res) : xf.call(null,v,res));

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var n__5636__auto___16808 = n;
var __16809 = (0);
while(true){
if((__16809 < n__5636__auto___16808)){
var G__14034_16810 = type;
var G__14034_16811__$1 = (((G__14034_16810 instanceof cljs.core.Keyword))?G__14034_16810.fqn:null);
switch (G__14034_16811__$1) {
case "compute":
var c__13428__auto___16813 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__16809,c__13428__auto___16813,G__14034_16810,G__14034_16811__$1,n__5636__auto___16808,jobs,results,process__$1,async){
return (function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = ((function (__16809,c__13428__auto___16813,G__14034_16810,G__14034_16811__$1,n__5636__auto___16808,jobs,results,process__$1,async){
return (function (state_14048){
var state_val_14049 = (state_14048[(1)]);
if((state_val_14049 === (1))){
var state_14048__$1 = state_14048;
var statearr_14051_16815 = state_14048__$1;
(statearr_14051_16815[(2)] = null);

(statearr_14051_16815[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14049 === (2))){
var state_14048__$1 = state_14048;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14048__$1,(4),jobs);
} else {
if((state_val_14049 === (3))){
var inst_14046 = (state_14048[(2)]);
var state_14048__$1 = state_14048;
return cljs.core.async.impl.ioc_helpers.return_chan(state_14048__$1,inst_14046);
} else {
if((state_val_14049 === (4))){
var inst_14038 = (state_14048[(2)]);
var inst_14039 = process__$1(inst_14038);
var state_14048__$1 = state_14048;
if(cljs.core.truth_(inst_14039)){
var statearr_14052_16821 = state_14048__$1;
(statearr_14052_16821[(1)] = (5));

} else {
var statearr_14053_16822 = state_14048__$1;
(statearr_14053_16822[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14049 === (5))){
var state_14048__$1 = state_14048;
var statearr_14054_16827 = state_14048__$1;
(statearr_14054_16827[(2)] = null);

(statearr_14054_16827[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14049 === (6))){
var state_14048__$1 = state_14048;
var statearr_14055_16828 = state_14048__$1;
(statearr_14055_16828[(2)] = null);

(statearr_14055_16828[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14049 === (7))){
var inst_14044 = (state_14048[(2)]);
var state_14048__$1 = state_14048;
var statearr_14057_16833 = state_14048__$1;
(statearr_14057_16833[(2)] = inst_14044);

(statearr_14057_16833[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__16809,c__13428__auto___16813,G__14034_16810,G__14034_16811__$1,n__5636__auto___16808,jobs,results,process__$1,async))
;
return ((function (__16809,switch__12859__auto__,c__13428__auto___16813,G__14034_16810,G__14034_16811__$1,n__5636__auto___16808,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____0 = (function (){
var statearr_14058 = [null,null,null,null,null,null,null];
(statearr_14058[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__);

(statearr_14058[(1)] = (1));

return statearr_14058;
});
var cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____1 = (function (state_14048){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_14048);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e14060){var ex__12863__auto__ = e14060;
var statearr_14061_16834 = state_14048;
(statearr_14061_16834[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_14048[(4)]))){
var statearr_14062_16835 = state_14048;
(statearr_14062_16835[(1)] = cljs.core.first((state_14048[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16836 = state_14048;
state_14048 = G__16836;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__ = function(state_14048){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____1.call(this,state_14048);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__;
})()
;})(__16809,switch__12859__auto__,c__13428__auto___16813,G__14034_16810,G__14034_16811__$1,n__5636__auto___16808,jobs,results,process__$1,async))
})();
var state__13430__auto__ = (function (){var statearr_14065 = f__13429__auto__();
(statearr_14065[(6)] = c__13428__auto___16813);

return statearr_14065;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
});})(__16809,c__13428__auto___16813,G__14034_16810,G__14034_16811__$1,n__5636__auto___16808,jobs,results,process__$1,async))
);


break;
case "async":
var c__13428__auto___16838 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__16809,c__13428__auto___16838,G__14034_16810,G__14034_16811__$1,n__5636__auto___16808,jobs,results,process__$1,async){
return (function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = ((function (__16809,c__13428__auto___16838,G__14034_16810,G__14034_16811__$1,n__5636__auto___16808,jobs,results,process__$1,async){
return (function (state_14078){
var state_val_14079 = (state_14078[(1)]);
if((state_val_14079 === (1))){
var state_14078__$1 = state_14078;
var statearr_14084_16840 = state_14078__$1;
(statearr_14084_16840[(2)] = null);

(statearr_14084_16840[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14079 === (2))){
var state_14078__$1 = state_14078;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14078__$1,(4),jobs);
} else {
if((state_val_14079 === (3))){
var inst_14076 = (state_14078[(2)]);
var state_14078__$1 = state_14078;
return cljs.core.async.impl.ioc_helpers.return_chan(state_14078__$1,inst_14076);
} else {
if((state_val_14079 === (4))){
var inst_14068 = (state_14078[(2)]);
var inst_14069 = async(inst_14068);
var state_14078__$1 = state_14078;
if(cljs.core.truth_(inst_14069)){
var statearr_14085_16841 = state_14078__$1;
(statearr_14085_16841[(1)] = (5));

} else {
var statearr_14086_16842 = state_14078__$1;
(statearr_14086_16842[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14079 === (5))){
var state_14078__$1 = state_14078;
var statearr_14087_16844 = state_14078__$1;
(statearr_14087_16844[(2)] = null);

(statearr_14087_16844[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14079 === (6))){
var state_14078__$1 = state_14078;
var statearr_14088_16852 = state_14078__$1;
(statearr_14088_16852[(2)] = null);

(statearr_14088_16852[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14079 === (7))){
var inst_14074 = (state_14078[(2)]);
var state_14078__$1 = state_14078;
var statearr_14089_16854 = state_14078__$1;
(statearr_14089_16854[(2)] = inst_14074);

(statearr_14089_16854[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__16809,c__13428__auto___16838,G__14034_16810,G__14034_16811__$1,n__5636__auto___16808,jobs,results,process__$1,async))
;
return ((function (__16809,switch__12859__auto__,c__13428__auto___16838,G__14034_16810,G__14034_16811__$1,n__5636__auto___16808,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____0 = (function (){
var statearr_14090 = [null,null,null,null,null,null,null];
(statearr_14090[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__);

(statearr_14090[(1)] = (1));

return statearr_14090;
});
var cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____1 = (function (state_14078){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_14078);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e14091){var ex__12863__auto__ = e14091;
var statearr_14095_16857 = state_14078;
(statearr_14095_16857[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_14078[(4)]))){
var statearr_14097_16859 = state_14078;
(statearr_14097_16859[(1)] = cljs.core.first((state_14078[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16860 = state_14078;
state_14078 = G__16860;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__ = function(state_14078){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____1.call(this,state_14078);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__;
})()
;})(__16809,switch__12859__auto__,c__13428__auto___16838,G__14034_16810,G__14034_16811__$1,n__5636__auto___16808,jobs,results,process__$1,async))
})();
var state__13430__auto__ = (function (){var statearr_14098 = f__13429__auto__();
(statearr_14098[(6)] = c__13428__auto___16838);

return statearr_14098;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
});})(__16809,c__13428__auto___16838,G__14034_16810,G__14034_16811__$1,n__5636__auto___16808,jobs,results,process__$1,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__14034_16811__$1)].join('')));

}

var G__16861 = (__16809 + (1));
__16809 = G__16861;
continue;
} else {
}
break;
}

var c__13428__auto___16862 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = (function (state_14126){
var state_val_14127 = (state_14126[(1)]);
if((state_val_14127 === (7))){
var inst_14121 = (state_14126[(2)]);
var state_14126__$1 = state_14126;
var statearr_14129_16863 = state_14126__$1;
(statearr_14129_16863[(2)] = inst_14121);

(statearr_14129_16863[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14127 === (1))){
var state_14126__$1 = state_14126;
var statearr_14130_16866 = state_14126__$1;
(statearr_14130_16866[(2)] = null);

(statearr_14130_16866[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14127 === (4))){
var inst_14103 = (state_14126[(7)]);
var inst_14103__$1 = (state_14126[(2)]);
var inst_14104 = (inst_14103__$1 == null);
var state_14126__$1 = (function (){var statearr_14135 = state_14126;
(statearr_14135[(7)] = inst_14103__$1);

return statearr_14135;
})();
if(cljs.core.truth_(inst_14104)){
var statearr_14136_16869 = state_14126__$1;
(statearr_14136_16869[(1)] = (5));

} else {
var statearr_14137_16870 = state_14126__$1;
(statearr_14137_16870[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14127 === (6))){
var inst_14109 = (state_14126[(8)]);
var inst_14103 = (state_14126[(7)]);
var inst_14109__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var inst_14110 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_14111 = [inst_14103,inst_14109__$1];
var inst_14112 = (new cljs.core.PersistentVector(null,2,(5),inst_14110,inst_14111,null));
var state_14126__$1 = (function (){var statearr_14139 = state_14126;
(statearr_14139[(8)] = inst_14109__$1);

return statearr_14139;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_14126__$1,(8),jobs,inst_14112);
} else {
if((state_val_14127 === (3))){
var inst_14123 = (state_14126[(2)]);
var state_14126__$1 = state_14126;
return cljs.core.async.impl.ioc_helpers.return_chan(state_14126__$1,inst_14123);
} else {
if((state_val_14127 === (2))){
var state_14126__$1 = state_14126;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14126__$1,(4),from);
} else {
if((state_val_14127 === (9))){
var inst_14117 = (state_14126[(2)]);
var state_14126__$1 = (function (){var statearr_14140 = state_14126;
(statearr_14140[(9)] = inst_14117);

return statearr_14140;
})();
var statearr_14141_16879 = state_14126__$1;
(statearr_14141_16879[(2)] = null);

(statearr_14141_16879[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14127 === (5))){
var inst_14106 = cljs.core.async.close_BANG_(jobs);
var state_14126__$1 = state_14126;
var statearr_14144_16880 = state_14126__$1;
(statearr_14144_16880[(2)] = inst_14106);

(statearr_14144_16880[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14127 === (8))){
var inst_14109 = (state_14126[(8)]);
var inst_14114 = (state_14126[(2)]);
var state_14126__$1 = (function (){var statearr_14145 = state_14126;
(statearr_14145[(10)] = inst_14114);

return statearr_14145;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_14126__$1,(9),results,inst_14109);
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
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____0 = (function (){
var statearr_14149 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_14149[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__);

(statearr_14149[(1)] = (1));

return statearr_14149;
});
var cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____1 = (function (state_14126){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_14126);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e14151){var ex__12863__auto__ = e14151;
var statearr_14152_16899 = state_14126;
(statearr_14152_16899[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_14126[(4)]))){
var statearr_14153_16901 = state_14126;
(statearr_14153_16901[(1)] = cljs.core.first((state_14126[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16902 = state_14126;
state_14126 = G__16902;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__ = function(state_14126){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____1.call(this,state_14126);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__;
})()
})();
var state__13430__auto__ = (function (){var statearr_14154 = f__13429__auto__();
(statearr_14154[(6)] = c__13428__auto___16862);

return statearr_14154;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
}));


var c__13428__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = (function (state_14197){
var state_val_14198 = (state_14197[(1)]);
if((state_val_14198 === (7))){
var inst_14193 = (state_14197[(2)]);
var state_14197__$1 = state_14197;
var statearr_14203_16903 = state_14197__$1;
(statearr_14203_16903[(2)] = inst_14193);

(statearr_14203_16903[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14198 === (20))){
var state_14197__$1 = state_14197;
var statearr_14204_16904 = state_14197__$1;
(statearr_14204_16904[(2)] = null);

(statearr_14204_16904[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14198 === (1))){
var state_14197__$1 = state_14197;
var statearr_14205_16905 = state_14197__$1;
(statearr_14205_16905[(2)] = null);

(statearr_14205_16905[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14198 === (4))){
var inst_14158 = (state_14197[(7)]);
var inst_14158__$1 = (state_14197[(2)]);
var inst_14159 = (inst_14158__$1 == null);
var state_14197__$1 = (function (){var statearr_14206 = state_14197;
(statearr_14206[(7)] = inst_14158__$1);

return statearr_14206;
})();
if(cljs.core.truth_(inst_14159)){
var statearr_14207_16907 = state_14197__$1;
(statearr_14207_16907[(1)] = (5));

} else {
var statearr_14208_16909 = state_14197__$1;
(statearr_14208_16909[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14198 === (15))){
var inst_14171 = (state_14197[(8)]);
var state_14197__$1 = state_14197;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_14197__$1,(18),to,inst_14171);
} else {
if((state_val_14198 === (21))){
var inst_14188 = (state_14197[(2)]);
var state_14197__$1 = state_14197;
var statearr_14209_16911 = state_14197__$1;
(statearr_14209_16911[(2)] = inst_14188);

(statearr_14209_16911[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14198 === (13))){
var inst_14190 = (state_14197[(2)]);
var state_14197__$1 = (function (){var statearr_14210 = state_14197;
(statearr_14210[(9)] = inst_14190);

return statearr_14210;
})();
var statearr_14211_16912 = state_14197__$1;
(statearr_14211_16912[(2)] = null);

(statearr_14211_16912[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14198 === (6))){
var inst_14158 = (state_14197[(7)]);
var state_14197__$1 = state_14197;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14197__$1,(11),inst_14158);
} else {
if((state_val_14198 === (17))){
var inst_14183 = (state_14197[(2)]);
var state_14197__$1 = state_14197;
if(cljs.core.truth_(inst_14183)){
var statearr_14213_16913 = state_14197__$1;
(statearr_14213_16913[(1)] = (19));

} else {
var statearr_14214_16914 = state_14197__$1;
(statearr_14214_16914[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14198 === (3))){
var inst_14195 = (state_14197[(2)]);
var state_14197__$1 = state_14197;
return cljs.core.async.impl.ioc_helpers.return_chan(state_14197__$1,inst_14195);
} else {
if((state_val_14198 === (12))){
var inst_14168 = (state_14197[(10)]);
var state_14197__$1 = state_14197;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14197__$1,(14),inst_14168);
} else {
if((state_val_14198 === (2))){
var state_14197__$1 = state_14197;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14197__$1,(4),results);
} else {
if((state_val_14198 === (19))){
var state_14197__$1 = state_14197;
var statearr_14215_16923 = state_14197__$1;
(statearr_14215_16923[(2)] = null);

(statearr_14215_16923[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14198 === (11))){
var inst_14168 = (state_14197[(2)]);
var state_14197__$1 = (function (){var statearr_14216 = state_14197;
(statearr_14216[(10)] = inst_14168);

return statearr_14216;
})();
var statearr_14217_16924 = state_14197__$1;
(statearr_14217_16924[(2)] = null);

(statearr_14217_16924[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14198 === (9))){
var state_14197__$1 = state_14197;
var statearr_14219_16929 = state_14197__$1;
(statearr_14219_16929[(2)] = null);

(statearr_14219_16929[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14198 === (5))){
var state_14197__$1 = state_14197;
if(cljs.core.truth_(close_QMARK_)){
var statearr_14220_16930 = state_14197__$1;
(statearr_14220_16930[(1)] = (8));

} else {
var statearr_14221_16931 = state_14197__$1;
(statearr_14221_16931[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14198 === (14))){
var inst_14171 = (state_14197[(8)]);
var inst_14174 = (state_14197[(11)]);
var inst_14171__$1 = (state_14197[(2)]);
var inst_14173 = (inst_14171__$1 == null);
var inst_14174__$1 = cljs.core.not(inst_14173);
var state_14197__$1 = (function (){var statearr_14222 = state_14197;
(statearr_14222[(8)] = inst_14171__$1);

(statearr_14222[(11)] = inst_14174__$1);

return statearr_14222;
})();
if(inst_14174__$1){
var statearr_14223_16932 = state_14197__$1;
(statearr_14223_16932[(1)] = (15));

} else {
var statearr_14224_16933 = state_14197__$1;
(statearr_14224_16933[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14198 === (16))){
var inst_14174 = (state_14197[(11)]);
var state_14197__$1 = state_14197;
var statearr_14225_16934 = state_14197__$1;
(statearr_14225_16934[(2)] = inst_14174);

(statearr_14225_16934[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14198 === (10))){
var inst_14165 = (state_14197[(2)]);
var state_14197__$1 = state_14197;
var statearr_14226_16935 = state_14197__$1;
(statearr_14226_16935[(2)] = inst_14165);

(statearr_14226_16935[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14198 === (18))){
var inst_14180 = (state_14197[(2)]);
var state_14197__$1 = state_14197;
var statearr_14228_16939 = state_14197__$1;
(statearr_14228_16939[(2)] = inst_14180);

(statearr_14228_16939[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14198 === (8))){
var inst_14162 = cljs.core.async.close_BANG_(to);
var state_14197__$1 = state_14197;
var statearr_14229_16941 = state_14197__$1;
(statearr_14229_16941[(2)] = inst_14162);

(statearr_14229_16941[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____0 = (function (){
var statearr_14234 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_14234[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__);

(statearr_14234[(1)] = (1));

return statearr_14234;
});
var cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____1 = (function (state_14197){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_14197);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e14235){var ex__12863__auto__ = e14235;
var statearr_14236_16943 = state_14197;
(statearr_14236_16943[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_14197[(4)]))){
var statearr_14237_16944 = state_14197;
(statearr_14237_16944[(1)] = cljs.core.first((state_14197[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16945 = state_14197;
state_14197 = G__16945;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__ = function(state_14197){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____1.call(this,state_14197);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__12860__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__12860__auto__;
})()
})();
var state__13430__auto__ = (function (){var statearr_14239 = f__13429__auto__();
(statearr_14239[(6)] = c__13428__auto__);

return statearr_14239;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
}));

return c__13428__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). The
 *   presumption is that af will return immediately, having launched some
 *   asynchronous operation whose completion/callback will put results on
 *   the channel, then close! it. Outputs will be returned in order
 *   relative to the inputs. By default, the to channel will be closed
 *   when the from channel closes, but can be determined by the close?
 *   parameter. Will stop consuming the from channel if the to channel
 *   closes. See also pipeline, pipeline-blocking.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var G__14242 = arguments.length;
switch (G__14242) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5(n,to,af,from,true);
}));

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_(n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
}));

(cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5);

/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var G__14250 = arguments.length;
switch (G__14250) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5(n,to,xf,from,true);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6(n,to,xf,from,close_QMARK_,null);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
}));

(cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6);

/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var G__14257 = arguments.length;
switch (G__14257) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4(p,ch,null,null);
}));

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(t_buf_or_n);
var fc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(f_buf_or_n);
var c__13428__auto___16959 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = (function (state_14286){
var state_val_14287 = (state_14286[(1)]);
if((state_val_14287 === (7))){
var inst_14282 = (state_14286[(2)]);
var state_14286__$1 = state_14286;
var statearr_14290_16960 = state_14286__$1;
(statearr_14290_16960[(2)] = inst_14282);

(statearr_14290_16960[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14287 === (1))){
var state_14286__$1 = state_14286;
var statearr_14293_16963 = state_14286__$1;
(statearr_14293_16963[(2)] = null);

(statearr_14293_16963[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14287 === (4))){
var inst_14263 = (state_14286[(7)]);
var inst_14263__$1 = (state_14286[(2)]);
var inst_14264 = (inst_14263__$1 == null);
var state_14286__$1 = (function (){var statearr_14298 = state_14286;
(statearr_14298[(7)] = inst_14263__$1);

return statearr_14298;
})();
if(cljs.core.truth_(inst_14264)){
var statearr_14299_16965 = state_14286__$1;
(statearr_14299_16965[(1)] = (5));

} else {
var statearr_14300_16966 = state_14286__$1;
(statearr_14300_16966[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14287 === (13))){
var state_14286__$1 = state_14286;
var statearr_14303_16967 = state_14286__$1;
(statearr_14303_16967[(2)] = null);

(statearr_14303_16967[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14287 === (6))){
var inst_14263 = (state_14286[(7)]);
var inst_14269 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_14263) : p.call(null,inst_14263));
var state_14286__$1 = state_14286;
if(cljs.core.truth_(inst_14269)){
var statearr_14304_16974 = state_14286__$1;
(statearr_14304_16974[(1)] = (9));

} else {
var statearr_14307_16975 = state_14286__$1;
(statearr_14307_16975[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14287 === (3))){
var inst_14284 = (state_14286[(2)]);
var state_14286__$1 = state_14286;
return cljs.core.async.impl.ioc_helpers.return_chan(state_14286__$1,inst_14284);
} else {
if((state_val_14287 === (12))){
var state_14286__$1 = state_14286;
var statearr_14310_16984 = state_14286__$1;
(statearr_14310_16984[(2)] = null);

(statearr_14310_16984[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14287 === (2))){
var state_14286__$1 = state_14286;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14286__$1,(4),ch);
} else {
if((state_val_14287 === (11))){
var inst_14263 = (state_14286[(7)]);
var inst_14273 = (state_14286[(2)]);
var state_14286__$1 = state_14286;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_14286__$1,(8),inst_14273,inst_14263);
} else {
if((state_val_14287 === (9))){
var state_14286__$1 = state_14286;
var statearr_14316_16988 = state_14286__$1;
(statearr_14316_16988[(2)] = tc);

(statearr_14316_16988[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14287 === (5))){
var inst_14266 = cljs.core.async.close_BANG_(tc);
var inst_14267 = cljs.core.async.close_BANG_(fc);
var state_14286__$1 = (function (){var statearr_14317 = state_14286;
(statearr_14317[(8)] = inst_14266);

return statearr_14317;
})();
var statearr_14322_16989 = state_14286__$1;
(statearr_14322_16989[(2)] = inst_14267);

(statearr_14322_16989[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14287 === (14))){
var inst_14280 = (state_14286[(2)]);
var state_14286__$1 = state_14286;
var statearr_14324_16990 = state_14286__$1;
(statearr_14324_16990[(2)] = inst_14280);

(statearr_14324_16990[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14287 === (10))){
var state_14286__$1 = state_14286;
var statearr_14326_16993 = state_14286__$1;
(statearr_14326_16993[(2)] = fc);

(statearr_14326_16993[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14287 === (8))){
var inst_14275 = (state_14286[(2)]);
var state_14286__$1 = state_14286;
if(cljs.core.truth_(inst_14275)){
var statearr_14329_16995 = state_14286__$1;
(statearr_14329_16995[(1)] = (12));

} else {
var statearr_14330_16996 = state_14286__$1;
(statearr_14330_16996[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
}
}
}
});
return (function() {
var cljs$core$async$state_machine__12860__auto__ = null;
var cljs$core$async$state_machine__12860__auto____0 = (function (){
var statearr_14334 = [null,null,null,null,null,null,null,null,null];
(statearr_14334[(0)] = cljs$core$async$state_machine__12860__auto__);

(statearr_14334[(1)] = (1));

return statearr_14334;
});
var cljs$core$async$state_machine__12860__auto____1 = (function (state_14286){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_14286);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e14335){var ex__12863__auto__ = e14335;
var statearr_14336_16997 = state_14286;
(statearr_14336_16997[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_14286[(4)]))){
var statearr_14338_16998 = state_14286;
(statearr_14338_16998[(1)] = cljs.core.first((state_14286[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17001 = state_14286;
state_14286 = G__17001;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
cljs$core$async$state_machine__12860__auto__ = function(state_14286){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12860__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12860__auto____1.call(this,state_14286);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12860__auto____0;
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12860__auto____1;
return cljs$core$async$state_machine__12860__auto__;
})()
})();
var state__13430__auto__ = (function (){var statearr_14341 = f__13429__auto__();
(statearr_14341[(6)] = c__13428__auto___16959);

return statearr_14341;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
}));


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
}));

(cljs.core.async.split.cljs$lang$maxFixedArity = 4);

/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__13428__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = (function (state_14378){
var state_val_14379 = (state_14378[(1)]);
if((state_val_14379 === (7))){
var inst_14373 = (state_14378[(2)]);
var state_14378__$1 = state_14378;
var statearr_14384_17003 = state_14378__$1;
(statearr_14384_17003[(2)] = inst_14373);

(statearr_14384_17003[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14379 === (1))){
var inst_14355 = init;
var inst_14356 = inst_14355;
var state_14378__$1 = (function (){var statearr_14386 = state_14378;
(statearr_14386[(7)] = inst_14356);

return statearr_14386;
})();
var statearr_14387_17004 = state_14378__$1;
(statearr_14387_17004[(2)] = null);

(statearr_14387_17004[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14379 === (4))){
var inst_14359 = (state_14378[(8)]);
var inst_14359__$1 = (state_14378[(2)]);
var inst_14360 = (inst_14359__$1 == null);
var state_14378__$1 = (function (){var statearr_14390 = state_14378;
(statearr_14390[(8)] = inst_14359__$1);

return statearr_14390;
})();
if(cljs.core.truth_(inst_14360)){
var statearr_14393_17006 = state_14378__$1;
(statearr_14393_17006[(1)] = (5));

} else {
var statearr_14395_17007 = state_14378__$1;
(statearr_14395_17007[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14379 === (6))){
var inst_14363 = (state_14378[(9)]);
var inst_14359 = (state_14378[(8)]);
var inst_14356 = (state_14378[(7)]);
var inst_14363__$1 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_14356,inst_14359) : f.call(null,inst_14356,inst_14359));
var inst_14364 = cljs.core.reduced_QMARK_(inst_14363__$1);
var state_14378__$1 = (function (){var statearr_14397 = state_14378;
(statearr_14397[(9)] = inst_14363__$1);

return statearr_14397;
})();
if(inst_14364){
var statearr_14399_17008 = state_14378__$1;
(statearr_14399_17008[(1)] = (8));

} else {
var statearr_14400_17016 = state_14378__$1;
(statearr_14400_17016[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14379 === (3))){
var inst_14375 = (state_14378[(2)]);
var state_14378__$1 = state_14378;
return cljs.core.async.impl.ioc_helpers.return_chan(state_14378__$1,inst_14375);
} else {
if((state_val_14379 === (2))){
var state_14378__$1 = state_14378;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14378__$1,(4),ch);
} else {
if((state_val_14379 === (9))){
var inst_14363 = (state_14378[(9)]);
var inst_14356 = inst_14363;
var state_14378__$1 = (function (){var statearr_14406 = state_14378;
(statearr_14406[(7)] = inst_14356);

return statearr_14406;
})();
var statearr_14407_17021 = state_14378__$1;
(statearr_14407_17021[(2)] = null);

(statearr_14407_17021[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14379 === (5))){
var inst_14356 = (state_14378[(7)]);
var state_14378__$1 = state_14378;
var statearr_14408_17023 = state_14378__$1;
(statearr_14408_17023[(2)] = inst_14356);

(statearr_14408_17023[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14379 === (10))){
var inst_14371 = (state_14378[(2)]);
var state_14378__$1 = state_14378;
var statearr_14411_17024 = state_14378__$1;
(statearr_14411_17024[(2)] = inst_14371);

(statearr_14411_17024[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14379 === (8))){
var inst_14363 = (state_14378[(9)]);
var inst_14366 = cljs.core.deref(inst_14363);
var state_14378__$1 = state_14378;
var statearr_14415_17025 = state_14378__$1;
(statearr_14415_17025[(2)] = inst_14366);

(statearr_14415_17025[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
});
return (function() {
var cljs$core$async$reduce_$_state_machine__12860__auto__ = null;
var cljs$core$async$reduce_$_state_machine__12860__auto____0 = (function (){
var statearr_14420 = [null,null,null,null,null,null,null,null,null,null];
(statearr_14420[(0)] = cljs$core$async$reduce_$_state_machine__12860__auto__);

(statearr_14420[(1)] = (1));

return statearr_14420;
});
var cljs$core$async$reduce_$_state_machine__12860__auto____1 = (function (state_14378){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_14378);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e14421){var ex__12863__auto__ = e14421;
var statearr_14422_17039 = state_14378;
(statearr_14422_17039[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_14378[(4)]))){
var statearr_14424_17046 = state_14378;
(statearr_14424_17046[(1)] = cljs.core.first((state_14378[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17047 = state_14378;
state_14378 = G__17047;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__12860__auto__ = function(state_14378){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__12860__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__12860__auto____1.call(this,state_14378);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__12860__auto____0;
cljs$core$async$reduce_$_state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__12860__auto____1;
return cljs$core$async$reduce_$_state_machine__12860__auto__;
})()
})();
var state__13430__auto__ = (function (){var statearr_14427 = f__13429__auto__();
(statearr_14427[(6)] = c__13428__auto__);

return statearr_14427;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
}));

return c__13428__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = (xform.cljs$core$IFn$_invoke$arity$1 ? xform.cljs$core$IFn$_invoke$arity$1(f) : xform.call(null,f));
var c__13428__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = (function (state_14443){
var state_val_14444 = (state_14443[(1)]);
if((state_val_14444 === (1))){
var inst_14438 = cljs.core.async.reduce(f__$1,init,ch);
var state_14443__$1 = state_14443;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14443__$1,(2),inst_14438);
} else {
if((state_val_14444 === (2))){
var inst_14440 = (state_14443[(2)]);
var inst_14441 = (f__$1.cljs$core$IFn$_invoke$arity$1 ? f__$1.cljs$core$IFn$_invoke$arity$1(inst_14440) : f__$1.call(null,inst_14440));
var state_14443__$1 = state_14443;
return cljs.core.async.impl.ioc_helpers.return_chan(state_14443__$1,inst_14441);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$transduce_$_state_machine__12860__auto__ = null;
var cljs$core$async$transduce_$_state_machine__12860__auto____0 = (function (){
var statearr_14451 = [null,null,null,null,null,null,null];
(statearr_14451[(0)] = cljs$core$async$transduce_$_state_machine__12860__auto__);

(statearr_14451[(1)] = (1));

return statearr_14451;
});
var cljs$core$async$transduce_$_state_machine__12860__auto____1 = (function (state_14443){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_14443);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e14452){var ex__12863__auto__ = e14452;
var statearr_14453_17070 = state_14443;
(statearr_14453_17070[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_14443[(4)]))){
var statearr_14454_17074 = state_14443;
(statearr_14454_17074[(1)] = cljs.core.first((state_14443[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17076 = state_14443;
state_14443 = G__17076;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__12860__auto__ = function(state_14443){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__12860__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__12860__auto____1.call(this,state_14443);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__12860__auto____0;
cljs$core$async$transduce_$_state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__12860__auto____1;
return cljs$core$async$transduce_$_state_machine__12860__auto__;
})()
})();
var state__13430__auto__ = (function (){var statearr_14459 = f__13429__auto__();
(statearr_14459[(6)] = c__13428__auto__);

return statearr_14459;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
}));

return c__13428__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan_BANG_ = (function cljs$core$async$onto_chan_BANG_(var_args){
var G__14466 = arguments.length;
switch (G__14466) {
case 2:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__13428__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = (function (state_14495){
var state_val_14496 = (state_14495[(1)]);
if((state_val_14496 === (7))){
var inst_14477 = (state_14495[(2)]);
var state_14495__$1 = state_14495;
var statearr_14504_17085 = state_14495__$1;
(statearr_14504_17085[(2)] = inst_14477);

(statearr_14504_17085[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14496 === (1))){
var inst_14470 = cljs.core.seq(coll);
var inst_14472 = inst_14470;
var state_14495__$1 = (function (){var statearr_14505 = state_14495;
(statearr_14505[(7)] = inst_14472);

return statearr_14505;
})();
var statearr_14506_17086 = state_14495__$1;
(statearr_14506_17086[(2)] = null);

(statearr_14506_17086[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14496 === (4))){
var inst_14472 = (state_14495[(7)]);
var inst_14475 = cljs.core.first(inst_14472);
var state_14495__$1 = state_14495;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_14495__$1,(7),ch,inst_14475);
} else {
if((state_val_14496 === (13))){
var inst_14489 = (state_14495[(2)]);
var state_14495__$1 = state_14495;
var statearr_14511_17090 = state_14495__$1;
(statearr_14511_17090[(2)] = inst_14489);

(statearr_14511_17090[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14496 === (6))){
var inst_14480 = (state_14495[(2)]);
var state_14495__$1 = state_14495;
if(cljs.core.truth_(inst_14480)){
var statearr_14513_17091 = state_14495__$1;
(statearr_14513_17091[(1)] = (8));

} else {
var statearr_14514_17092 = state_14495__$1;
(statearr_14514_17092[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14496 === (3))){
var inst_14493 = (state_14495[(2)]);
var state_14495__$1 = state_14495;
return cljs.core.async.impl.ioc_helpers.return_chan(state_14495__$1,inst_14493);
} else {
if((state_val_14496 === (12))){
var state_14495__$1 = state_14495;
var statearr_14516_17095 = state_14495__$1;
(statearr_14516_17095[(2)] = null);

(statearr_14516_17095[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14496 === (2))){
var inst_14472 = (state_14495[(7)]);
var state_14495__$1 = state_14495;
if(cljs.core.truth_(inst_14472)){
var statearr_14517_17096 = state_14495__$1;
(statearr_14517_17096[(1)] = (4));

} else {
var statearr_14518_17097 = state_14495__$1;
(statearr_14518_17097[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14496 === (11))){
var inst_14486 = cljs.core.async.close_BANG_(ch);
var state_14495__$1 = state_14495;
var statearr_14524_17098 = state_14495__$1;
(statearr_14524_17098[(2)] = inst_14486);

(statearr_14524_17098[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14496 === (9))){
var state_14495__$1 = state_14495;
if(cljs.core.truth_(close_QMARK_)){
var statearr_14533_17107 = state_14495__$1;
(statearr_14533_17107[(1)] = (11));

} else {
var statearr_14534_17108 = state_14495__$1;
(statearr_14534_17108[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14496 === (5))){
var inst_14472 = (state_14495[(7)]);
var state_14495__$1 = state_14495;
var statearr_14535_17113 = state_14495__$1;
(statearr_14535_17113[(2)] = inst_14472);

(statearr_14535_17113[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14496 === (10))){
var inst_14491 = (state_14495[(2)]);
var state_14495__$1 = state_14495;
var statearr_14540_17114 = state_14495__$1;
(statearr_14540_17114[(2)] = inst_14491);

(statearr_14540_17114[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14496 === (8))){
var inst_14472 = (state_14495[(7)]);
var inst_14482 = cljs.core.next(inst_14472);
var inst_14472__$1 = inst_14482;
var state_14495__$1 = (function (){var statearr_14541 = state_14495;
(statearr_14541[(7)] = inst_14472__$1);

return statearr_14541;
})();
var statearr_14542_17116 = state_14495__$1;
(statearr_14542_17116[(2)] = null);

(statearr_14542_17116[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
}
}
});
return (function() {
var cljs$core$async$state_machine__12860__auto__ = null;
var cljs$core$async$state_machine__12860__auto____0 = (function (){
var statearr_14545 = [null,null,null,null,null,null,null,null];
(statearr_14545[(0)] = cljs$core$async$state_machine__12860__auto__);

(statearr_14545[(1)] = (1));

return statearr_14545;
});
var cljs$core$async$state_machine__12860__auto____1 = (function (state_14495){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_14495);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e14549){var ex__12863__auto__ = e14549;
var statearr_14550_17121 = state_14495;
(statearr_14550_17121[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_14495[(4)]))){
var statearr_14551_17126 = state_14495;
(statearr_14551_17126[(1)] = cljs.core.first((state_14495[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17127 = state_14495;
state_14495 = G__17127;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
cljs$core$async$state_machine__12860__auto__ = function(state_14495){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12860__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12860__auto____1.call(this,state_14495);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12860__auto____0;
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12860__auto____1;
return cljs$core$async$state_machine__12860__auto__;
})()
})();
var state__13430__auto__ = (function (){var statearr_14552 = f__13429__auto__();
(statearr_14552[(6)] = c__13428__auto__);

return statearr_14552;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
}));

return c__13428__auto__;
}));

(cljs.core.async.onto_chan_BANG_.cljs$lang$maxFixedArity = 3);

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan_BANG_ = (function cljs$core$async$to_chan_BANG_(coll){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.bounded_count((100),coll));
cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2(ch,coll);

return ch;
});
/**
 * Deprecated - use onto-chan!
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var G__14558 = arguments.length;
switch (G__14558) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,close_QMARK_);
}));

(cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - use to-chan!
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
return cljs.core.async.to_chan_BANG_(coll);
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

var cljs$core$async$Mux$muxch_STAR_$dyn_17138 = (function (_){
var x__5393__auto__ = (((_ == null))?null:_);
var m__5394__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5394__auto__.call(null,_));
} else {
var m__5392__auto__ = (cljs.core.async.muxch_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5392__auto__.call(null,_));
} else {
throw cljs.core.missing_protocol("Mux.muxch*",_);
}
}
});
cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((((!((_ == null)))) && ((!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
return cljs$core$async$Mux$muxch_STAR_$dyn_17138(_);
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

var cljs$core$async$Mult$tap_STAR_$dyn_17143 = (function (m,ch,close_QMARK_){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5394__auto__.call(null,m,ch,close_QMARK_));
} else {
var m__5392__auto__ = (cljs.core.async.tap_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5392__auto__.call(null,m,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Mult.tap*",m);
}
}
});
cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
return cljs$core$async$Mult$tap_STAR_$dyn_17143(m,ch,close_QMARK_);
}
});

var cljs$core$async$Mult$untap_STAR_$dyn_17149 = (function (m,ch){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5394__auto__.call(null,m,ch));
} else {
var m__5392__auto__ = (cljs.core.async.untap_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5392__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mult.untap*",m);
}
}
});
cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mult$untap_STAR_$dyn_17149(m,ch);
}
});

var cljs$core$async$Mult$untap_all_STAR_$dyn_17150 = (function (m){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5394__auto__.call(null,m));
} else {
var m__5392__auto__ = (cljs.core.async.untap_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5392__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mult.untap-all*",m);
}
}
});
cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mult$untap_all_STAR_$dyn_17150(m);
}
});


/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async14587 = (function (ch,cs,meta14588){
this.ch = ch;
this.cs = cs;
this.meta14588 = meta14588;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async14587.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14589,meta14588__$1){
var self__ = this;
var _14589__$1 = this;
return (new cljs.core.async.t_cljs$core$async14587(self__.ch,self__.cs,meta14588__$1));
}));

(cljs.core.async.t_cljs$core$async14587.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14589){
var self__ = this;
var _14589__$1 = this;
return self__.meta14588;
}));

(cljs.core.async.t_cljs$core$async14587.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14587.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async14587.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async14587.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
}));

(cljs.core.async.t_cljs$core$async14587.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$1);

return null;
}));

(cljs.core.async.t_cljs$core$async14587.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
}));

(cljs.core.async.t_cljs$core$async14587.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta14588","meta14588",-474434579,null)], null);
}));

(cljs.core.async.t_cljs$core$async14587.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async14587.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async14587");

(cljs.core.async.t_cljs$core$async14587.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async14587");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async14587.
 */
cljs.core.async.__GT_t_cljs$core$async14587 = (function cljs$core$async$__GT_t_cljs$core$async14587(ch,cs,meta14588){
return (new cljs.core.async.t_cljs$core$async14587(ch,cs,meta14588));
});


/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var m = (new cljs.core.async.t_cljs$core$async14587(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = (function (_){
if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,true);
} else {
return null;
}
});
var c__13428__auto___17166 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = (function (state_14762){
var state_val_14768 = (state_14762[(1)]);
if((state_val_14768 === (7))){
var inst_14752 = (state_14762[(2)]);
var state_14762__$1 = state_14762;
var statearr_14769_17167 = state_14762__$1;
(statearr_14769_17167[(2)] = inst_14752);

(statearr_14769_17167[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (20))){
var inst_14648 = (state_14762[(7)]);
var inst_14660 = cljs.core.first(inst_14648);
var inst_14661 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_14660,(0),null);
var inst_14662 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_14660,(1),null);
var state_14762__$1 = (function (){var statearr_14771 = state_14762;
(statearr_14771[(8)] = inst_14661);

return statearr_14771;
})();
if(cljs.core.truth_(inst_14662)){
var statearr_14772_17168 = state_14762__$1;
(statearr_14772_17168[(1)] = (22));

} else {
var statearr_14773_17169 = state_14762__$1;
(statearr_14773_17169[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (27))){
var inst_14695 = (state_14762[(9)]);
var inst_14610 = (state_14762[(10)]);
var inst_14693 = (state_14762[(11)]);
var inst_14702 = (state_14762[(12)]);
var inst_14702__$1 = cljs.core._nth(inst_14693,inst_14695);
var inst_14703 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_14702__$1,inst_14610,done);
var state_14762__$1 = (function (){var statearr_14778 = state_14762;
(statearr_14778[(12)] = inst_14702__$1);

return statearr_14778;
})();
if(cljs.core.truth_(inst_14703)){
var statearr_14779_17175 = state_14762__$1;
(statearr_14779_17175[(1)] = (30));

} else {
var statearr_14780_17176 = state_14762__$1;
(statearr_14780_17176[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (1))){
var state_14762__$1 = state_14762;
var statearr_14781_17178 = state_14762__$1;
(statearr_14781_17178[(2)] = null);

(statearr_14781_17178[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (24))){
var inst_14648 = (state_14762[(7)]);
var inst_14668 = (state_14762[(2)]);
var inst_14669 = cljs.core.next(inst_14648);
var inst_14622 = inst_14669;
var inst_14623 = null;
var inst_14624 = (0);
var inst_14625 = (0);
var state_14762__$1 = (function (){var statearr_14782 = state_14762;
(statearr_14782[(13)] = inst_14624);

(statearr_14782[(14)] = inst_14668);

(statearr_14782[(15)] = inst_14622);

(statearr_14782[(16)] = inst_14623);

(statearr_14782[(17)] = inst_14625);

return statearr_14782;
})();
var statearr_14783_17182 = state_14762__$1;
(statearr_14783_17182[(2)] = null);

(statearr_14783_17182[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (39))){
var state_14762__$1 = state_14762;
var statearr_14789_17183 = state_14762__$1;
(statearr_14789_17183[(2)] = null);

(statearr_14789_17183[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (4))){
var inst_14610 = (state_14762[(10)]);
var inst_14610__$1 = (state_14762[(2)]);
var inst_14611 = (inst_14610__$1 == null);
var state_14762__$1 = (function (){var statearr_14793 = state_14762;
(statearr_14793[(10)] = inst_14610__$1);

return statearr_14793;
})();
if(cljs.core.truth_(inst_14611)){
var statearr_14794_17184 = state_14762__$1;
(statearr_14794_17184[(1)] = (5));

} else {
var statearr_14795_17185 = state_14762__$1;
(statearr_14795_17185[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (15))){
var inst_14624 = (state_14762[(13)]);
var inst_14622 = (state_14762[(15)]);
var inst_14623 = (state_14762[(16)]);
var inst_14625 = (state_14762[(17)]);
var inst_14644 = (state_14762[(2)]);
var inst_14645 = (inst_14625 + (1));
var tmp14784 = inst_14624;
var tmp14785 = inst_14622;
var tmp14786 = inst_14623;
var inst_14622__$1 = tmp14785;
var inst_14623__$1 = tmp14786;
var inst_14624__$1 = tmp14784;
var inst_14625__$1 = inst_14645;
var state_14762__$1 = (function (){var statearr_14800 = state_14762;
(statearr_14800[(13)] = inst_14624__$1);

(statearr_14800[(18)] = inst_14644);

(statearr_14800[(15)] = inst_14622__$1);

(statearr_14800[(16)] = inst_14623__$1);

(statearr_14800[(17)] = inst_14625__$1);

return statearr_14800;
})();
var statearr_14804_17187 = state_14762__$1;
(statearr_14804_17187[(2)] = null);

(statearr_14804_17187[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (21))){
var inst_14672 = (state_14762[(2)]);
var state_14762__$1 = state_14762;
var statearr_14815_17191 = state_14762__$1;
(statearr_14815_17191[(2)] = inst_14672);

(statearr_14815_17191[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (31))){
var inst_14702 = (state_14762[(12)]);
var inst_14706 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_14702);
var state_14762__$1 = state_14762;
var statearr_14816_17194 = state_14762__$1;
(statearr_14816_17194[(2)] = inst_14706);

(statearr_14816_17194[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (32))){
var inst_14695 = (state_14762[(9)]);
var inst_14693 = (state_14762[(11)]);
var inst_14692 = (state_14762[(19)]);
var inst_14694 = (state_14762[(20)]);
var inst_14708 = (state_14762[(2)]);
var inst_14709 = (inst_14695 + (1));
var tmp14805 = inst_14693;
var tmp14806 = inst_14692;
var tmp14807 = inst_14694;
var inst_14692__$1 = tmp14806;
var inst_14693__$1 = tmp14805;
var inst_14694__$1 = tmp14807;
var inst_14695__$1 = inst_14709;
var state_14762__$1 = (function (){var statearr_14820 = state_14762;
(statearr_14820[(9)] = inst_14695__$1);

(statearr_14820[(11)] = inst_14693__$1);

(statearr_14820[(19)] = inst_14692__$1);

(statearr_14820[(21)] = inst_14708);

(statearr_14820[(20)] = inst_14694__$1);

return statearr_14820;
})();
var statearr_14824_17196 = state_14762__$1;
(statearr_14824_17196[(2)] = null);

(statearr_14824_17196[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (40))){
var inst_14725 = (state_14762[(22)]);
var inst_14729 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_14725);
var state_14762__$1 = state_14762;
var statearr_14825_17197 = state_14762__$1;
(statearr_14825_17197[(2)] = inst_14729);

(statearr_14825_17197[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (33))){
var inst_14713 = (state_14762[(23)]);
var inst_14717 = cljs.core.chunked_seq_QMARK_(inst_14713);
var state_14762__$1 = state_14762;
if(inst_14717){
var statearr_14828_17205 = state_14762__$1;
(statearr_14828_17205[(1)] = (36));

} else {
var statearr_14829_17208 = state_14762__$1;
(statearr_14829_17208[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (13))){
var inst_14634 = (state_14762[(24)]);
var inst_14641 = cljs.core.async.close_BANG_(inst_14634);
var state_14762__$1 = state_14762;
var statearr_14836_17212 = state_14762__$1;
(statearr_14836_17212[(2)] = inst_14641);

(statearr_14836_17212[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (22))){
var inst_14661 = (state_14762[(8)]);
var inst_14665 = cljs.core.async.close_BANG_(inst_14661);
var state_14762__$1 = state_14762;
var statearr_14841_17213 = state_14762__$1;
(statearr_14841_17213[(2)] = inst_14665);

(statearr_14841_17213[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (36))){
var inst_14713 = (state_14762[(23)]);
var inst_14720 = cljs.core.chunk_first(inst_14713);
var inst_14721 = cljs.core.chunk_rest(inst_14713);
var inst_14722 = cljs.core.count(inst_14720);
var inst_14692 = inst_14721;
var inst_14693 = inst_14720;
var inst_14694 = inst_14722;
var inst_14695 = (0);
var state_14762__$1 = (function (){var statearr_14854 = state_14762;
(statearr_14854[(9)] = inst_14695);

(statearr_14854[(11)] = inst_14693);

(statearr_14854[(19)] = inst_14692);

(statearr_14854[(20)] = inst_14694);

return statearr_14854;
})();
var statearr_14855_17215 = state_14762__$1;
(statearr_14855_17215[(2)] = null);

(statearr_14855_17215[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (41))){
var inst_14713 = (state_14762[(23)]);
var inst_14731 = (state_14762[(2)]);
var inst_14732 = cljs.core.next(inst_14713);
var inst_14692 = inst_14732;
var inst_14693 = null;
var inst_14694 = (0);
var inst_14695 = (0);
var state_14762__$1 = (function (){var statearr_14862 = state_14762;
(statearr_14862[(9)] = inst_14695);

(statearr_14862[(25)] = inst_14731);

(statearr_14862[(11)] = inst_14693);

(statearr_14862[(19)] = inst_14692);

(statearr_14862[(20)] = inst_14694);

return statearr_14862;
})();
var statearr_14864_17218 = state_14762__$1;
(statearr_14864_17218[(2)] = null);

(statearr_14864_17218[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (43))){
var state_14762__$1 = state_14762;
var statearr_14865_17219 = state_14762__$1;
(statearr_14865_17219[(2)] = null);

(statearr_14865_17219[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (29))){
var inst_14740 = (state_14762[(2)]);
var state_14762__$1 = state_14762;
var statearr_14869_17220 = state_14762__$1;
(statearr_14869_17220[(2)] = inst_14740);

(statearr_14869_17220[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (44))){
var inst_14749 = (state_14762[(2)]);
var state_14762__$1 = (function (){var statearr_14870 = state_14762;
(statearr_14870[(26)] = inst_14749);

return statearr_14870;
})();
var statearr_14872_17222 = state_14762__$1;
(statearr_14872_17222[(2)] = null);

(statearr_14872_17222[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (6))){
var inst_14682 = (state_14762[(27)]);
var inst_14681 = cljs.core.deref(cs);
var inst_14682__$1 = cljs.core.keys(inst_14681);
var inst_14684 = cljs.core.count(inst_14682__$1);
var inst_14685 = cljs.core.reset_BANG_(dctr,inst_14684);
var inst_14691 = cljs.core.seq(inst_14682__$1);
var inst_14692 = inst_14691;
var inst_14693 = null;
var inst_14694 = (0);
var inst_14695 = (0);
var state_14762__$1 = (function (){var statearr_14876 = state_14762;
(statearr_14876[(9)] = inst_14695);

(statearr_14876[(11)] = inst_14693);

(statearr_14876[(28)] = inst_14685);

(statearr_14876[(19)] = inst_14692);

(statearr_14876[(27)] = inst_14682__$1);

(statearr_14876[(20)] = inst_14694);

return statearr_14876;
})();
var statearr_14877_17228 = state_14762__$1;
(statearr_14877_17228[(2)] = null);

(statearr_14877_17228[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (28))){
var inst_14713 = (state_14762[(23)]);
var inst_14692 = (state_14762[(19)]);
var inst_14713__$1 = cljs.core.seq(inst_14692);
var state_14762__$1 = (function (){var statearr_14880 = state_14762;
(statearr_14880[(23)] = inst_14713__$1);

return statearr_14880;
})();
if(inst_14713__$1){
var statearr_14884_17243 = state_14762__$1;
(statearr_14884_17243[(1)] = (33));

} else {
var statearr_14886_17244 = state_14762__$1;
(statearr_14886_17244[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (25))){
var inst_14695 = (state_14762[(9)]);
var inst_14694 = (state_14762[(20)]);
var inst_14699 = (inst_14695 < inst_14694);
var inst_14700 = inst_14699;
var state_14762__$1 = state_14762;
if(cljs.core.truth_(inst_14700)){
var statearr_14887_17245 = state_14762__$1;
(statearr_14887_17245[(1)] = (27));

} else {
var statearr_14888_17247 = state_14762__$1;
(statearr_14888_17247[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (34))){
var state_14762__$1 = state_14762;
var statearr_14891_17248 = state_14762__$1;
(statearr_14891_17248[(2)] = null);

(statearr_14891_17248[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (17))){
var state_14762__$1 = state_14762;
var statearr_14895_17252 = state_14762__$1;
(statearr_14895_17252[(2)] = null);

(statearr_14895_17252[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (3))){
var inst_14754 = (state_14762[(2)]);
var state_14762__$1 = state_14762;
return cljs.core.async.impl.ioc_helpers.return_chan(state_14762__$1,inst_14754);
} else {
if((state_val_14768 === (12))){
var inst_14677 = (state_14762[(2)]);
var state_14762__$1 = state_14762;
var statearr_14899_17254 = state_14762__$1;
(statearr_14899_17254[(2)] = inst_14677);

(statearr_14899_17254[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (2))){
var state_14762__$1 = state_14762;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14762__$1,(4),ch);
} else {
if((state_val_14768 === (23))){
var state_14762__$1 = state_14762;
var statearr_14902_17257 = state_14762__$1;
(statearr_14902_17257[(2)] = null);

(statearr_14902_17257[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (35))){
var inst_14738 = (state_14762[(2)]);
var state_14762__$1 = state_14762;
var statearr_14908_17258 = state_14762__$1;
(statearr_14908_17258[(2)] = inst_14738);

(statearr_14908_17258[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (19))){
var inst_14648 = (state_14762[(7)]);
var inst_14652 = cljs.core.chunk_first(inst_14648);
var inst_14653 = cljs.core.chunk_rest(inst_14648);
var inst_14654 = cljs.core.count(inst_14652);
var inst_14622 = inst_14653;
var inst_14623 = inst_14652;
var inst_14624 = inst_14654;
var inst_14625 = (0);
var state_14762__$1 = (function (){var statearr_14913 = state_14762;
(statearr_14913[(13)] = inst_14624);

(statearr_14913[(15)] = inst_14622);

(statearr_14913[(16)] = inst_14623);

(statearr_14913[(17)] = inst_14625);

return statearr_14913;
})();
var statearr_14917_17269 = state_14762__$1;
(statearr_14917_17269[(2)] = null);

(statearr_14917_17269[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (11))){
var inst_14622 = (state_14762[(15)]);
var inst_14648 = (state_14762[(7)]);
var inst_14648__$1 = cljs.core.seq(inst_14622);
var state_14762__$1 = (function (){var statearr_14923 = state_14762;
(statearr_14923[(7)] = inst_14648__$1);

return statearr_14923;
})();
if(inst_14648__$1){
var statearr_14924_17273 = state_14762__$1;
(statearr_14924_17273[(1)] = (16));

} else {
var statearr_14928_17274 = state_14762__$1;
(statearr_14928_17274[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (9))){
var inst_14679 = (state_14762[(2)]);
var state_14762__$1 = state_14762;
var statearr_14929_17275 = state_14762__$1;
(statearr_14929_17275[(2)] = inst_14679);

(statearr_14929_17275[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (5))){
var inst_14617 = cljs.core.deref(cs);
var inst_14619 = cljs.core.seq(inst_14617);
var inst_14622 = inst_14619;
var inst_14623 = null;
var inst_14624 = (0);
var inst_14625 = (0);
var state_14762__$1 = (function (){var statearr_14933 = state_14762;
(statearr_14933[(13)] = inst_14624);

(statearr_14933[(15)] = inst_14622);

(statearr_14933[(16)] = inst_14623);

(statearr_14933[(17)] = inst_14625);

return statearr_14933;
})();
var statearr_14937_17280 = state_14762__$1;
(statearr_14937_17280[(2)] = null);

(statearr_14937_17280[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (14))){
var state_14762__$1 = state_14762;
var statearr_14940_17285 = state_14762__$1;
(statearr_14940_17285[(2)] = null);

(statearr_14940_17285[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (45))){
var inst_14746 = (state_14762[(2)]);
var state_14762__$1 = state_14762;
var statearr_14944_17289 = state_14762__$1;
(statearr_14944_17289[(2)] = inst_14746);

(statearr_14944_17289[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (26))){
var inst_14682 = (state_14762[(27)]);
var inst_14742 = (state_14762[(2)]);
var inst_14743 = cljs.core.seq(inst_14682);
var state_14762__$1 = (function (){var statearr_14946 = state_14762;
(statearr_14946[(29)] = inst_14742);

return statearr_14946;
})();
if(inst_14743){
var statearr_14949_17296 = state_14762__$1;
(statearr_14949_17296[(1)] = (42));

} else {
var statearr_14951_17297 = state_14762__$1;
(statearr_14951_17297[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (16))){
var inst_14648 = (state_14762[(7)]);
var inst_14650 = cljs.core.chunked_seq_QMARK_(inst_14648);
var state_14762__$1 = state_14762;
if(inst_14650){
var statearr_14953_17298 = state_14762__$1;
(statearr_14953_17298[(1)] = (19));

} else {
var statearr_14954_17299 = state_14762__$1;
(statearr_14954_17299[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (38))){
var inst_14735 = (state_14762[(2)]);
var state_14762__$1 = state_14762;
var statearr_14956_17300 = state_14762__$1;
(statearr_14956_17300[(2)] = inst_14735);

(statearr_14956_17300[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (30))){
var state_14762__$1 = state_14762;
var statearr_14960_17301 = state_14762__$1;
(statearr_14960_17301[(2)] = null);

(statearr_14960_17301[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (10))){
var inst_14623 = (state_14762[(16)]);
var inst_14625 = (state_14762[(17)]);
var inst_14633 = cljs.core._nth(inst_14623,inst_14625);
var inst_14634 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_14633,(0),null);
var inst_14636 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_14633,(1),null);
var state_14762__$1 = (function (){var statearr_14962 = state_14762;
(statearr_14962[(24)] = inst_14634);

return statearr_14962;
})();
if(cljs.core.truth_(inst_14636)){
var statearr_14965_17303 = state_14762__$1;
(statearr_14965_17303[(1)] = (13));

} else {
var statearr_14966_17304 = state_14762__$1;
(statearr_14966_17304[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (18))){
var inst_14675 = (state_14762[(2)]);
var state_14762__$1 = state_14762;
var statearr_14971_17311 = state_14762__$1;
(statearr_14971_17311[(2)] = inst_14675);

(statearr_14971_17311[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (42))){
var state_14762__$1 = state_14762;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_14762__$1,(45),dchan);
} else {
if((state_val_14768 === (37))){
var inst_14725 = (state_14762[(22)]);
var inst_14610 = (state_14762[(10)]);
var inst_14713 = (state_14762[(23)]);
var inst_14725__$1 = cljs.core.first(inst_14713);
var inst_14726 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_14725__$1,inst_14610,done);
var state_14762__$1 = (function (){var statearr_14982 = state_14762;
(statearr_14982[(22)] = inst_14725__$1);

return statearr_14982;
})();
if(cljs.core.truth_(inst_14726)){
var statearr_14983_17312 = state_14762__$1;
(statearr_14983_17312[(1)] = (39));

} else {
var statearr_14984_17313 = state_14762__$1;
(statearr_14984_17313[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14768 === (8))){
var inst_14624 = (state_14762[(13)]);
var inst_14625 = (state_14762[(17)]);
var inst_14627 = (inst_14625 < inst_14624);
var inst_14628 = inst_14627;
var state_14762__$1 = state_14762;
if(cljs.core.truth_(inst_14628)){
var statearr_14989_17320 = state_14762__$1;
(statearr_14989_17320[(1)] = (10));

} else {
var statearr_14993_17321 = state_14762__$1;
(statearr_14993_17321[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
}
});
return (function() {
var cljs$core$async$mult_$_state_machine__12860__auto__ = null;
var cljs$core$async$mult_$_state_machine__12860__auto____0 = (function (){
var statearr_15003 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_15003[(0)] = cljs$core$async$mult_$_state_machine__12860__auto__);

(statearr_15003[(1)] = (1));

return statearr_15003;
});
var cljs$core$async$mult_$_state_machine__12860__auto____1 = (function (state_14762){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_14762);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e15005){var ex__12863__auto__ = e15005;
var statearr_15006_17324 = state_14762;
(statearr_15006_17324[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_14762[(4)]))){
var statearr_15009_17325 = state_14762;
(statearr_15009_17325[(1)] = cljs.core.first((state_14762[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17326 = state_14762;
state_14762 = G__17326;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__12860__auto__ = function(state_14762){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__12860__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__12860__auto____1.call(this,state_14762);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__12860__auto____0;
cljs$core$async$mult_$_state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__12860__auto____1;
return cljs$core$async$mult_$_state_machine__12860__auto__;
})()
})();
var state__13430__auto__ = (function (){var statearr_15016 = f__13429__auto__();
(statearr_15016[(6)] = c__13428__auto___17166);

return statearr_15016;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
}));


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var G__15024 = arguments.length;
switch (G__15024) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(mult,ch,true);
}));

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_(mult,ch,close_QMARK_);

return ch;
}));

(cljs.core.async.tap.cljs$lang$maxFixedArity = 3);

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_(mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_(mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

var cljs$core$async$Mix$admix_STAR_$dyn_17337 = (function (m,ch){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5394__auto__.call(null,m,ch));
} else {
var m__5392__auto__ = (cljs.core.async.admix_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5392__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.admix*",m);
}
}
});
cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$admix_STAR_$dyn_17337(m,ch);
}
});

var cljs$core$async$Mix$unmix_STAR_$dyn_17339 = (function (m,ch){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5394__auto__.call(null,m,ch));
} else {
var m__5392__auto__ = (cljs.core.async.unmix_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5392__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.unmix*",m);
}
}
});
cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$unmix_STAR_$dyn_17339(m,ch);
}
});

var cljs$core$async$Mix$unmix_all_STAR_$dyn_17344 = (function (m){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5394__auto__.call(null,m));
} else {
var m__5392__auto__ = (cljs.core.async.unmix_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5392__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mix.unmix-all*",m);
}
}
});
cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mix$unmix_all_STAR_$dyn_17344(m);
}
});

var cljs$core$async$Mix$toggle_STAR_$dyn_17351 = (function (m,state_map){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5394__auto__.call(null,m,state_map));
} else {
var m__5392__auto__ = (cljs.core.async.toggle_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5392__auto__.call(null,m,state_map));
} else {
throw cljs.core.missing_protocol("Mix.toggle*",m);
}
}
});
cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
return cljs$core$async$Mix$toggle_STAR_$dyn_17351(m,state_map);
}
});

var cljs$core$async$Mix$solo_mode_STAR_$dyn_17352 = (function (m,mode){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5394__auto__.call(null,m,mode));
} else {
var m__5392__auto__ = (cljs.core.async.solo_mode_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5392__auto__.call(null,m,mode));
} else {
throw cljs.core.missing_protocol("Mix.solo-mode*",m);
}
}
});
cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
return cljs$core$async$Mix$solo_mode_STAR_$dyn_17352(m,mode);
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___17365 = arguments.length;
var i__5770__auto___17366 = (0);
while(true){
if((i__5770__auto___17366 < len__5769__auto___17365)){
args__5775__auto__.push((arguments[i__5770__auto___17366]));

var G__17373 = (i__5770__auto___17366 + (1));
i__5770__auto___17366 = G__17373;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((3) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__5776__auto__);
});

(cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__15113){
var map__15114 = p__15113;
var map__15114__$1 = cljs.core.__destructure_map(map__15114);
var opts = map__15114__$1;
var statearr_15117_17374 = state;
(statearr_15117_17374[(1)] = cont_block);


var temp__5804__auto__ = cljs.core.async.do_alts((function (val){
var statearr_15121_17375 = state;
(statearr_15121_17375[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
}),ports,opts);
if(cljs.core.truth_(temp__5804__auto__)){
var cb = temp__5804__auto__;
var statearr_15122_17377 = state;
(statearr_15122_17377[(2)] = cljs.core.deref(cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}));

(cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq15101){
var G__15102 = cljs.core.first(seq15101);
var seq15101__$1 = cljs.core.next(seq15101);
var G__15103 = cljs.core.first(seq15101__$1);
var seq15101__$2 = cljs.core.next(seq15101__$1);
var G__15104 = cljs.core.first(seq15101__$2);
var seq15101__$3 = cljs.core.next(seq15101__$2);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__15102,G__15103,G__15104,seq15101__$3);
}));


/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async15157 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta15158){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta15158 = meta15158;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async15157.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15159,meta15158__$1){
var self__ = this;
var _15159__$1 = this;
return (new cljs.core.async.t_cljs$core$async15157(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta15158__$1));
}));

(cljs.core.async.t_cljs$core$async15157.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15159){
var self__ = this;
var _15159__$1 = this;
return self__.meta15158;
}));

(cljs.core.async.t_cljs$core$async15157.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async15157.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
}));

(cljs.core.async.t_cljs$core$async15157.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async15157.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async15157.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async15157.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async15157.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async15157.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.solo_modes.cljs$core$IFn$_invoke$arity$1 ? self__.solo_modes.cljs$core$IFn$_invoke$arity$1(mode) : self__.solo_modes.call(null,mode)))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_(self__.solo_mode,mode);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async15157.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta15158","meta15158",-2012100293,null)], null);
}));

(cljs.core.async.t_cljs$core$async15157.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async15157.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async15157");

(cljs.core.async.t_cljs$core$async15157.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async15157");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async15157.
 */
cljs.core.async.__GT_t_cljs$core$async15157 = (function cljs$core$async$__GT_t_cljs$core$async15157(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta15158){
return (new cljs.core.async.t_cljs$core$async15157(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta15158));
});


/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.async.sliding_buffer((1)));
var changed = (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(change,true);
});
var pick = (function (attr,chs){
return cljs.core.reduce_kv((function (ret,c,v){
if(cljs.core.truth_((attr.cljs$core$IFn$_invoke$arity$1 ? attr.cljs$core$IFn$_invoke$arity$1(v) : attr.call(null,v)))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,c);
} else {
return ret;
}
}),cljs.core.PersistentHashSet.EMPTY,chs);
});
var calc_state = (function (){
var chs = cljs.core.deref(cs);
var mode = cljs.core.deref(solo_mode);
var solos = pick(new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick(new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick(new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && ((!(cljs.core.empty_QMARK_(solos))))))?cljs.core.vec(solos):cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(pauses,cljs.core.keys(chs)))),change)], null);
});
var m = (new cljs.core.async.t_cljs$core$async15157(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
var c__13428__auto___17414 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = (function (state_15285){
var state_val_15286 = (state_15285[(1)]);
if((state_val_15286 === (7))){
var inst_15235 = (state_15285[(2)]);
var state_15285__$1 = state_15285;
if(cljs.core.truth_(inst_15235)){
var statearr_15291_17415 = state_15285__$1;
(statearr_15291_17415[(1)] = (8));

} else {
var statearr_15292_17416 = state_15285__$1;
(statearr_15292_17416[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (20))){
var inst_15227 = (state_15285[(7)]);
var state_15285__$1 = state_15285;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_15285__$1,(23),out,inst_15227);
} else {
if((state_val_15286 === (1))){
var inst_15203 = calc_state();
var inst_15204 = cljs.core.__destructure_map(inst_15203);
var inst_15209 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_15204,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_15210 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_15204,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_15211 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_15204,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_15212 = inst_15203;
var state_15285__$1 = (function (){var statearr_15294 = state_15285;
(statearr_15294[(8)] = inst_15210);

(statearr_15294[(9)] = inst_15212);

(statearr_15294[(10)] = inst_15211);

(statearr_15294[(11)] = inst_15209);

return statearr_15294;
})();
var statearr_15295_17420 = state_15285__$1;
(statearr_15295_17420[(2)] = null);

(statearr_15295_17420[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (24))){
var inst_15218 = (state_15285[(12)]);
var inst_15212 = inst_15218;
var state_15285__$1 = (function (){var statearr_15296 = state_15285;
(statearr_15296[(9)] = inst_15212);

return statearr_15296;
})();
var statearr_15297_17423 = state_15285__$1;
(statearr_15297_17423[(2)] = null);

(statearr_15297_17423[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (4))){
var inst_15227 = (state_15285[(7)]);
var inst_15230 = (state_15285[(13)]);
var inst_15226 = (state_15285[(2)]);
var inst_15227__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_15226,(0),null);
var inst_15229 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_15226,(1),null);
var inst_15230__$1 = (inst_15227__$1 == null);
var state_15285__$1 = (function (){var statearr_15298 = state_15285;
(statearr_15298[(7)] = inst_15227__$1);

(statearr_15298[(14)] = inst_15229);

(statearr_15298[(13)] = inst_15230__$1);

return statearr_15298;
})();
if(cljs.core.truth_(inst_15230__$1)){
var statearr_15303_17429 = state_15285__$1;
(statearr_15303_17429[(1)] = (5));

} else {
var statearr_15304_17430 = state_15285__$1;
(statearr_15304_17430[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (15))){
var inst_15219 = (state_15285[(15)]);
var inst_15249 = (state_15285[(16)]);
var inst_15249__$1 = cljs.core.empty_QMARK_(inst_15219);
var state_15285__$1 = (function (){var statearr_15309 = state_15285;
(statearr_15309[(16)] = inst_15249__$1);

return statearr_15309;
})();
if(inst_15249__$1){
var statearr_15310_17434 = state_15285__$1;
(statearr_15310_17434[(1)] = (17));

} else {
var statearr_15311_17435 = state_15285__$1;
(statearr_15311_17435[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (21))){
var inst_15218 = (state_15285[(12)]);
var inst_15212 = inst_15218;
var state_15285__$1 = (function (){var statearr_15313 = state_15285;
(statearr_15313[(9)] = inst_15212);

return statearr_15313;
})();
var statearr_15316_17437 = state_15285__$1;
(statearr_15316_17437[(2)] = null);

(statearr_15316_17437[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (13))){
var inst_15242 = (state_15285[(2)]);
var inst_15243 = calc_state();
var inst_15212 = inst_15243;
var state_15285__$1 = (function (){var statearr_15318 = state_15285;
(statearr_15318[(9)] = inst_15212);

(statearr_15318[(17)] = inst_15242);

return statearr_15318;
})();
var statearr_15319_17439 = state_15285__$1;
(statearr_15319_17439[(2)] = null);

(statearr_15319_17439[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (22))){
var inst_15272 = (state_15285[(2)]);
var state_15285__$1 = state_15285;
var statearr_15323_17444 = state_15285__$1;
(statearr_15323_17444[(2)] = inst_15272);

(statearr_15323_17444[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (6))){
var inst_15229 = (state_15285[(14)]);
var inst_15233 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_15229,change);
var state_15285__$1 = state_15285;
var statearr_15325_17448 = state_15285__$1;
(statearr_15325_17448[(2)] = inst_15233);

(statearr_15325_17448[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (25))){
var state_15285__$1 = state_15285;
var statearr_15326_17453 = state_15285__$1;
(statearr_15326_17453[(2)] = null);

(statearr_15326_17453[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (17))){
var inst_15220 = (state_15285[(18)]);
var inst_15229 = (state_15285[(14)]);
var inst_15251 = (inst_15220.cljs$core$IFn$_invoke$arity$1 ? inst_15220.cljs$core$IFn$_invoke$arity$1(inst_15229) : inst_15220.call(null,inst_15229));
var inst_15252 = cljs.core.not(inst_15251);
var state_15285__$1 = state_15285;
var statearr_15345_17460 = state_15285__$1;
(statearr_15345_17460[(2)] = inst_15252);

(statearr_15345_17460[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (3))){
var inst_15276 = (state_15285[(2)]);
var state_15285__$1 = state_15285;
return cljs.core.async.impl.ioc_helpers.return_chan(state_15285__$1,inst_15276);
} else {
if((state_val_15286 === (12))){
var state_15285__$1 = state_15285;
var statearr_15350_17461 = state_15285__$1;
(statearr_15350_17461[(2)] = null);

(statearr_15350_17461[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (2))){
var inst_15212 = (state_15285[(9)]);
var inst_15218 = (state_15285[(12)]);
var inst_15218__$1 = cljs.core.__destructure_map(inst_15212);
var inst_15219 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_15218__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_15220 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_15218__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_15221 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_15218__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_15285__$1 = (function (){var statearr_15355 = state_15285;
(statearr_15355[(15)] = inst_15219);

(statearr_15355[(18)] = inst_15220);

(statearr_15355[(12)] = inst_15218__$1);

return statearr_15355;
})();
return cljs.core.async.ioc_alts_BANG_(state_15285__$1,(4),inst_15221);
} else {
if((state_val_15286 === (23))){
var inst_15260 = (state_15285[(2)]);
var state_15285__$1 = state_15285;
if(cljs.core.truth_(inst_15260)){
var statearr_15361_17465 = state_15285__$1;
(statearr_15361_17465[(1)] = (24));

} else {
var statearr_15362_17468 = state_15285__$1;
(statearr_15362_17468[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (19))){
var inst_15255 = (state_15285[(2)]);
var state_15285__$1 = state_15285;
var statearr_15364_17475 = state_15285__$1;
(statearr_15364_17475[(2)] = inst_15255);

(statearr_15364_17475[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (11))){
var inst_15229 = (state_15285[(14)]);
var inst_15239 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_15229);
var state_15285__$1 = state_15285;
var statearr_15365_17479 = state_15285__$1;
(statearr_15365_17479[(2)] = inst_15239);

(statearr_15365_17479[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (9))){
var inst_15219 = (state_15285[(15)]);
var inst_15229 = (state_15285[(14)]);
var inst_15246 = (state_15285[(19)]);
var inst_15246__$1 = (inst_15219.cljs$core$IFn$_invoke$arity$1 ? inst_15219.cljs$core$IFn$_invoke$arity$1(inst_15229) : inst_15219.call(null,inst_15229));
var state_15285__$1 = (function (){var statearr_15367 = state_15285;
(statearr_15367[(19)] = inst_15246__$1);

return statearr_15367;
})();
if(cljs.core.truth_(inst_15246__$1)){
var statearr_15368_17484 = state_15285__$1;
(statearr_15368_17484[(1)] = (14));

} else {
var statearr_15370_17485 = state_15285__$1;
(statearr_15370_17485[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (5))){
var inst_15230 = (state_15285[(13)]);
var state_15285__$1 = state_15285;
var statearr_15375_17494 = state_15285__$1;
(statearr_15375_17494[(2)] = inst_15230);

(statearr_15375_17494[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (14))){
var inst_15246 = (state_15285[(19)]);
var state_15285__$1 = state_15285;
var statearr_15380_17502 = state_15285__$1;
(statearr_15380_17502[(2)] = inst_15246);

(statearr_15380_17502[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (26))){
var inst_15268 = (state_15285[(2)]);
var state_15285__$1 = state_15285;
var statearr_15384_17503 = state_15285__$1;
(statearr_15384_17503[(2)] = inst_15268);

(statearr_15384_17503[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (16))){
var inst_15257 = (state_15285[(2)]);
var state_15285__$1 = state_15285;
if(cljs.core.truth_(inst_15257)){
var statearr_15385_17504 = state_15285__$1;
(statearr_15385_17504[(1)] = (20));

} else {
var statearr_15386_17505 = state_15285__$1;
(statearr_15386_17505[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (10))){
var inst_15274 = (state_15285[(2)]);
var state_15285__$1 = state_15285;
var statearr_15391_17507 = state_15285__$1;
(statearr_15391_17507[(2)] = inst_15274);

(statearr_15391_17507[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (18))){
var inst_15249 = (state_15285[(16)]);
var state_15285__$1 = state_15285;
var statearr_15393_17509 = state_15285__$1;
(statearr_15393_17509[(2)] = inst_15249);

(statearr_15393_17509[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15286 === (8))){
var inst_15227 = (state_15285[(7)]);
var inst_15237 = (inst_15227 == null);
var state_15285__$1 = state_15285;
if(cljs.core.truth_(inst_15237)){
var statearr_15394_17510 = state_15285__$1;
(statearr_15394_17510[(1)] = (11));

} else {
var statearr_15395_17514 = state_15285__$1;
(statearr_15395_17514[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
}
}
}
}
});
return (function() {
var cljs$core$async$mix_$_state_machine__12860__auto__ = null;
var cljs$core$async$mix_$_state_machine__12860__auto____0 = (function (){
var statearr_15401 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_15401[(0)] = cljs$core$async$mix_$_state_machine__12860__auto__);

(statearr_15401[(1)] = (1));

return statearr_15401;
});
var cljs$core$async$mix_$_state_machine__12860__auto____1 = (function (state_15285){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_15285);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e15402){var ex__12863__auto__ = e15402;
var statearr_15403_17518 = state_15285;
(statearr_15403_17518[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_15285[(4)]))){
var statearr_15404_17519 = state_15285;
(statearr_15404_17519[(1)] = cljs.core.first((state_15285[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17520 = state_15285;
state_15285 = G__17520;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__12860__auto__ = function(state_15285){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__12860__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__12860__auto____1.call(this,state_15285);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__12860__auto____0;
cljs$core$async$mix_$_state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__12860__auto____1;
return cljs$core$async$mix_$_state_machine__12860__auto__;
})()
})();
var state__13430__auto__ = (function (){var statearr_15413 = f__13429__auto__();
(statearr_15413[(6)] = c__13428__auto___17414);

return statearr_15413;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
}));


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_(mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_(mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_(mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_(mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_(mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

var cljs$core$async$Pub$sub_STAR_$dyn_17525 = (function (p,v,ch,close_QMARK_){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5394__auto__.call(null,p,v,ch,close_QMARK_));
} else {
var m__5392__auto__ = (cljs.core.async.sub_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5392__auto__.call(null,p,v,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Pub.sub*",p);
}
}
});
cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
return cljs$core$async$Pub$sub_STAR_$dyn_17525(p,v,ch,close_QMARK_);
}
});

var cljs$core$async$Pub$unsub_STAR_$dyn_17528 = (function (p,v,ch){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5394__auto__.call(null,p,v,ch));
} else {
var m__5392__auto__ = (cljs.core.async.unsub_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5392__auto__.call(null,p,v,ch));
} else {
throw cljs.core.missing_protocol("Pub.unsub*",p);
}
}
});
cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
return cljs$core$async$Pub$unsub_STAR_$dyn_17528(p,v,ch);
}
});

var cljs$core$async$Pub$unsub_all_STAR_$dyn_17541 = (function() {
var G__17542 = null;
var G__17542__1 = (function (p){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5394__auto__.call(null,p));
} else {
var m__5392__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5392__auto__.call(null,p));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
var G__17542__2 = (function (p,v){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5394__auto__.call(null,p,v));
} else {
var m__5392__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5392__auto__.call(null,p,v));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
G__17542 = function(p,v){
switch(arguments.length){
case 1:
return G__17542__1.call(this,p);
case 2:
return G__17542__2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__17542.cljs$core$IFn$_invoke$arity$1 = G__17542__1;
G__17542.cljs$core$IFn$_invoke$arity$2 = G__17542__2;
return G__17542;
})()
;
cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__15437 = arguments.length;
switch (G__15437) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_17541(p);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_17541(p,v);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2);



/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async15452 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta15453){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta15453 = meta15453;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async15452.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15454,meta15453__$1){
var self__ = this;
var _15454__$1 = this;
return (new cljs.core.async.t_cljs$core$async15452(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta15453__$1));
}));

(cljs.core.async.t_cljs$core$async15452.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15454){
var self__ = this;
var _15454__$1 = this;
return self__.meta15453;
}));

(cljs.core.async.t_cljs$core$async15452.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async15452.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async15452.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async15452.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null,topic));
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$1,close_QMARK_);
}));

(cljs.core.async.t_cljs$core$async15452.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__5804__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.mults),topic);
if(cljs.core.truth_(temp__5804__auto__)){
var m = temp__5804__auto__;
return cljs.core.async.untap(m,ch__$1);
} else {
return null;
}
}));

(cljs.core.async.t_cljs$core$async15452.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_(self__.mults,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.core.async.t_cljs$core$async15452.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
}));

(cljs.core.async.t_cljs$core$async15452.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta15453","meta15453",513766925,null)], null);
}));

(cljs.core.async.t_cljs$core$async15452.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async15452.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async15452");

(cljs.core.async.t_cljs$core$async15452.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async15452");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async15452.
 */
cljs.core.async.__GT_t_cljs$core$async15452 = (function cljs$core$async$__GT_t_cljs$core$async15452(ch,topic_fn,buf_fn,mults,ensure_mult,meta15453){
return (new cljs.core.async.t_cljs$core$async15452(ch,topic_fn,buf_fn,mults,ensure_mult,meta15453));
});


/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var G__15447 = arguments.length;
switch (G__15447) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3(ch,topic_fn,cljs.core.constantly(null));
}));

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = (function (topic){
var or__5045__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mults),topic);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,(function (p1__15443_SHARP_){
if(cljs.core.truth_((p1__15443_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__15443_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__15443_SHARP_.call(null,topic)))){
return p1__15443_SHARP_;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__15443_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null,topic)))));
}
})),topic);
}
});
var p = (new cljs.core.async.t_cljs$core$async15452(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
var c__13428__auto___17575 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = (function (state_15539){
var state_val_15540 = (state_15539[(1)]);
if((state_val_15540 === (7))){
var inst_15535 = (state_15539[(2)]);
var state_15539__$1 = state_15539;
var statearr_15544_17579 = state_15539__$1;
(statearr_15544_17579[(2)] = inst_15535);

(statearr_15544_17579[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15540 === (20))){
var state_15539__$1 = state_15539;
var statearr_15545_17580 = state_15539__$1;
(statearr_15545_17580[(2)] = null);

(statearr_15545_17580[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15540 === (1))){
var state_15539__$1 = state_15539;
var statearr_15546_17581 = state_15539__$1;
(statearr_15546_17581[(2)] = null);

(statearr_15546_17581[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15540 === (24))){
var inst_15518 = (state_15539[(7)]);
var inst_15527 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_15518);
var state_15539__$1 = state_15539;
var statearr_15547_17585 = state_15539__$1;
(statearr_15547_17585[(2)] = inst_15527);

(statearr_15547_17585[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15540 === (4))){
var inst_15465 = (state_15539[(8)]);
var inst_15465__$1 = (state_15539[(2)]);
var inst_15466 = (inst_15465__$1 == null);
var state_15539__$1 = (function (){var statearr_15549 = state_15539;
(statearr_15549[(8)] = inst_15465__$1);

return statearr_15549;
})();
if(cljs.core.truth_(inst_15466)){
var statearr_15551_17586 = state_15539__$1;
(statearr_15551_17586[(1)] = (5));

} else {
var statearr_15552_17587 = state_15539__$1;
(statearr_15552_17587[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15540 === (15))){
var inst_15512 = (state_15539[(2)]);
var state_15539__$1 = state_15539;
var statearr_15554_17592 = state_15539__$1;
(statearr_15554_17592[(2)] = inst_15512);

(statearr_15554_17592[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15540 === (21))){
var inst_15532 = (state_15539[(2)]);
var state_15539__$1 = (function (){var statearr_15555 = state_15539;
(statearr_15555[(9)] = inst_15532);

return statearr_15555;
})();
var statearr_15556_17599 = state_15539__$1;
(statearr_15556_17599[(2)] = null);

(statearr_15556_17599[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15540 === (13))){
var inst_15491 = (state_15539[(10)]);
var inst_15493 = cljs.core.chunked_seq_QMARK_(inst_15491);
var state_15539__$1 = state_15539;
if(inst_15493){
var statearr_15557_17603 = state_15539__$1;
(statearr_15557_17603[(1)] = (16));

} else {
var statearr_15558_17604 = state_15539__$1;
(statearr_15558_17604[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15540 === (22))){
var inst_15524 = (state_15539[(2)]);
var state_15539__$1 = state_15539;
if(cljs.core.truth_(inst_15524)){
var statearr_15564_17608 = state_15539__$1;
(statearr_15564_17608[(1)] = (23));

} else {
var statearr_15565_17609 = state_15539__$1;
(statearr_15565_17609[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15540 === (6))){
var inst_15465 = (state_15539[(8)]);
var inst_15520 = (state_15539[(11)]);
var inst_15518 = (state_15539[(7)]);
var inst_15518__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_15465) : topic_fn.call(null,inst_15465));
var inst_15519 = cljs.core.deref(mults);
var inst_15520__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_15519,inst_15518__$1);
var state_15539__$1 = (function (){var statearr_15567 = state_15539;
(statearr_15567[(11)] = inst_15520__$1);

(statearr_15567[(7)] = inst_15518__$1);

return statearr_15567;
})();
if(cljs.core.truth_(inst_15520__$1)){
var statearr_15568_17616 = state_15539__$1;
(statearr_15568_17616[(1)] = (19));

} else {
var statearr_15569_17617 = state_15539__$1;
(statearr_15569_17617[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15540 === (25))){
var inst_15529 = (state_15539[(2)]);
var state_15539__$1 = state_15539;
var statearr_15570_17618 = state_15539__$1;
(statearr_15570_17618[(2)] = inst_15529);

(statearr_15570_17618[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15540 === (17))){
var inst_15491 = (state_15539[(10)]);
var inst_15503 = cljs.core.first(inst_15491);
var inst_15504 = cljs.core.async.muxch_STAR_(inst_15503);
var inst_15505 = cljs.core.async.close_BANG_(inst_15504);
var inst_15506 = cljs.core.next(inst_15491);
var inst_15475 = inst_15506;
var inst_15476 = null;
var inst_15477 = (0);
var inst_15478 = (0);
var state_15539__$1 = (function (){var statearr_15571 = state_15539;
(statearr_15571[(12)] = inst_15478);

(statearr_15571[(13)] = inst_15475);

(statearr_15571[(14)] = inst_15476);

(statearr_15571[(15)] = inst_15505);

(statearr_15571[(16)] = inst_15477);

return statearr_15571;
})();
var statearr_15572_17622 = state_15539__$1;
(statearr_15572_17622[(2)] = null);

(statearr_15572_17622[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15540 === (3))){
var inst_15537 = (state_15539[(2)]);
var state_15539__$1 = state_15539;
return cljs.core.async.impl.ioc_helpers.return_chan(state_15539__$1,inst_15537);
} else {
if((state_val_15540 === (12))){
var inst_15514 = (state_15539[(2)]);
var state_15539__$1 = state_15539;
var statearr_15575_17629 = state_15539__$1;
(statearr_15575_17629[(2)] = inst_15514);

(statearr_15575_17629[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15540 === (2))){
var state_15539__$1 = state_15539;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15539__$1,(4),ch);
} else {
if((state_val_15540 === (23))){
var state_15539__$1 = state_15539;
var statearr_15576_17630 = state_15539__$1;
(statearr_15576_17630[(2)] = null);

(statearr_15576_17630[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15540 === (19))){
var inst_15465 = (state_15539[(8)]);
var inst_15520 = (state_15539[(11)]);
var inst_15522 = cljs.core.async.muxch_STAR_(inst_15520);
var state_15539__$1 = state_15539;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_15539__$1,(22),inst_15522,inst_15465);
} else {
if((state_val_15540 === (11))){
var inst_15475 = (state_15539[(13)]);
var inst_15491 = (state_15539[(10)]);
var inst_15491__$1 = cljs.core.seq(inst_15475);
var state_15539__$1 = (function (){var statearr_15577 = state_15539;
(statearr_15577[(10)] = inst_15491__$1);

return statearr_15577;
})();
if(inst_15491__$1){
var statearr_15579_17639 = state_15539__$1;
(statearr_15579_17639[(1)] = (13));

} else {
var statearr_15580_17640 = state_15539__$1;
(statearr_15580_17640[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15540 === (9))){
var inst_15516 = (state_15539[(2)]);
var state_15539__$1 = state_15539;
var statearr_15582_17641 = state_15539__$1;
(statearr_15582_17641[(2)] = inst_15516);

(statearr_15582_17641[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15540 === (5))){
var inst_15472 = cljs.core.deref(mults);
var inst_15473 = cljs.core.vals(inst_15472);
var inst_15474 = cljs.core.seq(inst_15473);
var inst_15475 = inst_15474;
var inst_15476 = null;
var inst_15477 = (0);
var inst_15478 = (0);
var state_15539__$1 = (function (){var statearr_15583 = state_15539;
(statearr_15583[(12)] = inst_15478);

(statearr_15583[(13)] = inst_15475);

(statearr_15583[(14)] = inst_15476);

(statearr_15583[(16)] = inst_15477);

return statearr_15583;
})();
var statearr_15584_17642 = state_15539__$1;
(statearr_15584_17642[(2)] = null);

(statearr_15584_17642[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15540 === (14))){
var state_15539__$1 = state_15539;
var statearr_15588_17643 = state_15539__$1;
(statearr_15588_17643[(2)] = null);

(statearr_15588_17643[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15540 === (16))){
var inst_15491 = (state_15539[(10)]);
var inst_15498 = cljs.core.chunk_first(inst_15491);
var inst_15499 = cljs.core.chunk_rest(inst_15491);
var inst_15500 = cljs.core.count(inst_15498);
var inst_15475 = inst_15499;
var inst_15476 = inst_15498;
var inst_15477 = inst_15500;
var inst_15478 = (0);
var state_15539__$1 = (function (){var statearr_15593 = state_15539;
(statearr_15593[(12)] = inst_15478);

(statearr_15593[(13)] = inst_15475);

(statearr_15593[(14)] = inst_15476);

(statearr_15593[(16)] = inst_15477);

return statearr_15593;
})();
var statearr_15594_17644 = state_15539__$1;
(statearr_15594_17644[(2)] = null);

(statearr_15594_17644[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15540 === (10))){
var inst_15478 = (state_15539[(12)]);
var inst_15475 = (state_15539[(13)]);
var inst_15476 = (state_15539[(14)]);
var inst_15477 = (state_15539[(16)]);
var inst_15484 = cljs.core._nth(inst_15476,inst_15478);
var inst_15486 = cljs.core.async.muxch_STAR_(inst_15484);
var inst_15487 = cljs.core.async.close_BANG_(inst_15486);
var inst_15488 = (inst_15478 + (1));
var tmp15585 = inst_15475;
var tmp15586 = inst_15476;
var tmp15587 = inst_15477;
var inst_15475__$1 = tmp15585;
var inst_15476__$1 = tmp15586;
var inst_15477__$1 = tmp15587;
var inst_15478__$1 = inst_15488;
var state_15539__$1 = (function (){var statearr_15595 = state_15539;
(statearr_15595[(12)] = inst_15478__$1);

(statearr_15595[(13)] = inst_15475__$1);

(statearr_15595[(14)] = inst_15476__$1);

(statearr_15595[(16)] = inst_15477__$1);

(statearr_15595[(17)] = inst_15487);

return statearr_15595;
})();
var statearr_15597_17647 = state_15539__$1;
(statearr_15597_17647[(2)] = null);

(statearr_15597_17647[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15540 === (18))){
var inst_15509 = (state_15539[(2)]);
var state_15539__$1 = state_15539;
var statearr_15598_17649 = state_15539__$1;
(statearr_15598_17649[(2)] = inst_15509);

(statearr_15598_17649[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15540 === (8))){
var inst_15478 = (state_15539[(12)]);
var inst_15477 = (state_15539[(16)]);
var inst_15481 = (inst_15478 < inst_15477);
var inst_15482 = inst_15481;
var state_15539__$1 = state_15539;
if(cljs.core.truth_(inst_15482)){
var statearr_15603_17662 = state_15539__$1;
(statearr_15603_17662[(1)] = (10));

} else {
var statearr_15605_17666 = state_15539__$1;
(statearr_15605_17666[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
}
}
}
});
return (function() {
var cljs$core$async$state_machine__12860__auto__ = null;
var cljs$core$async$state_machine__12860__auto____0 = (function (){
var statearr_15607 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_15607[(0)] = cljs$core$async$state_machine__12860__auto__);

(statearr_15607[(1)] = (1));

return statearr_15607;
});
var cljs$core$async$state_machine__12860__auto____1 = (function (state_15539){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_15539);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e15608){var ex__12863__auto__ = e15608;
var statearr_15609_17685 = state_15539;
(statearr_15609_17685[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_15539[(4)]))){
var statearr_15612_17686 = state_15539;
(statearr_15612_17686[(1)] = cljs.core.first((state_15539[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17687 = state_15539;
state_15539 = G__17687;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
cljs$core$async$state_machine__12860__auto__ = function(state_15539){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12860__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12860__auto____1.call(this,state_15539);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12860__auto____0;
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12860__auto____1;
return cljs$core$async$state_machine__12860__auto__;
})()
})();
var state__13430__auto__ = (function (){var statearr_15613 = f__13429__auto__();
(statearr_15613[(6)] = c__13428__auto___17575);

return statearr_15613;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
}));


return p;
}));

(cljs.core.async.pub.cljs$lang$maxFixedArity = 3);

/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var G__15616 = arguments.length;
switch (G__15616) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4(p,topic,ch,true);
}));

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_(p,topic,ch,close_QMARK_);
}));

(cljs.core.async.sub.cljs$lang$maxFixedArity = 4);

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_(p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var G__15623 = arguments.length;
switch (G__15623) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_(p);
}));

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_(p,topic);
}));

(cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2);

/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var G__15646 = arguments.length;
switch (G__15646) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3(f,chs,null);
}));

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec(chs);
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var cnt = cljs.core.count(chs__$1);
var rets = cljs.core.object_array.cljs$core$IFn$_invoke$arity$1(cnt);
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (i){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,rets.slice((0)));
} else {
return null;
}
});
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cnt));
if((cnt === (0))){
cljs.core.async.close_BANG_(out);
} else {
var c__13428__auto___17708 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = (function (state_15697){
var state_val_15698 = (state_15697[(1)]);
if((state_val_15698 === (7))){
var state_15697__$1 = state_15697;
var statearr_15701_17709 = state_15697__$1;
(statearr_15701_17709[(2)] = null);

(statearr_15701_17709[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15698 === (1))){
var state_15697__$1 = state_15697;
var statearr_15702_17710 = state_15697__$1;
(statearr_15702_17710[(2)] = null);

(statearr_15702_17710[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15698 === (4))){
var inst_15658 = (state_15697[(7)]);
var inst_15657 = (state_15697[(8)]);
var inst_15660 = (inst_15658 < inst_15657);
var state_15697__$1 = state_15697;
if(cljs.core.truth_(inst_15660)){
var statearr_15703_17715 = state_15697__$1;
(statearr_15703_17715[(1)] = (6));

} else {
var statearr_15704_17716 = state_15697__$1;
(statearr_15704_17716[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15698 === (15))){
var inst_15683 = (state_15697[(9)]);
var inst_15688 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_15683);
var state_15697__$1 = state_15697;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_15697__$1,(17),out,inst_15688);
} else {
if((state_val_15698 === (13))){
var inst_15683 = (state_15697[(9)]);
var inst_15683__$1 = (state_15697[(2)]);
var inst_15684 = cljs.core.some(cljs.core.nil_QMARK_,inst_15683__$1);
var state_15697__$1 = (function (){var statearr_15705 = state_15697;
(statearr_15705[(9)] = inst_15683__$1);

return statearr_15705;
})();
if(cljs.core.truth_(inst_15684)){
var statearr_15706_17717 = state_15697__$1;
(statearr_15706_17717[(1)] = (14));

} else {
var statearr_15707_17718 = state_15697__$1;
(statearr_15707_17718[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15698 === (6))){
var state_15697__$1 = state_15697;
var statearr_15732_17719 = state_15697__$1;
(statearr_15732_17719[(2)] = null);

(statearr_15732_17719[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15698 === (17))){
var inst_15690 = (state_15697[(2)]);
var state_15697__$1 = (function (){var statearr_15737 = state_15697;
(statearr_15737[(10)] = inst_15690);

return statearr_15737;
})();
var statearr_15738_17720 = state_15697__$1;
(statearr_15738_17720[(2)] = null);

(statearr_15738_17720[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15698 === (3))){
var inst_15695 = (state_15697[(2)]);
var state_15697__$1 = state_15697;
return cljs.core.async.impl.ioc_helpers.return_chan(state_15697__$1,inst_15695);
} else {
if((state_val_15698 === (12))){
var _ = (function (){var statearr_15739 = state_15697;
(statearr_15739[(4)] = cljs.core.rest((state_15697[(4)])));

return statearr_15739;
})();
var state_15697__$1 = state_15697;
var ex15736 = (state_15697__$1[(2)]);
var statearr_15740_17721 = state_15697__$1;
(statearr_15740_17721[(5)] = ex15736);


if((ex15736 instanceof Object)){
var statearr_15751_17722 = state_15697__$1;
(statearr_15751_17722[(1)] = (11));

(statearr_15751_17722[(5)] = null);

} else {
throw ex15736;

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15698 === (2))){
var inst_15656 = cljs.core.reset_BANG_(dctr,cnt);
var inst_15657 = cnt;
var inst_15658 = (0);
var state_15697__$1 = (function (){var statearr_15752 = state_15697;
(statearr_15752[(11)] = inst_15656);

(statearr_15752[(7)] = inst_15658);

(statearr_15752[(8)] = inst_15657);

return statearr_15752;
})();
var statearr_15753_17727 = state_15697__$1;
(statearr_15753_17727[(2)] = null);

(statearr_15753_17727[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15698 === (11))){
var inst_15662 = (state_15697[(2)]);
var inst_15663 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);
var state_15697__$1 = (function (){var statearr_15754 = state_15697;
(statearr_15754[(12)] = inst_15662);

return statearr_15754;
})();
var statearr_15755_17729 = state_15697__$1;
(statearr_15755_17729[(2)] = inst_15663);

(statearr_15755_17729[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15698 === (9))){
var inst_15658 = (state_15697[(7)]);
var _ = (function (){var statearr_15756 = state_15697;
(statearr_15756[(4)] = cljs.core.cons((12),(state_15697[(4)])));

return statearr_15756;
})();
var inst_15669 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_15658) : chs__$1.call(null,inst_15658));
var inst_15670 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_15658) : done.call(null,inst_15658));
var inst_15671 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_15669,inst_15670);
var ___$1 = (function (){var statearr_15759 = state_15697;
(statearr_15759[(4)] = cljs.core.rest((state_15697[(4)])));

return statearr_15759;
})();
var state_15697__$1 = state_15697;
var statearr_15760_17732 = state_15697__$1;
(statearr_15760_17732[(2)] = inst_15671);

(statearr_15760_17732[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15698 === (5))){
var inst_15681 = (state_15697[(2)]);
var state_15697__$1 = (function (){var statearr_15761 = state_15697;
(statearr_15761[(13)] = inst_15681);

return statearr_15761;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15697__$1,(13),dchan);
} else {
if((state_val_15698 === (14))){
var inst_15686 = cljs.core.async.close_BANG_(out);
var state_15697__$1 = state_15697;
var statearr_15767_17733 = state_15697__$1;
(statearr_15767_17733[(2)] = inst_15686);

(statearr_15767_17733[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15698 === (16))){
var inst_15693 = (state_15697[(2)]);
var state_15697__$1 = state_15697;
var statearr_15768_17734 = state_15697__$1;
(statearr_15768_17734[(2)] = inst_15693);

(statearr_15768_17734[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15698 === (10))){
var inst_15658 = (state_15697[(7)]);
var inst_15674 = (state_15697[(2)]);
var inst_15675 = (inst_15658 + (1));
var inst_15658__$1 = inst_15675;
var state_15697__$1 = (function (){var statearr_15769 = state_15697;
(statearr_15769[(7)] = inst_15658__$1);

(statearr_15769[(14)] = inst_15674);

return statearr_15769;
})();
var statearr_15770_17735 = state_15697__$1;
(statearr_15770_17735[(2)] = null);

(statearr_15770_17735[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15698 === (8))){
var inst_15679 = (state_15697[(2)]);
var state_15697__$1 = state_15697;
var statearr_15772_17737 = state_15697__$1;
(statearr_15772_17737[(2)] = inst_15679);

(statearr_15772_17737[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__12860__auto__ = null;
var cljs$core$async$state_machine__12860__auto____0 = (function (){
var statearr_15774 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_15774[(0)] = cljs$core$async$state_machine__12860__auto__);

(statearr_15774[(1)] = (1));

return statearr_15774;
});
var cljs$core$async$state_machine__12860__auto____1 = (function (state_15697){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_15697);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e15777){var ex__12863__auto__ = e15777;
var statearr_15778_17738 = state_15697;
(statearr_15778_17738[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_15697[(4)]))){
var statearr_15779_17739 = state_15697;
(statearr_15779_17739[(1)] = cljs.core.first((state_15697[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17740 = state_15697;
state_15697 = G__17740;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
cljs$core$async$state_machine__12860__auto__ = function(state_15697){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12860__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12860__auto____1.call(this,state_15697);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12860__auto____0;
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12860__auto____1;
return cljs$core$async$state_machine__12860__auto__;
})()
})();
var state__13430__auto__ = (function (){var statearr_15782 = f__13429__auto__();
(statearr_15782[(6)] = c__13428__auto___17708);

return statearr_15782;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
}));

}

return out;
}));

(cljs.core.async.map.cljs$lang$maxFixedArity = 3);

/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var G__15791 = arguments.length;
switch (G__15791) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2(chs,null);
}));

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__13428__auto___17746 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = (function (state_15828){
var state_val_15829 = (state_15828[(1)]);
if((state_val_15829 === (7))){
var inst_15806 = (state_15828[(7)]);
var inst_15807 = (state_15828[(8)]);
var inst_15806__$1 = (state_15828[(2)]);
var inst_15807__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_15806__$1,(0),null);
var inst_15808 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_15806__$1,(1),null);
var inst_15809 = (inst_15807__$1 == null);
var state_15828__$1 = (function (){var statearr_15830 = state_15828;
(statearr_15830[(7)] = inst_15806__$1);

(statearr_15830[(8)] = inst_15807__$1);

(statearr_15830[(9)] = inst_15808);

return statearr_15830;
})();
if(cljs.core.truth_(inst_15809)){
var statearr_15831_17753 = state_15828__$1;
(statearr_15831_17753[(1)] = (8));

} else {
var statearr_15832_17754 = state_15828__$1;
(statearr_15832_17754[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15829 === (1))){
var inst_15796 = cljs.core.vec(chs);
var inst_15797 = inst_15796;
var state_15828__$1 = (function (){var statearr_15833 = state_15828;
(statearr_15833[(10)] = inst_15797);

return statearr_15833;
})();
var statearr_15834_17755 = state_15828__$1;
(statearr_15834_17755[(2)] = null);

(statearr_15834_17755[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15829 === (4))){
var inst_15797 = (state_15828[(10)]);
var state_15828__$1 = state_15828;
return cljs.core.async.ioc_alts_BANG_(state_15828__$1,(7),inst_15797);
} else {
if((state_val_15829 === (6))){
var inst_15823 = (state_15828[(2)]);
var state_15828__$1 = state_15828;
var statearr_15835_17756 = state_15828__$1;
(statearr_15835_17756[(2)] = inst_15823);

(statearr_15835_17756[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15829 === (3))){
var inst_15825 = (state_15828[(2)]);
var state_15828__$1 = state_15828;
return cljs.core.async.impl.ioc_helpers.return_chan(state_15828__$1,inst_15825);
} else {
if((state_val_15829 === (2))){
var inst_15797 = (state_15828[(10)]);
var inst_15799 = cljs.core.count(inst_15797);
var inst_15800 = (inst_15799 > (0));
var state_15828__$1 = state_15828;
if(cljs.core.truth_(inst_15800)){
var statearr_15837_17758 = state_15828__$1;
(statearr_15837_17758[(1)] = (4));

} else {
var statearr_15838_17759 = state_15828__$1;
(statearr_15838_17759[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15829 === (11))){
var inst_15797 = (state_15828[(10)]);
var inst_15816 = (state_15828[(2)]);
var tmp15836 = inst_15797;
var inst_15797__$1 = tmp15836;
var state_15828__$1 = (function (){var statearr_15839 = state_15828;
(statearr_15839[(11)] = inst_15816);

(statearr_15839[(10)] = inst_15797__$1);

return statearr_15839;
})();
var statearr_15840_17760 = state_15828__$1;
(statearr_15840_17760[(2)] = null);

(statearr_15840_17760[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15829 === (9))){
var inst_15807 = (state_15828[(8)]);
var state_15828__$1 = state_15828;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_15828__$1,(11),out,inst_15807);
} else {
if((state_val_15829 === (5))){
var inst_15821 = cljs.core.async.close_BANG_(out);
var state_15828__$1 = state_15828;
var statearr_15846_17761 = state_15828__$1;
(statearr_15846_17761[(2)] = inst_15821);

(statearr_15846_17761[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15829 === (10))){
var inst_15819 = (state_15828[(2)]);
var state_15828__$1 = state_15828;
var statearr_15850_17762 = state_15828__$1;
(statearr_15850_17762[(2)] = inst_15819);

(statearr_15850_17762[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15829 === (8))){
var inst_15806 = (state_15828[(7)]);
var inst_15807 = (state_15828[(8)]);
var inst_15797 = (state_15828[(10)]);
var inst_15808 = (state_15828[(9)]);
var inst_15811 = (function (){var cs = inst_15797;
var vec__15802 = inst_15806;
var v = inst_15807;
var c = inst_15808;
return (function (p1__15784_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__15784_SHARP_);
});
})();
var inst_15812 = cljs.core.filterv(inst_15811,inst_15797);
var inst_15797__$1 = inst_15812;
var state_15828__$1 = (function (){var statearr_15853 = state_15828;
(statearr_15853[(10)] = inst_15797__$1);

return statearr_15853;
})();
var statearr_15856_17763 = state_15828__$1;
(statearr_15856_17763[(2)] = null);

(statearr_15856_17763[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
});
return (function() {
var cljs$core$async$state_machine__12860__auto__ = null;
var cljs$core$async$state_machine__12860__auto____0 = (function (){
var statearr_15857 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_15857[(0)] = cljs$core$async$state_machine__12860__auto__);

(statearr_15857[(1)] = (1));

return statearr_15857;
});
var cljs$core$async$state_machine__12860__auto____1 = (function (state_15828){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_15828);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e15860){var ex__12863__auto__ = e15860;
var statearr_15861_17764 = state_15828;
(statearr_15861_17764[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_15828[(4)]))){
var statearr_15862_17765 = state_15828;
(statearr_15862_17765[(1)] = cljs.core.first((state_15828[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17767 = state_15828;
state_15828 = G__17767;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
cljs$core$async$state_machine__12860__auto__ = function(state_15828){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12860__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12860__auto____1.call(this,state_15828);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12860__auto____0;
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12860__auto____1;
return cljs$core$async$state_machine__12860__auto__;
})()
})();
var state__13430__auto__ = (function (){var statearr_15866 = f__13429__auto__();
(statearr_15866[(6)] = c__13428__auto___17746);

return statearr_15866;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
}));


return out;
}));

(cljs.core.async.merge.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce(cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var G__15871 = arguments.length;
switch (G__15871) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__13428__auto___17772 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = (function (state_15903){
var state_val_15904 = (state_15903[(1)]);
if((state_val_15904 === (7))){
var inst_15880 = (state_15903[(7)]);
var inst_15880__$1 = (state_15903[(2)]);
var inst_15882 = (inst_15880__$1 == null);
var inst_15883 = cljs.core.not(inst_15882);
var state_15903__$1 = (function (){var statearr_15910 = state_15903;
(statearr_15910[(7)] = inst_15880__$1);

return statearr_15910;
})();
if(inst_15883){
var statearr_15911_17774 = state_15903__$1;
(statearr_15911_17774[(1)] = (8));

} else {
var statearr_15912_17775 = state_15903__$1;
(statearr_15912_17775[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15904 === (1))){
var inst_15875 = (0);
var state_15903__$1 = (function (){var statearr_15913 = state_15903;
(statearr_15913[(8)] = inst_15875);

return statearr_15913;
})();
var statearr_15915_17776 = state_15903__$1;
(statearr_15915_17776[(2)] = null);

(statearr_15915_17776[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15904 === (4))){
var state_15903__$1 = state_15903;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_15903__$1,(7),ch);
} else {
if((state_val_15904 === (6))){
var inst_15898 = (state_15903[(2)]);
var state_15903__$1 = state_15903;
var statearr_15917_17778 = state_15903__$1;
(statearr_15917_17778[(2)] = inst_15898);

(statearr_15917_17778[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15904 === (3))){
var inst_15900 = (state_15903[(2)]);
var inst_15901 = cljs.core.async.close_BANG_(out);
var state_15903__$1 = (function (){var statearr_15918 = state_15903;
(statearr_15918[(9)] = inst_15900);

return statearr_15918;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_15903__$1,inst_15901);
} else {
if((state_val_15904 === (2))){
var inst_15875 = (state_15903[(8)]);
var inst_15877 = (inst_15875 < n);
var state_15903__$1 = state_15903;
if(cljs.core.truth_(inst_15877)){
var statearr_15919_17783 = state_15903__$1;
(statearr_15919_17783[(1)] = (4));

} else {
var statearr_15920_17785 = state_15903__$1;
(statearr_15920_17785[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15904 === (11))){
var inst_15875 = (state_15903[(8)]);
var inst_15887 = (state_15903[(2)]);
var inst_15891 = (inst_15875 + (1));
var inst_15875__$1 = inst_15891;
var state_15903__$1 = (function (){var statearr_15921 = state_15903;
(statearr_15921[(10)] = inst_15887);

(statearr_15921[(8)] = inst_15875__$1);

return statearr_15921;
})();
var statearr_15922_17786 = state_15903__$1;
(statearr_15922_17786[(2)] = null);

(statearr_15922_17786[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15904 === (9))){
var state_15903__$1 = state_15903;
var statearr_15923_17787 = state_15903__$1;
(statearr_15923_17787[(2)] = null);

(statearr_15923_17787[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15904 === (5))){
var state_15903__$1 = state_15903;
var statearr_15924_17788 = state_15903__$1;
(statearr_15924_17788[(2)] = null);

(statearr_15924_17788[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15904 === (10))){
var inst_15895 = (state_15903[(2)]);
var state_15903__$1 = state_15903;
var statearr_15925_17792 = state_15903__$1;
(statearr_15925_17792[(2)] = inst_15895);

(statearr_15925_17792[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15904 === (8))){
var inst_15880 = (state_15903[(7)]);
var state_15903__$1 = state_15903;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_15903__$1,(11),out,inst_15880);
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
});
return (function() {
var cljs$core$async$state_machine__12860__auto__ = null;
var cljs$core$async$state_machine__12860__auto____0 = (function (){
var statearr_15926 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_15926[(0)] = cljs$core$async$state_machine__12860__auto__);

(statearr_15926[(1)] = (1));

return statearr_15926;
});
var cljs$core$async$state_machine__12860__auto____1 = (function (state_15903){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_15903);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e15927){var ex__12863__auto__ = e15927;
var statearr_15928_17793 = state_15903;
(statearr_15928_17793[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_15903[(4)]))){
var statearr_15929_17794 = state_15903;
(statearr_15929_17794[(1)] = cljs.core.first((state_15903[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17795 = state_15903;
state_15903 = G__17795;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
cljs$core$async$state_machine__12860__auto__ = function(state_15903){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12860__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12860__auto____1.call(this,state_15903);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12860__auto____0;
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12860__auto____1;
return cljs$core$async$state_machine__12860__auto__;
})()
})();
var state__13430__auto__ = (function (){var statearr_15931 = f__13429__auto__();
(statearr_15931[(6)] = c__13428__auto___17772);

return statearr_15931;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
}));


return out;
}));

(cljs.core.async.take.cljs$lang$maxFixedArity = 3);


/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async15961 = (function (f,ch,meta15949,_,fn1,meta15962){
this.f = f;
this.ch = ch;
this.meta15949 = meta15949;
this._ = _;
this.fn1 = fn1;
this.meta15962 = meta15962;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async15961.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15963,meta15962__$1){
var self__ = this;
var _15963__$1 = this;
return (new cljs.core.async.t_cljs$core$async15961(self__.f,self__.ch,self__.meta15949,self__._,self__.fn1,meta15962__$1));
}));

(cljs.core.async.t_cljs$core$async15961.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15963){
var self__ = this;
var _15963__$1 = this;
return self__.meta15962;
}));

(cljs.core.async.t_cljs$core$async15961.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async15961.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
}));

(cljs.core.async.t_cljs$core$async15961.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async15961.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);
return (function (p1__15939_SHARP_){
var G__15974 = (((p1__15939_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__15939_SHARP_) : self__.f.call(null,p1__15939_SHARP_)));
return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1(G__15974) : f1.call(null,G__15974));
});
}));

(cljs.core.async.t_cljs$core$async15961.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta15949","meta15949",-523741542,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async15948","cljs.core.async/t_cljs$core$async15948",1888663598,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta15962","meta15962",1006411613,null)], null);
}));

(cljs.core.async.t_cljs$core$async15961.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async15961.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async15961");

(cljs.core.async.t_cljs$core$async15961.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async15961");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async15961.
 */
cljs.core.async.__GT_t_cljs$core$async15961 = (function cljs$core$async$__GT_t_cljs$core$async15961(f,ch,meta15949,_,fn1,meta15962){
return (new cljs.core.async.t_cljs$core$async15961(f,ch,meta15949,_,fn1,meta15962));
});



/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async15948 = (function (f,ch,meta15949){
this.f = f;
this.ch = ch;
this.meta15949 = meta15949;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async15948.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15950,meta15949__$1){
var self__ = this;
var _15950__$1 = this;
return (new cljs.core.async.t_cljs$core$async15948(self__.f,self__.ch,meta15949__$1));
}));

(cljs.core.async.t_cljs$core$async15948.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15950){
var self__ = this;
var _15950__$1 = this;
return self__.meta15949;
}));

(cljs.core.async.t_cljs$core$async15948.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async15948.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async15948.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async15948.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async15948.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(new cljs.core.async.t_cljs$core$async15961(self__.f,self__.ch,self__.meta15949,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY)));
if(cljs.core.truth_((function (){var and__5043__auto__ = ret;
if(cljs.core.truth_(and__5043__auto__)){
return (!((cljs.core.deref(ret) == null)));
} else {
return and__5043__auto__;
}
})())){
return cljs.core.async.impl.channels.box((function (){var G__15981 = cljs.core.deref(ret);
return (self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(G__15981) : self__.f.call(null,G__15981));
})());
} else {
return ret;
}
}));

(cljs.core.async.t_cljs$core$async15948.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async15948.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
}));

(cljs.core.async.t_cljs$core$async15948.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta15949","meta15949",-523741542,null)], null);
}));

(cljs.core.async.t_cljs$core$async15948.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async15948.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async15948");

(cljs.core.async.t_cljs$core$async15948.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async15948");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async15948.
 */
cljs.core.async.__GT_t_cljs$core$async15948 = (function cljs$core$async$__GT_t_cljs$core$async15948(f,ch,meta15949){
return (new cljs.core.async.t_cljs$core$async15948(f,ch,meta15949));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
return (new cljs.core.async.t_cljs$core$async15948(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async16006 = (function (f,ch,meta16007){
this.f = f;
this.ch = ch;
this.meta16007 = meta16007;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async16006.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_16008,meta16007__$1){
var self__ = this;
var _16008__$1 = this;
return (new cljs.core.async.t_cljs$core$async16006(self__.f,self__.ch,meta16007__$1));
}));

(cljs.core.async.t_cljs$core$async16006.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_16008){
var self__ = this;
var _16008__$1 = this;
return self__.meta16007;
}));

(cljs.core.async.t_cljs$core$async16006.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16006.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async16006.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16006.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async16006.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16006.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null,val)),fn1);
}));

(cljs.core.async.t_cljs$core$async16006.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta16007","meta16007",667061743,null)], null);
}));

(cljs.core.async.t_cljs$core$async16006.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async16006.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async16006");

(cljs.core.async.t_cljs$core$async16006.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async16006");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async16006.
 */
cljs.core.async.__GT_t_cljs$core$async16006 = (function cljs$core$async$__GT_t_cljs$core$async16006(f,ch,meta16007){
return (new cljs.core.async.t_cljs$core$async16006(f,ch,meta16007));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
return (new cljs.core.async.t_cljs$core$async16006(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async16037 = (function (p,ch,meta16038){
this.p = p;
this.ch = ch;
this.meta16038 = meta16038;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async16037.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_16039,meta16038__$1){
var self__ = this;
var _16039__$1 = this;
return (new cljs.core.async.t_cljs$core$async16037(self__.p,self__.ch,meta16038__$1));
}));

(cljs.core.async.t_cljs$core$async16037.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_16039){
var self__ = this;
var _16039__$1 = this;
return self__.meta16038;
}));

(cljs.core.async.t_cljs$core$async16037.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16037.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async16037.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async16037.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16037.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async16037.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async16037.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null,val)))){
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box(cljs.core.not(cljs.core.async.impl.protocols.closed_QMARK_(self__.ch)));
}
}));

(cljs.core.async.t_cljs$core$async16037.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta16038","meta16038",-894969592,null)], null);
}));

(cljs.core.async.t_cljs$core$async16037.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async16037.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async16037");

(cljs.core.async.t_cljs$core$async16037.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async16037");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async16037.
 */
cljs.core.async.__GT_t_cljs$core$async16037 = (function cljs$core$async$__GT_t_cljs$core$async16037(p,ch,meta16038){
return (new cljs.core.async.t_cljs$core$async16037(p,ch,meta16038));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
return (new cljs.core.async.t_cljs$core$async16037(p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_(cljs.core.complement(p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var G__16053 = arguments.length;
switch (G__16053) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__13428__auto___17816 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = (function (state_16077){
var state_val_16078 = (state_16077[(1)]);
if((state_val_16078 === (7))){
var inst_16073 = (state_16077[(2)]);
var state_16077__$1 = state_16077;
var statearr_16079_17817 = state_16077__$1;
(statearr_16079_17817[(2)] = inst_16073);

(statearr_16079_17817[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16078 === (1))){
var state_16077__$1 = state_16077;
var statearr_16080_17818 = state_16077__$1;
(statearr_16080_17818[(2)] = null);

(statearr_16080_17818[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16078 === (4))){
var inst_16059 = (state_16077[(7)]);
var inst_16059__$1 = (state_16077[(2)]);
var inst_16060 = (inst_16059__$1 == null);
var state_16077__$1 = (function (){var statearr_16081 = state_16077;
(statearr_16081[(7)] = inst_16059__$1);

return statearr_16081;
})();
if(cljs.core.truth_(inst_16060)){
var statearr_16082_17821 = state_16077__$1;
(statearr_16082_17821[(1)] = (5));

} else {
var statearr_16083_17822 = state_16077__$1;
(statearr_16083_17822[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16078 === (6))){
var inst_16059 = (state_16077[(7)]);
var inst_16064 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_16059) : p.call(null,inst_16059));
var state_16077__$1 = state_16077;
if(cljs.core.truth_(inst_16064)){
var statearr_16088_17830 = state_16077__$1;
(statearr_16088_17830[(1)] = (8));

} else {
var statearr_16090_17831 = state_16077__$1;
(statearr_16090_17831[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16078 === (3))){
var inst_16075 = (state_16077[(2)]);
var state_16077__$1 = state_16077;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16077__$1,inst_16075);
} else {
if((state_val_16078 === (2))){
var state_16077__$1 = state_16077;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16077__$1,(4),ch);
} else {
if((state_val_16078 === (11))){
var inst_16067 = (state_16077[(2)]);
var state_16077__$1 = state_16077;
var statearr_16093_17833 = state_16077__$1;
(statearr_16093_17833[(2)] = inst_16067);

(statearr_16093_17833[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16078 === (9))){
var state_16077__$1 = state_16077;
var statearr_16094_17835 = state_16077__$1;
(statearr_16094_17835[(2)] = null);

(statearr_16094_17835[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16078 === (5))){
var inst_16062 = cljs.core.async.close_BANG_(out);
var state_16077__$1 = state_16077;
var statearr_16095_17836 = state_16077__$1;
(statearr_16095_17836[(2)] = inst_16062);

(statearr_16095_17836[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16078 === (10))){
var inst_16070 = (state_16077[(2)]);
var state_16077__$1 = (function (){var statearr_16096 = state_16077;
(statearr_16096[(8)] = inst_16070);

return statearr_16096;
})();
var statearr_16097_17838 = state_16077__$1;
(statearr_16097_17838[(2)] = null);

(statearr_16097_17838[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16078 === (8))){
var inst_16059 = (state_16077[(7)]);
var state_16077__$1 = state_16077;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16077__$1,(11),out,inst_16059);
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
});
return (function() {
var cljs$core$async$state_machine__12860__auto__ = null;
var cljs$core$async$state_machine__12860__auto____0 = (function (){
var statearr_16107 = [null,null,null,null,null,null,null,null,null];
(statearr_16107[(0)] = cljs$core$async$state_machine__12860__auto__);

(statearr_16107[(1)] = (1));

return statearr_16107;
});
var cljs$core$async$state_machine__12860__auto____1 = (function (state_16077){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_16077);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e16110){var ex__12863__auto__ = e16110;
var statearr_16114_17844 = state_16077;
(statearr_16114_17844[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_16077[(4)]))){
var statearr_16117_17846 = state_16077;
(statearr_16117_17846[(1)] = cljs.core.first((state_16077[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17853 = state_16077;
state_16077 = G__17853;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
cljs$core$async$state_machine__12860__auto__ = function(state_16077){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12860__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12860__auto____1.call(this,state_16077);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12860__auto____0;
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12860__auto____1;
return cljs$core$async$state_machine__12860__auto__;
})()
})();
var state__13430__auto__ = (function (){var statearr_16118 = f__13429__auto__();
(statearr_16118[(6)] = c__13428__auto___17816);

return statearr_16118;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
}));


return out;
}));

(cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__16123 = arguments.length;
switch (G__16123) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(cljs.core.complement(p),ch,buf_or_n);
}));

(cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3);

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__13428__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = (function (state_16195){
var state_val_16196 = (state_16195[(1)]);
if((state_val_16196 === (7))){
var inst_16190 = (state_16195[(2)]);
var state_16195__$1 = state_16195;
var statearr_16197_17884 = state_16195__$1;
(statearr_16197_17884[(2)] = inst_16190);

(statearr_16197_17884[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16196 === (20))){
var inst_16157 = (state_16195[(7)]);
var inst_16171 = (state_16195[(2)]);
var inst_16172 = cljs.core.next(inst_16157);
var inst_16137 = inst_16172;
var inst_16138 = null;
var inst_16139 = (0);
var inst_16140 = (0);
var state_16195__$1 = (function (){var statearr_16202 = state_16195;
(statearr_16202[(8)] = inst_16138);

(statearr_16202[(9)] = inst_16139);

(statearr_16202[(10)] = inst_16137);

(statearr_16202[(11)] = inst_16171);

(statearr_16202[(12)] = inst_16140);

return statearr_16202;
})();
var statearr_16204_17902 = state_16195__$1;
(statearr_16204_17902[(2)] = null);

(statearr_16204_17902[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16196 === (1))){
var state_16195__$1 = state_16195;
var statearr_16205_17906 = state_16195__$1;
(statearr_16205_17906[(2)] = null);

(statearr_16205_17906[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16196 === (4))){
var inst_16126 = (state_16195[(13)]);
var inst_16126__$1 = (state_16195[(2)]);
var inst_16127 = (inst_16126__$1 == null);
var state_16195__$1 = (function (){var statearr_16206 = state_16195;
(statearr_16206[(13)] = inst_16126__$1);

return statearr_16206;
})();
if(cljs.core.truth_(inst_16127)){
var statearr_16208_17911 = state_16195__$1;
(statearr_16208_17911[(1)] = (5));

} else {
var statearr_16212_17912 = state_16195__$1;
(statearr_16212_17912[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16196 === (15))){
var state_16195__$1 = state_16195;
var statearr_16216_17914 = state_16195__$1;
(statearr_16216_17914[(2)] = null);

(statearr_16216_17914[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16196 === (21))){
var state_16195__$1 = state_16195;
var statearr_16217_17918 = state_16195__$1;
(statearr_16217_17918[(2)] = null);

(statearr_16217_17918[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16196 === (13))){
var inst_16138 = (state_16195[(8)]);
var inst_16139 = (state_16195[(9)]);
var inst_16137 = (state_16195[(10)]);
var inst_16140 = (state_16195[(12)]);
var inst_16147 = (state_16195[(2)]);
var inst_16148 = (inst_16140 + (1));
var tmp16213 = inst_16138;
var tmp16214 = inst_16139;
var tmp16215 = inst_16137;
var inst_16137__$1 = tmp16215;
var inst_16138__$1 = tmp16213;
var inst_16139__$1 = tmp16214;
var inst_16140__$1 = inst_16148;
var state_16195__$1 = (function (){var statearr_16218 = state_16195;
(statearr_16218[(8)] = inst_16138__$1);

(statearr_16218[(9)] = inst_16139__$1);

(statearr_16218[(10)] = inst_16137__$1);

(statearr_16218[(12)] = inst_16140__$1);

(statearr_16218[(14)] = inst_16147);

return statearr_16218;
})();
var statearr_16219_17919 = state_16195__$1;
(statearr_16219_17919[(2)] = null);

(statearr_16219_17919[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16196 === (22))){
var state_16195__$1 = state_16195;
var statearr_16221_17920 = state_16195__$1;
(statearr_16221_17920[(2)] = null);

(statearr_16221_17920[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16196 === (6))){
var inst_16126 = (state_16195[(13)]);
var inst_16135 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_16126) : f.call(null,inst_16126));
var inst_16136 = cljs.core.seq(inst_16135);
var inst_16137 = inst_16136;
var inst_16138 = null;
var inst_16139 = (0);
var inst_16140 = (0);
var state_16195__$1 = (function (){var statearr_16226 = state_16195;
(statearr_16226[(8)] = inst_16138);

(statearr_16226[(9)] = inst_16139);

(statearr_16226[(10)] = inst_16137);

(statearr_16226[(12)] = inst_16140);

return statearr_16226;
})();
var statearr_16227_17922 = state_16195__$1;
(statearr_16227_17922[(2)] = null);

(statearr_16227_17922[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16196 === (17))){
var inst_16157 = (state_16195[(7)]);
var inst_16164 = cljs.core.chunk_first(inst_16157);
var inst_16165 = cljs.core.chunk_rest(inst_16157);
var inst_16166 = cljs.core.count(inst_16164);
var inst_16137 = inst_16165;
var inst_16138 = inst_16164;
var inst_16139 = inst_16166;
var inst_16140 = (0);
var state_16195__$1 = (function (){var statearr_16229 = state_16195;
(statearr_16229[(8)] = inst_16138);

(statearr_16229[(9)] = inst_16139);

(statearr_16229[(10)] = inst_16137);

(statearr_16229[(12)] = inst_16140);

return statearr_16229;
})();
var statearr_16233_17931 = state_16195__$1;
(statearr_16233_17931[(2)] = null);

(statearr_16233_17931[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16196 === (3))){
var inst_16192 = (state_16195[(2)]);
var state_16195__$1 = state_16195;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16195__$1,inst_16192);
} else {
if((state_val_16196 === (12))){
var inst_16180 = (state_16195[(2)]);
var state_16195__$1 = state_16195;
var statearr_16234_17939 = state_16195__$1;
(statearr_16234_17939[(2)] = inst_16180);

(statearr_16234_17939[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16196 === (2))){
var state_16195__$1 = state_16195;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16195__$1,(4),in$);
} else {
if((state_val_16196 === (23))){
var inst_16188 = (state_16195[(2)]);
var state_16195__$1 = state_16195;
var statearr_16235_17941 = state_16195__$1;
(statearr_16235_17941[(2)] = inst_16188);

(statearr_16235_17941[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16196 === (19))){
var inst_16175 = (state_16195[(2)]);
var state_16195__$1 = state_16195;
var statearr_16236_17942 = state_16195__$1;
(statearr_16236_17942[(2)] = inst_16175);

(statearr_16236_17942[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16196 === (11))){
var inst_16157 = (state_16195[(7)]);
var inst_16137 = (state_16195[(10)]);
var inst_16157__$1 = cljs.core.seq(inst_16137);
var state_16195__$1 = (function (){var statearr_16237 = state_16195;
(statearr_16237[(7)] = inst_16157__$1);

return statearr_16237;
})();
if(inst_16157__$1){
var statearr_16238_17943 = state_16195__$1;
(statearr_16238_17943[(1)] = (14));

} else {
var statearr_16239_17944 = state_16195__$1;
(statearr_16239_17944[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16196 === (9))){
var inst_16182 = (state_16195[(2)]);
var inst_16183 = cljs.core.async.impl.protocols.closed_QMARK_(out);
var state_16195__$1 = (function (){var statearr_16240 = state_16195;
(statearr_16240[(15)] = inst_16182);

return statearr_16240;
})();
if(cljs.core.truth_(inst_16183)){
var statearr_16241_17945 = state_16195__$1;
(statearr_16241_17945[(1)] = (21));

} else {
var statearr_16242_17946 = state_16195__$1;
(statearr_16242_17946[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16196 === (5))){
var inst_16129 = cljs.core.async.close_BANG_(out);
var state_16195__$1 = state_16195;
var statearr_16244_17947 = state_16195__$1;
(statearr_16244_17947[(2)] = inst_16129);

(statearr_16244_17947[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16196 === (14))){
var inst_16157 = (state_16195[(7)]);
var inst_16159 = cljs.core.chunked_seq_QMARK_(inst_16157);
var state_16195__$1 = state_16195;
if(inst_16159){
var statearr_16245_17951 = state_16195__$1;
(statearr_16245_17951[(1)] = (17));

} else {
var statearr_16246_17952 = state_16195__$1;
(statearr_16246_17952[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16196 === (16))){
var inst_16178 = (state_16195[(2)]);
var state_16195__$1 = state_16195;
var statearr_16255_17953 = state_16195__$1;
(statearr_16255_17953[(2)] = inst_16178);

(statearr_16255_17953[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16196 === (10))){
var inst_16138 = (state_16195[(8)]);
var inst_16140 = (state_16195[(12)]);
var inst_16145 = cljs.core._nth(inst_16138,inst_16140);
var state_16195__$1 = state_16195;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16195__$1,(13),out,inst_16145);
} else {
if((state_val_16196 === (18))){
var inst_16157 = (state_16195[(7)]);
var inst_16169 = cljs.core.first(inst_16157);
var state_16195__$1 = state_16195;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16195__$1,(20),out,inst_16169);
} else {
if((state_val_16196 === (8))){
var inst_16139 = (state_16195[(9)]);
var inst_16140 = (state_16195[(12)]);
var inst_16142 = (inst_16140 < inst_16139);
var inst_16143 = inst_16142;
var state_16195__$1 = state_16195;
if(cljs.core.truth_(inst_16143)){
var statearr_16263_17962 = state_16195__$1;
(statearr_16263_17962[(1)] = (10));

} else {
var statearr_16265_17963 = state_16195__$1;
(statearr_16265_17963[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
}
});
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__12860__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__12860__auto____0 = (function (){
var statearr_16272 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_16272[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__12860__auto__);

(statearr_16272[(1)] = (1));

return statearr_16272;
});
var cljs$core$async$mapcat_STAR__$_state_machine__12860__auto____1 = (function (state_16195){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_16195);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e16273){var ex__12863__auto__ = e16273;
var statearr_16274_17967 = state_16195;
(statearr_16274_17967[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_16195[(4)]))){
var statearr_16275_17968 = state_16195;
(statearr_16275_17968[(1)] = cljs.core.first((state_16195[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17970 = state_16195;
state_16195 = G__17970;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__12860__auto__ = function(state_16195){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__12860__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__12860__auto____1.call(this,state_16195);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__12860__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__12860__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__12860__auto__;
})()
})();
var state__13430__auto__ = (function (){var statearr_16276 = f__13429__auto__();
(statearr_16276[(6)] = c__13428__auto__);

return statearr_16276;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
}));

return c__13428__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__16286 = arguments.length;
switch (G__16286) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3(f,in$,null);
}));

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return out;
}));

(cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var G__16305 = arguments.length;
switch (G__16305) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3(f,out,null);
}));

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return in$;
}));

(cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var G__16309 = arguments.length;
switch (G__16309) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2(ch,null);
}));

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__13428__auto___17981 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = (function (state_16335){
var state_val_16336 = (state_16335[(1)]);
if((state_val_16336 === (7))){
var inst_16330 = (state_16335[(2)]);
var state_16335__$1 = state_16335;
var statearr_16342_17986 = state_16335__$1;
(statearr_16342_17986[(2)] = inst_16330);

(statearr_16342_17986[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16336 === (1))){
var inst_16311 = null;
var state_16335__$1 = (function (){var statearr_16343 = state_16335;
(statearr_16343[(7)] = inst_16311);

return statearr_16343;
})();
var statearr_16347_17987 = state_16335__$1;
(statearr_16347_17987[(2)] = null);

(statearr_16347_17987[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16336 === (4))){
var inst_16314 = (state_16335[(8)]);
var inst_16314__$1 = (state_16335[(2)]);
var inst_16315 = (inst_16314__$1 == null);
var inst_16316 = cljs.core.not(inst_16315);
var state_16335__$1 = (function (){var statearr_16348 = state_16335;
(statearr_16348[(8)] = inst_16314__$1);

return statearr_16348;
})();
if(inst_16316){
var statearr_16349_17992 = state_16335__$1;
(statearr_16349_17992[(1)] = (5));

} else {
var statearr_16350_17993 = state_16335__$1;
(statearr_16350_17993[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16336 === (6))){
var state_16335__$1 = state_16335;
var statearr_16351_17994 = state_16335__$1;
(statearr_16351_17994[(2)] = null);

(statearr_16351_17994[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16336 === (3))){
var inst_16332 = (state_16335[(2)]);
var inst_16333 = cljs.core.async.close_BANG_(out);
var state_16335__$1 = (function (){var statearr_16352 = state_16335;
(statearr_16352[(9)] = inst_16332);

return statearr_16352;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_16335__$1,inst_16333);
} else {
if((state_val_16336 === (2))){
var state_16335__$1 = state_16335;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16335__$1,(4),ch);
} else {
if((state_val_16336 === (11))){
var inst_16314 = (state_16335[(8)]);
var inst_16324 = (state_16335[(2)]);
var inst_16311 = inst_16314;
var state_16335__$1 = (function (){var statearr_16357 = state_16335;
(statearr_16357[(10)] = inst_16324);

(statearr_16357[(7)] = inst_16311);

return statearr_16357;
})();
var statearr_16362_17998 = state_16335__$1;
(statearr_16362_17998[(2)] = null);

(statearr_16362_17998[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16336 === (9))){
var inst_16314 = (state_16335[(8)]);
var state_16335__$1 = state_16335;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16335__$1,(11),out,inst_16314);
} else {
if((state_val_16336 === (5))){
var inst_16314 = (state_16335[(8)]);
var inst_16311 = (state_16335[(7)]);
var inst_16318 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_16314,inst_16311);
var state_16335__$1 = state_16335;
if(inst_16318){
var statearr_16368_17999 = state_16335__$1;
(statearr_16368_17999[(1)] = (8));

} else {
var statearr_16369_18000 = state_16335__$1;
(statearr_16369_18000[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16336 === (10))){
var inst_16327 = (state_16335[(2)]);
var state_16335__$1 = state_16335;
var statearr_16370_18001 = state_16335__$1;
(statearr_16370_18001[(2)] = inst_16327);

(statearr_16370_18001[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16336 === (8))){
var inst_16311 = (state_16335[(7)]);
var tmp16367 = inst_16311;
var inst_16311__$1 = tmp16367;
var state_16335__$1 = (function (){var statearr_16371 = state_16335;
(statearr_16371[(7)] = inst_16311__$1);

return statearr_16371;
})();
var statearr_16372_18002 = state_16335__$1;
(statearr_16372_18002[(2)] = null);

(statearr_16372_18002[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
});
return (function() {
var cljs$core$async$state_machine__12860__auto__ = null;
var cljs$core$async$state_machine__12860__auto____0 = (function (){
var statearr_16373 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_16373[(0)] = cljs$core$async$state_machine__12860__auto__);

(statearr_16373[(1)] = (1));

return statearr_16373;
});
var cljs$core$async$state_machine__12860__auto____1 = (function (state_16335){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_16335);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e16374){var ex__12863__auto__ = e16374;
var statearr_16375_18003 = state_16335;
(statearr_16375_18003[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_16335[(4)]))){
var statearr_16376_18004 = state_16335;
(statearr_16376_18004[(1)] = cljs.core.first((state_16335[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18005 = state_16335;
state_16335 = G__18005;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
cljs$core$async$state_machine__12860__auto__ = function(state_16335){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12860__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12860__auto____1.call(this,state_16335);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12860__auto____0;
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12860__auto____1;
return cljs$core$async$state_machine__12860__auto__;
})()
})();
var state__13430__auto__ = (function (){var statearr_16377 = f__13429__auto__();
(statearr_16377[(6)] = c__13428__auto___17981);

return statearr_16377;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
}));


return out;
}));

(cljs.core.async.unique.cljs$lang$maxFixedArity = 2);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__16382 = arguments.length;
switch (G__16382) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__13428__auto___18013 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = (function (state_16431){
var state_val_16432 = (state_16431[(1)]);
if((state_val_16432 === (7))){
var inst_16425 = (state_16431[(2)]);
var state_16431__$1 = state_16431;
var statearr_16433_18015 = state_16431__$1;
(statearr_16433_18015[(2)] = inst_16425);

(statearr_16433_18015[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16432 === (1))){
var inst_16385 = (new Array(n));
var inst_16386 = inst_16385;
var inst_16387 = (0);
var state_16431__$1 = (function (){var statearr_16434 = state_16431;
(statearr_16434[(7)] = inst_16387);

(statearr_16434[(8)] = inst_16386);

return statearr_16434;
})();
var statearr_16435_18016 = state_16431__$1;
(statearr_16435_18016[(2)] = null);

(statearr_16435_18016[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16432 === (4))){
var inst_16390 = (state_16431[(9)]);
var inst_16390__$1 = (state_16431[(2)]);
var inst_16393 = (inst_16390__$1 == null);
var inst_16394 = cljs.core.not(inst_16393);
var state_16431__$1 = (function (){var statearr_16436 = state_16431;
(statearr_16436[(9)] = inst_16390__$1);

return statearr_16436;
})();
if(inst_16394){
var statearr_16437_18021 = state_16431__$1;
(statearr_16437_18021[(1)] = (5));

} else {
var statearr_16438_18022 = state_16431__$1;
(statearr_16438_18022[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16432 === (15))){
var inst_16419 = (state_16431[(2)]);
var state_16431__$1 = state_16431;
var statearr_16440_18023 = state_16431__$1;
(statearr_16440_18023[(2)] = inst_16419);

(statearr_16440_18023[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16432 === (13))){
var state_16431__$1 = state_16431;
var statearr_16441_18024 = state_16431__$1;
(statearr_16441_18024[(2)] = null);

(statearr_16441_18024[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16432 === (6))){
var inst_16387 = (state_16431[(7)]);
var inst_16412 = (inst_16387 > (0));
var state_16431__$1 = state_16431;
if(cljs.core.truth_(inst_16412)){
var statearr_16442_18029 = state_16431__$1;
(statearr_16442_18029[(1)] = (12));

} else {
var statearr_16443_18030 = state_16431__$1;
(statearr_16443_18030[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16432 === (3))){
var inst_16427 = (state_16431[(2)]);
var state_16431__$1 = state_16431;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16431__$1,inst_16427);
} else {
if((state_val_16432 === (12))){
var inst_16386 = (state_16431[(8)]);
var inst_16417 = cljs.core.vec(inst_16386);
var state_16431__$1 = state_16431;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16431__$1,(15),out,inst_16417);
} else {
if((state_val_16432 === (2))){
var state_16431__$1 = state_16431;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16431__$1,(4),ch);
} else {
if((state_val_16432 === (11))){
var inst_16406 = (state_16431[(2)]);
var inst_16407 = (new Array(n));
var inst_16386 = inst_16407;
var inst_16387 = (0);
var state_16431__$1 = (function (){var statearr_16450 = state_16431;
(statearr_16450[(7)] = inst_16387);

(statearr_16450[(10)] = inst_16406);

(statearr_16450[(8)] = inst_16386);

return statearr_16450;
})();
var statearr_16457_18032 = state_16431__$1;
(statearr_16457_18032[(2)] = null);

(statearr_16457_18032[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16432 === (9))){
var inst_16386 = (state_16431[(8)]);
var inst_16404 = cljs.core.vec(inst_16386);
var state_16431__$1 = state_16431;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16431__$1,(11),out,inst_16404);
} else {
if((state_val_16432 === (5))){
var inst_16387 = (state_16431[(7)]);
var inst_16390 = (state_16431[(9)]);
var inst_16397 = (state_16431[(11)]);
var inst_16386 = (state_16431[(8)]);
var inst_16396 = (inst_16386[inst_16387] = inst_16390);
var inst_16397__$1 = (inst_16387 + (1));
var inst_16399 = (inst_16397__$1 < n);
var state_16431__$1 = (function (){var statearr_16461 = state_16431;
(statearr_16461[(12)] = inst_16396);

(statearr_16461[(11)] = inst_16397__$1);

return statearr_16461;
})();
if(cljs.core.truth_(inst_16399)){
var statearr_16462_18038 = state_16431__$1;
(statearr_16462_18038[(1)] = (8));

} else {
var statearr_16463_18039 = state_16431__$1;
(statearr_16463_18039[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16432 === (14))){
var inst_16422 = (state_16431[(2)]);
var inst_16423 = cljs.core.async.close_BANG_(out);
var state_16431__$1 = (function (){var statearr_16468 = state_16431;
(statearr_16468[(13)] = inst_16422);

return statearr_16468;
})();
var statearr_16469_18040 = state_16431__$1;
(statearr_16469_18040[(2)] = inst_16423);

(statearr_16469_18040[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16432 === (10))){
var inst_16410 = (state_16431[(2)]);
var state_16431__$1 = state_16431;
var statearr_16470_18047 = state_16431__$1;
(statearr_16470_18047[(2)] = inst_16410);

(statearr_16470_18047[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16432 === (8))){
var inst_16397 = (state_16431[(11)]);
var inst_16386 = (state_16431[(8)]);
var tmp16464 = inst_16386;
var inst_16386__$1 = tmp16464;
var inst_16387 = inst_16397;
var state_16431__$1 = (function (){var statearr_16471 = state_16431;
(statearr_16471[(7)] = inst_16387);

(statearr_16471[(8)] = inst_16386__$1);

return statearr_16471;
})();
var statearr_16472_18049 = state_16431__$1;
(statearr_16472_18049[(2)] = null);

(statearr_16472_18049[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__12860__auto__ = null;
var cljs$core$async$state_machine__12860__auto____0 = (function (){
var statearr_16473 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_16473[(0)] = cljs$core$async$state_machine__12860__auto__);

(statearr_16473[(1)] = (1));

return statearr_16473;
});
var cljs$core$async$state_machine__12860__auto____1 = (function (state_16431){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_16431);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e16474){var ex__12863__auto__ = e16474;
var statearr_16475_18056 = state_16431;
(statearr_16475_18056[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_16431[(4)]))){
var statearr_16476_18058 = state_16431;
(statearr_16476_18058[(1)] = cljs.core.first((state_16431[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18059 = state_16431;
state_16431 = G__18059;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
cljs$core$async$state_machine__12860__auto__ = function(state_16431){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12860__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12860__auto____1.call(this,state_16431);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12860__auto____0;
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12860__auto____1;
return cljs$core$async$state_machine__12860__auto__;
})()
})();
var state__13430__auto__ = (function (){var statearr_16477 = f__13429__auto__();
(statearr_16477[(6)] = c__13428__auto___18013);

return statearr_16477;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
}));


return out;
}));

(cljs.core.async.partition.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__16482 = arguments.length;
switch (G__16482) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3(f,ch,null);
}));

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__13428__auto___18065 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__13429__auto__ = (function (){var switch__12859__auto__ = (function (state_16531){
var state_val_16532 = (state_16531[(1)]);
if((state_val_16532 === (7))){
var inst_16526 = (state_16531[(2)]);
var state_16531__$1 = state_16531;
var statearr_16538_18066 = state_16531__$1;
(statearr_16538_18066[(2)] = inst_16526);

(statearr_16538_18066[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16532 === (1))){
var inst_16483 = [];
var inst_16484 = inst_16483;
var inst_16485 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_16531__$1 = (function (){var statearr_16542 = state_16531;
(statearr_16542[(7)] = inst_16485);

(statearr_16542[(8)] = inst_16484);

return statearr_16542;
})();
var statearr_16547_18071 = state_16531__$1;
(statearr_16547_18071[(2)] = null);

(statearr_16547_18071[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16532 === (4))){
var inst_16488 = (state_16531[(9)]);
var inst_16488__$1 = (state_16531[(2)]);
var inst_16492 = (inst_16488__$1 == null);
var inst_16493 = cljs.core.not(inst_16492);
var state_16531__$1 = (function (){var statearr_16550 = state_16531;
(statearr_16550[(9)] = inst_16488__$1);

return statearr_16550;
})();
if(inst_16493){
var statearr_16553_18073 = state_16531__$1;
(statearr_16553_18073[(1)] = (5));

} else {
var statearr_16555_18074 = state_16531__$1;
(statearr_16555_18074[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16532 === (15))){
var inst_16484 = (state_16531[(8)]);
var inst_16518 = cljs.core.vec(inst_16484);
var state_16531__$1 = state_16531;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16531__$1,(18),out,inst_16518);
} else {
if((state_val_16532 === (13))){
var inst_16513 = (state_16531[(2)]);
var state_16531__$1 = state_16531;
var statearr_16558_18078 = state_16531__$1;
(statearr_16558_18078[(2)] = inst_16513);

(statearr_16558_18078[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16532 === (6))){
var inst_16484 = (state_16531[(8)]);
var inst_16515 = inst_16484.length;
var inst_16516 = (inst_16515 > (0));
var state_16531__$1 = state_16531;
if(cljs.core.truth_(inst_16516)){
var statearr_16563_18079 = state_16531__$1;
(statearr_16563_18079[(1)] = (15));

} else {
var statearr_16565_18080 = state_16531__$1;
(statearr_16565_18080[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16532 === (17))){
var inst_16523 = (state_16531[(2)]);
var inst_16524 = cljs.core.async.close_BANG_(out);
var state_16531__$1 = (function (){var statearr_16566 = state_16531;
(statearr_16566[(10)] = inst_16523);

return statearr_16566;
})();
var statearr_16567_18082 = state_16531__$1;
(statearr_16567_18082[(2)] = inst_16524);

(statearr_16567_18082[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16532 === (3))){
var inst_16528 = (state_16531[(2)]);
var state_16531__$1 = state_16531;
return cljs.core.async.impl.ioc_helpers.return_chan(state_16531__$1,inst_16528);
} else {
if((state_val_16532 === (12))){
var inst_16484 = (state_16531[(8)]);
var inst_16506 = cljs.core.vec(inst_16484);
var state_16531__$1 = state_16531;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_16531__$1,(14),out,inst_16506);
} else {
if((state_val_16532 === (2))){
var state_16531__$1 = state_16531;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_16531__$1,(4),ch);
} else {
if((state_val_16532 === (11))){
var inst_16488 = (state_16531[(9)]);
var inst_16484 = (state_16531[(8)]);
var inst_16495 = (state_16531[(11)]);
var inst_16503 = inst_16484.push(inst_16488);
var tmp16568 = inst_16484;
var inst_16484__$1 = tmp16568;
var inst_16485 = inst_16495;
var state_16531__$1 = (function (){var statearr_16575 = state_16531;
(statearr_16575[(7)] = inst_16485);

(statearr_16575[(8)] = inst_16484__$1);

(statearr_16575[(12)] = inst_16503);

return statearr_16575;
})();
var statearr_16576_18095 = state_16531__$1;
(statearr_16576_18095[(2)] = null);

(statearr_16576_18095[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16532 === (9))){
var inst_16485 = (state_16531[(7)]);
var inst_16499 = cljs.core.keyword_identical_QMARK_(inst_16485,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var state_16531__$1 = state_16531;
var statearr_16577_18097 = state_16531__$1;
(statearr_16577_18097[(2)] = inst_16499);

(statearr_16577_18097[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16532 === (5))){
var inst_16488 = (state_16531[(9)]);
var inst_16485 = (state_16531[(7)]);
var inst_16496 = (state_16531[(13)]);
var inst_16495 = (state_16531[(11)]);
var inst_16495__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_16488) : f.call(null,inst_16488));
var inst_16496__$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_16495__$1,inst_16485);
var state_16531__$1 = (function (){var statearr_16578 = state_16531;
(statearr_16578[(13)] = inst_16496__$1);

(statearr_16578[(11)] = inst_16495__$1);

return statearr_16578;
})();
if(inst_16496__$1){
var statearr_16579_18102 = state_16531__$1;
(statearr_16579_18102[(1)] = (8));

} else {
var statearr_16580_18103 = state_16531__$1;
(statearr_16580_18103[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16532 === (14))){
var inst_16488 = (state_16531[(9)]);
var inst_16495 = (state_16531[(11)]);
var inst_16508 = (state_16531[(2)]);
var inst_16509 = [];
var inst_16510 = inst_16509.push(inst_16488);
var inst_16484 = inst_16509;
var inst_16485 = inst_16495;
var state_16531__$1 = (function (){var statearr_16581 = state_16531;
(statearr_16581[(7)] = inst_16485);

(statearr_16581[(14)] = inst_16510);

(statearr_16581[(8)] = inst_16484);

(statearr_16581[(15)] = inst_16508);

return statearr_16581;
})();
var statearr_16582_18105 = state_16531__$1;
(statearr_16582_18105[(2)] = null);

(statearr_16582_18105[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16532 === (16))){
var state_16531__$1 = state_16531;
var statearr_16584_18110 = state_16531__$1;
(statearr_16584_18110[(2)] = null);

(statearr_16584_18110[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16532 === (10))){
var inst_16501 = (state_16531[(2)]);
var state_16531__$1 = state_16531;
if(cljs.core.truth_(inst_16501)){
var statearr_16585_18113 = state_16531__$1;
(statearr_16585_18113[(1)] = (11));

} else {
var statearr_16586_18114 = state_16531__$1;
(statearr_16586_18114[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16532 === (18))){
var inst_16520 = (state_16531[(2)]);
var state_16531__$1 = state_16531;
var statearr_16587_18116 = state_16531__$1;
(statearr_16587_18116[(2)] = inst_16520);

(statearr_16587_18116[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16532 === (8))){
var inst_16496 = (state_16531[(13)]);
var state_16531__$1 = state_16531;
var statearr_16588_18117 = state_16531__$1;
(statearr_16588_18117[(2)] = inst_16496);

(statearr_16588_18117[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
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
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__12860__auto__ = null;
var cljs$core$async$state_machine__12860__auto____0 = (function (){
var statearr_16592 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_16592[(0)] = cljs$core$async$state_machine__12860__auto__);

(statearr_16592[(1)] = (1));

return statearr_16592;
});
var cljs$core$async$state_machine__12860__auto____1 = (function (state_16531){
while(true){
var ret_value__12861__auto__ = (function (){try{while(true){
var result__12862__auto__ = switch__12859__auto__(state_16531);
if(cljs.core.keyword_identical_QMARK_(result__12862__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__12862__auto__;
}
break;
}
}catch (e16596){var ex__12863__auto__ = e16596;
var statearr_16597_18127 = state_16531;
(statearr_16597_18127[(2)] = ex__12863__auto__);


if(cljs.core.seq((state_16531[(4)]))){
var statearr_16598_18128 = state_16531;
(statearr_16598_18128[(1)] = cljs.core.first((state_16531[(4)])));

} else {
throw ex__12863__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__12861__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18129 = state_16531;
state_16531 = G__18129;
continue;
} else {
return ret_value__12861__auto__;
}
break;
}
});
cljs$core$async$state_machine__12860__auto__ = function(state_16531){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__12860__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__12860__auto____1.call(this,state_16531);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__12860__auto____0;
cljs$core$async$state_machine__12860__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__12860__auto____1;
return cljs$core$async$state_machine__12860__auto__;
})()
})();
var state__13430__auto__ = (function (){var statearr_16599 = f__13429__auto__();
(statearr_16599[(6)] = c__13428__auto___18065);

return statearr_16599;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__13430__auto__);
}));


return out;
}));

(cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=cljs.core.async.js.map
