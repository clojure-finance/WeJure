import GUN from 'gun';
import 'gun/sea';
import 'gun/lib/then';
import 'gun/lib/promise';
import { SHA256, enc } from 'crypto-js';

var gun = GUN({ peers: ['http://localhost:8001/gun'] });                          // host configured in relay.js
var user = gun.user().recall({sessionStorage: true});

export async function init(username) {
    console.log("chat.js: init function called with username:", username);
    
    let recipientList = window.wejure.components.chatPage.recipient_list;
    let groupList = window.wejure.components.chatPage.group_list;

    const updateContactsList = async () => {
        const blacklist = [];
        await new Promise(resolve => {
            gun.get("user").get(username).get("blacklist").map().on((_, blockedUser) => {
                if (!blacklist.includes(blockedUser)) {
                    blacklist.push(blockedUser);
                    updateAllContacts();
                }
            });
            setTimeout(resolve, 200);
        });
        console.log("Blacklist fetched:", blacklist);

        const updateAllContacts = async () => {
            const followers = new Set();
            const chatPeers = new Set();

            await Promise.all([
                new Promise(resolve => {
                    gun.get("user").get(username).get("is_following").map().on((is_following, user) => {
                        if (is_following === true && user !== username) {
                            followers.add(user);
                            updateFinalContacts();
                        }
                    });
                    setTimeout(resolve, 200);
                }),
                
                new Promise(resolve => {
                    gun.get("user").get(username).get("chat_list").get("chat").map().on((chatData, chatRoomID) => {
                        if (chatData && chatData.peer && chatData.peer !== username) {
                            chatPeers.add(chatData.peer);
                            updateFinalContacts();
                        }
                    });
                    setTimeout(resolve, 200);
                })
            ]);

            console.log("Followers fetched:", followers);
            console.log("Chat peers fetched:", chatPeers);
            
            function updateFinalContacts() {
                const uniqueContacts = new Set([...followers, ...chatPeers]);
                console.log("Combined unique contacts:", uniqueContacts);
                
                const filteredContacts = [...uniqueContacts].filter(user => !blacklist.includes(user));
                console.log("Contacts after filtering blacklist:", filteredContacts);
                
                const contactsArray = filteredContacts.map(async (user) => {
                    try {
                        // Get user profile information including avatar
                        const userProfile = await new Promise(resolve => {
                            gun.get("user").get(user).get("profile").once(profile => {
                                resolve(profile || {});
                            });
                        });
                        
                        // Get avatar CID
                        const avatarCid = await new Promise(resolve => {
                            gun.get("user").get(user).get("profile").get("icon_cid").once(iconCid => {
                                resolve(iconCid || null);
                            });
                        });
                        
                        return {
                            id: user,
                            name: userProfile.display_name || user,
                            avatar: avatarCid,
                            last_message: null,
                            last_message_time: 0
                        };
                    } catch (error) {
                        console.error(`Error fetching profile for ${user}:`, error);
                        return {
                            id: user,
                            name: user,
                            avatar: null,
                            last_message: null,
                            last_message_time: 0
                        };
                    }
                });
                
                Promise.all(contactsArray).then(contactsArray => {
                    console.log("Final contacts array to be sent to ClojureScript:", contactsArray);
                    wejure.components.chatPage.atom_reset(recipientList, contactsArray);
                    // Remove any automatic updates - make it manual only
                }).catch(error => {
                    console.error("Error fetching contacts:", error);
                    // Set empty array on error to prevent corruption
                    wejure.components.chatPage.atom_reset(recipientList, []);
                });
            }
            
            updateFinalContacts();
        };
        
        updateAllContacts();
    };
    
    const updateGroupsList = async () => {
        gun.get("user").get(username).get("chat_list").get("group").map().on(async (data, groupID) => {
            if (!groupID) return;
            
            const groupName = await new Promise(resolve => {
                gun.get("groups").get(groupID).get("group_name").once(g => resolve(g));
            });
            
            wejure.components.chatPage.atom_conj(groupList, {
                id: groupID,
                name: groupName || groupID
            });
        });
    };
    
    await updateContactsList();
    await updateGroupsList();
}


