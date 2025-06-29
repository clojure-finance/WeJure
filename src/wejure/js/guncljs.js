import GUN from 'gun';
import 'gun/sea';
import 'gun/lib/webrtc';

// localStorage.setItem('log', 'webrtc');
var gun = GUN({ peers: [
        "http://localhost:8001/gun",
        "https://wejure-hku-13af49c560e0.herokuapp.com/gun",
    ],
    // localStorage: false,
    // radisk: false,
});

// retrive the relay server IP in GunDB and added to GUN peers, need further testing
async function setupRelayDiscovery() {
    const port = process.env.PORT || 8765;
    const publicIP = await getPublicIP();
    
    if (!publicIP) return;
  
    const selfUrl = `http://${publicIP}:${port}`;
    
    gun.get('relays').get(selfUrl).put({
      url: selfUrl,
      timestamp: Gun.state(),
      status: 'online'
    });
  
    gun.get('relays').map().on(async (data, id) => {
      if (!data || id === selfUrl) return;
  
      const peerUrl = data.url;
      
      if (!gun._.opt.peers.includes(peerUrl)) {
        console.log(`relay server discovered: ${peerUrl}`);
        gun._.opt.peers.push(peerUrl);
        
        const newGun = Gun({
          peers: [peerUrl],
          localStorage: false
        });
        
        newGun.get('relays').once(() => {
          newGun.get('relays').map().on(() => {});
        });
      }
    });
  }

//  discover the ip in the gun by using setupRelayDiscovery, then added to GUN peers
setupRelayDiscovery();

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

export function deleteUser(username) {
    gun.get("user").get(username).put(null);
    gun.get("user").get(username).get("is_following").put(null);
    deleteUserPosts(username);
}

function deleteUserPosts(username) {
    gun.get("post").get(username).once((data) => {
        if (data) {
            for (let timestamp in data) {
                if (data.hasOwnProperty(timestamp)) {
                    gun.del("post", username, timestamp);
                }
            }
        }
    });
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
    let keyword = key.name;
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