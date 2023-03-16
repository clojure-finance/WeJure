goog.provide('district.format');
district.format._STAR_default_datetime_formatter_STAR_ = new cljs.core.Keyword(null,"rfc822","rfc822",-404628697);
district.format._STAR_default_local_datetime_formatter_STAR_ = district.format._STAR_default_datetime_formatter_STAR_;
district.format._STAR_default_date_formatter_STAR_ = "EEE, dd MMM yyyy";
district.format._STAR_default_local_date_formatter_STAR_ = district.format._STAR_default_date_formatter_STAR_;
district.format._STAR_default_locale_STAR_ = "en-US";
district.format._STAR_default_max_number_fraction_digits_STAR_ = (2);
district.format._STAR_default_max_currency_fraction_digits_STAR_ = (2);
district.format._STAR_default_min_currency_fraction_digits_STAR_ = null;
district.format._STAR_default_max_token_fraction_digits_STAR_ = (2);
district.format._STAR_default_min_token_fraction_digits_STAR_ = null;
district.format.get_formatter = (function district$format$get_formatter(fmt){
if((fmt instanceof cljs.core.Keyword)){
return (cljs_time.format.formatters.cljs$core$IFn$_invoke$arity$1 ? cljs_time.format.formatters.cljs$core$IFn$_invoke$arity$1(fmt) : cljs_time.format.formatters.call(null,fmt));
} else {
return cljs_time.format.formatter.cljs$core$IFn$_invoke$arity$1(fmt);
}
});
district.format.format_datetime = (function district$format$format_datetime(var_args){
var G__12822 = arguments.length;
switch (G__12822) {
case 1:
return district.format.format_datetime.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return district.format.format_datetime.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(district.format.format_datetime.cljs$core$IFn$_invoke$arity$1 = (function (date){
return district.format.format_datetime.cljs$core$IFn$_invoke$arity$2(date,district.format._STAR_default_datetime_formatter_STAR_);
}));

(district.format.format_datetime.cljs$core$IFn$_invoke$arity$2 = (function (date,formatter){
if(cljs.core.truth_(date)){
return cljs_time.format.unparse(district.format.get_formatter(formatter),date);
} else {
return null;
}
}));

(district.format.format_datetime.cljs$lang$maxFixedArity = 2);

district.format.format_local_datetime = (function district$format$format_local_datetime(var_args){
var G__12830 = arguments.length;
switch (G__12830) {
case 1:
return district.format.format_local_datetime.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return district.format.format_local_datetime.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(district.format.format_local_datetime.cljs$core$IFn$_invoke$arity$1 = (function (date){
return district.format.format_local_datetime.cljs$core$IFn$_invoke$arity$2(date,district.format._STAR_default_local_datetime_formatter_STAR_);
}));

(district.format.format_local_datetime.cljs$core$IFn$_invoke$arity$2 = (function (date,formatter){
if(cljs.core.truth_(date)){
return cljs_time.format.unparse_local(district.format.get_formatter(formatter),date);
} else {
return null;
}
}));

(district.format.format_local_datetime.cljs$lang$maxFixedArity = 2);

district.format.format_date = (function district$format$format_date(var_args){
var G__12836 = arguments.length;
switch (G__12836) {
case 1:
return district.format.format_date.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return district.format.format_date.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(district.format.format_date.cljs$core$IFn$_invoke$arity$1 = (function (date){
return district.format.format_date.cljs$core$IFn$_invoke$arity$2(date,district.format._STAR_default_date_formatter_STAR_);
}));

(district.format.format_date.cljs$core$IFn$_invoke$arity$2 = (function (date,formatter){
if(cljs.core.truth_(date)){
return cljs_time.format.unparse(district.format.get_formatter(formatter),date);
} else {
return null;
}
}));

(district.format.format_date.cljs$lang$maxFixedArity = 2);

district.format.format_local_date = (function district$format$format_local_date(var_args){
var G__12840 = arguments.length;
switch (G__12840) {
case 1:
return district.format.format_local_date.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return district.format.format_local_date.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(district.format.format_local_date.cljs$core$IFn$_invoke$arity$1 = (function (date){
return district.format.format_local_date.cljs$core$IFn$_invoke$arity$2(date,district.format._STAR_default_local_date_formatter_STAR_);
}));

(district.format.format_local_date.cljs$core$IFn$_invoke$arity$2 = (function (date,formatter){
if(cljs.core.truth_(date)){
return cljs_time.format.unparse_local(district.format.get_formatter(formatter),date);
} else {
return null;
}
}));

(district.format.format_local_date.cljs$lang$maxFixedArity = 2);

district.format.format_number = (function district$format$format_number(var_args){
var args__5775__auto__ = [];
var len__5769__auto___12968 = arguments.length;
var i__5770__auto___12969 = (0);
while(true){
if((i__5770__auto___12969 < len__5769__auto___12968)){
args__5775__auto__.push((arguments[i__5770__auto___12969]));

var G__12970 = (i__5770__auto___12969 + (1));
i__5770__auto___12969 = G__12970;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return district.format.format_number.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(district.format.format_number.cljs$core$IFn$_invoke$arity$variadic = (function (x,p__12849){
var vec__12850 = p__12849;
var map__12853 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12850,(0),null);
var map__12853__$1 = cljs.core.__destructure_map(map__12853);
var locale = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__12853__$1,new cljs.core.Keyword(null,"locale","locale",-2115712697),district.format._STAR_default_locale_STAR_);
var max_fraction_digits = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__12853__$1,new cljs.core.Keyword(null,"max-fraction-digits","max-fraction-digits",-185733995),district.format._STAR_default_max_number_fraction_digits_STAR_);
var min_fraction_digits = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12853__$1,new cljs.core.Keyword(null,"min-fraction-digits","min-fraction-digits",-1394316717));
if(cljs.core.truth_(x)){
return x.toLocaleString(locale,({"maximumFractionDigits": max_fraction_digits, "minimumFractionDigits": min_fraction_digits}));
} else {
return null;
}
}));

(district.format.format_number.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(district.format.format_number.cljs$lang$applyTo = (function (seq12845){
var G__12846 = cljs.core.first(seq12845);
var seq12845__$1 = cljs.core.next(seq12845);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__12846,seq12845__$1);
}));

district.format.format_currency = (function district$format$format_currency(var_args){
var args__5775__auto__ = [];
var len__5769__auto___12971 = arguments.length;
var i__5770__auto___12972 = (0);
while(true){
if((i__5770__auto___12972 < len__5769__auto___12971)){
args__5775__auto__.push((arguments[i__5770__auto___12972]));

var G__12973 = (i__5770__auto___12972 + (1));
i__5770__auto___12972 = G__12973;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return district.format.format_currency.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(district.format.format_currency.cljs$core$IFn$_invoke$arity$variadic = (function (x,p__12862){
var vec__12863 = p__12862;
var map__12866 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12863,(0),null);
var map__12866__$1 = cljs.core.__destructure_map(map__12866);
var currency = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12866__$1,new cljs.core.Keyword(null,"currency","currency",-898327568));
var locale = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__12866__$1,new cljs.core.Keyword(null,"locale","locale",-2115712697),district.format._STAR_default_locale_STAR_);
var max_fraction_digits = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__12866__$1,new cljs.core.Keyword(null,"max-fraction-digits","max-fraction-digits",-185733995),district.format._STAR_default_max_currency_fraction_digits_STAR_);
var min_fraction_digits = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__12866__$1,new cljs.core.Keyword(null,"min-fraction-digits","min-fraction-digits",-1394316717),district.format._STAR_default_min_currency_fraction_digits_STAR_);
if(cljs.core.truth_(x)){
return x.toLocaleString(locale,({"maximumFractionDigits": max_fraction_digits, "minimumFractionDigits": min_fraction_digits, "style": "currency", "currency": currency}));
} else {
return null;
}
}));

(district.format.format_currency.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(district.format.format_currency.cljs$lang$applyTo = (function (seq12857){
var G__12859 = cljs.core.first(seq12857);
var seq12857__$1 = cljs.core.next(seq12857);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__12859,seq12857__$1);
}));

district.format.format_token = (function district$format$format_token(var_args){
var args__5775__auto__ = [];
var len__5769__auto___12976 = arguments.length;
var i__5770__auto___12977 = (0);
while(true){
if((i__5770__auto___12977 < len__5769__auto___12976)){
args__5775__auto__.push((arguments[i__5770__auto___12977]));

var G__12978 = (i__5770__auto___12977 + (1));
i__5770__auto___12977 = G__12978;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return district.format.format_token.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(district.format.format_token.cljs$core$IFn$_invoke$arity$variadic = (function (x,p__12874){
var vec__12879 = p__12874;
var map__12882 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12879,(0),null);
var map__12882__$1 = cljs.core.__destructure_map(map__12882);
var token = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12882__$1,new cljs.core.Keyword(null,"token","token",-1211463215));
var locale = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__12882__$1,new cljs.core.Keyword(null,"locale","locale",-2115712697),district.format._STAR_default_locale_STAR_);
var max_fraction_digits = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__12882__$1,new cljs.core.Keyword(null,"max-fraction-digits","max-fraction-digits",-185733995),district.format._STAR_default_max_token_fraction_digits_STAR_);
var min_fraction_digits = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__12882__$1,new cljs.core.Keyword(null,"min-fraction-digits","min-fraction-digits",-1394316717),district.format._STAR_default_min_token_fraction_digits_STAR_);
if(cljs.core.truth_(x)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(x.toLocaleString(locale,({"maximumFractionDigits": max_fraction_digits, "minimumFractionDigits": min_fraction_digits}))),(cljs.core.truth_(token)?[" ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(token)].join(''):null)].join('');
} else {
return null;
}
}));

(district.format.format_token.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(district.format.format_token.cljs$lang$applyTo = (function (seq12870){
var G__12871 = cljs.core.first(seq12870);
var seq12870__$1 = cljs.core.next(seq12870);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__12871,seq12870__$1);
}));

district.format.format_eth = (function district$format$format_eth(var_args){
var args__5775__auto__ = [];
var len__5769__auto___12982 = arguments.length;
var i__5770__auto___12983 = (0);
while(true){
if((i__5770__auto___12983 < len__5769__auto___12982)){
args__5775__auto__.push((arguments[i__5770__auto___12983]));

var G__12984 = (i__5770__auto___12983 + (1));
i__5770__auto___12983 = G__12984;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return district.format.format_eth.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(district.format.format_eth.cljs$core$IFn$_invoke$arity$variadic = (function (x,p__12896){
var vec__12897 = p__12896;
var opts = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12897,(0),null);
return district.format.format_token.cljs$core$IFn$_invoke$arity$variadic(x,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"token","token",-1211463215),"ETH"], null),opts], 0))], 0));
}));

(district.format.format_eth.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(district.format.format_eth.cljs$lang$applyTo = (function (seq12893){
var G__12894 = cljs.core.first(seq12893);
var seq12893__$1 = cljs.core.next(seq12893);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__12894,seq12893__$1);
}));

district.format.format_dnt = (function district$format$format_dnt(var_args){
var args__5775__auto__ = [];
var len__5769__auto___12986 = arguments.length;
var i__5770__auto___12987 = (0);
while(true){
if((i__5770__auto___12987 < len__5769__auto___12986)){
args__5775__auto__.push((arguments[i__5770__auto___12987]));

var G__12988 = (i__5770__auto___12987 + (1));
i__5770__auto___12987 = G__12988;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return district.format.format_dnt.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(district.format.format_dnt.cljs$core$IFn$_invoke$arity$variadic = (function (x,p__12904){
var vec__12905 = p__12904;
var opts = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12905,(0),null);
return district.format.format_token.cljs$core$IFn$_invoke$arity$variadic(x,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"token","token",-1211463215),"DNT"], null),opts], 0))], 0));
}));

(district.format.format_dnt.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(district.format.format_dnt.cljs$lang$applyTo = (function (seq12901){
var G__12902 = cljs.core.first(seq12901);
var seq12901__$1 = cljs.core.next(seq12901);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__12902,seq12901__$1);
}));

district.format.format_number_metric = (function district$format$format_number_metric(var_args){
var args__5775__auto__ = [];
var len__5769__auto___12989 = arguments.length;
var i__5770__auto___12990 = (0);
while(true){
if((i__5770__auto___12990 < len__5769__auto___12989)){
args__5775__auto__.push((arguments[i__5770__auto___12990]));

var G__12991 = (i__5770__auto___12990 + (1));
i__5770__auto___12990 = G__12991;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return district.format.format_number_metric.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(district.format.format_number_metric.cljs$core$IFn$_invoke$arity$variadic = (function (x,p__12910){
var vec__12911 = p__12910;
var opts = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12911,(0),null);
if(cljs.core.truth_(x)){
if((x < (1000))){
return district.format.format_number.cljs$core$IFn$_invoke$arity$variadic(x,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([opts], 0));
} else {
if(((((999) < x)) && ((x < (1000000))))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(district.format.format_number.cljs$core$IFn$_invoke$arity$variadic((x / (1000)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([opts], 0))),"K"].join('');
} else {
if(((999999) < x)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(district.format.format_number.cljs$core$IFn$_invoke$arity$variadic((x / (1000000)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([opts], 0))),"M"].join('');
} else {
return null;
}
}
}
} else {
return null;
}
}));

(district.format.format_number_metric.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(district.format.format_number_metric.cljs$lang$applyTo = (function (seq12908){
var G__12909 = cljs.core.first(seq12908);
var seq12908__$1 = cljs.core.next(seq12908);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__12909,seq12908__$1);
}));

district.format.etherscan_addr_url = (function district$format$etherscan_addr_url(var_args){
var G__12915 = arguments.length;
switch (G__12915) {
case 1:
return district.format.etherscan_addr_url.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return district.format.etherscan_addr_url.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(district.format.etherscan_addr_url.cljs$core$IFn$_invoke$arity$1 = (function (address){
return ["https://etherscan.io/address/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(address)].join('');
}));

(district.format.etherscan_addr_url.cljs$core$IFn$_invoke$arity$2 = (function (root_url,address){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((district.format.ensure_trailing_slash.cljs$core$IFn$_invoke$arity$1 ? district.format.ensure_trailing_slash.cljs$core$IFn$_invoke$arity$1(root_url) : district.format.ensure_trailing_slash.call(null,root_url))),"address/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(address)].join('');
}));

(district.format.etherscan_addr_url.cljs$lang$maxFixedArity = 2);

district.format.etherscan_tx_url = (function district$format$etherscan_tx_url(var_args){
var G__12920 = arguments.length;
switch (G__12920) {
case 1:
return district.format.etherscan_tx_url.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return district.format.etherscan_tx_url.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(district.format.etherscan_tx_url.cljs$core$IFn$_invoke$arity$1 = (function (tx_hash){
return ["https://etherscan.io/tx/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(tx_hash)].join('');
}));

(district.format.etherscan_tx_url.cljs$core$IFn$_invoke$arity$2 = (function (root_url,tx_hash){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((district.format.ensure_trailing_slash.cljs$core$IFn$_invoke$arity$1 ? district.format.ensure_trailing_slash.cljs$core$IFn$_invoke$arity$1(root_url) : district.format.ensure_trailing_slash.call(null,root_url))),"tx/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(tx_hash)].join('');
}));

(district.format.etherscan_tx_url.cljs$lang$maxFixedArity = 2);

district.format.time_ago = (function district$format$time_ago(var_args){
var G__12925 = arguments.length;
switch (G__12925) {
case 1:
return district.format.time_ago.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return district.format.time_ago.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(district.format.time_ago.cljs$core$IFn$_invoke$arity$1 = (function (from_time){
return district.format.time_ago.cljs$core$IFn$_invoke$arity$2(from_time,cljs_time.core.now());
}));

(district.format.time_ago.cljs$core$IFn$_invoke$arity$2 = (function (from_time,to_time){
if(cljs.core.truth_(to_time)){
var units = new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),"second",new cljs.core.Keyword(null,"limit","limit",-1355822363),(60),new cljs.core.Keyword(null,"in-second","in-second",-1351007453),(1)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),"minute",new cljs.core.Keyword(null,"limit","limit",-1355822363),(3600),new cljs.core.Keyword(null,"in-second","in-second",-1351007453),(60)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),"hour",new cljs.core.Keyword(null,"limit","limit",-1355822363),(86400),new cljs.core.Keyword(null,"in-second","in-second",-1351007453),(3600)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),"day",new cljs.core.Keyword(null,"limit","limit",-1355822363),(604800),new cljs.core.Keyword(null,"in-second","in-second",-1351007453),(86400)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),"week",new cljs.core.Keyword(null,"limit","limit",-1355822363),(2629743),new cljs.core.Keyword(null,"in-second","in-second",-1351007453),(604800)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),"month",new cljs.core.Keyword(null,"limit","limit",-1355822363),(31556926),new cljs.core.Keyword(null,"in-second","in-second",-1351007453),(2629743)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),"year",new cljs.core.Keyword(null,"limit","limit",-1355822363),null,new cljs.core.Keyword(null,"in-second","in-second",-1351007453),(31556926)], null)], null);
var diff = cljs_time.core.in_seconds(cljs_time.core.interval(from_time,to_time));
if((diff < (5))){
return "just now";
} else {
var unit = cljs.core.first(cljs.core.drop_while.cljs$core$IFn$_invoke$arity$2((function (p1__12922_SHARP_){
return (((diff >= new cljs.core.Keyword(null,"limit","limit",-1355822363).cljs$core$IFn$_invoke$arity$1(p1__12922_SHARP_))) || (cljs.core.not(new cljs.core.Keyword(null,"limit","limit",-1355822363).cljs$core$IFn$_invoke$arity$1(p1__12922_SHARP_))));
}),units));
return (function (p1__12923_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__12923_SHARP_)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(unit)),(((p1__12923_SHARP_ > (1)))?"s":null)," ago"].join('');
})((Math.floor((diff / new cljs.core.Keyword(null,"in-second","in-second",-1351007453).cljs$core$IFn$_invoke$arity$1(unit))) | (0)));
}
} else {
return null;
}
}));

(district.format.time_ago.cljs$lang$maxFixedArity = 2);

/**
 * Taken from reagent-utils
 * pluralizes the word based on the number of items
 * (util/pluralize ["John"] "lad")
 * (util/pluralize ["John" "James"] "lad")
 * (util/pluralize ["Alice"] "lad" "y" "ies")
 */
district.format.pluralize = (function district$format$pluralize(var_args){
var args__5775__auto__ = [];
var len__5769__auto___13000 = arguments.length;
var i__5770__auto___13001 = (0);
while(true){
if((i__5770__auto___13001 < len__5769__auto___13000)){
args__5775__auto__.push((arguments[i__5770__auto___13001]));

var G__13002 = (i__5770__auto___13001 + (1));
i__5770__auto___13001 = G__13002;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return district.format.pluralize.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(district.format.pluralize.cljs$core$IFn$_invoke$arity$variadic = (function (n,p__12929){
var vec__12930 = p__12929;
var word = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12930,(0),null);
var ending1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12930,(1),null);
var ending2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12930,(2),null);
var opts = vec__12930;
var plural = (function (){var G__12933 = cljs.core.count(opts);
switch (G__12933) {
case (1):
return "s";

break;
case (2):
return ending1;

break;
case (3):
return ending2;

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__12933)].join('')));

}
})();
var singular = (function (){var G__12934 = cljs.core.count(opts);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"list","list",-1889078086,null),G__12934)){
return "";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),G__12934)){
return "";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),G__12934)){
return "";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((3),G__12934)){
return ending1;
} else {
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__12934)].join('')));

}
}
}
}
})();
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(n)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(word),cljs.core.str.cljs$core$IFn$_invoke$arity$1(((((1) === n))?singular:plural))].join('');
}));

