["^ ","~:resource-id",["~:shadow.build.classpath/resource","starter/js/chatSystem.js"],"~:compiled-at",1678526235094,"~:js","var module$node_modules$gun$browser = shadow.js.require(\"module$node_modules$gun$browser\", {});\nvar module$node_modules$gun$sea = shadow.js.require(\"module$node_modules$gun$sea\", {});\nvar gun$$module$starter$js$chatSystem = module$node_modules$gun$browser({peers:[\"http:localhost:8001/gun\"]});\nvar user$$module$starter$js$chatSystem = gun$$module$starter$js$chatSystem.user().recall({sessionStorage:true});\nasync function init$$module$starter$js$chatSystem(username) {\n  var recipientList = window.starter.components.chatPage.recipient_list;\n  gun$$module$starter$js$chatSystem.get(\"users\").map().once(user => {\n    if (user != username) {\n      starter.components.chatPage.atom_conj(recipientList, user);\n    }\n  });\n}\nasync function storeMessage$$module$starter$js$chatSystem(recipient, messageInput) {\n  if (recipient == \"Select recipient\") {\n    alert(\"Select a peer first!\");\n  } else {\n    let senderPair = JSON.parse(sessionStorage.getItem(\"pair\"));\n    let receiverPub = \"\";\n    let receiverEPub = \"\";\n    await gun$$module$starter$js$chatSystem.get(\"~@\" + recipient).once((data, key) => {\n      receiverPub = Object.keys(data)[1].slice(1);\n    });\n    await gun$$module$starter$js$chatSystem.get(\"~\" + receiverPub).get(\"epub\").once((data, key) => {\n      receiverEPub = data;\n    });\n    let timeStamp = (new Date()).toUTCString();\n    let sender = \"\";\n    await gun$$module$starter$js$chatSystem.get(\"~\" + senderPair.pub).get(\"alias\").once((data, key) => {\n      sender = data;\n    });\n    let pass = await SEA.secret(receiverEPub, senderPair);\n    let message = '\\x3cspan style\\x3d\"color: red\"\\x3e' + sender + \": \\x3c/span\\x3e\" + messageInput;\n    let encryptedMessage = await SEA.encrypt(message, pass);\n    await gun$$module$starter$js$chatSystem.get(\"chat\").get(senderPair.pub).get(receiverPub).get(timeStamp).put(encryptedMessage);\n    await gun$$module$starter$js$chatSystem.get(\"chat\").get(receiverPub).get(senderPair.pub).get(timeStamp).put(encryptedMessage);\n    await gun$$module$starter$js$chatSystem.get(\"chat\").get(senderPair.pub).get(receiverPub).map().once(async(data, key) => {\n      let dec = await SEA.decrypt(data, pass);\n    });\n    starter.components.chatPage.atom_reset(window.starter.components.chatPage.message, \"\");\n  }\n}\nasync function displayMessage$$module$starter$js$chatSystem(peer) {\n  starter.components.chatPage.atom_reset(window.starter.components.chatPage.message_list, \"\");\n  if (peer != \"Select recipient\") {\n    let selfPair = JSON.parse(sessionStorage.getItem(\"pair\"));\n    let peerPub = \"\";\n    let peerEPub = \"\";\n    let chatRoom = \"\";\n    await gun$$module$starter$js$chatSystem.get(\"~@\" + peer).once((data, key) => {\n      peerPub = Object.keys(data)[1].slice(1);\n    });\n    await gun$$module$starter$js$chatSystem.get(\"~\" + peerPub).get(\"epub\").once((data, key) => {\n      peerEPub = data;\n    });\n    let passphrase = await SEA.secret(peerEPub, selfPair);\n    await gun$$module$starter$js$chatSystem.get(\"chat\").get(selfPair.pub).get(peerPub).map().once(async(data$jscomp$0, key$jscomp$0) => {\n      let decryptedMessage = await SEA.decrypt(data$jscomp$0, passphrase);\n      let sender = \"\";\n      await gun$$module$starter$js$chatSystem.get(\"~\" + selfPair.pub).get(\"alias\").once((data, key) => {\n        sender = data;\n      });\n      starter.components.chatPage.atom_str(window.starter.components.chatPage.message_list, \"\\x3cp\\x3e\" + key$jscomp$0 + \" \" + decryptedMessage + \"\\x3c/p\\x3e\");\n    });\n  }\n}\n/** @const */ \nvar module$starter$js$chatSystem = {};\n/** @const */ \nmodule$starter$js$chatSystem.displayMessage = displayMessage$$module$starter$js$chatSystem;\n/** @const */ \nmodule$starter$js$chatSystem.init = init$$module$starter$js$chatSystem;\n/** @const */ \nmodule$starter$js$chatSystem.storeMessage = storeMessage$$module$starter$js$chatSystem;\n\n$CLJS.module$starter$js$chatSystem=module$starter$js$chatSystem;","~:js-symbol-names",["~#set",["module$starter$js$chatSystem","storeMessage$$module$starter$js$chatSystem","gun$$module$starter$js$chatSystem","init$$module$starter$js$chatSystem","user$$module$starter$js$chatSystem","displayMessage$$module$starter$js$chatSystem"]],"~:properties",["^5",["peers","storeMessage","displayMessage","sessionStorage","init"]],"~:source","import GUN from 'goog:module$node_modules$gun$browser';\r\nimport 'goog:module$node_modules$gun$sea';\r\n\r\n//var gun = GUN();\r\n//var gun = GUN(['https://gun-manhattan.herokuapp.com/gun']);\r\n//var gun = GUN('https://gun-relay.herokuapp.com/gun');\r\nvar gun = GUN({ peers: ['http:localhost:8001/gun'] });\r\nvar user = gun.user().recall({sessionStorage: true});\r\n\r\nexport async function init(username) {\r\n    var recipientList = window.starter.components.chatPage.recipient_list;\r\n    gun.get('users').map().once((user) => {\r\n        if (user != username) {\r\n            starter.components.chatPage.atom_conj(recipientList, user); \r\n        }\r\n    });\r\n}\r\n\r\nexport async function storeMessage(recipient, messageInput) {\r\n    if (recipient == \"Select recipient\") {\r\n        alert(\"Select a peer first!\");\r\n    }\r\n    else {\r\n        let senderPair = JSON.parse(sessionStorage.getItem('pair'));\r\n        let receiverPub = \"\";\r\n        let receiverEPub = \"\";\r\n        await gun.get('~@'+recipient).once((data, key) => {\r\n            receiverPub = Object.keys(data)[1].slice(1);      \r\n        });\r\n        await gun.get('~'+receiverPub).get('epub').once((data, key) => {\r\n            receiverEPub = data;     \r\n        });\r\n        let timeStamp = new Date().toUTCString();\r\n        let sender = \"\";\r\n        await gun.get('~'+senderPair.pub).get('alias').once((data, key) => {\r\n            sender = data;\r\n        });\r\n        let pass = await SEA.secret(receiverEPub, senderPair);\r\n        let message = '<span style=\"color: red\">' + sender + ': </span>' + messageInput; \r\n        let encryptedMessage = await SEA.encrypt(message, pass);\r\n        await gun.get(\"chat\").get(senderPair.pub).get(receiverPub).get(timeStamp).put(encryptedMessage);\r\n        await gun.get(\"chat\").get(receiverPub).get(senderPair.pub).get(timeStamp).put(encryptedMessage);\r\n        await gun.get(\"chat\").get(senderPair.pub).get(receiverPub).map().once(async (data, key) => {\r\n            let dec = await SEA.decrypt(data, pass);\r\n            //console.log(key, data, 'decrypted: ', dec);\r\n        });\r\n        starter.components.chatPage.atom_reset(window.starter.components.chatPage.message, \"\");\r\n    }\r\n}\r\n\r\nexport async function displayMessage(peer) {\r\n    starter.components.chatPage.atom_reset(window.starter.components.chatPage.message_list, \"\");\r\n    if (peer != \"Select recipient\") {\r\n        let selfPair = JSON.parse(sessionStorage.getItem('pair'));\r\n        let peerPub = \"\";\r\n        let peerEPub = \"\";\r\n        let chatRoom = \"\";\r\n        await gun.get('~@'+peer).once((data, key) => {\r\n            peerPub = Object.keys(data)[1].slice(1);      \r\n        });\r\n        await gun.get('~'+peerPub).get('epub').once((data, key) => {\r\n            peerEPub = data;     \r\n        });\r\n        let passphrase = await SEA.secret(peerEPub, selfPair);\r\n        await gun.get('chat').get(selfPair.pub).get(peerPub).map().once(async (data, key) => {\r\n            let decryptedMessage = await SEA.decrypt(data, passphrase);\r\n            let sender = \"\";\r\n            await gun.get('~'+selfPair.pub).get('alias').once((data, key) => {\r\n                sender = data;\r\n            });\r\n            starter.components.chatPage.atom_str(window.starter.components.chatPage.message_list, '<p>' + key + ' ' + decryptedMessage + '</p>')\r\n        });   \r\n        //await console.log(\"peerPub:\", peerPub);\r\n        //await console.log(\"peerEPub:\", peerEPub);\r\n    }\r\n    \r\n}\r\n\r\n","~:source-map-json","{\n\"version\":3,\n\"file\":\"module$starter$js$chatSystem.js\",\n\"lineCount\":74,\n\"mappings\":\"A;;AAMA,IAAIA,oCAAMC,+BAAA,CAAI,CAAEC,MAAO,CAAC,yBAAD,CAAT,CAAJ,CAAV;AACA,IAAIC,qCAAOH,iCAAIG,CAAAA,IAAJ,EAAWC,CAAAA,MAAX,CAAkB,CAACC,eAAgB,IAAjB,CAAlB,CAAX;AAEOC,cAAeA,mCAAI,CAACC,QAAD,CAAW;AACjC,MAAIC,gBAAgBC,MAAOC,CAAAA,OAAQC,CAAAA,UAAWC,CAAAA,QAASC,CAAAA,cAAvD;AACAb,mCAAIc,CAAAA,GAAJ,CAAQ,OAAR,CAAiBC,CAAAA,GAAjB,EAAuBC,CAAAA,IAAvB,CAA6Bb,IAAD,IAAU;AAClC,QAAIA,IAAJ,IAAYI,QAAZ;AACIG,aAAQC,CAAAA,UAAWC,CAAAA,QAASK,CAAAA,SAA5B,CAAsCT,aAAtC,EAAqDL,IAArD,CAAA;AADJ;AADkC,GAAtC,CAAA;AAFiC;AAS9Be,cAAeA,2CAAY,CAACC,SAAD,EAAYC,YAAZ,CAA0B;AACxD,MAAID,SAAJ,IAAiB,kBAAjB;AACIE,SAAA,CAAM,sBAAN,CAAA;AADJ,QAGK;AACD,QAAIC,aAAaC,IAAKC,CAAAA,KAAL,CAAWnB,cAAeoB,CAAAA,OAAf,CAAuB,MAAvB,CAAX,CAAjB;AACA,QAAIC,cAAc,EAAlB;AACA,QAAIC,eAAe,EAAnB;AACA,UAAM3B,iCAAIc,CAAAA,GAAJ,CAAQ,IAAR,GAAaK,SAAb,CAAwBH,CAAAA,IAAxB,CAA6B,CAACY,IAAD,EAAOC,GAAP,CAAA,IAAe;AAC9CH,iBAAA,GAAcI,MAAOC,CAAAA,IAAP,CAAYH,IAAZ,CAAA,CAAkB,CAAlB,CAAqBI,CAAAA,KAArB,CAA2B,CAA3B,CAAd;AAD8C,KAA5C,CAAN;AAGA,UAAMhC,iCAAIc,CAAAA,GAAJ,CAAQ,GAAR,GAAYY,WAAZ,CAAyBZ,CAAAA,GAAzB,CAA6B,MAA7B,CAAqCE,CAAAA,IAArC,CAA0C,CAACY,IAAD,EAAOC,GAAP,CAAA,IAAe;AAC3DF,kBAAA,GAAeC,IAAf;AAD2D,KAAzD,CAAN;AAGA,QAAIK,YAAuBC,CAAX,IAAIC,IAAJ,EAAWD,EAAAA,WAAX,EAAhB;AACA,QAAIE,SAAS,EAAb;AACA,UAAMpC,iCAAIc,CAAAA,GAAJ,CAAQ,GAAR,GAAYQ,UAAWe,CAAAA,GAAvB,CAA4BvB,CAAAA,GAA5B,CAAgC,OAAhC,CAAyCE,CAAAA,IAAzC,CAA8C,CAACY,IAAD,EAAOC,GAAP,CAAA,IAAe;AAC/DO,YAAA,GAASR,IAAT;AAD+D,KAA7D,CAAN;AAGA,QAAIU,OAAO,MAAMC,GAAIC,CAAAA,MAAJ,CAAWb,YAAX,EAAyBL,UAAzB,CAAjB;AACA,QAAImB,UAAU,oCAAVA,GAAwCL,MAAxCK,GAAiD,iBAAjDA,GAA+DrB,YAAnE;AACA,QAAIsB,mBAAmB,MAAMH,GAAII,CAAAA,OAAJ,CAAYF,OAAZ,EAAqBH,IAArB,CAA7B;AACA,UAAMtC,iCAAIc,CAAAA,GAAJ,CAAQ,MAAR,CAAgBA,CAAAA,GAAhB,CAAoBQ,UAAWe,CAAAA,GAA/B,CAAoCvB,CAAAA,GAApC,CAAwCY,WAAxC,CAAqDZ,CAAAA,GAArD,CAAyDmB,SAAzD,CAAoEW,CAAAA,GAApE,CAAwEF,gBAAxE,CAAN;AACA,UAAM1C,iCAAIc,CAAAA,GAAJ,CAAQ,MAAR,CAAgBA,CAAAA,GAAhB,CAAoBY,WAApB,CAAiCZ,CAAAA,GAAjC,CAAqCQ,UAAWe,CAAAA,GAAhD,CAAqDvB,CAAAA,GAArD,CAAyDmB,SAAzD,CAAoEW,CAAAA,GAApE,CAAwEF,gBAAxE,CAAN;AACA,UAAM1C,iCAAIc,CAAAA,GAAJ,CAAQ,MAAR,CAAgBA,CAAAA,GAAhB,CAAoBQ,UAAWe,CAAAA,GAA/B,CAAoCvB,CAAAA,GAApC,CAAwCY,WAAxC,CAAqDX,CAAAA,GAArD,EAA2DC,CAAAA,IAA3D,CAAgE,KAAM,CAACY,IAAD,EAAOC,GAAP,CAAN,IAAqB;AACvF,UAAIgB,MAAM,MAAMN,GAAIO,CAAAA,OAAJ,CAAYlB,IAAZ,EAAkBU,IAAlB,CAAhB;AADuF,KAArF,CAAN;AAIA5B,WAAQC,CAAAA,UAAWC,CAAAA,QAASmC,CAAAA,UAA5B,CAAuCtC,MAAOC,CAAAA,OAAQC,CAAAA,UAAWC,CAAAA,QAAS6B,CAAAA,OAA1E,EAAmF,EAAnF,CAAA;AAxBC;AAJmD;AAgCrDO,cAAeA,6CAAc,CAACC,IAAD,CAAO;AACvCvC,SAAQC,CAAAA,UAAWC,CAAAA,QAASmC,CAAAA,UAA5B,CAAuCtC,MAAOC,CAAAA,OAAQC,CAAAA,UAAWC,CAAAA,QAASsC,CAAAA,YAA1E,EAAwF,EAAxF,CAAA;AACA,MAAID,IAAJ,IAAY,kBAAZ,CAAgC;AAC5B,QAAIE,WAAW5B,IAAKC,CAAAA,KAAL,CAAWnB,cAAeoB,CAAAA,OAAf,CAAuB,MAAvB,CAAX,CAAf;AACA,QAAI2B,UAAU,EAAd;AACA,QAAIC,WAAW,EAAf;AACA,QAAIC,WAAW,EAAf;AACA,UAAMtD,iCAAIc,CAAAA,GAAJ,CAAQ,IAAR,GAAamC,IAAb,CAAmBjC,CAAAA,IAAnB,CAAwB,CAACY,IAAD,EAAOC,GAAP,CAAA,IAAe;AACzCuB,aAAA,GAAUtB,MAAOC,CAAAA,IAAP,CAAYH,IAAZ,CAAA,CAAkB,CAAlB,CAAqBI,CAAAA,KAArB,CAA2B,CAA3B,CAAV;AADyC,KAAvC,CAAN;AAGA,UAAMhC,iCAAIc,CAAAA,GAAJ,CAAQ,GAAR,GAAYsC,OAAZ,CAAqBtC,CAAAA,GAArB,CAAyB,MAAzB,CAAiCE,CAAAA,IAAjC,CAAsC,CAACY,IAAD,EAAOC,GAAP,CAAA,IAAe;AACvDwB,cAAA,GAAWzB,IAAX;AADuD,KAArD,CAAN;AAGA,QAAI2B,aAAa,MAAMhB,GAAIC,CAAAA,MAAJ,CAAWa,QAAX,EAAqBF,QAArB,CAAvB;AACA,UAAMnD,iCAAIc,CAAAA,GAAJ,CAAQ,MAAR,CAAgBA,CAAAA,GAAhB,CAAoBqC,QAASd,CAAAA,GAA7B,CAAkCvB,CAAAA,GAAlC,CAAsCsC,OAAtC,CAA+CrC,CAAAA,GAA/C,EAAqDC,CAAAA,IAArD,CAA0D,KAAM,CAACY,aAAD,EAAOC,YAAP,CAAN,IAAqB;AACjF,UAAI2B,mBAAmB,MAAMjB,GAAIO,CAAAA,OAAJ,CAAYlB,aAAZ,EAAkB2B,UAAlB,CAA7B;AACA,UAAInB,SAAS,EAAb;AACA,YAAMpC,iCAAIc,CAAAA,GAAJ,CAAQ,GAAR,GAAYqC,QAASd,CAAAA,GAArB,CAA0BvB,CAAAA,GAA1B,CAA8B,OAA9B,CAAuCE,CAAAA,IAAvC,CAA4C,CAACY,IAAD,EAAOC,GAAP,CAAA,IAAe;AAC7DO,cAAA,GAASR,IAAT;AAD6D,OAA3D,CAAN;AAGAlB,aAAQC,CAAAA,UAAWC,CAAAA,QAAS6C,CAAAA,QAA5B,CAAqChD,MAAOC,CAAAA,OAAQC,CAAAA,UAAWC,CAAAA,QAASsC,CAAAA,YAAxE,EAAsF,WAAtF,GAA8FrB,YAA9F,GAAoG,GAApG,GAA0G2B,gBAA1G,GAA6H,YAA7H,CAAA;AANiF,KAA/E,CAAN;AAZ4B;AAFO;AAlD3C;AAAA,IAAAE,+BAAA,EAAA;AAkDsBV;AAAAA,4BAAAA,CAAAA,cAAAA,GAAAA,4CAAAA;AAzCA1C;AAAAA,4BAAAA,CAAAA,IAAAA,GAAAA,kCAAAA;AASAY;AAAAA,4BAAAA,CAAAA,YAAAA,GAAAA,0CAAAA;;\",\n\"sources\":[\"starter/js/chatSystem.js\"],\n\"sourcesContent\":[\"import GUN from 'goog:module$node_modules$gun$browser';\\r\\nimport 'goog:module$node_modules$gun$sea';\\r\\n\\r\\n//var gun = GUN();\\r\\n//var gun = GUN(['https://gun-manhattan.herokuapp.com/gun']);\\r\\n//var gun = GUN('https://gun-relay.herokuapp.com/gun');\\r\\nvar gun = GUN({ peers: ['http:localhost:8001/gun'] });\\r\\nvar user = gun.user().recall({sessionStorage: true});\\r\\n\\r\\nexport async function init(username) {\\r\\n    var recipientList = window.starter.components.chatPage.recipient_list;\\r\\n    gun.get('users').map().once((user) => {\\r\\n        if (user != username) {\\r\\n            starter.components.chatPage.atom_conj(recipientList, user); \\r\\n        }\\r\\n    });\\r\\n}\\r\\n\\r\\nexport async function storeMessage(recipient, messageInput) {\\r\\n    if (recipient == \\\"Select recipient\\\") {\\r\\n        alert(\\\"Select a peer first!\\\");\\r\\n    }\\r\\n    else {\\r\\n        let senderPair = JSON.parse(sessionStorage.getItem('pair'));\\r\\n        let receiverPub = \\\"\\\";\\r\\n        let receiverEPub = \\\"\\\";\\r\\n        await gun.get('~@'+recipient).once((data, key) => {\\r\\n            receiverPub = Object.keys(data)[1].slice(1);      \\r\\n        });\\r\\n        await gun.get('~'+receiverPub).get('epub').once((data, key) => {\\r\\n            receiverEPub = data;     \\r\\n        });\\r\\n        let timeStamp = new Date().toUTCString();\\r\\n        let sender = \\\"\\\";\\r\\n        await gun.get('~'+senderPair.pub).get('alias').once((data, key) => {\\r\\n            sender = data;\\r\\n        });\\r\\n        let pass = await SEA.secret(receiverEPub, senderPair);\\r\\n        let message = '<span style=\\\"color: red\\\">' + sender + ': </span>' + messageInput; \\r\\n        let encryptedMessage = await SEA.encrypt(message, pass);\\r\\n        await gun.get(\\\"chat\\\").get(senderPair.pub).get(receiverPub).get(timeStamp).put(encryptedMessage);\\r\\n        await gun.get(\\\"chat\\\").get(receiverPub).get(senderPair.pub).get(timeStamp).put(encryptedMessage);\\r\\n        await gun.get(\\\"chat\\\").get(senderPair.pub).get(receiverPub).map().once(async (data, key) => {\\r\\n            let dec = await SEA.decrypt(data, pass);\\r\\n            //console.log(key, data, 'decrypted: ', dec);\\r\\n        });\\r\\n        starter.components.chatPage.atom_reset(window.starter.components.chatPage.message, \\\"\\\");\\r\\n    }\\r\\n}\\r\\n\\r\\nexport async function displayMessage(peer) {\\r\\n    starter.components.chatPage.atom_reset(window.starter.components.chatPage.message_list, \\\"\\\");\\r\\n    if (peer != \\\"Select recipient\\\") {\\r\\n        let selfPair = JSON.parse(sessionStorage.getItem('pair'));\\r\\n        let peerPub = \\\"\\\";\\r\\n        let peerEPub = \\\"\\\";\\r\\n        let chatRoom = \\\"\\\";\\r\\n        await gun.get('~@'+peer).once((data, key) => {\\r\\n            peerPub = Object.keys(data)[1].slice(1);      \\r\\n        });\\r\\n        await gun.get('~'+peerPub).get('epub').once((data, key) => {\\r\\n            peerEPub = data;     \\r\\n        });\\r\\n        let passphrase = await SEA.secret(peerEPub, selfPair);\\r\\n        await gun.get('chat').get(selfPair.pub).get(peerPub).map().once(async (data, key) => {\\r\\n            let decryptedMessage = await SEA.decrypt(data, passphrase);\\r\\n            let sender = \\\"\\\";\\r\\n            await gun.get('~'+selfPair.pub).get('alias').once((data, key) => {\\r\\n                sender = data;\\r\\n            });\\r\\n            starter.components.chatPage.atom_str(window.starter.components.chatPage.message_list, '<p>' + key + ' ' + decryptedMessage + '</p>')\\r\\n        });   \\r\\n        //await console.log(\\\"peerPub:\\\", peerPub);\\r\\n        //await console.log(\\\"peerEPub:\\\", peerEPub);\\r\\n    }\\r\\n    \\r\\n}\\r\\n\\r\\n\"],\n\"names\":[\"gun\",\"GUN\",\"peers\",\"user\",\"recall\",\"sessionStorage\",\"init\",\"username\",\"recipientList\",\"window\",\"starter\",\"components\",\"chatPage\",\"recipient_list\",\"get\",\"map\",\"once\",\"atom_conj\",\"storeMessage\",\"recipient\",\"messageInput\",\"alert\",\"senderPair\",\"JSON\",\"parse\",\"getItem\",\"receiverPub\",\"receiverEPub\",\"data\",\"key\",\"Object\",\"keys\",\"slice\",\"timeStamp\",\"toUTCString\",\"Date\",\"sender\",\"pub\",\"pass\",\"SEA\",\"secret\",\"message\",\"encryptedMessage\",\"encrypt\",\"put\",\"dec\",\"decrypt\",\"atom_reset\",\"displayMessage\",\"peer\",\"message_list\",\"selfPair\",\"peerPub\",\"peerEPub\",\"chatRoom\",\"passphrase\",\"decryptedMessage\",\"atom_str\",\"$jscomp$tmp$exports$module$name\"]\n}\n","~:eval-js","SHADOW_ENV.evalLoad(\"module$starter$js$chatSystem.js\", true , \"var module$node_modules$gun$browser \\x3d shadow.js.require(\\x22module$node_modules$gun$browser\\x22, {});\\nvar module$node_modules$gun$sea \\x3d shadow.js.require(\\x22module$node_modules$gun$sea\\x22, {});\\nvar gun$$module$starter$js$chatSystem \\x3d module$node_modules$gun$browser({peers:[\\x22http:localhost:8001/gun\\x22]});\\nvar user$$module$starter$js$chatSystem \\x3d gun$$module$starter$js$chatSystem.user().recall({sessionStorage:true});\\nasync function init$$module$starter$js$chatSystem(username) {\\n  var recipientList \\x3d window.starter.components.chatPage.recipient_list;\\n  gun$$module$starter$js$chatSystem.get(\\x22users\\x22).map().once(user \\x3d\\x3e {\\n    if (user !\\x3d username) {\\n      starter.components.chatPage.atom_conj(recipientList, user);\\n    }\\n  });\\n}\\nasync function storeMessage$$module$starter$js$chatSystem(recipient, messageInput) {\\n  if (recipient \\x3d\\x3d \\x22Select recipient\\x22) {\\n    alert(\\x22Select a peer first!\\x22);\\n  } else {\\n    let senderPair \\x3d JSON.parse(sessionStorage.getItem(\\x22pair\\x22));\\n    let receiverPub \\x3d \\x22\\x22;\\n    let receiverEPub \\x3d \\x22\\x22;\\n    await gun$$module$starter$js$chatSystem.get(\\x22~@\\x22 + recipient).once((data, key) \\x3d\\x3e {\\n      receiverPub \\x3d Object.keys(data)[1].slice(1);\\n    });\\n    await gun$$module$starter$js$chatSystem.get(\\x22~\\x22 + receiverPub).get(\\x22epub\\x22).once((data, key) \\x3d\\x3e {\\n      receiverEPub \\x3d data;\\n    });\\n    let timeStamp \\x3d (new Date()).toUTCString();\\n    let sender \\x3d \\x22\\x22;\\n    await gun$$module$starter$js$chatSystem.get(\\x22~\\x22 + senderPair.pub).get(\\x22alias\\x22).once((data, key) \\x3d\\x3e {\\n      sender \\x3d data;\\n    });\\n    let pass \\x3d await SEA.secret(receiverEPub, senderPair);\\n    let message \\x3d \\x27\\\\x3cspan style\\\\x3d\\x22color: red\\x22\\\\x3e\\x27 + sender + \\x22: \\\\x3c/span\\\\x3e\\x22 + messageInput;\\n    let encryptedMessage \\x3d await SEA.encrypt(message, pass);\\n    await gun$$module$starter$js$chatSystem.get(\\x22chat\\x22).get(senderPair.pub).get(receiverPub).get(timeStamp).put(encryptedMessage);\\n    await gun$$module$starter$js$chatSystem.get(\\x22chat\\x22).get(receiverPub).get(senderPair.pub).get(timeStamp).put(encryptedMessage);\\n    await gun$$module$starter$js$chatSystem.get(\\x22chat\\x22).get(senderPair.pub).get(receiverPub).map().once(async(data, key) \\x3d\\x3e {\\n      let dec \\x3d await SEA.decrypt(data, pass);\\n    });\\n    starter.components.chatPage.atom_reset(window.starter.components.chatPage.message, \\x22\\x22);\\n  }\\n}\\nasync function displayMessage$$module$starter$js$chatSystem(peer) {\\n  starter.components.chatPage.atom_reset(window.starter.components.chatPage.message_list, \\x22\\x22);\\n  if (peer !\\x3d \\x22Select recipient\\x22) {\\n    let selfPair \\x3d JSON.parse(sessionStorage.getItem(\\x22pair\\x22));\\n    let peerPub \\x3d \\x22\\x22;\\n    let peerEPub \\x3d \\x22\\x22;\\n    let chatRoom \\x3d \\x22\\x22;\\n    await gun$$module$starter$js$chatSystem.get(\\x22~@\\x22 + peer).once((data, key) \\x3d\\x3e {\\n      peerPub \\x3d Object.keys(data)[1].slice(1);\\n    });\\n    await gun$$module$starter$js$chatSystem.get(\\x22~\\x22 + peerPub).get(\\x22epub\\x22).once((data, key) \\x3d\\x3e {\\n      peerEPub \\x3d data;\\n    });\\n    let passphrase \\x3d await SEA.secret(peerEPub, selfPair);\\n    await gun$$module$starter$js$chatSystem.get(\\x22chat\\x22).get(selfPair.pub).get(peerPub).map().once(async(data$jscomp$0, key$jscomp$0) \\x3d\\x3e {\\n      let decryptedMessage \\x3d await SEA.decrypt(data$jscomp$0, passphrase);\\n      let sender \\x3d \\x22\\x22;\\n      await gun$$module$starter$js$chatSystem.get(\\x22~\\x22 + selfPair.pub).get(\\x22alias\\x22).once((data, key) \\x3d\\x3e {\\n        sender \\x3d data;\\n      });\\n      starter.components.chatPage.atom_str(window.starter.components.chatPage.message_list, \\x22\\\\x3cp\\\\x3e\\x22 + key$jscomp$0 + \\x22 \\x22 + decryptedMessage + \\x22\\\\x3c/p\\\\x3e\\x22);\\n    });\\n  }\\n}\\n/** @const */ \\nvar module$starter$js$chatSystem \\x3d {};\\n/** @const */ \\nmodule$starter$js$chatSystem.displayMessage \\x3d displayMessage$$module$starter$js$chatSystem;\\n/** @const */ \\nmodule$starter$js$chatSystem.init \\x3d init$$module$starter$js$chatSystem;\\n/** @const */ \\nmodule$starter$js$chatSystem.storeMessage \\x3d storeMessage$$module$starter$js$chatSystem;\\n\\n$CLJS.module$starter$js$chatSystem\\x3dmodule$starter$js$chatSystem;\");"]