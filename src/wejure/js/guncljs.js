import GUN from 'gun';
import 'gun/sea';

// var gun = GUN({ peers: [
//     'http://localhost:8001/gun',
//     'https://wejure-hku-13af49c560e0.herokuapp.com/gun'
// ] });          // host configured in relay.js
// var user = gun.user().recall({sessionStorage: true});

// 定义持久化存储的 key
// 定义存储键名
const NODES_STORAGE_KEY = "gun_nodes";
const NODE_EXPIRATION_DAYS = 30; // 节点过期时间：30 天

// 获取当前时间戳（毫秒）
function getCurrentTimestamp() {
  return Date.now();
}

// 从 localStorage 加载节点列表
function loadStoredNodes() {
  const storedNodes = localStorage.getItem(NODES_STORAGE_KEY);
  return storedNodes ? JSON.parse(storedNodes) : [];
}

// 保存节点列表到 localStorage
function saveNodes(nodes) {
  localStorage.setItem(NODES_STORAGE_KEY, JSON.stringify(nodes));
}

// 清理超过一个月未使用的节点
function cleanExpiredNodes(nodes) {
  const now = getCurrentTimestamp();
  const expirationTime = NODE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000; // 毫秒
  return nodes.filter((node) => now - node.lastUsed <= expirationTime);
}

// 初始化节点列表
let storedNodes = loadStoredNodes();

// 默认的初始节点
const defaultPeers = [
  "http://localhost:8001/gun",
  "https://wejure-hku-13af49c560e0.herokuapp.com/gun"
];

// 将默认节点和已知节点合并
let knownNodes = Array.from(
  new Map( // 使用 Map 去重，确保每个节点地址唯一
    [
      ...storedNodes.map((node) => [node.url, node]),
      ...defaultPeers.map((url) => [url, { url, lastUsed: getCurrentTimestamp() }])
    ]
  ).values()
);

// 清理过期节点
knownNodes = cleanExpiredNodes(knownNodes);
saveNodes(knownNodes);

// 初始化 GUN 实例
var gun = GUN({
  peers: knownNodes.map((node) => node.url),
});

// 监听节点连接并更新使用时间
gun.on("hi", (peer) => {
  console.log("Connected to peer:", peer.url);
  const now = getCurrentTimestamp();

  const nodeIndex = knownNodes.findIndex((node) => node.url === peer.url);
  if (nodeIndex > -1) {
    // 更新已知节点的最后使用时间
    knownNodes[nodeIndex].lastUsed = now;
  } else {
    // 如果是新节点，添加到列表
    knownNodes.push({ url: peer.url, lastUsed: now });
  }

  saveNodes(knownNodes); // 保存更新后的节点列表
});

// 监听节点断开（可选）
gun.on("bye", (peer) => {
  console.log("Disconnected from peer:", peer.url);
  // 不需要更新时间戳，仅记录日志
});

// 心跳检查（可选，用于保证节点健康）
async function heartbeatCheck() {
  console.log("Performing heartbeat check...");
  const updatedNodes = [];
  for (const node of knownNodes) {
    try {
      const response = await fetch(node.url, { method: "HEAD", timeout: 5000 });
      if (response.ok) {
        console.log(`Node is alive: ${node.url}`);
        // 更新节点的最后使用时间
        updatedNodes.push({ ...node, lastUsed: getCurrentTimestamp() });
      } else {
        console.warn(`Node responded but not OK: ${node.url}`);
      }
    } catch (error) {
      console.warn(`Node is unreachable: ${node.url}`, error);
    }
  }

  // 更新可用节点列表
  knownNodes = updatedNodes;
  saveNodes(knownNodes);
  gun.opt({ peers: updatedNodes.map((node) => node.url) });
}

// 定期执行心跳检查
setInterval(heartbeatCheck, 60000);

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
    // 删除用户的主要信息
    gun.get("user").get(username).put(null);

    // 删除用户的关注信息（如果有的话）
    gun.get("user").get(username).get("is_following").put(null);

    // 如果需要删除用户的所有帖子，可以调用删除帖子的函数
    // 这里假设你有一个函数可以删除用户的所有帖子
    deleteUserPosts(username);
}

// 删除用户的所有帖子
function deleteUserPosts(username) {
    gun.get("post").get(username).once((data) => {
        if (data) {
            for (let timestamp in data) {
                if (data.hasOwnProperty(timestamp)) {
                    // 删除每个帖子
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