(district.format.pluralize.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(district.format.pluralize.cljs$lang$applyTo = (function (seq12927){
var G__12928 = cljs.core.first(seq12927);
var seq12927__$1 = cljs.core.next(seq12927);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__12928,seq12927__$1);
}));

/**
 * Truncate a string with suffix (ellipsis by default) if it is
 * longer than specified length.
 */
district.format.truncate = (function district$format$truncate(var_args){
var G__12936 = arguments.length;
switch (G__12936) {
case 2:
return district.format.truncate.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return district.format.truncate.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(district.format.truncate.cljs$core$IFn$_invoke$arity$2 = (function (string,length){
return district.format.truncate.cljs$core$IFn$_invoke$arity$3(string,length,"...");
}));

(district.format.truncate.cljs$core$IFn$_invoke$arity$3 = (function (string,length,suffix){
var string_len = cljs.core.count(string);
var suffix_len = cljs.core.count(suffix);
if((string_len <= length)){
return string;
} else {
return [cljs.core.subs.cljs$core$IFn$_invoke$arity$3(string,(0),(length - suffix_len)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(suffix)].join('');
}
}));

(district.format.truncate.cljs$lang$maxFixedArity = 3);

district.format.format_bool = (function district$format$format_bool(x){
if(cljs.core.truth_(x)){
return "true";
} else {
return "false";
}
});
district.format.time_unit__GT_text = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"days","days",-1394072564),"day",new cljs.core.Keyword(null,"hours","hours",58380855),"hour",new cljs.core.Keyword(null,"minutes","minutes",1319166394),"minute",new cljs.core.Keyword(null,"seconds","seconds",-445266194),"second"], null);
district.format.time_unit__GT_text_short = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"days","days",-1394072564),"day",new cljs.core.Keyword(null,"hours","hours",58380855),"hour",new cljs.core.Keyword(null,"minutes","minutes",1319166394),"min.",new cljs.core.Keyword(null,"seconds","seconds",-445266194),"sec."], null);
district.format.format_time_unit = (function district$format$format_time_unit(var_args){
var args__5775__auto__ = [];
var len__5769__auto___13010 = arguments.length;
var i__5770__auto___13011 = (0);
while(true){
if((i__5770__auto___13011 < len__5769__auto___13010)){
args__5775__auto__.push((arguments[i__5770__auto___13011]));

var G__13013 = (i__5770__auto___13011 + (1));
i__5770__auto___13011 = G__13013;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((2) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((2)),(0),null)):null);
return district.format.format_time_unit.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5776__auto__);
});

