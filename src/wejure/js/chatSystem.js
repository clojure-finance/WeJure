import GUN from 'gun';
import 'gun/sea';

var gun = GUN({ peers: ['http:localhost:8001/gun'] });                          // host configured in relay.js
var user = gun.user().recall({sessionStorage: true});

export async function init(username) {                                          // initialize the chat room: add all the users into the select box
    let recipientList = window.wejure.components.chatPage.recipient_list;
    gun.get('users').map().once((user) => {
        if (user != username) {
            wejure.components.chatPage.atom_conj(recipientList, user); 
        }
    });
}

export async function storeMessage(recipient, messageInput) {                   // store the message in gunDB
    if (recipient == "Select recipient" || recipient == "") {
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
        let timeStamp = new Date().toUTCString();                               // use the time of sending the message as the key of storing the message
        let sender = "";
        await gun.get('~'+senderPair.pub).get('alias').once((data, key) => {    // get the sender name
            sender = data;
        });
        let pass = await SEA.secret(receiverEPub, senderPair);                  // get the encryption key
        let message = {"sender": sender, "content": messageInput};
        let encryptedMessage = await SEA.encrypt(message, pass);                                            // encrypt the message
        await gun.get("chat").get(senderPair.pub).get(receiverPub).get(timeStamp).put(encryptedMessage);    // store the encrypted message in sender's side
        await gun.get("chat").get(receiverPub).get(senderPair.pub).get(timeStamp).put(encryptedMessage);    // store the encrypted message in receiver's side
        wejure.components.chatPage.atom_reset(window.wejure.components.chatPage.message, "");               // clear the message input box
    }
}

export async function displayMessage(peer, prevPeer) {                                                      // display the messages when a peer is selected
    let id = window.wejure.components.chatPage.counter;
    let selfPair = JSON.parse(sessionStorage.getItem('pair'));                                              // get the key pair of the user
    if (prevPeer != "Select recipient" && prevPeer != "") {                                                 
        let prevPeerPub = "";
        await gun.get('~@'+prevPeer).once((data, key) => {
            prevPeerPub = Object.keys(data)[1].slice(1);      
        });
        //console.log("prevPeer: " + prevPeer + " prevPeerPub: " + prevPeerPub);
        gun.get('chat').get(selfPair.pub).get(prevPeerPub).off();      
    }
    if (peer != "Select recipient") {
        let peerPub = "";
        let peerEPub = "";
        await gun.get('~@'+peer).once((data, key) => {                                                      // get the public key of the peer
            peerPub = Object.keys(data)[1].slice(1);      
        });
        await gun.get('~'+peerPub).get('epub').once((data, key) => {                                        // get the encryption public key of the peer
            peerEPub = data;     
        });
        let passphrase = await SEA.secret(peerEPub, selfPair);                                              // get the decryption key
        await gun.get('chat').get(selfPair.pub).get(peerPub).map().once(async (data, key) => {              // scan through the stored messages
            let decryptedMessage = await SEA.decrypt(data, passphrase);                                     // decrypt the message
            let sender = "";
            await gun.get('~'+selfPair.pub).get('alias').once((data, key) => {
                sender = data;
            });
            decryptedMessage["timestamp"] = key;                                                                        // add timestamp to the message output
            wejure.components.chatPage.atom_conj(window.wejure.components.chatPage.message_list, decryptedMessage);     // add the message for screen output
        });    
    }
}

