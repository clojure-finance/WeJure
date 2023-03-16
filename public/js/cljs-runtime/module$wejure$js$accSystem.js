var module$node_modules$gun$browser = shadow.js.require("module$node_modules$gun$browser", {});
var module$node_modules$gun$sea = shadow.js.require("module$node_modules$gun$sea", {});
var gun$$module$wejure$js$accSystem = module$node_modules$gun$browser({peers:["http:localhost:8001/gun"]});
var user$$module$wejure$js$accSystem = gun$$module$wejure$js$accSystem.user().recall({sessionStorage:true});
var login$$module$wejure$js$accSystem = function(name, password) {
  user$$module$wejure$js$accSystem.auth(name, password, ({err}) => {
    if (err) {
      wejure.components.loginPage.stopLoading();
      alert(err);
    } else {
      gun$$module$wejure$js$accSystem.get("users");
      wejure.components.loginPage.stopLoading();
      wejure.components.loginPage.toMainPage();
    }
  });
};
var register$$module$wejure$js$accSystem = function(name, password) {
  user$$module$wejure$js$accSystem.create(name, password, ({err}) => {
    if (err) {
      wejure.components.registrationPage.stopLoading();
      alert(err);
    } else {
      gun$$module$wejure$js$accSystem.get("users").set(name);
      alert("Account created successfully");
      wejure.components.registrationPage.stopLoading();
      wejure.components.registrationPage.toLoginPage();
    }
  });
  return true;
};
var logout$$module$wejure$js$accSystem = function() {
  user$$module$wejure$js$accSystem.leave();
  window.location.reload(true);
};
/** @const */ 
var module$wejure$js$accSystem = {};
/** @const */ 
module$wejure$js$accSystem.login = login$$module$wejure$js$accSystem;
/** @const */ 
module$wejure$js$accSystem.logout = logout$$module$wejure$js$accSystem;
/** @const */ 
module$wejure$js$accSystem.register = register$$module$wejure$js$accSystem;

$CLJS.module$wejure$js$accSystem=module$wejure$js$accSystem;
//# sourceMappingURL=module$wejure$js$accSystem.js.map