(district.format.format_time_unit.cljs$core$IFn$_invoke$arity$variadic = (function (unit,amount,p__12940){
var vec__12941 = p__12940;
var map__12944 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12941,(0),null);
var map__12944__$1 = cljs.core.__destructure_map(map__12944);
var short_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12944__$1,new cljs.core.Keyword(null,"short?","short?",-1064270428));
var f = (cljs.core.truth_(short_QMARK_)?district.format.time_unit__GT_text_short:district.format.time_unit__GT_text);
var unit_text = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(unit) : f.call(null,unit));
if(cljs.core.truth_((function (){var and__5043__auto__ = short_QMARK_;
if(cljs.core.truth_(and__5043__auto__)){
return clojure.string.ends_with_QMARK_(unit_text,".");
} else {
return and__5043__auto__;
}
})())){
return district.format.pluralize.cljs$core$IFn$_invoke$arity$variadic(amount,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([unit_text,""], 0));
} else {
return district.format.pluralize.cljs$core$IFn$_invoke$arity$variadic(amount,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([unit_text], 0));
}
}));

(district.format.format_time_unit.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(district.format.format_time_unit.cljs$lang$applyTo = (function (seq12937){
var G__12938 = cljs.core.first(seq12937);
var seq12937__$1 = cljs.core.next(seq12937);
var G__12939 = cljs.core.first(seq12937__$1);
var seq12937__$2 = cljs.core.next(seq12937__$1);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__12938,G__12939,seq12937__$2);
}));

