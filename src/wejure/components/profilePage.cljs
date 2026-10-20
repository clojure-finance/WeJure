(ns wejure.components.profilePage
  (:require ["../js/post" :as post]
            ["../js/profile" :as profile]
            ["@mui/icons-material/Close$default" :as CloseIcon]
            ["@mui/material/Avatar$default" :as Avatar]
            ["@mui/material/Box$default" :as Box]
            ["@mui/material/Button$default" :as Button]
            ["@mui/material/Dialog$default" :as Dialog]
            ["@mui/material/DialogActions$default" :as DialogActions]
            ["@mui/material/DialogContent$default" :as DialogContent]
            ["@mui/material/DialogTitle$default" :as DialogTitle]
            ["@mui/material/IconButton$default" :as IconButton]
            ["@mui/material/Paper$default" :as Paper]
            ["@mui/material/Typography$default" :as Typography]
            [reagent.core :as r]
            [reitit.frontend.easy :as reitit-fe]
            [wejure.common :as common]
            [wejure.components.postCard :refer [add-post! post-list]]
            [wejure.components.textField :refer [text-field]]))

(defn- user-not-found [username]
  [:> Box {:sx {:display "flex"
                :flex-direction "column"
                :align-items "center"}}
   [:> Paper {:variant "outlined"
              :sx {:min-height 200 :height "auto" :width 850 :mb 2 :display "flex"}}
    [:> Avatar {:sx {:mx 4 :my 6 :width 100 :height 100}}]
    [:> Box {:sx {:my 6 :width "70%"}}
     [:> Box
      [:> Typography {:sx {:font-size "30px"}}
       username]]
     [:> Box {:sx {:display "flex" :flex-direction "column" :align-items "center"}}
      [:> Typography {:sx {:color "grey"} :variant "h5"}
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
           [:> Box {:sx {:display "flex"
                         :flex-direction "column"
                         :align-items "center"}}
            [:> Paper {:variant "outlined"                                   ;; user banner
                       :sx {:min-height 200 :height "auto" :width 850 :mb 2 :display "flex"}}
             [:> Avatar {:sx {:mx 4 :my 6 :width 100 :height 100}
                         :src (common/ipfs-url icon_cid)}]
             [:> Box {:sx {:my 6 :width 450}}
              [:> Typography {:sx {:font-size "30px"}}
               username]
              [:> Typography {:sx {:font-size "15px" :white-space "break-spaces" :word-wrap "break-word"}}
               bio]]
             [:> Box {:style {:display "flex" :flex-grow 1 :justify-content "flex-end"}}
              (cond
                (= self username)                                                                 ;; own profile: edit it
                [:> Button {:sx {:mt 16 :mb 4 :mr 4 :width 140 :height 40 :border-radius 30}
                            :variant "contained"
                            :on-click (fn []
                                        (reset! bio-input bio)
                                        (reset! form-open true))}
                 "Edit Profile"]

                is_following
                [:> Box {:sx {:display "flex" :flex-direction "row"}}
                 [:> Button {:sx {:mt 16 :mb 4 :mr 2 :width 100 :height 40 :border-radius 30}
                             :variant "contained"
                             :href (reitit-fe/href :wejure.core/chat)
                             :on-click #(js/sessionStorage.setItem "chat_peer" username)}    ;; chat page opens this conversation
                  "Message"]
                 [:> Button {:sx {:mt 16 :mb 4 :mr 4 :width 100 :height 40 :border-radius 30}
                             :variant "outlined"
                             :on-click (fn []
                                         (profile/unfollowUser self username)
                                         (swap! info assoc :is_following false))}
                  "Unfollow"]]

                :else
                [:> Button {:sx {:mt 16 :mb 4 :mr 4 :width 100 :height 40 :border-radius 30}
                            :variant "contained"
                            :on-click (fn []
                                        (profile/followUser self username)
                                        (swap! info assoc :is_following true))}
                 "Follow"])]]]

           [post-list posts]

           [:> Dialog {:open @form-open :on-close #(reset! form-open false)}
            [:> DialogTitle {:sx {:display "flex"
                                  :flex-direction "row"
                                  :justify-content "space-between"}}
             "Edit Profile"
             [:> IconButton {:on-click #(reset! form-open false)}
              [:> CloseIcon]]]
            [:> DialogContent
             [text-field {:sx {:margin 2 :width 500}
                          :label "Bio"
                          :multiline true
                          :max-rows 3
                          :min-rows 3
                          :slot-props {:html-input {:max-length 150}}
                          :value @bio-input
                          :on-change #(reset! bio-input (.. % -target -value))
                          :helper-text "Maximum 150 characters"}]]
            [:> DialogActions
             [:> Button
              {:on-click (fn []
                           (profile/updateBio username @bio-input)
                           (swap! info assoc :bio @bio-input)
                           (reset! form-open false))}
              "Save changes"]]]])))))
