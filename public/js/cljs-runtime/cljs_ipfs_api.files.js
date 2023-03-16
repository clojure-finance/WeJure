goog.provide('cljs_ipfs_api.files');
cljs_ipfs_api.files.add = (function cljs_ipfs_api$files$add(var_args){
var G__13149 = arguments.length;
switch (G__13149) {
case 1:
return cljs_ipfs_api.files.add.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs_ipfs_api.files.add.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs_ipfs_api.files.add.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs_ipfs_api.files.add.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs_ipfs_api.files.add.cljs$core$IFn$_invoke$arity$1 = (function (data){
return cljs_ipfs_api.files.add.cljs$core$IFn$_invoke$arity$2(data,null);
}));

(cljs_ipfs_api.files.add.cljs$core$IFn$_invoke$arity$2 = (function (data,callback){
return cljs_ipfs_api.files.add.cljs$core$IFn$_invoke$arity$3(data,null,callback);
}));

(cljs_ipfs_api.files.add.cljs$core$IFn$_invoke$arity$3 = (function (data,options,callback){
return cljs_ipfs_api.files.add.cljs$core$IFn$_invoke$arity$4(cljs.core.deref(cljs_ipfs_api.core._STAR_ipfs_instance_STAR_),data,options,callback);
}));

(cljs_ipfs_api.files.add.cljs$core$IFn$_invoke$arity$4 = (function (ipfs_inst,data,options,callback){
var callback__$1 = cljs_ipfs_api.utils.wrap_callback(callback);
var args = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [data], null));
return cljs_ipfs_api.utils.api_call(ipfs_inst,"add",args,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"data","data",-232669377),data,new cljs.core.Keyword(null,"options","options",99638489),options,new cljs.core.Keyword(null,"callback","callback",-705136228),callback__$1], null));
}));

(cljs_ipfs_api.files.add.cljs$lang$maxFixedArity = 4);


cljs_ipfs_api.files.add_readable_stream = (function cljs_ipfs_api$files$add_readable_stream(var_args){
var G__13151 = arguments.length;
switch (G__13151) {
case 1:
return cljs_ipfs_api.files.add_readable_stream.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs_ipfs_api.files.add_readable_stream.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs_ipfs_api.files.add_readable_stream.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs_ipfs_api.files.add_readable_stream.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs_ipfs_api.files.add_readable_stream.cljs$core$IFn$_invoke$arity$1 = (function (data){
return cljs_ipfs_api.files.add_readable_stream.cljs$core$IFn$_invoke$arity$2(data,null);
}));

(cljs_ipfs_api.files.add_readable_stream.cljs$core$IFn$_invoke$arity$2 = (function (data,callback){
return cljs_ipfs_api.files.add_readable_stream.cljs$core$IFn$_invoke$arity$3(data,null,callback);
}));

(cljs_ipfs_api.files.add_readable_stream.cljs$core$IFn$_invoke$arity$3 = (function (data,options,callback){
return cljs_ipfs_api.files.add_readable_stream.cljs$core$IFn$_invoke$arity$4(cljs.core.deref(cljs_ipfs_api.core._STAR_ipfs_instance_STAR_),data,options,callback);
}));

(cljs_ipfs_api.files.add_readable_stream.cljs$core$IFn$_invoke$arity$4 = (function (ipfs_inst,data,options,callback){
var callback__$1 = cljs_ipfs_api.utils.wrap_callback(callback);
var args = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [data], null));
return cljs_ipfs_api.utils.api_call(ipfs_inst,"files/add-readable-stream",args,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"data","data",-232669377),data,new cljs.core.Keyword(null,"options","options",99638489),options,new cljs.core.Keyword(null,"callback","callback",-705136228),callback__$1], null));
}));

(cljs_ipfs_api.files.add_readable_stream.cljs$lang$maxFixedArity = 4);


