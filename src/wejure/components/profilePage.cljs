(ns wejure.components.profilePage
  (:require ["../js/profile" :as profile]
            [reagent-mui.material.box :refer [box]]
            [reagent-mui.material.button :refer [button]]
            [reagent-mui.material.paper :refer [paper]]
            [reagent-mui.material.avatar :refer [avatar]]
            [reagent-mui.material.typography :refer [typography]]
            [reagent.core :as r]))

(def ipfs-url "https://ipfs.io/ipfs/")               ;; IPFS gateway for retrieving files from IPFS

(def profile-info (r/atom nil))       ;; stores the information of the profile with respect to current user, item includes :iconCID, :isFollowing

;; function to add key-value pair to the target map, used in profile.js
(defn ^:export map-assoc [target-atom key value]
  (swap! target-atom assoc (keyword key) value))

(defn profile-page [{{:keys [username]} :path-params}]
  (profile/getIconCID username)
  (profile/getIsFollowing (js/sessionStorage.getItem "username") username)
  [:div {:style {:margin "0 20% 25px 20%"}}
    [paper {:id "user-card"                                  ;; user banner
            :variant "outlined"
            :sx {:height 200 :mb 2 :display "flex"}}
     [avatar {:sx {:mx 4 :my 6 :width 100 :height 100}       ;; user avatar
              :src (str ipfs-url (:iconCID @profile-info))}]
     [box {:sx {:my 6}}                                      ;; username display
      [typography {:sx {:font-size "30px"}}
       username]]
     [box {:style {:display "flex" :flex-grow 1 :justify-content "flex-end"}}         ;; button to follow / unfollow the user
      (if (= (:isFollowing @profile-info) false)
        [button {:sx {:mt 16 :mb 4 :mr 4 :width 100 :height 40 :border-radius 30}
                 :variant "outlined"
                 :on-click #(profile/followUser (js/sessionStorage.getItem "username") username)}
         "Follow"]
        [button {:sx {:mt 16 :mb 4 :mr 4 :width 100 :height 40 :border-radius 30}
                 :variant "outlined"
                 :on-click #(profile/unfollowUser (js/sessionStorage.getItem "username") username)}
         "Unfollow"])
      ]]])