(ns wejure.components.profilePage
  (:require clojure.walk
            ["../js/profile" :as profile]
            ["../js/guncljs" :as gun]
            [reagent-mui.material.box :refer [box]]
            [reagent-mui.material.button :refer [button]]
            [reagent-mui.material.paper :refer [paper]]
            [reagent-mui.material.avatar :refer [avatar]]
            [reagent-mui.material.typography :refer [typography]]
            [reagent-mui.material.text-field :refer [text-field]]
            [reagent-mui.material.dialog :refer [dialog]]
            [reagent-mui.material.dialog-title :refer [dialog-title]]
            [reagent-mui.material.dialog-content :refer [dialog-content]]
            [reagent-mui.material.icon-button :refer [icon-button]]
            [reagent-mui.icons.close :refer [close]]
            [reagent-mui.material.dialog-actions :refer [dialog-actions]]
            [reagent.core :as r]))

(def ipfs-url "https://ipfs.io/ipfs/")           ;; IPFS gateway for retrieving files from IPFS

(def profile-info (r/atom nil))                  ;; stores the information of the profile with respect to current user, item includes :icon_cid, :bio, :is_following

(def post-list (r/atom nil))

(def form-open (r/atom false))

(def bio-input (r/atom ""))

(defn load-post [user]
  (gun/map-once "post" user (fn [post time-key]
                              (when (not= post nil)
                                (if (= nil ((keyword time-key) @post-list))
                                  (let [post-with-icon-cid (atom (clojure.walk/keywordize-keys (into {} (rest (js->clj post)))))]   ;; first post for the timekey, take only essential info
                                    (.then (js/Promise.resolve (profile/getIconCID (:username @post-with-icon-cid)))                ;; retrieving the iconCID of the post owner
                                           (fn [resolve]
                                             (swap! post-with-icon-cid assoc :icon_cid resolve)                                     ;; adding the iconCID of post owner
                                             (swap! post-list assoc (keyword time-key) @post-with-icon-cid))))                      ;; adding the post to post-list
                                  ;; case for more than one post for a particular timekey:
                                  (swap! post-list assoc (keyword time-key) (conj ((keyword time-key) @post-list) (clojure.walk/keywordize-keys (into {} (rest (js->clj post)))))))))))

;; function to add key-value pair to the target map, used in profile.js
(defn ^:export map-assoc [target-atom key value]
  (swap! target-atom assoc (keyword key) value))

(defn close-edit-profile-form [original-bio]
  (reset! form-open false)
  (reset! bio-input original-bio))

(defn profile-page [{{:keys [username]} :path-params}]
  (when (not= @post-list nil)                                           ;; reset the post list in case it contains posts of other users 
    (let [post-list-user (:username (val (first @post-list)))]
      (when (not= post-list-user username)
        (reset! post-list nil))))
  (.then (js/Promise.resolve (profile/getIconCID username))
         #(swap! profile-info assoc :icon_cid %))
  (.then (js/Promise.resolve (profile/getUserBio username))
         (fn [bio]
           (if (= bio nil)
             (swap! profile-info assoc :bio "")
             (swap! profile-info assoc :bio bio))))
  (profile/getIsFollowing (js/sessionStorage.getItem "username") username)
  (load-post username)
  [:div
   [box {:sx {:display "flex"
              :flex-direction "column"
              :align-items "center"}}
    [paper {:id "user-card"                                             ;; user banner
            :variant "outlined"
            :sx {:min-height 200 :height "auto" :width 850 :mb 2 :display "flex"}}
     [avatar {:sx {:mx 4 :my 6 :width 100 :height 100}                  ;; user avatar
              :src (str ipfs-url (:icon_cid @profile-info))}]
     [box {:sx {:my 6 :width 450}}                                      ;; username display
      [typography {:sx {:font-size "30px"}}
       username]
      [typography {:sx {:font-size "15px" :white-space "break-spaces" :word-wrap "break-word"}}
       (:bio @profile-info)]]
     [box {:style {:display "flex" :flex-grow 1 :justify-content "flex-end"}}
      (if (= (js/sessionStorage.getItem "username") username)
        [button {:sx {:mt 16 :mb 4 :mr 4 :width 140 :height 40 :border-radius 30}                    ;; button to edit profile page if it belongs to the user
                 :variant "contained"
                 :on-click (fn [] 
                             (reset! bio-input (:bio @profile-info))
                             (reset! form-open true))}
         "Edit Profile"]
        (if (= (:is_following @profile-info) false)                                                   ;; button to follow / unfollow the user
          [button {:sx {:mt 16 :mb 4 :mr 4 :width 100 :height 40 :border-radius 30}
                   :variant "contained"
                   :on-click #(profile/followUser (js/sessionStorage.getItem "username") username)}
           "Follow"]
          [button {:sx {:mt 16 :mb 4 :mr 4 :width 100 :height 40 :border-radius 30}
                   :variant "outlined"
                   :on-click #(profile/unfollowUser (js/sessionStorage.getItem "username") username)}
           "Unfollow"]))]]]

   [box {:sx {:display "flex" :flex-direction "column" :align-items "center"}}                   ;; showing posts
    (for [post (vals (into (sorted-map-by >) @post-list))]                                       ;; sort the post (newest first) and discard the timekey
      ^{:key post} [paper {:variant "outlined" :sx {:height "auto" :width 850 :my 1}}
                    [box {:sx {:display "flex"
                               :box-shadow 3}
                          :justify-content "space-between"}
                     [box {:sx {:my 1 :display "flex"}}
                      [avatar {:sx {:mx 2 :my 1 :width 36 :height 36}                                  ;; user avatar
                               :src (str ipfs-url (:icon_cid post))}]
                      [typography {:sx {:my 1 :font-size "20px"}}                                      ;; username
                       (:username post)]]
                     [typography {:sx {:mx 1 :my 3 :font-size "10px"}}                                 ;; post timestamp
                      (.toLocaleString (new js/Date. (:timestamp post)))]]

                    (when (not= (:text post) nil)                                                      ;; post text
                      [typography {:sx {:mx 2 :my 2 :font-size "16px" :white-space "break-spaces"}}
                       (:text post)])

                    (when (not= (:image post) nil)                                                     ;; post image
                      [box {:sx {:background-color "black" :display "flex" :justify-content "center"}}
                       [:img {:style {:max-width "850px"}
                              :src (str ipfs-url (:image post))}]])])]

   [dialog {:open @form-open :on-close #(close-edit-profile-form (:bio @profile-info))}
    [dialog-title {:sx {:display "flex"                                                   ;; components for starting a new post
                        :flex-direction "row"
                        :justify-content "space-between"}}
     "Edit Profile"
     [icon-button {:on-click #(close-edit-profile-form (:bio @profile-info))}
      [close]]]
    [dialog-content
     [text-field {:sx {:margin 2 :width 500}
                  :label "Bio"
                  :multiline true
                  :max-rows 3
                  :min-rows 3
                  :input-props {:max-length 150}
                  :value @bio-input
                  :on-change (fn [event]
                               (reset! bio-input (-> event .-target .-value)))
                  :helper-text "Maximum 150 characters"}]]
    [dialog-actions
     [button
      {:on-click (fn []
                   (profile/updateBio username @bio-input)
                   (close-edit-profile-form (:bio @profile-info))
                   (swap! profile-info assoc :bio @bio-input))}
      "Save changes"]]]])