district.format.format_time_units = (function district$format$format_time_units(var_args){
var args__5775__auto__ = [];
var len__5769__auto___13019 = arguments.length;
var i__5770__auto___13020 = (0);
while(true){
if((i__5770__auto___13020 < len__5769__auto___13019)){
args__5775__auto__.push((arguments[i__5770__auto___13020]));

var G__13021 = (i__5770__auto___13020 + (1));
i__5770__auto___13020 = G__13021;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return district.format.format_time_units.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(district.format.format_time_units.cljs$core$IFn$_invoke$arity$variadic = (function (p__12947,p__12948){
var map__12949 = p__12947;
var map__12949__$1 = cljs.core.__destructure_map(map__12949);
var seconds = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12949__$1,new cljs.core.Keyword(null,"seconds","seconds",-445266194));
var minutes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12949__$1,new cljs.core.Keyword(null,"minutes","minutes",1319166394));
var hours = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12949__$1,new cljs.core.Keyword(null,"hours","hours",58380855));
var days = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12949__$1,new cljs.core.Keyword(null,"days","days",-1394072564));
var vec__12950 = p__12948;
var opts = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12950,(0),null);
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,p__12953){
var vec__12954 = p__12953;
var unit = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12954,(0),null);
var amount = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12954,(1),null);
if((amount > (0))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(acc),district.format.format_time_unit.cljs$core$IFn$_invoke$arity$variadic(unit,amount,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([opts], 0))," "].join('');
} else {
return acc;
}
}),"",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"days","days",-1394072564),days], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"hours","hours",58380855),hours], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"minutes","minutes",1319166394),minutes], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"seconds","seconds",-445266194),seconds], null)], null)).slice((0),(-1));
}));

