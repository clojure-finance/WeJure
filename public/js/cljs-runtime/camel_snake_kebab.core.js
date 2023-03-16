goog.provide('camel_snake_kebab.core');



























/**
 * Converts the case of a string according to the rule for the first
 *   word, remaining words, and the separator.
 */
camel_snake_kebab.core.convert_case = (function camel_snake_kebab$core$convert_case(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21731 = arguments.length;
var i__5770__auto___21732 = (0);
while(true){
if((i__5770__auto___21732 < len__5769__auto___21731)){
args__5775__auto__.push((arguments[i__5770__auto___21732]));

var G__21733 = (i__5770__auto___21732 + (1));
i__5770__auto___21732 = G__21733;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((4) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((4)),(0),null)):null);
return camel_snake_kebab.core.convert_case.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.convert_case.cljs$core$IFn$_invoke$arity$variadic = (function (first_fn,rest_fn,sep,s,rest){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,first_fn,rest_fn,sep,s,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest], 0));
}));

(camel_snake_kebab.core.convert_case.cljs$lang$maxFixedArity = (4));

/** @this {Function} */
(camel_snake_kebab.core.convert_case.cljs$lang$applyTo = (function (seq21226){
var G__21227 = cljs.core.first(seq21226);
var seq21226__$1 = cljs.core.next(seq21226);
var G__21228 = cljs.core.first(seq21226__$1);
var seq21226__$2 = cljs.core.next(seq21226__$1);
var G__21229 = cljs.core.first(seq21226__$2);
var seq21226__$3 = cljs.core.next(seq21226__$2);
var G__21230 = cljs.core.first(seq21226__$3);
var seq21226__$4 = cljs.core.next(seq21226__$3);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21227,G__21228,G__21229,G__21230,seq21226__$4);
}));

camel_snake_kebab.core.__GT_PascalCase = (function camel_snake_kebab$core$__GT_PascalCase(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21734 = arguments.length;
var i__5770__auto___21735 = (0);
while(true){
if((i__5770__auto___21735 < len__5769__auto___21734)){
args__5775__auto__.push((arguments[i__5770__auto___21735]));

var G__21736 = (i__5770__auto___21735 + (1));
i__5770__auto___21735 = G__21736;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_PascalCase.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_PascalCase.cljs$core$IFn$_invoke$arity$variadic = (function (s__21168__auto__,rest__21169__auto__){
var convert_case__21170__auto__ = (function (p1__21167__21171__auto__){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.capitalize,clojure.string.capitalize,"",p1__21167__21171__auto__,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21169__auto__], 0));
});
return camel_snake_kebab.internals.alter_name.alter_name(s__21168__auto__,convert_case__21170__auto__);
}));

(camel_snake_kebab.core.__GT_PascalCase.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_PascalCase.cljs$lang$applyTo = (function (seq21246){
var G__21247 = cljs.core.first(seq21246);
var seq21246__$1 = cljs.core.next(seq21246);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21247,seq21246__$1);
}));