cljs_ipfs_api.files.add_pull_stream = (function cljs_ipfs_api$files$add_pull_stream(var_args){
var G__13153 = arguments.length;
switch (G__13153) {
case 0:
return cljs_ipfs_api.files.add_pull_stream.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs_ipfs_api.files.add_pull_stream.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs_ipfs_api.files.add_pull_stream.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs_ipfs_api.files.add_pull_stream.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs_ipfs_api.files.add_pull_stream.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs_ipfs_api.files.add_pull_stream.cljs$core$IFn$_invoke$arity$1 = (function (options){
return cljs_ipfs_api.files.add_pull_stream.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs_ipfs_api.core._STAR_ipfs_instance_STAR_),options);
}));

(cljs_ipfs_api.files.add_pull_stream.cljs$core$IFn$_invoke$arity$2 = (function (ipfs_inst,options){
var args = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,cljs.core.PersistentVector.EMPTY);
return cljs_ipfs_api.utils.api_call(ipfs_inst,"files/add-pull-stream",args,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"options","options",99638489),options], null));
}));

(cljs_ipfs_api.files.add_pull_stream.cljs$lang$maxFixedArity = 2);


cljs_ipfs_api.files.fcat = (function cljs_ipfs_api$files$fcat(var_args){
var G__13155 = arguments.length;
switch (G__13155) {
case 1:
return cljs_ipfs_api.files.fcat.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs_ipfs_api.files.fcat.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs_ipfs_api.files.fcat.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs_ipfs_api.files.fcat.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs_ipfs_api.files.fcat.cljs$core$IFn$_invoke$arity$1 = (function (ipfs_path){
return cljs_ipfs_api.files.fcat.cljs$core$IFn$_invoke$arity$2(ipfs_path,null);
}));

(cljs_ipfs_api.files.fcat.cljs$core$IFn$_invoke$arity$2 = (function (ipfs_path,callback){
return cljs_ipfs_api.files.fcat.cljs$core$IFn$_invoke$arity$3(ipfs_path,null,callback);
}));

(cljs_ipfs_api.files.fcat.cljs$core$IFn$_invoke$arity$3 = (function (ipfs_path,options,callback){
return cljs_ipfs_api.files.fcat.cljs$core$IFn$_invoke$arity$4(cljs.core.deref(cljs_ipfs_api.core._STAR_ipfs_instance_STAR_),ipfs_path,options,callback);
}));

(cljs_ipfs_api.files.fcat.cljs$core$IFn$_invoke$arity$4 = (function (ipfs_inst,ipfs_path,options,callback){
var callback__$1 = cljs_ipfs_api.utils.wrap_callback(callback);
var args = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ipfs_path], null));
return cljs_ipfs_api.utils.api_call(ipfs_inst,"files/fcat",args,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ipfs-path","ipfs-path",1392044389),ipfs_path,new cljs.core.Keyword(null,"options","options",99638489),options,new cljs.core.Keyword(null,"callback","callback",-705136228),callback__$1], null));
}));

(cljs_ipfs_api.files.fcat.cljs$lang$maxFixedArity = 4);


cljs_ipfs_api.files.cat_readable_stream = (function cljs_ipfs_api$files$cat_readable_stream(var_args){
var G__13157 = arguments.length;
switch (G__13157) {
case 1:
return cljs_ipfs_api.files.cat_readable_stream.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs_ipfs_api.files.cat_readable_stream.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs_ipfs_api.files.cat_readable_stream.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs_ipfs_api.files.cat_readable_stream.cljs$core$IFn$_invoke$arity$1 = (function (ipfsPath){
return cljs_ipfs_api.files.cat_readable_stream.cljs$core$IFn$_invoke$arity$2(ipfsPath,null);
}));

(cljs_ipfs_api.files.cat_readable_stream.cljs$core$IFn$_invoke$arity$2 = (function (ipfsPath,options){
return cljs_ipfs_api.files.cat_readable_stream.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(cljs_ipfs_api.core._STAR_ipfs_instance_STAR_),ipfsPath,options);
}));

(cljs_ipfs_api.files.cat_readable_stream.cljs$core$IFn$_invoke$arity$3 = (function (ipfs_inst,ipfsPath,options){
var args = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ipfsPath], null));
return cljs_ipfs_api.utils.api_call(ipfs_inst,"files/cat-readable-stream",args,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ipfsPath","ipfsPath",-2135843262),ipfsPath,new cljs.core.Keyword(null,"options","options",99638489),options], null));
}));

