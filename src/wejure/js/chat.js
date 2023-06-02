import GUN from 'gun';
import 'gun/sea';
import 'gun/lib/then';
import 'gun/lib/promise';

var gun = GUN({ peers: ['http:localhost:8001/gun'] });                          // host configured in relay.js
var user = gun.user().recall({sessionStorage: true});

export function init(username) {                                                // initialize the chat room: add all the users into the select box
    let recipientList = window.wejure.components.chatPage.recipient_list;
    gun.get("users").map().once((user) => {
        if (user != username) {
            wejure.components.chatPage.atom_conj(recipientList, user); 
        }
    });
}

export async function storeMessage(recipient, messageInput) {                   // store the message in gunDB
    if (recipient == "") {
        alert("Select a peer first!");
    }
    else {
        let senderPair = JSON.parse(sessionStorage.getItem('pair'));            // get the key pair of the sender
        let receiverPub = "";
        let receiverEPub = "";
        await gun.get('~@'+recipient).once((data, key) => {                     // get the public key of the receiver
            receiverPub = Object.keys(data)[1].slice(1);      
        });
        await gun.get('~'+receiverPub).get('epub').once((data, key) => {        // get the encryption public key of the receiver
            receiverEPub = data;     
        });
        let timestamp = new Date().toUTCString();                               // the DateTime of the message sent
        let timeKey = Date.now();                                               // use the time of sending the message as the key of storing the message
        let sender = "";
        await gun.get('~'+senderPair.pub).get('alias').once((data, key) => {    // get the sender name
            sender = data;
        });
        let pass = await SEA.secret(receiverEPub, senderPair);                  // get the encryption key
        let message = {"timestamp": timestamp, "sender": sender, "content": messageInput};
        let encryptedMessage = await SEA.encrypt(message, pass);                                            // encrypt the message
        await gun.get("chat").get(senderPair.pub).get(receiverPub).get(timeKey).put(encryptedMessage);      // store the encrypted message in sender's side
        await gun.get("chat").get(receiverPub).get(senderPair.pub).get(timeKey).put(encryptedMessage);      // store the encrypted message in receiver's side
        wejure.components.chatPage.atom_reset(window.wejure.components.chatPage.message, "");               // clear the message input box
    }
}

export async function displayMessage(peer) {                                                            // display the messages when a peer is selected
    let selfPair = JSON.parse(sessionStorage.getItem('pair'));                                          // get the key pair of the user
    let peerPub = "";
    let peerEPub = "";
    await gun.get('~@'+peer).once((data, key) => {                                                      // get the public key of the peer
        peerPub = Object.keys(data)[1].slice(1);      
    });
    await gun.get('~'+peerPub).get('epub').once((data, key) => {                                        // get the encryption public key of the peer
        peerEPub = data;     
    });
    let passphrase = await SEA.secret(peerEPub, selfPair);                                                            // get the decryption key
    await gun.get('chat').get(selfPair.pub).get(peerPub).map().once(async (data, key) => {                            // scan through the stored messages
        let decryptedMessage = await SEA.decrypt(data, passphrase);                                                   // decrypt the message
        wejure.components.chatPage.add_message(window.wejure.components.chatPage.message_list, decryptedMessage);     // add the message for screen output
    });      
}

/*
export async function displayMessage(peer) {                                                            // display the messages when a peer is selected
    let selfPair = JSON.parse(sessionStorage.getItem('pair'));                                          // get the key pair of the user
    let peerPub = "";
    let peerEPub = "";
    await gun.get('~@'+peer).once((data, key) => {                                                      // get the public key of the peer
        peerPub = Object.keys(data)[1].slice(1);      
    });
    await gun.get('~'+peerPub).get('epub').once((data, key) => {                                        // get the encryption public key of the peer
        peerEPub = data;     
    });
    let passphrase = await SEA.secret(peerEPub, selfPair);                                                            // get the decryption key
    await gun.get('chat').get(selfPair.pub).get(peerPub).map().once(async (data, key) => {                            // scan through the stored messages
        let decryptedMessage = await SEA.decrypt(data, passphrase);                                                   // decrypt the message
        wejure.components.chatPage.add_message(window.wejure.components.chatPage.message_list, decryptedMessage);     // add the message for screen output
        console.log("before");
    }).then((resolved) => {
        if (resolved) {
            console.log("after");
        }  
    });
    console.log("after 2");      
    console.log(getIconCID("ben").then((resolved) => {console.log(resolved)}));
}
*/