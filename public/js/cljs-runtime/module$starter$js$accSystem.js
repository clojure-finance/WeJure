var module$node_modules$gun$browser = shadow.js.require("module$node_modules$gun$browser", {});
var module$node_modules$gun$sea = shadow.js.require("module$node_modules$gun$sea", {});
var gun$$module$starter$js$accSystem = module$node_modules$gun$browser({peers:["http:localhost:8001/gun"]});
var user$$module$starter$js$accSystem = gun$$module$starter$js$accSystem.user().recall({sessionStorage:true});
var login$$module$starter$js$accSystem = function(name, password) {
  user$$module$starter$js$accSystem.auth(name, password, ({err}) => {
    if (err) {
      starter.components.loginPage.stopLoading();
      alert(err);
    } else {
      gun$$module$starter$js$accSystem.get("users");
      starter.components.loginPage.stopLoading();
      starter.components.loginPage.toMainPage();
    }
  });
};
var register$$module$starter$js$accSystem = function(name, password) {
  user$$module$starter$js$accSystem.create(name, password, ({err}) => {
    if (err) {
      starter.components.registrationPage.stopLoading();
      alert(err);
    } else {
      gun$$module$starter$js$accSystem.get("users").set(name);
      alert("Account created successfully");
      starter.components.registrationPage.stopLoading();
      starter.components.registrationPage.toLoginPage();
    }
  });
  return true;
};
var logout$$module$starter$js$accSystem = function() {
  user$$module$starter$js$accSystem.leave();
  window.location.reload(true);
};
/** @const */ 
var module$starter$js$accSystem = {};
/** @const */ 
module$starter$js$accSystem.login = login$$module$starter$js$accSystem;
/** @const */ 
module$starter$js$accSystem.logout = logout$$module$starter$js$accSystem;
/** @const */ 
module$starter$js$accSystem.register = register$$module$starter$js$accSystem;

$CLJS.module$starter$js$accSystem=module$starter$js$accSystem;
//# sourceMappingURL=module$starter$js$accSystem.js.map
