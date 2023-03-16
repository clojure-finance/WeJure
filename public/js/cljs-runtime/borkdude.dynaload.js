goog.provide('borkdude.dynaload');
goog.require('cljs.core');

/**
* @constructor
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.IDeref}
*/
borkdude.dynaload.LazyVar = (function (f,cached){
this.f = f;
this.cached = cached;
this.cljs$lang$protocol_mask$partition0$ = 32769;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
borkdude.dynaload.LazyVar.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if((!((self__.cached == null)))){
return self__.cached;
} else {
var x = (self__.f.cljs$core$IFn$_invoke$arity$0 ? self__.f.cljs$core$IFn$_invoke$arity$0() : self__.f.call(null));
if((x == null)){
} else {
self__.cached = x;
}

return x;
}
});

borkdude.dynaload.LazyVar.prototype.call = (function() {
var G__20235 = null;
var G__20235__1 = (function (self__){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
var fexpr__20010 = cljs.core.deref(this$);
return (fexpr__20010.cljs$core$IFn$_invoke$arity$0 ? fexpr__20010.cljs$core$IFn$_invoke$arity$0() : fexpr__20010.call(null));
});
var G__20235__2 = (function (self__,a){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
var fexpr__20011 = cljs.core.deref(this$);
return (fexpr__20011.cljs$core$IFn$_invoke$arity$1 ? fexpr__20011.cljs$core$IFn$_invoke$arity$1(a) : fexpr__20011.call(null,a));
});
var G__20235__3 = (function (self__,a,b){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
var fexpr__20012 = cljs.core.deref(this$);
return (fexpr__20012.cljs$core$IFn$_invoke$arity$2 ? fexpr__20012.cljs$core$IFn$_invoke$arity$2(a,b) : fexpr__20012.call(null,a,b));
});
var G__20235__4 = (function (self__,a,b,c){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
var fexpr__20013 = cljs.core.deref(this$);
return (fexpr__20013.cljs$core$IFn$_invoke$arity$3 ? fexpr__20013.cljs$core$IFn$_invoke$arity$3(a,b,c) : fexpr__20013.call(null,a,b,c));
});
var G__20235__5 = (function (self__,a,b,c,d){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
var fexpr__20015 = cljs.core.deref(this$);
return (fexpr__20015.cljs$core$IFn$_invoke$arity$4 ? fexpr__20015.cljs$core$IFn$_invoke$arity$4(a,b,c,d) : fexpr__20015.call(null,a,b,c,d));
});
var G__20235__6 = (function (self__,a,b,c,d,e){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
var fexpr__20017 = cljs.core.deref(this$);
return (fexpr__20017.cljs$core$IFn$_invoke$arity$5 ? fexpr__20017.cljs$core$IFn$_invoke$arity$5(a,b,c,d,e) : fexpr__20017.call(null,a,b,c,d,e));
});
var G__20235__7 = (function (self__,a,b,c,d,e,f__$1){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
var fexpr__20022 = cljs.core.deref(this$);
return (fexpr__20022.cljs$core$IFn$_invoke$arity$6 ? fexpr__20022.cljs$core$IFn$_invoke$arity$6(a,b,c,d,e,f__$1) : fexpr__20022.call(null,a,b,c,d,e,f__$1));
});
var G__20235__8 = (function (self__,a,b,c,d,e,f__$1,g){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
var fexpr__20023 = cljs.core.deref(this$);
return (fexpr__20023.cljs$core$IFn$_invoke$arity$7 ? fexpr__20023.cljs$core$IFn$_invoke$arity$7(a,b,c,d,e,f__$1,g) : fexpr__20023.call(null,a,b,c,d,e,f__$1,g));
});
var G__20235__9 = (function (self__,a,b,c,d,e,f__$1,g,h){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
var fexpr__20024 = cljs.core.deref(this$);
return (fexpr__20024.cljs$core$IFn$_invoke$arity$8 ? fexpr__20024.cljs$core$IFn$_invoke$arity$8(a,b,c,d,e,f__$1,g,h) : fexpr__20024.call(null,a,b,c,d,e,f__$1,g,h));
});
var G__20235__10 = (function (self__,a,b,c,d,e,f__$1,g,h,i){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
var fexpr__20025 = cljs.core.deref(this$);
return (fexpr__20025.cljs$core$IFn$_invoke$arity$9 ? fexpr__20025.cljs$core$IFn$_invoke$arity$9(a,b,c,d,e,f__$1,g,h,i) : fexpr__20025.call(null,a,b,c,d,e,f__$1,g,h,i));
});
var G__20235__11 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
var fexpr__20026 = cljs.core.deref(this$);
return (fexpr__20026.cljs$core$IFn$_invoke$arity$10 ? fexpr__20026.cljs$core$IFn$_invoke$arity$10(a,b,c,d,e,f__$1,g,h,i,j) : fexpr__20026.call(null,a,b,c,d,e,f__$1,g,h,i,j));
});
var G__20235__12 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
var fexpr__20028 = cljs.core.deref(this$);
return (fexpr__20028.cljs$core$IFn$_invoke$arity$11 ? fexpr__20028.cljs$core$IFn$_invoke$arity$11(a,b,c,d,e,f__$1,g,h,i,j,k) : fexpr__20028.call(null,a,b,c,d,e,f__$1,g,h,i,j,k));
});
var G__20235__13 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k,l){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
var fexpr__20030 = cljs.core.deref(this$);
return (fexpr__20030.cljs$core$IFn$_invoke$arity$12 ? fexpr__20030.cljs$core$IFn$_invoke$arity$12(a,b,c,d,e,f__$1,g,h,i,j,k,l) : fexpr__20030.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l));
});
var G__20235__14 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
var fexpr__20032 = cljs.core.deref(this$);
return (fexpr__20032.cljs$core$IFn$_invoke$arity$13 ? fexpr__20032.cljs$core$IFn$_invoke$arity$13(a,b,c,d,e,f__$1,g,h,i,j,k,l,m) : fexpr__20032.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m));
});
var G__20235__15 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
var fexpr__20034 = cljs.core.deref(this$);
return (fexpr__20034.cljs$core$IFn$_invoke$arity$14 ? fexpr__20034.cljs$core$IFn$_invoke$arity$14(a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n) : fexpr__20034.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n));
});
var G__20235__16 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
var fexpr__20036 = cljs.core.deref(this$);
return (fexpr__20036.cljs$core$IFn$_invoke$arity$15 ? fexpr__20036.cljs$core$IFn$_invoke$arity$15(a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o) : fexpr__20036.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o));
});
var G__20235__17 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
var fexpr__20037 = cljs.core.deref(this$);
return (fexpr__20037.cljs$core$IFn$_invoke$arity$16 ? fexpr__20037.cljs$core$IFn$_invoke$arity$16(a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p) : fexpr__20037.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p));
});
var G__20235__18 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
var fexpr__20038 = cljs.core.deref(this$);
return (fexpr__20038.cljs$core$IFn$_invoke$arity$17 ? fexpr__20038.cljs$core$IFn$_invoke$arity$17(a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q) : fexpr__20038.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q));
});
var G__20235__19 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
var fexpr__20039 = cljs.core.deref(this$);
return (fexpr__20039.cljs$core$IFn$_invoke$arity$18 ? fexpr__20039.cljs$core$IFn$_invoke$arity$18(a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r) : fexpr__20039.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r));
});
var G__20235__20 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
var fexpr__20042 = cljs.core.deref(this$);
return (fexpr__20042.cljs$core$IFn$_invoke$arity$19 ? fexpr__20042.cljs$core$IFn$_invoke$arity$19(a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s) : fexpr__20042.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s));
});
var G__20235__21 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
var fexpr__20045 = cljs.core.deref(this$);
return (fexpr__20045.cljs$core$IFn$_invoke$arity$20 ? fexpr__20045.cljs$core$IFn$_invoke$arity$20(a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t) : fexpr__20045.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t));
});
var G__20235__22 = (function (self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t,rest){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
return cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(cljs.core.deref(this$),a,b,c,d,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t,rest], 0));
});
G__20235 = function(self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t,rest){
switch(arguments.length){
case 1:
return G__20235__1.call(this,self__);
case 2:
return G__20235__2.call(this,self__,a);
case 3:
return G__20235__3.call(this,self__,a,b);
case 4:
return G__20235__4.call(this,self__,a,b,c);
case 5:
return G__20235__5.call(this,self__,a,b,c,d);
case 6:
return G__20235__6.call(this,self__,a,b,c,d,e);
case 7:
return G__20235__7.call(this,self__,a,b,c,d,e,f__$1);
case 8:
return G__20235__8.call(this,self__,a,b,c,d,e,f__$1,g);
case 9:
return G__20235__9.call(this,self__,a,b,c,d,e,f__$1,g,h);
case 10:
return G__20235__10.call(this,self__,a,b,c,d,e,f__$1,g,h,i);
case 11:
return G__20235__11.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j);
case 12:
return G__20235__12.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k);
case 13:
return G__20235__13.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k,l);
case 14:
return G__20235__14.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m);
case 15:
return G__20235__15.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n);
case 16:
return G__20235__16.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o);
case 17:
return G__20235__17.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p);
case 18:
return G__20235__18.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q);
case 19:
return G__20235__19.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r);
case 20:
return G__20235__20.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s);
case 21:
return G__20235__21.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t);
case 22:
return G__20235__22.call(this,self__,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t,rest);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
G__20235.cljs$core$IFn$_invoke$arity$1 = G__20235__1;
G__20235.cljs$core$IFn$_invoke$arity$2 = G__20235__2;
G__20235.cljs$core$IFn$_invoke$arity$3 = G__20235__3;
G__20235.cljs$core$IFn$_invoke$arity$4 = G__20235__4;
G__20235.cljs$core$IFn$_invoke$arity$5 = G__20235__5;
G__20235.cljs$core$IFn$_invoke$arity$6 = G__20235__6;
G__20235.cljs$core$IFn$_invoke$arity$7 = G__20235__7;
G__20235.cljs$core$IFn$_invoke$arity$8 = G__20235__8;
G__20235.cljs$core$IFn$_invoke$arity$9 = G__20235__9;
G__20235.cljs$core$IFn$_invoke$arity$10 = G__20235__10;
G__20235.cljs$core$IFn$_invoke$arity$11 = G__20235__11;
G__20235.cljs$core$IFn$_invoke$arity$12 = G__20235__12;
G__20235.cljs$core$IFn$_invoke$arity$13 = G__20235__13;
G__20235.cljs$core$IFn$_invoke$arity$14 = G__20235__14;
G__20235.cljs$core$IFn$_invoke$arity$15 = G__20235__15;
G__20235.cljs$core$IFn$_invoke$arity$16 = G__20235__16;
G__20235.cljs$core$IFn$_invoke$arity$17 = G__20235__17;
G__20235.cljs$core$IFn$_invoke$arity$18 = G__20235__18;
G__20235.cljs$core$IFn$_invoke$arity$19 = G__20235__19;
G__20235.cljs$core$IFn$_invoke$arity$20 = G__20235__20;
G__20235.cljs$core$IFn$_invoke$arity$21 = G__20235__21;
G__20235.cljs$core$IFn$_invoke$arity$22 = G__20235__22;
return G__20235;
})()
;

