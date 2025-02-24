import GUN from 'gun';
import 'gun/sea';
import CryptoJS from 'crypto-js';

var gun = GUN({ peers: ['http://localhost:8001/gun'] });            // host configured in relay.js
var user = gun.user().recall({sessionStorage: true});

export function hashPassword(password) {
    var hash = CryptoJS.SHA256(password);
    hash = CryptoJS.enc.Hex.stringify(hash);
    return hash;
}


export function login(name, password) {                             // function for logging in
    var hashedPassword = hashPassword(password);
    user.auth(name, hashedPassword, ({ err }) => {
        if (err) {
            wejure.components.loginPage.stopLoading();
            alert(err);   
        } 
        else {
            sessionStorage.setItem("username", name);
            gun.get("user").get(name).get("icon_cid").once((data) => {
                sessionStorage.setItem("icon_cid", data);
            });
            wejure.components.loginPage.stopLoading();
            wejure.components.loginPage.toMainPage();               // redirect to the main page
        }
    });
}

export function register(name, password, cid) {
    var hashedPassword = hashPassword(password);
    
    // check if the username already exists
    gun.get("user").get(name).once((data) => {
        if (data) {
            // already exists
            wejure.components.registrationPage.stopLoading();
            alert("Username already exists. Please choose a different username.");
            location.reload();
        } else {
            // doesn't exist, proceed with registration
            user.create(name, hashedPassword, ({ err }) => {
                if (err) {
                    wejure.components.registrationPage.stopLoading();
                    alert(err);
                } else {
                    userInfo = {"icon_cid": cid, "bio": "", "is_following": {[name]: true}};
                    gun.get("user").get(name).put(userInfo);
                    gun.get("user").get(name).get("is_following").get(name).put(true);
                    wejure.components.registrationPage.stopLoading();
                    wejure.components.registrationPage.toLoginPage();
                }
            });
        }
    });
}

export function logout() {                                          // function for logging out
    user.leave();
    sessionStorage.clear();
}