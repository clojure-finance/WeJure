import GUN from 'gun';
import 'gun/sea';
import 'gun/lib/then';

var gun = GUN({ peers: ['http:localhost:8001/gun'] });              // host configured in relay.js
var user = gun.user().recall({sessionStorage: true});

export function searchUser(userSearch) {                                            // search for users with the input string userSearch 
    let resultList = window.wejure.components.searchPage.result_list;               // store the results
    gun.get("users").map().once((user) => {
        if (user.includes(userSearch)) {
            gun.get("iconCID").get(user).once((cid) => {                                // retrieve username and iconCID if a match is found
                let result = {"username": user, "iconCID": cid};    
                if (user == userSearch) {
                    wejure.components.searchPage.vector_prepend(resultList, result);    // add the result on top of the page if it is an exact match    
                }
                else {
                    wejure.components.searchPage.vector_append(resultList, result);     // add the result at the bottom to display it in the search result page    
                }
            });       
        }
    });
}

export async function getIconCID(username) {                            // get the iconCID from an username and add it to the profile-info atom
    let cid = await gun.get("iconCID").get(username).then();
    return cid;
}

export function followUser(self, username) {                            // follow username account with the self account
    gun.get("following").get(self).get(username).put(true);
    getIsFollowing(self, username);                                     // update the profile-info atom and refresh the page
}

export function unfollowUser(self, username) {                          // follow username account with the self account
    gun.get("following").get(self).get(username).put(false);
    getIsFollowing(self, username);                                     // update the profile-info atom and refresh the page    
}

export function getIsFollowing(self, username) {                                    // check whether self account is following the profile page visited
    let followed = false;                                                           // and add the information to the profile-info atom
    gun.get("following").get(self).get(username).once((followStatus) => {
        if (followStatus == true) {
            wejure.components.profilePage.map_assoc(window.wejure.components.profilePage.profile_info, "isFollowing", true);
            followed = true;
        }
    });
    if (followed == false) {
        wejure.components.profilePage.map_assoc(window.wejure.components.profilePage.profile_info, "isFollowing", false);
    }  
}