borkdude.dynaload.LazyVar.prototype.apply = (function (self__,args20006){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone(args20006)));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$0 = (function (){
var self__ = this;
var this$ = this;
var fexpr__20052 = cljs.core.deref(this$);
return (fexpr__20052.cljs$core$IFn$_invoke$arity$0 ? fexpr__20052.cljs$core$IFn$_invoke$arity$0() : fexpr__20052.call(null));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$1 = (function (a){
var self__ = this;
var this$ = this;
var fexpr__20055 = cljs.core.deref(this$);
return (fexpr__20055.cljs$core$IFn$_invoke$arity$1 ? fexpr__20055.cljs$core$IFn$_invoke$arity$1(a) : fexpr__20055.call(null,a));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
var self__ = this;
var this$ = this;
var fexpr__20061 = cljs.core.deref(this$);
return (fexpr__20061.cljs$core$IFn$_invoke$arity$2 ? fexpr__20061.cljs$core$IFn$_invoke$arity$2(a,b) : fexpr__20061.call(null,a,b));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$3 = (function (a,b,c){
var self__ = this;
var this$ = this;
var fexpr__20066 = cljs.core.deref(this$);
return (fexpr__20066.cljs$core$IFn$_invoke$arity$3 ? fexpr__20066.cljs$core$IFn$_invoke$arity$3(a,b,c) : fexpr__20066.call(null,a,b,c));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$4 = (function (a,b,c,d){
var self__ = this;
var this$ = this;
var fexpr__20070 = cljs.core.deref(this$);
return (fexpr__20070.cljs$core$IFn$_invoke$arity$4 ? fexpr__20070.cljs$core$IFn$_invoke$arity$4(a,b,c,d) : fexpr__20070.call(null,a,b,c,d));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$5 = (function (a,b,c,d,e){
var self__ = this;
var this$ = this;
var fexpr__20090 = cljs.core.deref(this$);
return (fexpr__20090.cljs$core$IFn$_invoke$arity$5 ? fexpr__20090.cljs$core$IFn$_invoke$arity$5(a,b,c,d,e) : fexpr__20090.call(null,a,b,c,d,e));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$6 = (function (a,b,c,d,e,f__$1){
var self__ = this;
var this$ = this;
var fexpr__20105 = cljs.core.deref(this$);
return (fexpr__20105.cljs$core$IFn$_invoke$arity$6 ? fexpr__20105.cljs$core$IFn$_invoke$arity$6(a,b,c,d,e,f__$1) : fexpr__20105.call(null,a,b,c,d,e,f__$1));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$7 = (function (a,b,c,d,e,f__$1,g){
var self__ = this;
var this$ = this;
var fexpr__20118 = cljs.core.deref(this$);
return (fexpr__20118.cljs$core$IFn$_invoke$arity$7 ? fexpr__20118.cljs$core$IFn$_invoke$arity$7(a,b,c,d,e,f__$1,g) : fexpr__20118.call(null,a,b,c,d,e,f__$1,g));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$8 = (function (a,b,c,d,e,f__$1,g,h){
var self__ = this;
var this$ = this;
var fexpr__20124 = cljs.core.deref(this$);
return (fexpr__20124.cljs$core$IFn$_invoke$arity$8 ? fexpr__20124.cljs$core$IFn$_invoke$arity$8(a,b,c,d,e,f__$1,g,h) : fexpr__20124.call(null,a,b,c,d,e,f__$1,g,h));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$9 = (function (a,b,c,d,e,f__$1,g,h,i){
var self__ = this;
var this$ = this;
var fexpr__20154 = cljs.core.deref(this$);
return (fexpr__20154.cljs$core$IFn$_invoke$arity$9 ? fexpr__20154.cljs$core$IFn$_invoke$arity$9(a,b,c,d,e,f__$1,g,h,i) : fexpr__20154.call(null,a,b,c,d,e,f__$1,g,h,i));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$10 = (function (a,b,c,d,e,f__$1,g,h,i,j){
var self__ = this;
var this$ = this;
var fexpr__20157 = cljs.core.deref(this$);
return (fexpr__20157.cljs$core$IFn$_invoke$arity$10 ? fexpr__20157.cljs$core$IFn$_invoke$arity$10(a,b,c,d,e,f__$1,g,h,i,j) : fexpr__20157.call(null,a,b,c,d,e,f__$1,g,h,i,j));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$11 = (function (a,b,c,d,e,f__$1,g,h,i,j,k){
var self__ = this;
var this$ = this;
var fexpr__20158 = cljs.core.deref(this$);
return (fexpr__20158.cljs$core$IFn$_invoke$arity$11 ? fexpr__20158.cljs$core$IFn$_invoke$arity$11(a,b,c,d,e,f__$1,g,h,i,j,k) : fexpr__20158.call(null,a,b,c,d,e,f__$1,g,h,i,j,k));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$12 = (function (a,b,c,d,e,f__$1,g,h,i,j,k,l){
var self__ = this;
var this$ = this;
var fexpr__20163 = cljs.core.deref(this$);
return (fexpr__20163.cljs$core$IFn$_invoke$arity$12 ? fexpr__20163.cljs$core$IFn$_invoke$arity$12(a,b,c,d,e,f__$1,g,h,i,j,k,l) : fexpr__20163.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$13 = (function (a,b,c,d,e,f__$1,g,h,i,j,k,l,m){
var self__ = this;
var this$ = this;
var fexpr__20169 = cljs.core.deref(this$);
return (fexpr__20169.cljs$core$IFn$_invoke$arity$13 ? fexpr__20169.cljs$core$IFn$_invoke$arity$13(a,b,c,d,e,f__$1,g,h,i,j,k,l,m) : fexpr__20169.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$14 = (function (a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n){
var self__ = this;
var this$ = this;
var fexpr__20174 = cljs.core.deref(this$);
return (fexpr__20174.cljs$core$IFn$_invoke$arity$14 ? fexpr__20174.cljs$core$IFn$_invoke$arity$14(a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n) : fexpr__20174.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$15 = (function (a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o){
var self__ = this;
var this$ = this;
var fexpr__20180 = cljs.core.deref(this$);
return (fexpr__20180.cljs$core$IFn$_invoke$arity$15 ? fexpr__20180.cljs$core$IFn$_invoke$arity$15(a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o) : fexpr__20180.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$16 = (function (a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p){
var self__ = this;
var this$ = this;
var fexpr__20189 = cljs.core.deref(this$);
return (fexpr__20189.cljs$core$IFn$_invoke$arity$16 ? fexpr__20189.cljs$core$IFn$_invoke$arity$16(a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p) : fexpr__20189.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$17 = (function (a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q){
var self__ = this;
var this$ = this;
var fexpr__20199 = cljs.core.deref(this$);
return (fexpr__20199.cljs$core$IFn$_invoke$arity$17 ? fexpr__20199.cljs$core$IFn$_invoke$arity$17(a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q) : fexpr__20199.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$18 = (function (a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r){
var self__ = this;
var this$ = this;
var fexpr__20209 = cljs.core.deref(this$);
return (fexpr__20209.cljs$core$IFn$_invoke$arity$18 ? fexpr__20209.cljs$core$IFn$_invoke$arity$18(a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r) : fexpr__20209.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$19 = (function (a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s){
var self__ = this;
var this$ = this;
var fexpr__20215 = cljs.core.deref(this$);
return (fexpr__20215.cljs$core$IFn$_invoke$arity$19 ? fexpr__20215.cljs$core$IFn$_invoke$arity$19(a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s) : fexpr__20215.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$20 = (function (a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t){
var self__ = this;
var this$ = this;
var fexpr__20216 = cljs.core.deref(this$);
return (fexpr__20216.cljs$core$IFn$_invoke$arity$20 ? fexpr__20216.cljs$core$IFn$_invoke$arity$20(a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t) : fexpr__20216.call(null,a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t));
});

borkdude.dynaload.LazyVar.prototype.cljs$core$IFn$_invoke$arity$21 = (function (a,b,c,d,e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t,rest){
var self__ = this;
var this$ = this;
return cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(cljs.core.deref(this$),a,b,c,d,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([e,f__$1,g,h,i,j,k,l,m,n,o,p,q,r,s,t,rest], 0));
});

borkdude.dynaload.LazyVar.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),cljs.core.with_meta(new cljs.core.Symbol(null,"cached","cached",-1216707864,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
});

borkdude.dynaload.LazyVar.cljs$lang$type = true;

borkdude.dynaload.LazyVar.cljs$lang$ctorStr = "borkdude.dynaload/LazyVar";

borkdude.dynaload.LazyVar.cljs$lang$ctorPrWriter = (function (this__4374__auto__,writer__4375__auto__,opt__4376__auto__){
return cljs.core._write(writer__4375__auto__,"borkdude.dynaload/LazyVar");
});

/**
 * Positional factory function for borkdude.dynaload/LazyVar.
 */
borkdude.dynaload.__GT_LazyVar = (function borkdude$dynaload$__GT_LazyVar(f,cached){
return (new borkdude.dynaload.LazyVar(f,cached));
});


//# sourceMappingURL=borkdude.dynaload.js.map
