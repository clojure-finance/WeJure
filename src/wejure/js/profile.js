import GUN from 'gun';
import 'gun/sea';

var gun = GUN({ peers: ['http:localhost:8001/gun'] });              // host configured in relay.js
var user = gun.user().recall({sessionStorage: true});

export function searchUser(userSearch) {                     
    let resultList = window.wejure.components.searchPage.result_list;
    gun.get("users").map().once((user) => {
        if (user.includes(userSearch)) {
            gun.get("iconCID").get(user).once((cid) => {
                let result = {"username": user, "iconCID": cid};
                if (user == userSearch) {
                    wejure.components.searchPage.vector_prepend(resultList, result); 
                }
                else {
                    wejure.components.searchPage.vector_append(resultList, result); 
                }
            });       
        }
    });
}

export async function getIconCID(username) {          
    await gun.get("iconCID").get(username).once((cid) => {
        wejure.components.profilePage.assoc_icon_cid(window.wejure.components.profilePage.profile_info, cid);
    });
}

