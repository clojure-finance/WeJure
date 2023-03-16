goog.provide('starter.components.chatPage');
starter.components.chatPage.recipient_list = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Select recipient"], null));
starter.components.chatPage.selected_recipient = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
starter.components.chatPage.message = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
starter.components.chatPage.message_list = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
starter.components.chatPage.atom_reset = (function starter$components$chatPage$atom_reset(target_atom,value){
cljs.core.reset_BANG_(target_atom,value);

return target_atom;
});
goog.exportSymbol('starter.components.chatPage.atom_reset', starter.components.chatPage.atom_reset);
starter.components.chatPage.atom_conj = (function starter$components$chatPage$atom_conj(target_atom,value){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(target_atom,cljs.core.conj,value);

return target_atom;
});
goog.exportSymbol('starter.components.chatPage.atom_conj', starter.components.chatPage.atom_conj);
starter.components.chatPage.atom_str = (function starter$components$chatPage$atom_str(target_atom,value){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(target_atom,cljs.core.str,value);

return target_atom;
});
goog.exportSymbol('starter.components.chatPage.atom_str', starter.components.chatPage.atom_str);
starter.components.chatPage.chatPage = (function starter$components$chatPage$chatPage(p__11895){
var map__11896 = p__11895;
var map__11896__$1 = cljs.core.__destructure_map(map__11896);
var details = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11896__$1,new cljs.core.Keyword(null,"details","details",1956795411));
var step = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11896__$1,new cljs.core.Keyword(null,"step","step",1288888124));
var username = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(details),new cljs.core.Keyword(null,"name","name",1843675177));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(cljs.core.deref(starter.components.chatPage.recipient_list)))){
module$starter$js$chatSystem.init(username);
} else {
}

return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.typography.typography,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"variant","variant",-424354234),"h4",new cljs.core.Keyword(null,"component","component",1555936782),"div"], null),"Direct Messages"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"Send to: "], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(starter.components.chatPage.selected_recipient),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (event){
cljs.core.reset_BANG_(starter.components.chatPage.selected_recipient,event.target.value);

return module$starter$js$chatSystem.displayMessage(cljs.core.deref(starter.components.chatPage.selected_recipient));
})], null),(function (){var iter__5523__auto__ = (function starter$components$chatPage$chatPage_$_iter__11897(s__11898){
return (new cljs.core.LazySeq(null,(function (){
var s__11898__$1 = s__11898;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__11898__$1);
if(temp__5804__auto__){
var s__11898__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__11898__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__11898__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__11900 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__11899 = (0);
while(true){
if((i__11899 < size__5522__auto__)){
var recipient = cljs.core._nth(c__5521__auto__,i__11899);
cljs.core.chunk_append(b__11900,((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(recipient,username))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),recipient,new cljs.core.Keyword(null,"value","value",305978217),recipient], null),recipient], null):null));

var G__11901 = (i__11899 + (1));
i__11899 = G__11901;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__11900),starter$components$chatPage$chatPage_$_iter__11897(cljs.core.chunk_rest(s__11898__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__11900),null);
}
} else {
var recipient = cljs.core.first(s__11898__$2);
return cljs.core.cons(((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(recipient,username))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),recipient,new cljs.core.Keyword(null,"value","value",305978217),recipient], null),recipient], null):null),starter$components$chatPage$chatPage_$_iter__11897(cljs.core.rest(s__11898__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.deref(starter.components.chatPage.recipient_list));
})()], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"height","height",1025178622),"600px",new cljs.core.Keyword(null,"border","border",1444987323),"2px solid #ccc",new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"column"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dangerouslySetInnerHTML","dangerouslySetInnerHTML",-554971138),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__html","__html",674048345),cljs.core.deref(starter.components.chatPage.message_list)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),"100%"], null),new cljs.core.Keyword(null,"id","id",-1388402092),"message",new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Send message here",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref(starter.components.chatPage.message),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (event){
return cljs.core.reset_BANG_(starter.components.chatPage.message,event.target.value);
})], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_mui.material.button.button,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"variant","variant",-424354234),"contained",new cljs.core.Keyword(null,"disable-elevation","disable-elevation",-597366875),true,new cljs.core.Keyword(null,"size","size",1098693007),"small",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return module$starter$js$chatSystem.storeMessage(cljs.core.deref(starter.components.chatPage.selected_recipient),cljs.core.deref(starter.components.chatPage.message));
})], null),"send"], null)], null)], null);
});

//# sourceMappingURL=starter.components.chatPage.js.map
