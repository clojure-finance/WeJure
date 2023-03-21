var module$node_modules$gun$browser = shadow.js.require("module$node_modules$gun$browser", {});
var module$node_modules$gun$sea = shadow.js.require("module$node_modules$gun$sea", {});
var gun$$module$wejure$js$chatSystem = module$node_modules$gun$browser({peers:["http:localhost:8001/gun"]});
var user$$module$wejure$js$chatSystem = gun$$module$wejure$js$chatSystem.user().recall({sessionStorage:true});
async function init$$module$wejure$js$chatSystem(username) {
  let recipientList = window.wejure.components.chatPage.recipient_list;
  gun$$module$wejure$js$chatSystem.get("users").map().once(user => {
    if (user != username) {
      wejure.components.chatPage.atom_conj(recipientList, user);
    }
  });
}
async function storeMessage$$module$wejure$js$chatSystem(recipient, messageInput) {
  if (recipient == "Select recipient" || recipient == "") {
    alert("Select a peer first!");
  } else {
    let senderPair = JSON.parse(sessionStorage.getItem("pair"));
    let receiverPub = "";
    let receiverEPub = "";
    await gun$$module$wejure$js$chatSystem.get("~@" + recipient).once((data, key) => {
      receiverPub = Object.keys(data)[1].slice(1);
    });
    await gun$$module$wejure$js$chatSystem.get("~" + receiverPub).get("epub").once((data, key) => {
      receiverEPub = data;
    });
    let timeStamp = (new Date()).toUTCString();
    let sender = "";
    await gun$$module$wejure$js$chatSystem.get("~" + senderPair.pub).get("alias").once((data, key) => {
      sender = data;
    });
    let pass = await SEA.secret(receiverEPub, senderPair);
    let message = {"sender":sender, "content":messageInput};
    let encryptedMessage = await SEA.encrypt(message, pass);
    await gun$$module$wejure$js$chatSystem.get("chat").get(senderPair.pub).get(receiverPub).get(timeStamp).put(encryptedMessage);
    await gun$$module$wejure$js$chatSystem.get("chat").get(receiverPub).get(senderPair.pub).get(timeStamp).put(encryptedMessage);
    wejure.components.chatPage.atom_reset(window.wejure.components.chatPage.message, "");
  }
}
async function displayMessage$$module$wejure$js$chatSystem(peer) {
  let selfPair = JSON.parse(sessionStorage.getItem("pair"));
  if (peer != "Select recipient") {
    let peerPub = "";
    let peerEPub = "";
    await gun$$module$wejure$js$chatSystem.get("~@" + peer).once((data, key) => {
      peerPub = Object.keys(data)[1].slice(1);
    });
    await gun$$module$wejure$js$chatSystem.get("~" + peerPub).get("epub").once((data, key) => {
      peerEPub = data;
    });
    let passphrase = await SEA.secret(peerEPub, selfPair);
    await gun$$module$wejure$js$chatSystem.get("chat").get(selfPair.pub).get(peerPub).map().once(async(data$jscomp$0, key$jscomp$0) => {
      let decryptedMessage = await SEA.decrypt(data$jscomp$0, passphrase);
      let sender = "";
      await gun$$module$wejure$js$chatSystem.get("~" + selfPair.pub).get("alias").once((data, key) => {
        sender = data;
      });
      decryptedMessage["timestamp"] = key$jscomp$0;
      wejure.components.chatPage.add_message(window.wejure.components.chatPage.message_list, decryptedMessage);
    });
  }
}
/** @const */ 
var module$wejure$js$chatSystem = {};
/** @const */ 
module$wejure$js$chatSystem.displayMessage = displayMessage$$module$wejure$js$chatSystem;
/** @const */ 
module$wejure$js$chatSystem.init = init$$module$wejure$js$chatSystem;
/** @const */ 
module$wejure$js$chatSystem.storeMessage = storeMessage$$module$wejure$js$chatSystem;

$CLJS.module$wejure$js$chatSystem=module$wejure$js$chatSystem;
//# sourceMappingURL=module$wejure$js$chatSystem.js.map