(cljs_ipfs_api.files.cat_readable_stream.cljs$lang$maxFixedArity = 3);


cljs_ipfs_api.files.cat_pull_stream = (function cljs_ipfs_api$files$cat_pull_stream(var_args){
var G__13159 = arguments.length;
switch (G__13159) {
case 1:
return cljs_ipfs_api.files.cat_pull_stream.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs_ipfs_api.files.cat_pull_stream.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs_ipfs_api.files.cat_pull_stream.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs_ipfs_api.files.cat_pull_stream.cljs$core$IFn$_invoke$arity$1 = (function (ipfsPath){
return cljs_ipfs_api.files.cat_pull_stream.cljs$core$IFn$_invoke$arity$2(ipfsPath,null);
}));

(cljs_ipfs_api.files.cat_pull_stream.cljs$core$IFn$_invoke$arity$2 = (function (ipfsPath,options){
return cljs_ipfs_api.files.cat_pull_stream.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(cljs_ipfs_api.core._STAR_ipfs_instance_STAR_),ipfsPath,options);
}));

(cljs_ipfs_api.files.cat_pull_stream.cljs$core$IFn$_invoke$arity$3 = (function (ipfs_inst,ipfsPath,options){
var args = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ipfsPath], null));
return cljs_ipfs_api.utils.api_call(ipfs_inst,"files/cat-pull-stream",args,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ipfsPath","ipfsPath",-2135843262),ipfsPath,new cljs.core.Keyword(null,"options","options",99638489),options], null));
}));

(cljs_ipfs_api.files.cat_pull_stream.cljs$lang$maxFixedArity = 3);


cljs_ipfs_api.files.fget = (function cljs_ipfs_api$files$fget(var_args){
var G__13161 = arguments.length;
switch (G__13161) {
case 1:
return cljs_ipfs_api.files.fget.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs_ipfs_api.files.fget.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs_ipfs_api.files.fget.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs_ipfs_api.files.fget.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs_ipfs_api.files.fget.cljs$core$IFn$_invoke$arity$1 = (function (ipfsPath){
return cljs_ipfs_api.files.fget.cljs$core$IFn$_invoke$arity$2(ipfsPath,null);
}));

(cljs_ipfs_api.files.fget.cljs$core$IFn$_invoke$arity$2 = (function (ipfsPath,callback){
return cljs_ipfs_api.files.fget.cljs$core$IFn$_invoke$arity$3(ipfsPath,null,callback);
}));

(cljs_ipfs_api.files.fget.cljs$core$IFn$_invoke$arity$3 = (function (ipfsPath,options,callback){
return cljs_ipfs_api.files.fget.cljs$core$IFn$_invoke$arity$4(cljs.core.deref(cljs_ipfs_api.core._STAR_ipfs_instance_STAR_),ipfsPath,options,callback);
}));

(cljs_ipfs_api.files.fget.cljs$core$IFn$_invoke$arity$4 = (function (ipfs_inst,ipfsPath,options,callback){
var callback__$1 = cljs_ipfs_api.utils.wrap_callback(callback);
var args = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ipfsPath], null));
return cljs_ipfs_api.utils.api_call(ipfs_inst,"get",args,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ipfsPath","ipfsPath",-2135843262),ipfsPath,new cljs.core.Keyword(null,"options","options",99638489),options,new cljs.core.Keyword(null,"callback","callback",-705136228),callback__$1], null));
}));

(cljs_ipfs_api.files.fget.cljs$lang$maxFixedArity = 4);