// remember to refresh the chat page after an operation of blacklist has done to reinitialize the chatlist
export async function addToBlacklist(usernameToBlock) {
    const currentUser = sessionStorage.getItem("username");
    
    // add user to my blacklist
    await gun.get("user").get(currentUser).get("blacklist").get(usernameToBlock).put(true);
    
    // add  me to their blacklist
    await gun.get("user").get(usernameToBlock).get("blockedBy").get(currentUser).put(true);
    
    alert(`You have blocked ${usernameToBlock}`);
}
export async function removeFromBlacklist(usernameToUnblock) {
    const currentUser = sessionStorage.getItem("username");
    
    // remove user from my blacklist
    await gun.get("user").get(currentUser).get("blacklist").get(usernameToUnblock).put(null);
    
    // remove me from their blacklist
    await gun.get("user").get(usernameToUnblock).get("blockedBy").get(currentUser).put(null);
    
    alert(`Your have remove ${usernameToUnblock} from your blacklist`);
}

// export async function getBlacklist(username) {
//     const myBlockedList = [];
//     await gun.get("user").get(username).get("blacklist").map().once((_, username) => {
//         if (username) myBlockedList.push(username);
//     });
//     return myBlockedList;
// }

export async function displayBlacklist() {
    const blacklist = [];
    gun.get("user").get(wejure.components.profilePage.profile_info.username).get("blockedBy").map().once((_, blocker) => {
        if (blocker) blacklist.push(blocker);
    });
    wejure.components.profilePage.updateBlacklistDisplay(blacklist);
}

