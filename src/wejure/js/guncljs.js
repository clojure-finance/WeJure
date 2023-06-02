import GUN from 'gun';
import 'gun/sea';

var gun = GUN({ peers: ['http:localhost:8001/gun'] });          // host configured in relay.js
var user = gun.user().recall({sessionStorage: true});

export function put() {                                         // n parameters (index from 0 to n-1)
    let path = "";                                              // 0 to (n-3): gun data path / context
    let key = arguments[arguments.length - 2];                  // (n-2)th: gun data key
    let value = arguments[arguments.length - 1];                // (n-1)th: gun data value which to be put in the gunDB
    for (i = 0; i <= arguments.length - 3; i++) {               // concatenate the gun data path
        path += arguments[i] + "/";
    }
    path = path.substring(0, path.length - 1);   
    gun.get(path).get(key).put(value);                          // put the value into the database
}

export function once() {                                        // n parameters (index from 0 to n-1)
    let path = "";                                              // 0 to (n-3): gun data path / context
    let key = arguments[arguments.length - 2];                  // (n-2)th: gun data key
    let func = arguments[arguments.length - 1];                 // (n-1)th: the function to be executed with the gunDB context
    for (i = 0; i <= arguments.length - 3; i++) {               // concatenate the gun data path
        path += arguments[i] + "/";
    }
    path = path.substring(0, path.length - 1);   
    gun.get(path).get(key).once((data, key) => {                // executing the custom function
        func(data, key);
    });
}

export function set() {                                         // n parameters (index from 0 to n-1)
    let path = "";                                              // 0 to (n-2): gun data path / context
    let value = arguments[arguments.length - 1];                // (n-1)th: gun data value which to be added in the set
    for (i = 0; i <= arguments.length - 2; i++) {               // concatenate the gun data path
        path += arguments[i] + "/";
    }
    path = path.substring(0, path.length - 1);   
    gun.get(path).set(value);                                   // add the value to the set in the database
}

export function map_once() {                                    // n parameters (index from 0 to n-1)
    let path = "";                                              // 0 to (n-2): gun data path / context
    let func = arguments[arguments.length - 1];                 // (n-1)th: the function to be executed with the gunDB context
    for (i = 0; i <= arguments.length - 2; i++) {               // concatenate the gun data path
        path += arguments[i] + "/";
    }
    path = path.substring(0, path.length - 1);   
    gun.get(path).map().once((data, key) => {                   // executing the custom function
        func(data, key);
    });                                   
}

