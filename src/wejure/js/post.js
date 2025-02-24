import GUN from 'gun';
import 'gun/sea';
import 'gun/lib/then';

var gun = GUN({ peers: ['http://localhost:8001/gun'] });              // host configured in relay.js
var user = gun.user().recall({sessionStorage: true});

export function searchPost(postSearch) {
    let resultList = window.wejure.components.searchPagePost.post_result_list;
    
    gun.get("post").map().once((postInfo, uniqueKey) => {
        let text = postInfo.text;
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
