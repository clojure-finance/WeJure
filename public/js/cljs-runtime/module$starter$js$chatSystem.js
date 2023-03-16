var module$node_modules$gun$browser = shadow.js.require("module$node_modules$gun$browser", {});
var module$node_modules$gun$sea = shadow.js.require("module$node_modules$gun$sea", {});
var gun$$module$starter$js$chatSystem = module$node_modules$gun$browser({peers:["http:localhost:8001/gun"]});
var user$$module$starter$js$chatSystem = gun$$module$starter$js$chatSystem.user().recall({sessionStorage:true});
async function init$$module$starter$js$chatSystem(username) {
  var recipientList = window.starter.components.chatPage.recipient_list;
  gun$$module$starter$js$chatSystem.get("users").map().once(user => {
    if (user != username) {
      starter.components.chatPage.atom_conj(recipientList, user);
    }
  });
}
async function storeMessage$$module$starter$js$chatSystem(recipient, messageInput) {
  if (recipient == "Select recipient") {
    alert("Select a peer first!");
  } else {
    let senderPair = JSON.parse(sessionStorage.getItem("pair"));
    let receiverPub = "";
    let receiverEPub = "";
    await gun$$module$starter$js$chatSystem.get("~@" + recipient).once((data, key) => {
      receiverPub = Object.keys(data)[1].slice(1);
    });
    await gun$$module$starter$js$chatSystem.get("~" + receiverPub).get("epub").once((data, key) => {
      receiverEPub = data;
    });
    let timeStamp = (new Date()).toUTCString();
    let sender = "";
    await gun$$module$starter$js$chatSystem.get("~" + senderPair.pub).get("alias").once((data, key) => {
      sender = data;
    });
    let pass = await SEA.secret(receiverEPub, senderPair);
    let message = '\x3cspan style\x3d"color: red"\x3e' + sender + ": \x3c/span\x3e" + messageInput;
    let encryptedMessage = await SEA.encrypt(message, pass);
    await gun$$module$starter$js$chatSystem.get("chat").get(senderPair.pub).get(receiverPub).get(timeStamp).put(encryptedMessage);
    await gun$$module$starter$js$chatSystem.get("chat").get(receiverPub).get(senderPair.pub).get(timeStamp).put(encryptedMessage);
    await gun$$module$starter$js$chatSystem.get("chat").get(senderPair.pub).get(receiverPub).map().once(async(data, key) => {
      let dec = await SEA.decrypt(data, pass);
    });
    starter.components.chatPage.atom_reset(window.starter.components.chatPage.message, "");
  }
}
async function displayMessage$$module$starter$js$chatSystem(peer) {
  starter.components.chatPage.atom_reset(window.starter.components.chatPage.message_list, "");
  if (peer != "Select recipient") {
    let selfPair = JSON.parse(sessionStorage.getItem("pair"));
    let peerPub = "";
    let peerEPub = "";
    let chatRoom = "";
    await gun$$module$starter$js$chatSystem.get("~@" + peer).once((data, key) => {
      peerPub = Object.keys(data)[1].slice(1);
    });
    await gun$$module$starter$js$chatSystem.get("~" + peerPub).get("epub").once((data, key) => {
      peerEPub = data;
    });
    let passphrase = await SEA.secret(peerEPub, selfPair);
    await gun$$module$starter$js$chatSystem.get("chat").get(selfPair.pub).get(peerPub).map().once(async(data$jscomp$0, key$jscomp$0) => {
      let decryptedMessage = await SEA.decrypt(data$jscomp$0, passphrase);
      let sender = "";
      await gun$$module$starter$js$chatSystem.get("~" + selfPair.pub).get("alias").once((data, key) => {
        sender = data;
      });
      starter.components.chatPage.atom_str(window.starter.components.chatPage.message_list, "\x3cp\x3e" + key$jscomp$0 + " " + decryptedMessage + "\x3c/p\x3e");
    });
  }
}
/** @const */ 
var module$starter$js$chatSystem = {};
/** @const */ 
module$starter$js$chatSystem.displayMessage = displayMessage$$module$starter$js$chatSystem;
/** @const */ 
module$starter$js$chatSystem.init = init$$module$starter$js$chatSystem;
/** @const */ 
module$starter$js$chatSystem.storeMessage = storeMessage$$module$starter$js$chatSystem;

$CLJS.module$starter$js$chatSystem=module$starter$js$chatSystem;
//# sourceMappingURL=module$starter$js$chatSystem.js.map
