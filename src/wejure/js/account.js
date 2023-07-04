import GUN from 'gun';
import 'gun/sea';

var gun = GUN({ peers: ['http://localhost:8001/gun'] });            // host configured in relay.js
var user = gun.user().recall({sessionStorage: true});

export function login(name, password) {                             // function for logging in
    user.auth(name, password, ({ err }) => {
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

export function register(name, password, cid) {                     // function for registering the account
    user.create(name, password, ({ err }) => {
        if (err) {
            wejure.components.registrationPage.stopLoading();
            alert(err);
        } 
        else {
            userInfo = {"icon_cid": cid, "bio": "", "is_following": {}};            // user info object, to be stored in gunDB
            gun.get("user").get(name).put(userInfo);
            gun.get("user").get(name).get("is_following").get(name).put(true);
            alert("Account created successfully");
            wejure.components.registrationPage.stopLoading();
            wejure.components.registrationPage.toLoginPage();                       // redirect to the login page
        }
    });
}    

export function logout() {                                          // function for logging out
    user.leave();
    sessionStorage.clear();
}