import GUN from 'gun';
import 'gun/sea';

var gun = GUN({ peers: ['http://localhost:8001/gun'] });          // host configured in relay.js
var user = gun.user().recall({sessionStorage: true});

export function put() {                                         // n parameters (index from 0 to n-1)
    let path = "";                                              // 0 to (n-3): gun data path / context
    let key = arguments[arguments.length - 2];                  // (n-2)th: gun data key
    let value = arguments[arguments.length - 1];                // (n-1)th: gun data value which to be put in the gunDB
    for (i = 0; i <= arguments.length - 3; i++) {               // concatenate the gun data path
        path += arguments[i] + "/";
    }
    path = path.substring(0, path.length - 1);
    let keyword = key;
    console.log("path", path);
    console.log("keyword", keyword);
    gun.get(path).get(keyword).put(value);                          // put the value into the database
}

export function del() {
    let path = "";                                              // 0 to (n-2): gun data path / context
    let key = arguments[arguments.length - 1];                  // (n-1)th: gun data key
    for (i = 0; i <= arguments.length - 2; i++) {               // concatenate the gun data path
        path += arguments[i] + "/";
    }
    path = path.substring(0, path.length - 1);
    let keyword = key.name;
    console.log("path", path);
    console.log("keyword", keyword);
    gun.get(path).get(keyword).put(null);                          // delete the value from the database
}


export function clear() {
    let user = "user";
    console.log(gun.get(user));
    gun.get(user).put(null);
    let post = "post";
    gun.get(post).put(null);
}

export function once() {                                        // n parameters (index from 0 to n-1)
    let path = "";                                              // 0 to (n-3): gun data path / context
    let key = arguments[arguments.length - 2];                  // (n-2)th: gun data key
    let func = arguments[arguments.length - 1];                 // (n-1)th: the function to be executed with the gunDB context
    for (i = 0; i <= arguments.length - 3; i++) {               // concatenate the gun data path
        path += arguments[i] + "/";
    }
    path = path.substring(0, path.length - 1);   
    // print out the path and key
    // console.log("path", path);
    // console.log("key", key);
    // key {ns: null, name: 'Wed, 28 Aug 2024 14:11:15 GMT', fqn: 'Wed, 28 Aug 2024 14:11:15 GMT', _hash: null, cljs$lang$protocol_mask$partition0$: 2153775105, …}
    let keyword = key.name;
    // console.log("keyword", keyword);
    gun.get(path).get(keyword).once((data, keyword) => {                // executing the custom function
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