(district.format.format_time_units.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(district.format.format_time_units.cljs$lang$applyTo = (function (seq12945){
var G__12946 = cljs.core.first(seq12945);
var seq12945__$1 = cljs.core.next(seq12945);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__12946,seq12945__$1);
}));

district.format.format_url = (function district$format$format_url(path,query_map){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(path),"?",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cemerick.url.map__GT_query(query_map))].join('');
});
district.format.format_namespaced_kw = (function district$format$format_namespaced_kw(kw){
if(cljs.core.truth_(kw)){
return [(function (){var temp__5804__auto__ = cljs.core.namespace(kw);
if(cljs.core.truth_(temp__5804__auto__)){
var n = temp__5804__auto__;
return [n,"/"].join('');
} else {
return null;
}
})(),cljs.core.name(kw)].join('');
} else {
return null;
}
});
district.format.format_percentage = (function district$format$format_percentage(var_args){
var args__5775__auto__ = [];
var len__5769__auto___13029 = arguments.length;
var i__5770__auto___13030 = (0);
while(true){
if((i__5770__auto___13030 < len__5769__auto___13029)){
args__5775__auto__.push((arguments[i__5770__auto___13030]));

var G__13031 = (i__5770__auto___13030 + (1));
i__5770__auto___13030 = G__13031;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((2) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((2)),(0),null)):null);
return district.format.format_percentage.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5776__auto__);
});