export async function storeMessage(recipient, messageInput) {                   // store the message in gunDB
    if (recipient == "") {
        alert("Select a peer first!");
    }
    else {
        let sender = sessionStorage.getItem("username");
        const isBlocked = await gun.get("user").get(recipient).get("blacklist").get(sender).once();
        if (isBlocked) {
            alert("You are blocked by this user.");
            wejure.components.chatPage.atom_reset(window.wejure.components.chatPage.blocked, true);
            return;
        }
        const haveBlocked = await gun.get("user").get(sender).get("blacklist").get(recipient).once();
        if (haveBlocked) {
            alert("You have blocked this user.");
            wejure.components.chatPage.atom_reset(window.wejure.components.chatPage.blocking, true);
            return;
        }
        let senderPair = JSON.parse(sessionStorage.getItem('pair'));            // get the key pair of the sender
        let receiverPub = "";
        let receiverEPub = "";
        await gun.get('~@'+recipient).once((data, key) => {                     // get the public key of the receiver
            receiverPub = Object.keys(data)[1].slice(1);      
        });
        await gun.get('~'+receiverPub).get('epub').once((data, key) => {        // get the encryption public key of the receiver
            receiverEPub = data;     
        });
        let senderPub  = "";
        let senderEPub = "";
        await gun.get('~@'+sender).once((data, key) => {
            senderPub = Object.keys(data)[1].slice(1);
        });
        await gun.get('~'+senderPub).get('epub').once((data, key) => {
            senderEPub = data;
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
        await gun.get("chat").get(chatRoomID).get(timeKey).put(encryptedMessage);

        let receiverRecord = {
            "peer": sender,
            "last_message_time": timeKey
        };

        let senderRecord = {
            "peer": recipient,
            "last_message_time": timeKey
        };
        // update the chat list for both sender and receiver
        await gun.get("user").get(sender).get("chat_list").get("chat").get(chatRoomID).put();
        await gun.get("user").get(recipient).get("chat_list").get("chat").get(chatRoomID).put(receiverRecord);

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

// export async function storeTest(recipient, messageInput) {                   // store the message in gunDB
//     if (recipient == "") {
//         alert("Select a peer first!");
//     }
//     else {
//         let senderPair = JSON.parse(sessionStorage.getItem('pair'));            // get the key pair of the sender
//         let receiverPub = "";
//         let receiverEPub = "";
//         await gun.get('~@'+recipient).once((data, key) => {                     // get the public key of the receiver
//             receiverPub = Object.keys(data)[1].slice(1);      
//         });
//         await gun.get('~'+receiverPub).get('epub').once((data, key) => {        // get the encryption public key of the receiver
//             receiverEPub = data;     
//         });
//         let timestamp = new Date().toUTCString();                               // the DateTime of the message sent
//         let timeKey = Date.now();                                               // use the time of sending the message as the key of storing the message
//         let sender = "";
//         await gun.get('~'+senderPair.pub).get('alias').once((data, key) => {    // get the sender name
//             sender = data;
//         });
//         let pass = await SEA.secret(receiverEPub, senderPair);                  // get the encryption key
//         let message = {"timestamp": timestamp, "sender": sender, "content": messageInput};
//         let chatRoomID = recipient + sender;
//         console.log("Unencrypted ID: ", chatRoomID);
//         console.log("Unencrypted Message: ", message);
//         let encryptedMessage = await SEA.encrypt(message, pass);                                            // encrypt the message
//         let encryptedChatRoomID = await SEA.encrypt(chatRoomID, pass);
//         console.log("ID: ", encryptedChatRoomID);
//         console.log("Message: ", encryptedMessage);
//         gun.get("test").get(encryptedChatRoomID).put(encryptedMessage);
//         // await gun.get("chat").get(senderPair.pub).get(receiverPub).get(timeKey).put(encryptedMessage);      // store the encrypted message in sender's side
//         // await gun.get("chat").get(receiverPub).get(senderPair.pub).get(timeKey).put(encryptedMessage);      // store the encrypted message in receiver's side
//         // wejure.components.chatPage.atom_reset(window.wejure.components.chatPage.message, "");               // clear the message input box
//     }
// }

// export async function displayTest(peer) {                                                            // display the messages when a peer is selected
//     let selfPair = JSON.parse(sessionStorage.getItem('pair'));                                          // get the key pair of the user
//     let peerPub = "";
//     let peerEPub = "";
//     await gun.get('~@'+peer).once((data, key) => {                                                      // get the public key of the peer
//         peerPub = Object.keys(data)[1].slice(1);      
//     });
//     await gun.get('~'+peerPub).get('epub').once((data, key) => {                                        // get the encryption public key of the peer
//         peerEPub = data;     
//     });
//     let passphrase = await SEA.secret(peerEPub, selfPair);
//     let chatRoomID = "test456test123";                                                            // get the decryption key
//     let encryptedChatRoomID = await SEA.encrypt(chatRoomID, passphrase);
//     console.log(passphrase);
//     console.log(encryptedChatRoomID);
//     await gun.get("test").once(async (data, key) => {                            // scan through the stored messages
//         console.log("data: ", data);
//         console.log(key);
//         let decryptedMessage = await SEA.decrypt(data, passphrase);                                                   // decrypt the message
//         console.log(decryptedMessage);     // add the message for screen output
//     });      
// }

// export async function storeTest2(user1, user2) {                   // store the message in gunDB
//     message = "abcde";
//     let selfPair = JSON.parse(sessionStorage.getItem('pair'));
//     const hash = SHA256("alice-bob");
//     const hashedData = hash.toString(enc.Hex);
//     console.log("hash: ", hashedData);
//     //let encryptedMessage = await SEA.encrypt(message, selfPair);                                            // encrypt the message
    
// }

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

// functions to support the group chat function
export async function createMainGroup(groupName, members) {
    let creator = sessionStorage.getItem("username");
    let creatorPair = JSON.parse(sessionStorage.getItem('pair'));
    
    let groupID = SHA256(Date.now() + creator + Math.random()).toString(enc.Hex);
    
    let groupKey = await SEA.random(32).toString();
    
    await gun.get("groups").get(groupID).put({
        name: groupName,
        creator: creator,
        created: new Date().toUTCString(),
        currentlayer: 1,
        totallayer: 1 // only the first layer have this attribute
    });
    let layer = 1;
    let allMembers = [creator, ...members];
    for (let member of allMembers) {
        await gun.get("groups").get(groupID).get(layer).get("members").set(member);
        await gun.get("user").get(member).get("groups").set(groupID);
        
        let memberPub = "";
        let memberEPub = "";
        
        await gun.get('~@'+member).once((data) => {
            if (data) {
                let pubKeyField = Object.keys(data).find(key => key.startsWith('~'));
                if (pubKeyField) {
                    memberPub = pubKeyField.slice(1);
                }
            }
        });
        
        if (memberPub) {
            await gun.get('~'+memberPub).get('epub').once((data) => {
                memberEPub = data;
            });
            
            if (memberEPub) {
                let sharedSecret = await SEA.secret(memberEPub, creatorPair);
                let encryptedGroupKey = await SEA.encrypt(groupKey, sharedSecret);
                await gun.get("groupKeys").get(groupID).get(member).get(layer).put(encryptedGroupKey);
            }
        }
    }
    storeGroupMessage(groupID, "Welcome to the group!")
    return groupID;
}

export async function createSubGroup(groupID, members) {

    let subGroupKey = await SEA.random(32).toString();
    
    let numOfLayers = 0;
    await gun.get("groups").get(groupID).get("totallayer").once((totallayer) => {
        numOfLayers = totallayer;
    });

    numOfLayers++;
    await gun.get("groups").get(groupID).get("totallayer").put(numOfLayers);

    let layer = numOfLayers;
    
    let allMembers = [creator, ...members];
    for (let member of allMembers) {
        await gun.get("groups").get(groupID).get(layer).get("members").set(member);
        await gun.get("user").get(member).get("groups").set(groupID);
        
        let memberPub = "";
        let memberEPub = "";
        
        await gun.get('~@'+member).once((data) => {
            if (data) {
                let pubKeyField = Object.keys(data).find(key => key.startsWith('~'));
                if (pubKeyField) {
                    memberPub = pubKeyField.slice(1);
                }
            }
        });
        
        if (memberPub) {
            await gun.get('~'+memberPub).get('epub').once((data) => {
                memberEPub = data;
            });
            
            if (memberEPub) {
                let sharedSecret = await SEA.secret(memberEPub, creatorPair);
                let encryptedGroupKey = await SEA.encrypt(subGroupKey, sharedSecret);
                await gun.get("groupKeys").get(groupID).get(member).get(layer).put(encryptedGroupKey);
            }
        }
    }
    
    return groupID;
}
async function getGroupKey(groupID, layer) {
    let username = sessionStorage.getItem("username");
    let userPair = JSON.parse(sessionStorage.getItem('pair'));
    
    // 获取为当前用户加密的群组密钥
    let encryptedGroupKey = null;
    await gun.get("groupKeys").get(groupID).get(layer).get(username).once((data) => {
        encryptedGroupKey = data;
    });
    
    if (!encryptedGroupKey) {
        console.error("Group key not found for user");
        return null;
    }
    
    try {
        let creator = "";
        await gun.get("groups").get(groupID).get("creator").once((data) => {
            creator = data;
        });

        // 获取创建者的加密公钥
        let creatorPub = "";
        let creatorEPub = "";

        await gun.get('~@'+creator).once((data) => {
            if (data) {
                let pubKeyField = Object.keys(data).find(key => key.startsWith('~'));
                if (pubKeyField) {
                    creatorPub = pubKeyField.slice(1);
                }
            }
        });

        if (creatorPub) {
            await gun.get('~'+creatorPub).get('epub').once((data) => {
                creatorEPub = data;
            });
        }

        // 成员使用创建者的公钥和自己的私钥 - 这样才能生成相同的共享密钥
        let sharedSecret = await SEA.secret(creatorEPub, userPair);
        return await SEA.decrypt(encryptedGroupKey, sharedSecret);

    } catch (error) {
        console.error("Error decrypting group key:", error);
        return null;
    }
}
// If we want to prevent the newly invited member from accessing previous message (current layer only), 
// we need to create new layer when new member is added, the current
// implementation prevent the newly invited member from accessing previous message by creating new layer.
export async function addMemberToGroup(groupID, newMember) {
    let currentUser = sessionStorage.getItem("username");
    let userPair = JSON.parse(sessionStorage.getItem('pair'));
    
    let isCreator = false;
    await gun.get("groups").get(groupID).get("creator").once((creator) => {
        isCreator = (creator === currentUser);
    });
    if (!isCreator) {
        alert("Only group creator can add new members!");
        return false;
    }

    let numOfLayers = 0;
    await gun.get("groups").get(groupID).get("totallayer").once((totallayer) => {
        numOfLayers = totallayer;
    });
    
    let members = null;
    await gun.get("groups").get(groupID).get(numOfLayers).get("members").once((m) => {
        members = m;
    });

    // add new member into m
    m.push(newMember);
    createSubGroup(groupID, newMember);
    
    return true;
}

export async function storeGroupMessage(groupID, messageInput) {
    let sender = sessionStorage.getItem("username");
    let senderPair = JSON.parse(sessionStorage.getItem('pair'));
    let timestamp = new Date().toUTCString();
    let timeKey = Date.now(); // 使用当前时间戳作为消息的唯一键

    let numOfLayers = 0;
    let group_name  = "";
    await gun.get("groups").get(groupID).get("totallayer").once((totallayer) => {
        numOfLayers = totallayer;
    });
    await gun.get("groups").get(groupID).get("group_name").once((g) => {
        group_name = g;
    });
    // 获取群组密钥
    let groupKey = await getGroupKey(groupID, numOfLayers);
    if (!groupKey) {
        alert("Could not retrieve group key. You may not be a member of this group.");
        return false;
    }
    
    // 构建消息对象
    let message = {
        "timestamp": timestamp, 
        "sender": sender, 
        "content": messageInput
    };
    
    // 使用群组密钥加密消息
    let encryptedMessage = await SEA.encrypt(message, groupKey);
    
    // 将加密的消息存储在群组聊天路径下
    await gun.get("groupChat").get(groupID).get(numOfLayers).get(timeKey).put(encryptedMessage); 

    // update the chat list for all members
    let members = null;
    await gun.get("groups").get(groupID).get(numOfLayers).get("members").once((m) => {
        members = m;
    });
    for (let member of members) {
        let memberRecord = {
            "groupID": groupID,
            "group_name": group_name,
            "timeKey": timeKey
        };
        let encryptedMemberRecord = await SEA.encrypt(memberRecord, groupKey);
        await gun.get("user").get(member).get("chat_list").get("group").get(groupID).put(encryptedMemberRecord);
    }
    
    // 清空消息输入框
    wejure.components.chatPage.atom_reset(window.wejure.components.chatPage.message, "");
    
    return true;
}

export async function displayGroupMessages(groupID) {
    let username = sessionStorage.getItem("username");

    let numOfLayers = 0;
    await gun.get("groups").get(groupID).get("totallayer").once((totallayer) => {
        numOfLayers = totallayer;
    });
    
    let allMessages = [];
    for (let layer = 1; layer < numOfLayers+1; layer++) {
        // 尝试获取当前层的群组密钥
        let groupKey = null;
        try {
            groupKey = await getGroupKey(groupID, layer);
        } catch (error) {
            console.log(`No access to layer ${layer} for group ${groupID}`);
            continue; // 如果无法获取密钥，跳过此层
        }
        
        if (!groupKey) {
            console.log(`No key available for layer ${layer}`);
            continue;
        }
        
        // 获取并解密当前层的群组消息
        await new Promise(resolve => {
            gun.get("groupChat").get(groupID).get(layer).map().once(async (encryptedData, timeKey) => {
                if (!encryptedData) return; // 跳过空数据
                
                try {
                    // 使用群组密钥解密消息
                    let decryptedMessage = await SEA.decrypt(encryptedData, groupKey);
                    
                    if (decryptedMessage) {
                        // 将解密后的消息添加到消息集合，包含时间戳以便排序
                        allMessages.push({
                            message: decryptedMessage,
                            time: parseInt(timeKey),
                            layer: layer
                        });
                    }
                } catch (error) {
                    console.error(`Error decrypting message from layer ${layer}:`, error);
                }
            });
            
            // GunDB的异步特性可能导致不会立即获取所有消息
            // 使用setTimeout确保我们给GunDB足够的时间来检索消息
            setTimeout(() => resolve(), 500);
        });
    }
    
    // 按时间戳排序所有收集到的消息
    allMessages.sort((a, b) => a.time - b.time);
    
    // 显示排序后的消息
    for (let item of allMessages) {
        wejure.components.chatPage.add_message(
            window.wejure.components.chatPage.group_message_list, 
            item.message
        );
    }
    
    return true;
}

export async function leaveGroup(groupID) {
    let username = sessionStorage.getItem("username");
    
    let numOfLayers = 0;
    await gun.get("groups").get(groupID).get("totallayer").once((totallayer) => {
        numOfLayers = totallayer;
    });
    let members = null;
    await gun.get("groups").get(groupID).get(numOfLayers).get("members").once((m) => {
        members = m;
    });

    let updatedMembers = currentMembers.filter(member => member !== username);
    createSubGroup(groupID, updatedMembers);

    return true;
}