cljs_ipfs_api.files.get_readable_stream = (function cljs_ipfs_api$files$get_readable_stream(var_args){
var G__13163 = arguments.length;
switch (G__13163) {
case 1:
return cljs_ipfs_api.files.get_readable_stream.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs_ipfs_api.files.get_readable_stream.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs_ipfs_api.files.get_readable_stream.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs_ipfs_api.files.get_readable_stream.cljs$core$IFn$_invoke$arity$1 = (function (ipfsPath){
return cljs_ipfs_api.files.get_readable_stream.cljs$core$IFn$_invoke$arity$2(ipfsPath,null);
}));

(cljs_ipfs_api.files.get_readable_stream.cljs$core$IFn$_invoke$arity$2 = (function (ipfsPath,options){
return cljs_ipfs_api.files.get_readable_stream.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(cljs_ipfs_api.core._STAR_ipfs_instance_STAR_),ipfsPath,options);
}));

(cljs_ipfs_api.files.get_readable_stream.cljs$core$IFn$_invoke$arity$3 = (function (ipfs_inst,ipfsPath,options){
var args = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ipfsPath], null));
return cljs_ipfs_api.utils.api_call(ipfs_inst,"files/get-readable-stream",args,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ipfsPath","ipfsPath",-2135843262),ipfsPath,new cljs.core.Keyword(null,"options","options",99638489),options], null));
}));

(cljs_ipfs_api.files.get_readable_stream.cljs$lang$maxFixedArity = 3);


cljs_ipfs_api.files.get_pull_stream = (function cljs_ipfs_api$files$get_pull_stream(var_args){
var G__13165 = arguments.length;
switch (G__13165) {
case 1:
return cljs_ipfs_api.files.get_pull_stream.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs_ipfs_api.files.get_pull_stream.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs_ipfs_api.files.get_pull_stream.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs_ipfs_api.files.get_pull_stream.cljs$core$IFn$_invoke$arity$1 = (function (ipfsPath){
return cljs_ipfs_api.files.get_pull_stream.cljs$core$IFn$_invoke$arity$2(ipfsPath,null);
}));

(cljs_ipfs_api.files.get_pull_stream.cljs$core$IFn$_invoke$arity$2 = (function (ipfsPath,options){
return cljs_ipfs_api.files.get_pull_stream.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(cljs_ipfs_api.core._STAR_ipfs_instance_STAR_),ipfsPath,options);
}));

(cljs_ipfs_api.files.get_pull_stream.cljs$core$IFn$_invoke$arity$3 = (function (ipfs_inst,ipfsPath,options){
var args = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ipfsPath], null));
return cljs_ipfs_api.utils.api_call(ipfs_inst,"files/get-pull-stream",args,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ipfsPath","ipfsPath",-2135843262),ipfsPath,new cljs.core.Keyword(null,"options","options",99638489),options], null));
}));

(cljs_ipfs_api.files.get_pull_stream.cljs$lang$maxFixedArity = 3);


cljs_ipfs_api.files.fls = (function cljs_ipfs_api$files$fls(var_args){
var G__13167 = arguments.length;
switch (G__13167) {
case 1:
return cljs_ipfs_api.files.fls.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs_ipfs_api.files.fls.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs_ipfs_api.files.fls.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs_ipfs_api.files.fls.cljs$core$IFn$_invoke$arity$1 = (function (ipfsPath){
return cljs_ipfs_api.files.fls.cljs$core$IFn$_invoke$arity$2(ipfsPath,null);
}));

(cljs_ipfs_api.files.fls.cljs$core$IFn$_invoke$arity$2 = (function (ipfsPath,callback){
return cljs_ipfs_api.files.fls.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(cljs_ipfs_api.core._STAR_ipfs_instance_STAR_),ipfsPath,callback);
}));

(cljs_ipfs_api.files.fls.cljs$core$IFn$_invoke$arity$3 = (function (ipfs_inst,ipfsPath,callback){
var callback__$1 = cljs_ipfs_api.utils.wrap_callback(callback);
var args = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ipfsPath], null));
return cljs_ipfs_api.utils.api_call(ipfs_inst,"ls",args,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ipfsPath","ipfsPath",-2135843262),ipfsPath,new cljs.core.Keyword(null,"callback","callback",-705136228),callback__$1], null));
}));

(cljs_ipfs_api.files.fls.cljs$lang$maxFixedArity = 3);


