import GUN from 'gun';
import 'gun/sea';

var gun = GUN({ peers: ['http:localhost:8001/gun'] });              // host configured in relay.js
var user = gun.user().recall({sessionStorage: true});

export var login = function(name, password) {                       // function for logging in
    user.auth(name, password, ({ err }) => {
        if (err) {
            wejure.components.loginPage.stopLoading();
            alert(err);     
        } 
        else {
            gun.get("users");                                       // retrieve the user list in gunDB
            wejure.components.loginPage.stopLoading();
            wejure.components.loginPage.toMainPage();               // redirect to the main page
        }
    });
}

export var register = function(name, password) {                    // function for registering the account
    user.create(name, password, ({ err }) => {
        if (err) {
            wejure.components.registrationPage.stopLoading();
            alert(err);
        } 
        else {
            gun.get("users").set(name);                             // add the username into the user list in gunDB
            alert("Account created successfully");
            wejure.components.registrationPage.stopLoading();
            wejure.components.registrationPage.toLoginPage();       // redirect to the login page
        }
    });
    return true;
}    

export var logout = function() {                                    // function for logging out
    user.leave();
    window.location.reload(true);
}


