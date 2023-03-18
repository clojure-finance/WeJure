goog.provide('wejure.components.chatPage');
wejure.components.chatPage.recipient_list = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Select recipient"], null));
wejure.components.chatPage.selected_recipient = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
wejure.components.chatPage.message = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
wejure.components.chatPage.message_list = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
wejure.components.chatPage.atom_reset = (function wejure$components$chatPage$atom_reset(target_atom,value){
cljs.core.reset_BANG_(target_atom,value);

return target_atom;
});
goog.exportSymbol('wejure.components.chatPage.atom_reset', wejure.components.chatPage.atom_reset);
wejure.components.chatPage.atom_conj = (function wejure$components$chatPage$atom_conj(target_atom,value){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(target_atom,cljs.core.conj,value);

return target_atom;
});
goog.exportSymbol('wejure.components.chatPage.atom_conj', wejure.components.chatPage.atom_conj);
wejure.components.chatPage.atom_str = (function wejure$components$chatPage$atom_str(target_atom,value){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(target_atom,cljs.core.str,value);

return target_atom;
});
goog.exportSymbol('wejure.components.chatPage.atom_str', wejure.components.chatPage.atom_str);
wejure.components.chatPage.chat_page = (function wejure$components$chatPage$chat_page(p__12430){
var map__12431 = p__12430;
var map__12431__$1 = cljs.core.__destructure_map(map__12431);
var details = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12431__$1,new cljs.core.Keyword(null,"details","details",1956795411));
var step = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12431__$1,new cljs.core.Keyword(null,"step","step",1288888124));
var username = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(details),new cljs.core.Keyword(null,"name","name",1843675177));
var prev_peer = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(cljs.core.deref(wejure.components.chatPage.recipient_list)))){
module$wejure$js$chatSystem.init(username);
} else {
}

return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.typography.typography,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h4",new cljs.core.Keyword(null,"component","component",1555936782),"div"], null),"Direct Messages"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"Send to: "], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(wejure.components.chatPage.selected_recipient),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (event){
cljs.core.reset_BANG_(prev_peer,cljs.core.deref(wejure.components.chatPage.selected_recipient));

cljs.core.reset_BANG_(wejure.components.chatPage.selected_recipient,event.target.value);

cljs.core.reset_BANG_(wejure.components.chatPage.message_list,cljs.core.PersistentVector.EMPTY);

return module$wejure$js$chatSystem.displayMessage(cljs.core.deref(wejure.components.chatPage.selected_recipient),cljs.core.deref(prev_peer));
})], null),(function (){var iter__5523__auto__ = (function wejure$components$chatPage$chat_page_$_iter__12432(s__12433){
return (new cljs.core.LazySeq(null,(function (){
var s__12433__$1 = s__12433;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__12433__$1);
if(temp__5804__auto__){
var s__12433__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__12433__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__12433__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__12435 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__12434 = (0);
while(true){
if((i__12434 < size__5522__auto__)){
var recipient = cljs.core._nth(c__5521__auto__,i__12434);
cljs.core.chunk_append(b__12435,((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(recipient,username))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),recipient,new cljs.core.Keyword(null,"value","value",305978217),recipient], null),recipient], null):null));

var G__12440 = (i__12434 + (1));
i__12434 = G__12440;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__12435),wejure$components$chatPage$chat_page_$_iter__12432(cljs.core.chunk_rest(s__12433__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__12435),null);
}
} else {
var recipient = cljs.core.first(s__12433__$2);
return cljs.core.cons(((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(recipient,username))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),recipient,new cljs.core.Keyword(null,"value","value",305978217),recipient], null),recipient], null):null),wejure$components$chatPage$chat_page_$_iter__12432(cljs.core.rest(s__12433__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.deref(wejure.components.chatPage.recipient_list));
})()], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"height","height",1025178622),"600px",new cljs.core.Keyword(null,"border","border",1444987323),"2px solid #ccc",new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"column"], null)], null),(function (){var iter__5523__auto__ = (function wejure$components$chatPage$chat_page_$_iter__12436(s__12437){
return (new cljs.core.LazySeq(null,(function (){
var s__12437__$1 = s__12437;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__12437__$1);
if(temp__5804__auto__){
var s__12437__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__12437__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__12437__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__12439 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__12438 = (0);
while(true){
if((i__12438 < size__5522__auto__)){
var message_line = cljs.core._nth(c__5521__auto__,i__12438);
cljs.core.chunk_append(b__12439,cljs.core.with_meta(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),cljs.core.get.cljs$core$IFn$_invoke$arity$2(message_line,new cljs.core.Keyword(null,"timestamp","timestamp",579478971))," ",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),"red"], null)], null),cljs.core.get.cljs$core$IFn$_invoke$arity$2(message_line,new cljs.core.Keyword(null,"sender","sender",1557303285)),":"], null)," ",cljs.core.get.cljs$core$IFn$_invoke$arity$2(message_line,new cljs.core.Keyword(null,"content","content",15833224))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),message_line], null)));

var G__12441 = (i__12438 + (1));
i__12438 = G__12441;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__12439),wejure$components$chatPage$chat_page_$_iter__12436(cljs.core.chunk_rest(s__12437__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__12439),null);
}
} else {
var message_line = cljs.core.first(s__12437__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),cljs.core.get.cljs$core$IFn$_invoke$arity$2(message_line,new cljs.core.Keyword(null,"timestamp","timestamp",579478971))," ",new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),"red"], null)], null),cljs.core.get.cljs$core$IFn$_invoke$arity$2(message_line,new cljs.core.Keyword(null,"sender","sender",1557303285)),":"], null)," ",cljs.core.get.cljs$core$IFn$_invoke$arity$2(message_line,new cljs.core.Keyword(null,"content","content",15833224))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),message_line], null)),wejure$components$chatPage$chat_page_$_iter__12436(cljs.core.rest(s__12437__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(cljs.core.deref(wejure.components.chatPage.message_list),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true], 0)));
})()], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),"100%"], null),new cljs.core.Keyword(null,"id","id",-1388402092),"message",new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Send message here",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(wejure.components.chatPage.message),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (event){
return cljs.core.reset_BANG_(wejure.components.chatPage.message,event.target.value);
})], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.button.button,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"variant","variant",-424354234),"contained",new cljs.core.Keyword(null,"disable-elevation","disable-elevation",-597366875),true,new cljs.core.Keyword(null,"size","size",1098693007),"small",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return module$wejure$js$chatSystem.storeMessage(cljs.core.deref(wejure.components.chatPage.selected_recipient),cljs.core.deref(wejure.components.chatPage.message));
})], null),"send"], null)], null)], null);
});

//# sourceMappingURL=wejure.components.chatPage.js.map