camel_snake_kebab.core.__GT_PascalCaseString = (function camel_snake_kebab$core$__GT_PascalCaseString(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21737 = arguments.length;
var i__5770__auto___21738 = (0);
while(true){
if((i__5770__auto___21738 < len__5769__auto___21737)){
args__5775__auto__.push((arguments[i__5770__auto___21738]));

var G__21739 = (i__5770__auto___21738 + (1));
i__5770__auto___21738 = G__21739;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_PascalCaseString.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_PascalCaseString.cljs$core$IFn$_invoke$arity$variadic = (function (s__21175__auto__,rest__21176__auto__){
return cljs.core.identity(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.capitalize,clojure.string.capitalize,"",cljs.core.name(s__21175__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21176__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_PascalCaseString.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_PascalCaseString.cljs$lang$applyTo = (function (seq21250){
var G__21251 = cljs.core.first(seq21250);
var seq21250__$1 = cljs.core.next(seq21250);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21251,seq21250__$1);
}));


camel_snake_kebab.core.__GT_PascalCaseSymbol = (function camel_snake_kebab$core$__GT_PascalCaseSymbol(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21740 = arguments.length;
var i__5770__auto___21741 = (0);
while(true){
if((i__5770__auto___21741 < len__5769__auto___21740)){
args__5775__auto__.push((arguments[i__5770__auto___21741]));

var G__21742 = (i__5770__auto___21741 + (1));
i__5770__auto___21741 = G__21742;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_PascalCaseSymbol.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_PascalCaseSymbol.cljs$core$IFn$_invoke$arity$variadic = (function (s__21175__auto__,rest__21176__auto__){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.capitalize,clojure.string.capitalize,"",cljs.core.name(s__21175__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21176__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_PascalCaseSymbol.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_PascalCaseSymbol.cljs$lang$applyTo = (function (seq21256){
var G__21257 = cljs.core.first(seq21256);
var seq21256__$1 = cljs.core.next(seq21256);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21257,seq21256__$1);
}));


camel_snake_kebab.core.__GT_PascalCaseKeyword = (function camel_snake_kebab$core$__GT_PascalCaseKeyword(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21745 = arguments.length;
var i__5770__auto___21746 = (0);
while(true){
if((i__5770__auto___21746 < len__5769__auto___21745)){
args__5775__auto__.push((arguments[i__5770__auto___21746]));

var G__21747 = (i__5770__auto___21746 + (1));
i__5770__auto___21746 = G__21747;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_PascalCaseKeyword.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_PascalCaseKeyword.cljs$core$IFn$_invoke$arity$variadic = (function (s__21175__auto__,rest__21176__auto__){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.capitalize,clojure.string.capitalize,"",cljs.core.name(s__21175__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21176__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_PascalCaseKeyword.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_PascalCaseKeyword.cljs$lang$applyTo = (function (seq21262){
var G__21263 = cljs.core.first(seq21262);
var seq21262__$1 = cljs.core.next(seq21262);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21263,seq21262__$1);
}));

camel_snake_kebab.core.__GT_Camel_Snake_Case = (function camel_snake_kebab$core$__GT_Camel_Snake_Case(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21748 = arguments.length;
var i__5770__auto___21749 = (0);
while(true){
if((i__5770__auto___21749 < len__5769__auto___21748)){
args__5775__auto__.push((arguments[i__5770__auto___21749]));

var G__21750 = (i__5770__auto___21749 + (1));
i__5770__auto___21749 = G__21750;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_Camel_Snake_Case.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_Camel_Snake_Case.cljs$core$IFn$_invoke$arity$variadic = (function (s__21168__auto__,rest__21169__auto__){
var convert_case__21170__auto__ = (function (p1__21167__21171__auto__){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.capitalize,clojure.string.capitalize,"_",p1__21167__21171__auto__,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21169__auto__], 0));
});
return camel_snake_kebab.internals.alter_name.alter_name(s__21168__auto__,convert_case__21170__auto__);
}));

(camel_snake_kebab.core.__GT_Camel_Snake_Case.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_Camel_Snake_Case.cljs$lang$applyTo = (function (seq21270){
var G__21271 = cljs.core.first(seq21270);
var seq21270__$1 = cljs.core.next(seq21270);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21271,seq21270__$1);
}));


camel_snake_kebab.core.__GT_Camel_Snake_Case_String = (function camel_snake_kebab$core$__GT_Camel_Snake_Case_String(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21751 = arguments.length;
var i__5770__auto___21752 = (0);
while(true){
if((i__5770__auto___21752 < len__5769__auto___21751)){
args__5775__auto__.push((arguments[i__5770__auto___21752]));

var G__21753 = (i__5770__auto___21752 + (1));
i__5770__auto___21752 = G__21753;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_Camel_Snake_Case_String.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_Camel_Snake_Case_String.cljs$core$IFn$_invoke$arity$variadic = (function (s__21175__auto__,rest__21176__auto__){
return cljs.core.identity(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.capitalize,clojure.string.capitalize,"_",cljs.core.name(s__21175__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21176__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_Camel_Snake_Case_String.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_Camel_Snake_Case_String.cljs$lang$applyTo = (function (seq21278){
var G__21279 = cljs.core.first(seq21278);
var seq21278__$1 = cljs.core.next(seq21278);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21279,seq21278__$1);
}));


camel_snake_kebab.core.__GT_Camel_Snake_Case_Symbol = (function camel_snake_kebab$core$__GT_Camel_Snake_Case_Symbol(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21754 = arguments.length;
var i__5770__auto___21755 = (0);
while(true){
if((i__5770__auto___21755 < len__5769__auto___21754)){
args__5775__auto__.push((arguments[i__5770__auto___21755]));

var G__21756 = (i__5770__auto___21755 + (1));
i__5770__auto___21755 = G__21756;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_Camel_Snake_Case_Symbol.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_Camel_Snake_Case_Symbol.cljs$core$IFn$_invoke$arity$variadic = (function (s__21175__auto__,rest__21176__auto__){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.capitalize,clojure.string.capitalize,"_",cljs.core.name(s__21175__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21176__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_Camel_Snake_Case_Symbol.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_Camel_Snake_Case_Symbol.cljs$lang$applyTo = (function (seq21280){
var G__21281 = cljs.core.first(seq21280);
var seq21280__$1 = cljs.core.next(seq21280);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21281,seq21280__$1);
}));


camel_snake_kebab.core.__GT_Camel_Snake_Case_Keyword = (function camel_snake_kebab$core$__GT_Camel_Snake_Case_Keyword(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21758 = arguments.length;
var i__5770__auto___21759 = (0);
while(true){
if((i__5770__auto___21759 < len__5769__auto___21758)){
args__5775__auto__.push((arguments[i__5770__auto___21759]));

var G__21760 = (i__5770__auto___21759 + (1));
i__5770__auto___21759 = G__21760;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_Camel_Snake_Case_Keyword.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_Camel_Snake_Case_Keyword.cljs$core$IFn$_invoke$arity$variadic = (function (s__21175__auto__,rest__21176__auto__){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.capitalize,clojure.string.capitalize,"_",cljs.core.name(s__21175__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21176__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_Camel_Snake_Case_Keyword.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_Camel_Snake_Case_Keyword.cljs$lang$applyTo = (function (seq21286){
var G__21287 = cljs.core.first(seq21286);
var seq21286__$1 = cljs.core.next(seq21286);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21287,seq21286__$1);
}));

camel_snake_kebab.core.__GT_camelCase = (function camel_snake_kebab$core$__GT_camelCase(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21765 = arguments.length;
var i__5770__auto___21766 = (0);
while(true){
if((i__5770__auto___21766 < len__5769__auto___21765)){
args__5775__auto__.push((arguments[i__5770__auto___21766]));

var G__21767 = (i__5770__auto___21766 + (1));
i__5770__auto___21766 = G__21767;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_camelCase.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_camelCase.cljs$core$IFn$_invoke$arity$variadic = (function (s__21168__auto__,rest__21169__auto__){
var convert_case__21170__auto__ = (function (p1__21167__21171__auto__){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.capitalize,"",p1__21167__21171__auto__,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21169__auto__], 0));
});
return camel_snake_kebab.internals.alter_name.alter_name(s__21168__auto__,convert_case__21170__auto__);
}));

(camel_snake_kebab.core.__GT_camelCase.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_camelCase.cljs$lang$applyTo = (function (seq21288){
var G__21289 = cljs.core.first(seq21288);
var seq21288__$1 = cljs.core.next(seq21288);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21289,seq21288__$1);
}));


camel_snake_kebab.core.__GT_camelCaseString = (function camel_snake_kebab$core$__GT_camelCaseString(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21768 = arguments.length;
var i__5770__auto___21769 = (0);
while(true){
if((i__5770__auto___21769 < len__5769__auto___21768)){
args__5775__auto__.push((arguments[i__5770__auto___21769]));

var G__21770 = (i__5770__auto___21769 + (1));
i__5770__auto___21769 = G__21770;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_camelCaseString.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_camelCaseString.cljs$core$IFn$_invoke$arity$variadic = (function (s__21175__auto__,rest__21176__auto__){
return cljs.core.identity(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.capitalize,"",cljs.core.name(s__21175__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21176__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_camelCaseString.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_camelCaseString.cljs$lang$applyTo = (function (seq21294){
var G__21295 = cljs.core.first(seq21294);
var seq21294__$1 = cljs.core.next(seq21294);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21295,seq21294__$1);
}));


camel_snake_kebab.core.__GT_camelCaseSymbol = (function camel_snake_kebab$core$__GT_camelCaseSymbol(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21772 = arguments.length;
var i__5770__auto___21773 = (0);
while(true){
if((i__5770__auto___21773 < len__5769__auto___21772)){
args__5775__auto__.push((arguments[i__5770__auto___21773]));

var G__21774 = (i__5770__auto___21773 + (1));
i__5770__auto___21773 = G__21774;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_camelCaseSymbol.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_camelCaseSymbol.cljs$core$IFn$_invoke$arity$variadic = (function (s__21175__auto__,rest__21176__auto__){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.capitalize,"",cljs.core.name(s__21175__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21176__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_camelCaseSymbol.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_camelCaseSymbol.cljs$lang$applyTo = (function (seq21310){
var G__21311 = cljs.core.first(seq21310);
var seq21310__$1 = cljs.core.next(seq21310);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21311,seq21310__$1);
}));


camel_snake_kebab.core.__GT_camelCaseKeyword = (function camel_snake_kebab$core$__GT_camelCaseKeyword(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21776 = arguments.length;
var i__5770__auto___21777 = (0);
while(true){
if((i__5770__auto___21777 < len__5769__auto___21776)){
args__5775__auto__.push((arguments[i__5770__auto___21777]));

var G__21778 = (i__5770__auto___21777 + (1));
i__5770__auto___21777 = G__21778;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_camelCaseKeyword.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_camelCaseKeyword.cljs$core$IFn$_invoke$arity$variadic = (function (s__21175__auto__,rest__21176__auto__){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.capitalize,"",cljs.core.name(s__21175__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21176__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_camelCaseKeyword.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_camelCaseKeyword.cljs$lang$applyTo = (function (seq21330){
var G__21332 = cljs.core.first(seq21330);
var seq21330__$1 = cljs.core.next(seq21330);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21332,seq21330__$1);
}));

camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE = (function camel_snake_kebab$core$__GT_SCREAMING_SNAKE_CASE(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21779 = arguments.length;
var i__5770__auto___21780 = (0);
while(true){
if((i__5770__auto___21780 < len__5769__auto___21779)){
args__5775__auto__.push((arguments[i__5770__auto___21780]));

var G__21781 = (i__5770__auto___21780 + (1));
i__5770__auto___21780 = G__21781;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE.cljs$core$IFn$_invoke$arity$variadic = (function (s__21168__auto__,rest__21169__auto__){
var convert_case__21170__auto__ = (function (p1__21167__21171__auto__){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.upper_case,clojure.string.upper_case,"_",p1__21167__21171__auto__,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21169__auto__], 0));
});
return camel_snake_kebab.internals.alter_name.alter_name(s__21168__auto__,convert_case__21170__auto__);
}));

(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE.cljs$lang$applyTo = (function (seq21370){
var G__21371 = cljs.core.first(seq21370);
var seq21370__$1 = cljs.core.next(seq21370);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21371,seq21370__$1);
}));


camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_STRING = (function camel_snake_kebab$core$__GT_SCREAMING_SNAKE_CASE_STRING(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21784 = arguments.length;
var i__5770__auto___21785 = (0);
while(true){
if((i__5770__auto___21785 < len__5769__auto___21784)){
args__5775__auto__.push((arguments[i__5770__auto___21785]));

var G__21786 = (i__5770__auto___21785 + (1));
i__5770__auto___21785 = G__21786;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_STRING.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_STRING.cljs$core$IFn$_invoke$arity$variadic = (function (s__21175__auto__,rest__21176__auto__){
return cljs.core.identity(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.upper_case,clojure.string.upper_case,"_",cljs.core.name(s__21175__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21176__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_STRING.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_STRING.cljs$lang$applyTo = (function (seq21394){
var G__21399 = cljs.core.first(seq21394);
var seq21394__$1 = cljs.core.next(seq21394);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21399,seq21394__$1);
}));


camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_SYMBOL = (function camel_snake_kebab$core$__GT_SCREAMING_SNAKE_CASE_SYMBOL(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21788 = arguments.length;
var i__5770__auto___21789 = (0);
while(true){
if((i__5770__auto___21789 < len__5769__auto___21788)){
args__5775__auto__.push((arguments[i__5770__auto___21789]));

var G__21790 = (i__5770__auto___21789 + (1));
i__5770__auto___21789 = G__21790;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_SYMBOL.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_SYMBOL.cljs$core$IFn$_invoke$arity$variadic = (function (s__21175__auto__,rest__21176__auto__){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.upper_case,clojure.string.upper_case,"_",cljs.core.name(s__21175__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21176__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_SYMBOL.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_SYMBOL.cljs$lang$applyTo = (function (seq21442){
var G__21443 = cljs.core.first(seq21442);
var seq21442__$1 = cljs.core.next(seq21442);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21443,seq21442__$1);
}));


camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_KEYWORD = (function camel_snake_kebab$core$__GT_SCREAMING_SNAKE_CASE_KEYWORD(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21792 = arguments.length;
var i__5770__auto___21793 = (0);
while(true){
if((i__5770__auto___21793 < len__5769__auto___21792)){
args__5775__auto__.push((arguments[i__5770__auto___21793]));

var G__21794 = (i__5770__auto___21793 + (1));
i__5770__auto___21793 = G__21794;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_KEYWORD.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_KEYWORD.cljs$core$IFn$_invoke$arity$variadic = (function (s__21175__auto__,rest__21176__auto__){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.upper_case,clojure.string.upper_case,"_",cljs.core.name(s__21175__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21176__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_KEYWORD.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_SCREAMING_SNAKE_CASE_KEYWORD.cljs$lang$applyTo = (function (seq21490){
var G__21491 = cljs.core.first(seq21490);
var seq21490__$1 = cljs.core.next(seq21490);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21491,seq21490__$1);
}));

camel_snake_kebab.core.__GT_snake_case = (function camel_snake_kebab$core$__GT_snake_case(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21795 = arguments.length;
var i__5770__auto___21796 = (0);
while(true){
if((i__5770__auto___21796 < len__5769__auto___21795)){
args__5775__auto__.push((arguments[i__5770__auto___21796]));

var G__21797 = (i__5770__auto___21796 + (1));
i__5770__auto___21796 = G__21797;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_snake_case.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_snake_case.cljs$core$IFn$_invoke$arity$variadic = (function (s__21168__auto__,rest__21169__auto__){
var convert_case__21170__auto__ = (function (p1__21167__21171__auto__){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.lower_case,"_",p1__21167__21171__auto__,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21169__auto__], 0));
});
return camel_snake_kebab.internals.alter_name.alter_name(s__21168__auto__,convert_case__21170__auto__);
}));

(camel_snake_kebab.core.__GT_snake_case.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_snake_case.cljs$lang$applyTo = (function (seq21559){
var G__21560 = cljs.core.first(seq21559);
var seq21559__$1 = cljs.core.next(seq21559);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21560,seq21559__$1);
}));


camel_snake_kebab.core.__GT_snake_case_string = (function camel_snake_kebab$core$__GT_snake_case_string(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21798 = arguments.length;
var i__5770__auto___21799 = (0);
while(true){
if((i__5770__auto___21799 < len__5769__auto___21798)){
args__5775__auto__.push((arguments[i__5770__auto___21799]));

var G__21800 = (i__5770__auto___21799 + (1));
i__5770__auto___21799 = G__21800;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_snake_case_string.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_snake_case_string.cljs$core$IFn$_invoke$arity$variadic = (function (s__21175__auto__,rest__21176__auto__){
return cljs.core.identity(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.lower_case,"_",cljs.core.name(s__21175__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21176__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_snake_case_string.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_snake_case_string.cljs$lang$applyTo = (function (seq21600){
var G__21601 = cljs.core.first(seq21600);
var seq21600__$1 = cljs.core.next(seq21600);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21601,seq21600__$1);
}));


camel_snake_kebab.core.__GT_snake_case_symbol = (function camel_snake_kebab$core$__GT_snake_case_symbol(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21801 = arguments.length;
var i__5770__auto___21802 = (0);
while(true){
if((i__5770__auto___21802 < len__5769__auto___21801)){
args__5775__auto__.push((arguments[i__5770__auto___21802]));

var G__21803 = (i__5770__auto___21802 + (1));
i__5770__auto___21802 = G__21803;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_snake_case_symbol.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_snake_case_symbol.cljs$core$IFn$_invoke$arity$variadic = (function (s__21175__auto__,rest__21176__auto__){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.lower_case,"_",cljs.core.name(s__21175__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21176__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_snake_case_symbol.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_snake_case_symbol.cljs$lang$applyTo = (function (seq21628){
var G__21629 = cljs.core.first(seq21628);
var seq21628__$1 = cljs.core.next(seq21628);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21629,seq21628__$1);
}));


camel_snake_kebab.core.__GT_snake_case_keyword = (function camel_snake_kebab$core$__GT_snake_case_keyword(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21805 = arguments.length;
var i__5770__auto___21806 = (0);
while(true){
if((i__5770__auto___21806 < len__5769__auto___21805)){
args__5775__auto__.push((arguments[i__5770__auto___21806]));

var G__21807 = (i__5770__auto___21806 + (1));
i__5770__auto___21806 = G__21807;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_snake_case_keyword.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_snake_case_keyword.cljs$core$IFn$_invoke$arity$variadic = (function (s__21175__auto__,rest__21176__auto__){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.lower_case,"_",cljs.core.name(s__21175__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21176__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_snake_case_keyword.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_snake_case_keyword.cljs$lang$applyTo = (function (seq21632){
var G__21633 = cljs.core.first(seq21632);
var seq21632__$1 = cljs.core.next(seq21632);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21633,seq21632__$1);
}));

camel_snake_kebab.core.__GT_kebab_case = (function camel_snake_kebab$core$__GT_kebab_case(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21808 = arguments.length;
var i__5770__auto___21809 = (0);
while(true){
if((i__5770__auto___21809 < len__5769__auto___21808)){
args__5775__auto__.push((arguments[i__5770__auto___21809]));

var G__21810 = (i__5770__auto___21809 + (1));
i__5770__auto___21809 = G__21810;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_kebab_case.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_kebab_case.cljs$core$IFn$_invoke$arity$variadic = (function (s__21168__auto__,rest__21169__auto__){
var convert_case__21170__auto__ = (function (p1__21167__21171__auto__){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.lower_case,"-",p1__21167__21171__auto__,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21169__auto__], 0));
});
return camel_snake_kebab.internals.alter_name.alter_name(s__21168__auto__,convert_case__21170__auto__);
}));

(camel_snake_kebab.core.__GT_kebab_case.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_kebab_case.cljs$lang$applyTo = (function (seq21668){
var G__21669 = cljs.core.first(seq21668);
var seq21668__$1 = cljs.core.next(seq21668);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21669,seq21668__$1);
}));


camel_snake_kebab.core.__GT_kebab_case_string = (function camel_snake_kebab$core$__GT_kebab_case_string(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21811 = arguments.length;
var i__5770__auto___21812 = (0);
while(true){
if((i__5770__auto___21812 < len__5769__auto___21811)){
args__5775__auto__.push((arguments[i__5770__auto___21812]));

var G__21813 = (i__5770__auto___21812 + (1));
i__5770__auto___21812 = G__21813;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_kebab_case_string.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_kebab_case_string.cljs$core$IFn$_invoke$arity$variadic = (function (s__21175__auto__,rest__21176__auto__){
return cljs.core.identity(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.lower_case,"-",cljs.core.name(s__21175__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21176__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_kebab_case_string.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_kebab_case_string.cljs$lang$applyTo = (function (seq21687){
var G__21688 = cljs.core.first(seq21687);
var seq21687__$1 = cljs.core.next(seq21687);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21688,seq21687__$1);
}));


camel_snake_kebab.core.__GT_kebab_case_symbol = (function camel_snake_kebab$core$__GT_kebab_case_symbol(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21815 = arguments.length;
var i__5770__auto___21816 = (0);
while(true){
if((i__5770__auto___21816 < len__5769__auto___21815)){
args__5775__auto__.push((arguments[i__5770__auto___21816]));

var G__21817 = (i__5770__auto___21816 + (1));
i__5770__auto___21816 = G__21817;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_kebab_case_symbol.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_kebab_case_symbol.cljs$core$IFn$_invoke$arity$variadic = (function (s__21175__auto__,rest__21176__auto__){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.lower_case,"-",cljs.core.name(s__21175__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21176__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_kebab_case_symbol.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_kebab_case_symbol.cljs$lang$applyTo = (function (seq21696){
var G__21697 = cljs.core.first(seq21696);
var seq21696__$1 = cljs.core.next(seq21696);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21697,seq21696__$1);
}));


camel_snake_kebab.core.__GT_kebab_case_keyword = (function camel_snake_kebab$core$__GT_kebab_case_keyword(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21818 = arguments.length;
var i__5770__auto___21819 = (0);
while(true){
if((i__5770__auto___21819 < len__5769__auto___21818)){
args__5775__auto__.push((arguments[i__5770__auto___21819]));

var G__21821 = (i__5770__auto___21819 + (1));
i__5770__auto___21819 = G__21821;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_kebab_case_keyword.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_kebab_case_keyword.cljs$core$IFn$_invoke$arity$variadic = (function (s__21175__auto__,rest__21176__auto__){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,clojure.string.lower_case,clojure.string.lower_case,"-",cljs.core.name(s__21175__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21176__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_kebab_case_keyword.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_kebab_case_keyword.cljs$lang$applyTo = (function (seq21702){
var G__21703 = cljs.core.first(seq21702);
var seq21702__$1 = cljs.core.next(seq21702);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21703,seq21702__$1);
}));

camel_snake_kebab.core.__GT_HTTP_Header_Case = (function camel_snake_kebab$core$__GT_HTTP_Header_Case(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21822 = arguments.length;
var i__5770__auto___21823 = (0);
while(true){
if((i__5770__auto___21823 < len__5769__auto___21822)){
args__5775__auto__.push((arguments[i__5770__auto___21823]));

var G__21824 = (i__5770__auto___21823 + (1));
i__5770__auto___21823 = G__21824;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_HTTP_Header_Case.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_HTTP_Header_Case.cljs$core$IFn$_invoke$arity$variadic = (function (s__21168__auto__,rest__21169__auto__){
var convert_case__21170__auto__ = (function (p1__21167__21171__auto__){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,camel_snake_kebab.internals.misc.capitalize_http_header,camel_snake_kebab.internals.misc.capitalize_http_header,"-",p1__21167__21171__auto__,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21169__auto__], 0));
});
return camel_snake_kebab.internals.alter_name.alter_name(s__21168__auto__,convert_case__21170__auto__);
}));

(camel_snake_kebab.core.__GT_HTTP_Header_Case.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_HTTP_Header_Case.cljs$lang$applyTo = (function (seq21708){
var G__21709 = cljs.core.first(seq21708);
var seq21708__$1 = cljs.core.next(seq21708);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21709,seq21708__$1);
}));


camel_snake_kebab.core.__GT_HTTP_Header_Case_String = (function camel_snake_kebab$core$__GT_HTTP_Header_Case_String(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21827 = arguments.length;
var i__5770__auto___21828 = (0);
while(true){
if((i__5770__auto___21828 < len__5769__auto___21827)){
args__5775__auto__.push((arguments[i__5770__auto___21828]));

var G__21829 = (i__5770__auto___21828 + (1));
i__5770__auto___21828 = G__21829;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_HTTP_Header_Case_String.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_HTTP_Header_Case_String.cljs$core$IFn$_invoke$arity$variadic = (function (s__21175__auto__,rest__21176__auto__){
return cljs.core.identity(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,camel_snake_kebab.internals.misc.capitalize_http_header,camel_snake_kebab.internals.misc.capitalize_http_header,"-",cljs.core.name(s__21175__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21176__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_HTTP_Header_Case_String.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_HTTP_Header_Case_String.cljs$lang$applyTo = (function (seq21711){
var G__21712 = cljs.core.first(seq21711);
var seq21711__$1 = cljs.core.next(seq21711);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21712,seq21711__$1);
}));


camel_snake_kebab.core.__GT_HTTP_Header_Case_Symbol = (function camel_snake_kebab$core$__GT_HTTP_Header_Case_Symbol(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21830 = arguments.length;
var i__5770__auto___21831 = (0);
while(true){
if((i__5770__auto___21831 < len__5769__auto___21830)){
args__5775__auto__.push((arguments[i__5770__auto___21831]));

var G__21832 = (i__5770__auto___21831 + (1));
i__5770__auto___21831 = G__21832;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_HTTP_Header_Case_Symbol.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_HTTP_Header_Case_Symbol.cljs$core$IFn$_invoke$arity$variadic = (function (s__21175__auto__,rest__21176__auto__){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,camel_snake_kebab.internals.misc.capitalize_http_header,camel_snake_kebab.internals.misc.capitalize_http_header,"-",cljs.core.name(s__21175__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21176__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_HTTP_Header_Case_Symbol.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_HTTP_Header_Case_Symbol.cljs$lang$applyTo = (function (seq21716){
var G__21717 = cljs.core.first(seq21716);
var seq21716__$1 = cljs.core.next(seq21716);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21717,seq21716__$1);
}));


camel_snake_kebab.core.__GT_HTTP_Header_Case_Keyword = (function camel_snake_kebab$core$__GT_HTTP_Header_Case_Keyword(var_args){
var args__5775__auto__ = [];
var len__5769__auto___21833 = arguments.length;
var i__5770__auto___21834 = (0);
while(true){
if((i__5770__auto___21834 < len__5769__auto___21833)){
args__5775__auto__.push((arguments[i__5770__auto___21834]));

var G__21835 = (i__5770__auto___21834 + (1));
i__5770__auto___21834 = G__21835;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return camel_snake_kebab.core.__GT_HTTP_Header_Case_Keyword.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(camel_snake_kebab.core.__GT_HTTP_Header_Case_Keyword.cljs$core$IFn$_invoke$arity$variadic = (function (s__21175__auto__,rest__21176__auto__){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(camel_snake_kebab.internals.misc.convert_case,camel_snake_kebab.internals.misc.capitalize_http_header,camel_snake_kebab.internals.misc.capitalize_http_header,"-",cljs.core.name(s__21175__auto__),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rest__21176__auto__], 0)));
}));

(camel_snake_kebab.core.__GT_HTTP_Header_Case_Keyword.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(camel_snake_kebab.core.__GT_HTTP_Header_Case_Keyword.cljs$lang$applyTo = (function (seq21728){
var G__21729 = cljs.core.first(seq21728);
var seq21728__$1 = cljs.core.next(seq21728);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21729,seq21728__$1);
}));


//# sourceMappingURL=camel_snake_kebab.core.js.map
