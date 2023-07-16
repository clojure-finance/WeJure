import GUN from 'gun';
import 'gun/sea';
import 'gun/lib/then';
import 'gun/lib/promise';
import { SHA256, enc } from 'crypto-js';

var gun = GUN({ peers: ['http://localhost:8001/gun'] });                          // host configured in relay.js
var user = gun.user().recall({sessionStorage: true});

export function init(username) {                                                // initialize the chat room: add all the users into the select box
    let recipientList = window.wejure.components.chatPage.recipient_list;
    gun.get("user").get(username).get("is_following").map().once((is_following, user) => {
        if (is_following == true && user != username) {
            wejure.components.chatPage.atom_conj(recipientList, user); 
        }
    });
}

export async function storeMessage(recipient, messageInput) {                   // store the message in gunDB
    if (recipient == "") {
        alert("Select a peer first!");
    }
    else {
        let sender = sessionStorage.getItem("username");
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
        let pass = await SEA.secret(receiverEPub, senderPair);                  // get the encryption key
        let message = {"timestamp": timestamp, "sender": sender, "content": messageInput};
        let encryptedMessage = await SEA.encrypt(message, pass);                            // encrypt the message
        let chatRoomID = "";
        if (sender < recipient) {                                                           // generate a chatRoomID as the storage path of the message between two users
            chatRoomID = SHA256(sender + "-" + recipient).toString(enc.Hex);                // compare the two username string and concatenate them with "-" in between
        }                                                                                   // then finally hash the string to get the chatRoomID
        else {
            chatRoomID = SHA256(recipient + "-" + sender).toString(enc.Hex);
        }
        await gun.get("chat").get(chatRoomID).get(timeKey).put(encryptedMessage);                   // store the encrypted message
        wejure.components.chatPage.atom_reset(window.wejure.components.chatPage.message, "");       // clear the message input box
    }
}

export async function displayMessage(peer) {                                            // display the messages when a peer is selected
    let username = sessionStorage.getItem("username");                                  // get the username of the logged user
    let selfPair = JSON.parse(sessionStorage.getItem('pair'));                          // get the key pair of the user
    let peerPub = "";
    let peerEPub = "";
    await gun.get('~@'+peer).once((data, key) => {                                      // get the public key of the peer
        peerPub = Object.keys(data)[1].slice(1);      
    });
    await gun.get('~'+peerPub).get('epub').once((data, key) => {                        // get the encryption public key of the peer
        peerEPub = data;     
    });
    let passphrase = await SEA.secret(peerEPub, selfPair);                              // get the decryption key
    let chatRoomID = "";
    if (username < peer) {                                                              // generate a chatRoomID as the storage path of the message between two users
        chatRoomID = SHA256(username + "-" + peer).toString(enc.Hex);                   // compare the two username string and concatenate them with "-" in between
    }                                                                                   // then finally hash the string to get the chatRoomID
    else {
        chatRoomID = SHA256(peer + "-" + username).toString(enc.Hex);
    }                                                          
    await gun.get('chat').get(chatRoomID).map().once(async (data, key) => {                                           // scan through the stored messages
        let decryptedMessage = await SEA.decrypt(data, passphrase);                                                   // decrypt the message
        wejure.components.chatPage.add_message(window.wejure.components.chatPage.message_list, decryptedMessage);     // add the message for screen output
    });      
}

export async function storeTest(recipient, messageInput) {                   // store the message in gunDB
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
        let chatRoomID = recipient + sender;
        console.log("Unencrypted ID: ", chatRoomID);
        console.log("Unencrypted Message: ", message);
        let encryptedMessage = await SEA.encrypt(message, pass);                                            // encrypt the message
        let encryptedChatRoomID = await SEA.encrypt(chatRoomID, pass);
        console.log("ID: ", encryptedChatRoomID);
        console.log("Message: ", encryptedMessage);
        gun.get("test").get(encryptedChatRoomID).put(encryptedMessage);
        // await gun.get("chat").get(senderPair.pub).get(receiverPub).get(timeKey).put(encryptedMessage);      // store the encrypted message in sender's side
        // await gun.get("chat").get(receiverPub).get(senderPair.pub).get(timeKey).put(encryptedMessage);      // store the encrypted message in receiver's side
        // wejure.components.chatPage.atom_reset(window.wejure.components.chatPage.message, "");               // clear the message input box
    }
}

export async function displayTest(peer) {                                                            // display the messages when a peer is selected
    let selfPair = JSON.parse(sessionStorage.getItem('pair'));                                          // get the key pair of the user
    let peerPub = "";
    let peerEPub = "";
    await gun.get('~@'+peer).once((data, key) => {                                                      // get the public key of the peer
        peerPub = Object.keys(data)[1].slice(1);      
    });
    await gun.get('~'+peerPub).get('epub').once((data, key) => {                                        // get the encryption public key of the peer
        peerEPub = data;     
    });
    let passphrase = await SEA.secret(peerEPub, selfPair);
    let chatRoomID = "test456test123";                                                            // get the decryption key
    let encryptedChatRoomID = await SEA.encrypt(chatRoomID, passphrase);
    console.log(passphrase);
    console.log(encryptedChatRoomID);
    await gun.get("test").once(async (data, key) => {                            // scan through the stored messages
        console.log("data: ", data);
        console.log(key);
        let decryptedMessage = await SEA.decrypt(data, passphrase);                                                   // decrypt the message
        console.log(decryptedMessage);     // add the message for screen output
    });      
}

export async function storeTest2(user1, user2) {                   // store the message in gunDB
    message = "abcde";
    let selfPair = JSON.parse(sessionStorage.getItem('pair'));
    const hash = SHA256("alice-bob");
    const hashedData = hash.toString(enc.Hex);
    console.log("hash: ", hashedData);
    //let encryptedMessage = await SEA.encrypt(message, selfPair);                                            // encrypt the message
    
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