cljs_ipfs_api.files.cp = (function cljs_ipfs_api$files$cp(var_args){
var G__13169 = arguments.length;
switch (G__13169) {
case 1:
return cljs_ipfs_api.files.cp.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs_ipfs_api.files.cp.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs_ipfs_api.files.cp.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs_ipfs_api.files.cp.cljs$core$IFn$_invoke$arity$1 = (function (from_to){
return cljs_ipfs_api.files.cp.cljs$core$IFn$_invoke$arity$2(from_to,null);
}));

(cljs_ipfs_api.files.cp.cljs$core$IFn$_invoke$arity$2 = (function (from_to,callback){
return cljs_ipfs_api.files.cp.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(cljs_ipfs_api.core._STAR_ipfs_instance_STAR_),from_to,callback);
}));

(cljs_ipfs_api.files.cp.cljs$core$IFn$_invoke$arity$3 = (function (ipfs_inst,from_to,callback){
var callback__$1 = cljs_ipfs_api.utils.wrap_callback(callback);
var args = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [from_to], null));
return cljs_ipfs_api.utils.api_call(ipfs_inst,"files/cp",args,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"from-to","from-to",-640428401),from_to,new cljs.core.Keyword(null,"callback","callback",-705136228),callback__$1], null));
}));

(cljs_ipfs_api.files.cp.cljs$lang$maxFixedArity = 3);


cljs_ipfs_api.files.mkdir = (function cljs_ipfs_api$files$mkdir(var_args){
var G__13171 = arguments.length;
switch (G__13171) {
case 2:
return cljs_ipfs_api.files.mkdir.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs_ipfs_api.files.mkdir.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs_ipfs_api.files.mkdir.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs_ipfs_api.files.mkdir.cljs$core$IFn$_invoke$arity$2 = (function (path,callback){
return cljs_ipfs_api.files.mkdir.cljs$core$IFn$_invoke$arity$3(path,null,callback);
}));

(cljs_ipfs_api.files.mkdir.cljs$core$IFn$_invoke$arity$3 = (function (path,options,callback){
return cljs_ipfs_api.files.mkdir.cljs$core$IFn$_invoke$arity$4(cljs.core.deref(cljs_ipfs_api.core._STAR_ipfs_instance_STAR_),path,options,callback);
}));

(cljs_ipfs_api.files.mkdir.cljs$core$IFn$_invoke$arity$4 = (function (ipfs_inst,path,options,callback){
var callback__$1 = cljs_ipfs_api.utils.wrap_callback(callback);
var args = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [path], null));
return cljs_ipfs_api.utils.api_call(ipfs_inst,"files/mkdir",args,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"options","options",99638489),options,new cljs.core.Keyword(null,"callback","callback",-705136228),callback__$1], null));
}));

(cljs_ipfs_api.files.mkdir.cljs$lang$maxFixedArity = 4);


cljs_ipfs_api.files.stat = (function cljs_ipfs_api$files$stat(var_args){
var G__13173 = arguments.length;
switch (G__13173) {
case 2:
return cljs_ipfs_api.files.stat.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs_ipfs_api.files.stat.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs_ipfs_api.files.stat.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs_ipfs_api.files.stat.cljs$core$IFn$_invoke$arity$2 = (function (path,callback){
return cljs_ipfs_api.files.stat.cljs$core$IFn$_invoke$arity$3(path,null,callback);
}));

(cljs_ipfs_api.files.stat.cljs$core$IFn$_invoke$arity$3 = (function (path,options,callback){
return cljs_ipfs_api.files.stat.cljs$core$IFn$_invoke$arity$4(cljs.core.deref(cljs_ipfs_api.core._STAR_ipfs_instance_STAR_),path,options,callback);
}));

(cljs_ipfs_api.files.stat.cljs$core$IFn$_invoke$arity$4 = (function (ipfs_inst,path,options,callback){
var callback__$1 = cljs_ipfs_api.utils.wrap_callback(callback);
var args = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [path], null));
return cljs_ipfs_api.utils.api_call(ipfs_inst,"files/stat",args,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"options","options",99638489),options,new cljs.core.Keyword(null,"callback","callback",-705136228),callback__$1], null));
}));

(cljs_ipfs_api.files.stat.cljs$lang$maxFixedArity = 4);


