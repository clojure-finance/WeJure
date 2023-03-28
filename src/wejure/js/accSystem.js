import GUN from 'gun';
import 'gun/sea';

var gun = GUN({ peers: ['http:localhost:8001/gun'] });        // host configured in relay.js
var user = gun.user().recall({sessionStorage: true});

export function login(name, password) {                       // function for logging in
    user.auth(name, password, ({ err }) => {
        if (err) {
            wejure.components.loginPage.stopLoading();
            alert(err);     
        } 
        else {
            sessionStorage.setItem("username", name);
            gun.get("users");                                       // retrieve the user list in gunDB
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
        gun.get("users").set(name);                                 // add the username into the user list in gunDB
            gun.get("iconCID").get(name).put(cid);                  // store the IPFS CID of the user into gunDB
            alert("Account created successfully");
            wejure.components.registrationPage.stopLoading();
            wejure.components.registrationPage.toLoginPage();       // redirect to the login page
        }
    });
    return true;
}    

export function logout() {                                          // function for logging out
    user.leave();
    sessionStorage.clear();
    window.location.reload(true);
}

export function isLogged() {                                        // check if the user has logged in before
    if (sessionStorage.getItem("recall") != null) {
        return true;
    }
    else {
        return false;
    }
}

export function getUserName() {
    return sessionStorage.getItem("username");
}

export function setIconCID(name, details) {                             // add the user's icon CID to the details atom with :icon-cid key
    gun.get("iconCID").get(name).once((data) => {
        wejure.components.loginPage.atom_assoc_cid(details, data);      // call the function in ClojureScript to perform map assoc to add the CID
    });                                                                 
}