(district.format.format_percentage.cljs$core$IFn$_invoke$arity$variadic = (function (portion,total,p__12960){
var vec__12961 = p__12960;
var format_opts = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12961,(0),null);
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(district.format.format_number.cljs$core$IFn$_invoke$arity$variadic(((portion / total) * 100.0),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"max-fraction-digits","max-fraction-digits",-185733995),(1),new cljs.core.Keyword(null,"min-fraction-digits","min-fraction-digits",-1394316717),(0)], null),format_opts], 0))], 0))),"%"].join('');
}));

(district.format.format_percentage.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(district.format.format_percentage.cljs$lang$applyTo = (function (seq12957){
var G__12958 = cljs.core.first(seq12957);
var seq12957__$1 = cljs.core.next(seq12957);
var G__12959 = cljs.core.first(seq12957__$1);
var seq12957__$2 = cljs.core.next(seq12957__$1);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__12958,G__12959,seq12957__$2);
}));

district.format.ensure_trailing_slash = (function district$format$ensure_trailing_slash(s){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(s),((clojure.string.ends_with_QMARK_(s,"/"))?null:"/")].join('');
});
district.format.clj__GT_json = (function district$format$clj__GT_json(coll){
return JSON.stringify(cljs.core.clj__GT_js(coll));
});

//# sourceMappingURL=district.format.js.map
