var module$node_modules$gun$browser = shadow.js.require("module$node_modules$gun$browser", {});
var module$node_modules$gun$sea = shadow.js.require("module$node_modules$gun$sea", {});
var gun$$module$starter$components$accSystem = module$node_modules$gun$browser();
var user$$module$starter$components$accSystem = gun$$module$starter$components$accSystem.user().recall({sessionStorage:true});
var login$$module$starter$components$accSystem = function(name, password) {
  user$$module$starter$components$accSystem.auth(name, password, ({err}) => {
    if (err) {
      starter.components.loginPage.stopLoading();
      alert(err);
    } else {
      starter.components.loginPage.stopLoading();
      starter.components.loginPage.toMainPage();
    }
  });
};
var register$$module$starter$components$accSystem = function(name, password) {
  user$$module$starter$components$accSystem.create(name, password, ({err}) => {
    if (err) {
      starter.components.registrationPage.stopLoading();
      alert(err);
    } else {
      alert("Account created successfully");
      starter.components.registrationPage.stopLoading();
      starter.components.registrationPage.toLoginPage();
    }
  });
  return true;
};
/** @const */ 
var module$starter$components$accSystem = {};
/** @const */ 
module$starter$components$accSystem.login = login$$module$starter$components$accSystem;
/** @const */ 
module$starter$components$accSystem.register = register$$module$starter$components$accSystem;

$CLJS.module$starter$components$accSystem=module$starter$components$accSystem;
//# sourceMappingURL=module$starter$components$accSystem.js.map