cljs_ipfs_api.files.rm = (function cljs_ipfs_api$files$rm(var_args){
var G__13175 = arguments.length;
switch (G__13175) {
case 2:
return cljs_ipfs_api.files.rm.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs_ipfs_api.files.rm.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs_ipfs_api.files.rm.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs_ipfs_api.files.rm.cljs$core$IFn$_invoke$arity$2 = (function (path,callback){
return cljs_ipfs_api.files.rm.cljs$core$IFn$_invoke$arity$3(path,null,callback);
}));

(cljs_ipfs_api.files.rm.cljs$core$IFn$_invoke$arity$3 = (function (path,options,callback){
return cljs_ipfs_api.files.rm.cljs$core$IFn$_invoke$arity$4(cljs.core.deref(cljs_ipfs_api.core._STAR_ipfs_instance_STAR_),path,options,callback);
}));

(cljs_ipfs_api.files.rm.cljs$core$IFn$_invoke$arity$4 = (function (ipfs_inst,path,options,callback){
var callback__$1 = cljs_ipfs_api.utils.wrap_callback(callback);
var args = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [path], null));
return cljs_ipfs_api.utils.api_call(ipfs_inst,"files/rm",args,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"options","options",99638489),options,new cljs.core.Keyword(null,"callback","callback",-705136228),callback__$1], null));
}));

(cljs_ipfs_api.files.rm.cljs$lang$maxFixedArity = 4);


cljs_ipfs_api.files.read = (function cljs_ipfs_api$files$read(var_args){
var G__13177 = arguments.length;
switch (G__13177) {
case 2:
return cljs_ipfs_api.files.read.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs_ipfs_api.files.read.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs_ipfs_api.files.read.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs_ipfs_api.files.read.cljs$core$IFn$_invoke$arity$2 = (function (path,callback){
return cljs_ipfs_api.files.read.cljs$core$IFn$_invoke$arity$3(path,null,callback);
}));

(cljs_ipfs_api.files.read.cljs$core$IFn$_invoke$arity$3 = (function (path,options,callback){
return cljs_ipfs_api.files.read.cljs$core$IFn$_invoke$arity$4(cljs.core.deref(cljs_ipfs_api.core._STAR_ipfs_instance_STAR_),path,options,callback);
}));

(cljs_ipfs_api.files.read.cljs$core$IFn$_invoke$arity$4 = (function (ipfs_inst,path,options,callback){
var callback__$1 = cljs_ipfs_api.utils.wrap_callback(callback);
var args = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [path], null));
return cljs_ipfs_api.utils.api_call(ipfs_inst,"files/read",args,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"options","options",99638489),options,new cljs.core.Keyword(null,"callback","callback",-705136228),callback__$1], null));
}));

(cljs_ipfs_api.files.read.cljs$lang$maxFixedArity = 4);


cljs_ipfs_api.files.write = (function cljs_ipfs_api$files$write(var_args){
var G__13179 = arguments.length;
switch (G__13179) {
case 3:
return cljs_ipfs_api.files.write.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs_ipfs_api.files.write.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs_ipfs_api.files.write.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs_ipfs_api.files.write.cljs$core$IFn$_invoke$arity$3 = (function (path,content,callback){
return cljs_ipfs_api.files.write.cljs$core$IFn$_invoke$arity$4(path,content,null,callback);
}));

(cljs_ipfs_api.files.write.cljs$core$IFn$_invoke$arity$4 = (function (path,content,options,callback){
return cljs_ipfs_api.files.write.cljs$core$IFn$_invoke$arity$5(cljs.core.deref(cljs_ipfs_api.core._STAR_ipfs_instance_STAR_),path,content,options,callback);
}));

(cljs_ipfs_api.files.write.cljs$core$IFn$_invoke$arity$5 = (function (ipfs_inst,path,content,options,callback){
var callback__$1 = cljs_ipfs_api.utils.wrap_callback(callback);
var args = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [path,content], null));
return cljs_ipfs_api.utils.api_call(ipfs_inst,"files/write",args,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"content","content",15833224),content,new cljs.core.Keyword(null,"options","options",99638489),options,new cljs.core.Keyword(null,"callback","callback",-705136228),callback__$1], null));
}));

(cljs_ipfs_api.files.write.cljs$lang$maxFixedArity = 5);


