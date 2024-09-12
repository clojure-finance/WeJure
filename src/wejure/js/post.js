import GUN from 'gun';
import 'gun/sea';
import 'gun/lib/then';

var gun = GUN({ peers: ['http://localhost:8001/gun'] });              // host configured in relay.js
var user = gun.user().recall({sessionStorage: true});

export function searchPost(postSearch) {
    let resultList = window.wejure.components.searchPagePost.post_result_list;
    console.log("Post search:", postSearch);
    
    gun.get("post").map().once((postInfo, uniqueKey) => {
        console.log("Post uniqueKey:", uniqueKey);
        let text = postInfo.text;
        console.log("Post text:", text);
        
        if (text && text.includes(postSearch)) {
            if (postSearch == text) {
                wejure.components.searchPagePost.vector_prepend(resultList, postInfo);
            }
            else {
                wejure.components.searchPagePost.vector_append(resultList, postInfo);
            }
        }
    });
}

export function deletePost(username, timekey) {
  console.log("Username:", username);
  console.log("Timekey:", timekey);

  // 获取帖子的完整数据
  gun.get('post').get(timekey).once((data) => {
    if (data) {
      // 遍历帖子的每个字段并设置为 null
      Object.keys(data).forEach(key => {
        gun.get('post').get(timekey).get(key).put(null);
      });
      // 删除帖子
      gun.get('post').get(timekey).put(null);

      // 从用户的 is_following 列表中移除该帖子
      gun.get('user').get(username).get('is_following').once((followingList) => {
        if (followingList && followingList[timekey]) {
          gun.get('user').get(username).get('is_following').get(timekey).put(null);
        }
      });
    }
  });
}