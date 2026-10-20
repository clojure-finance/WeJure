(ns wejure.components.profilePage
  (:require ["../js/post" :as post]
            ["../js/profile" :as profile]
            [reagent-mui.icons.close :refer [close]]
            [reagent-mui.material.avatar :refer [avatar]]
            [reagent-mui.material.box :refer [box]]
            [reagent-mui.material.button :refer [button]]
            [reagent-mui.material.dialog :refer [dialog]]
            [reagent-mui.material.dialog-actions :refer [dialog-actions]]
            [reagent-mui.material.dialog-content :refer [dialog-content]]
            [reagent-mui.material.dialog-title :refer [dialog-title]]
            [reagent-mui.material.icon-button :refer [icon-button]]
            [reagent-mui.material.paper :refer [paper]]
            [reagent-mui.material.text-field :refer [text-field]]
            [reagent-mui.material.typography :refer [typography]]
            [reagent.core :as r]
            [reitit.frontend.easy :as reitit-fe]
            [wejure.common :as common]
            [wejure.components.postCard :refer [add-post! post-list]]))

(defn- user-not-found [username]
  [box {:sx {:display "flex"
             :flex-direction "column"
             :align-items "center"}}
   [paper {:variant "outlined"
           :sx {:min-height 200 :height "auto" :width 850 :mb 2 :display "flex"}}
    [avatar {:sx {:mx 4 :my 6 :width 100 :height 100}}]
    [box {:sx {:my 6 :width "70%"}}
     [box
      [typography {:sx {:font-size "30px"}}
       username]]
     [box {:sx {:display "flex" :flex-direction "column" :align-items "center"}}
      [typography {:sx {:color "grey"} :variant "h5"}
       "User not found"]]]]])

(defn profile-page [{{:keys [username]} :path-params}]
  (let [self (common/current-username)
        info (r/atom {:loaded? false})                                     ;; plus :icon_cid, :bio, :is_following
        posts (r/atom {})
        form-open (r/atom false)
        bio-input (r/atom "")]
    (.then (profile/getIconCID username) #(swap! info assoc :icon_cid % :loaded? true))
    (.then (profile/getUserBio username) #(swap! info assoc :bio (or % "")))
    (profile/getIsFollowing self username #(swap! info assoc :is_following %))
    (post/loadPosts username (add-post! posts))
    (fn []
      (let [{:keys [loaded? icon_cid bio is_following]} @info]
        (cond
          (not loaded?) [:div]
          (nil? icon_cid) [user-not-found username]                      ;; every registered user has an avatar
          :else
          [:div
           [box {:sx {:display "flex"
                      :flex-direction "column"
                      :align-items "center"}}
            [paper {:variant "outlined"                                      ;; user banner
                    :sx {:min-height 200 :height "auto" :width 850 :mb 2 :display "flex"}}
             [avatar {:sx {:mx 4 :my 6 :width 100 :height 100}
                      :src (common/ipfs-url icon_cid)}]
             [box {:sx {:my 6 :width 450}}
              [typography {:sx {:font-size "30px"}}
               username]
              [typography {:sx {:font-size "15px" :white-space "break-spaces" :word-wrap "break-word"}}
               bio]]
             [box {:style {:display "flex" :flex-grow 1 :justify-content "flex-end"}}
              (cond
                (= self username)                                                                 ;; own profile: edit it
                [button {:sx {:mt 16 :mb 4 :mr 4 :width 140 :height 40 :border-radius 30}
                         :variant "contained"
                         :on-click (fn []
                                     (reset! bio-input bio)
                                     (reset! form-open true))}
                 "Edit Profile"]

                is_following
                [box {:sx {:display "flex" :flex-direction "row"}}
                 [button {:sx {:mt 16 :mb 4 :mr 2 :width 100 :height 40 :border-radius 30}
                          :variant "contained"
                          :href (reitit-fe/href :wejure.core/chat)
                          :on-click #(js/sessionStorage.setItem "chat_peer" username)}       ;; chat page opens this conversation
                  "Message"]
                 [button {:sx {:mt 16 :mb 4 :mr 4 :width 100 :height 40 :border-radius 30}
                          :variant "outlined"
                          :on-click (fn []
                                      (profile/unfollowUser self username)
                                      (swap! info assoc :is_following false))}
                  "Unfollow"]]

                :else
                [button {:sx {:mt 16 :mb 4 :mr 4 :width 100 :height 40 :border-radius 30}
                         :variant "contained"
                         :on-click (fn []
                                     (profile/followUser self username)
                                     (swap! info assoc :is_following true))}
                 "Follow"])]]]

           [post-list posts]

           [dialog {:open @form-open :on-close #(reset! form-open false)}
            [dialog-title {:sx {:display "flex"
                                :flex-direction "row"
                                :justify-content "space-between"}}
             "Edit Profile"
             [icon-button {:on-click #(reset! form-open false)}
              [close]]]
            [dialog-content
             [text-field {:sx {:margin 2 :width 500}
                          :label "Bio"
                          :multiline true
                          :max-rows 3
                          :min-rows 3
                          :input-props {:max-length 150}
                          :value @bio-input
                          :on-change #(reset! bio-input (.. % -target -value))
                          :helper-text "Maximum 150 characters"}]]
            [dialog-actions
             [button
              {:on-click (fn []
                           (profile/updateBio username @bio-input)
                           (swap! info assoc :bio @bio-input)
                           (reset! form-open false))}
              "Save changes"]]]])))))