cljs_ipfs_api.files.mv = (function cljs_ipfs_api$files$mv(var_args){
var G__13181 = arguments.length;
switch (G__13181) {
case 1:
return cljs_ipfs_api.files.mv.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs_ipfs_api.files.mv.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs_ipfs_api.files.mv.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs_ipfs_api.files.mv.cljs$core$IFn$_invoke$arity$1 = (function (from_to){
return cljs_ipfs_api.files.mv.cljs$core$IFn$_invoke$arity$2(from_to,null);
}));

(cljs_ipfs_api.files.mv.cljs$core$IFn$_invoke$arity$2 = (function (from_to,callback){
return cljs_ipfs_api.files.mv.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(cljs_ipfs_api.core._STAR_ipfs_instance_STAR_),from_to,callback);
}));

(cljs_ipfs_api.files.mv.cljs$core$IFn$_invoke$arity$3 = (function (ipfs_inst,from_to,callback){
var callback__$1 = cljs_ipfs_api.utils.wrap_callback(callback);
var args = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [from_to], null));
return cljs_ipfs_api.utils.api_call(ipfs_inst,"files/mv",args,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"from-to","from-to",-640428401),from_to,new cljs.core.Keyword(null,"callback","callback",-705136228),callback__$1], null));
}));

(cljs_ipfs_api.files.mv.cljs$lang$maxFixedArity = 3);


cljs_ipfs_api.files.ls = (function cljs_ipfs_api$files$ls(var_args){
var G__13183 = arguments.length;
switch (G__13183) {
case 2:
return cljs_ipfs_api.files.ls.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs_ipfs_api.files.ls.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs_ipfs_api.files.ls.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs_ipfs_api.files.ls.cljs$core$IFn$_invoke$arity$2 = (function (options,callback){
return cljs_ipfs_api.files.ls.cljs$core$IFn$_invoke$arity$3(null,options,callback);
}));

(cljs_ipfs_api.files.ls.cljs$core$IFn$_invoke$arity$3 = (function (path,options,callback){
return cljs_ipfs_api.files.ls.cljs$core$IFn$_invoke$arity$4(cljs.core.deref(cljs_ipfs_api.core._STAR_ipfs_instance_STAR_),path,options,callback);
}));

(cljs_ipfs_api.files.ls.cljs$core$IFn$_invoke$arity$4 = (function (ipfs_inst,path,options,callback){
var callback__$1 = cljs_ipfs_api.utils.wrap_callback(callback);
var args = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [path], null));
return cljs_ipfs_api.utils.api_call(ipfs_inst,"files/ls",args,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"options","options",99638489),options,new cljs.core.Keyword(null,"callback","callback",-705136228),callback__$1], null));
}));

(cljs_ipfs_api.files.ls.cljs$lang$maxFixedArity = 4);


cljs_ipfs_api.files.fflush = (function cljs_ipfs_api$files$fflush(var_args){
var G__13185 = arguments.length;
switch (G__13185) {
case 1:
return cljs_ipfs_api.files.fflush.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs_ipfs_api.files.fflush.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs_ipfs_api.files.fflush.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs_ipfs_api.files.fflush.cljs$core$IFn$_invoke$arity$1 = (function (callback){
return cljs_ipfs_api.files.fflush.cljs$core$IFn$_invoke$arity$2(null,callback);
}));

(cljs_ipfs_api.files.fflush.cljs$core$IFn$_invoke$arity$2 = (function (path,callback){
return cljs_ipfs_api.files.fflush.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(cljs_ipfs_api.core._STAR_ipfs_instance_STAR_),path,callback);
}));

(cljs_ipfs_api.files.fflush.cljs$core$IFn$_invoke$arity$3 = (function (ipfs_inst,path,callback){
var callback__$1 = cljs_ipfs_api.utils.wrap_callback(callback);
var args = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [path], null));
return cljs_ipfs_api.utils.api_call(ipfs_inst,"files/fflush",args,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"callback","callback",-705136228),callback__$1], null));
}));

(cljs_ipfs_api.files.fflush.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=cljs_ipfs_api.files.js.map
