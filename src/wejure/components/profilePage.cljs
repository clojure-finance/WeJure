(ns wejure.components.profilePage
  (:require ["@mui/icons-material/Close$default" :as CloseIcon]
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
            ["wejure-nostr/app.js" :as app]
            [reagent.core :as r]
            [reitit.frontend.easy :as reitit-fe]
            [wejure.common :as common]
            [wejure.components.postCard :refer [add-posts! load-more post-list watch!]]
            [wejure.components.textField :refer [text-field]]))

(defn- user-banner [username & body]
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
     (into [:> Box {:sx {:display "flex" :flex-direction "column" :align-items "center"}}]
           body)]]])

(defn- user-not-found [username]
  [user-banner username
   [:> Typography {:sx {:color "grey"} :variant "h5"}
    "User not found"]])

;; Several accounts claim this name; nobody is picked automatically, so a
;; later registration can never hijack an existing user's URL. Each claimant
;; links to its canonical /user/~<pubkey> page.
(defn- user-ambiguous [username pubs]
  [user-banner username
   [:> Typography {:sx {:color "grey"} :variant "h5"}
    "Several users have this name"]
   (for [pub pubs]
     ^{:key pub}
     [:a {:href (reitit-fe/href :wejure.core/user {:username (str "~" pub)})}
      [:> Typography {:sx {:font-size "12px" :word-break "break-all"}}
       pub]])])

(defn- load-page! [posts next pub]
  (.then (app/postsPage #js {:authors #js [pub] :until @next})
         (fn [^js page]
           (add-posts! posts (.-posts page))
           (reset! next (.-next page)))))

(defn- loaded-profile-page [username pub]
  (r/with-let [self (common/current-pub)
               info (r/atom {:loaded? false})                              ;; plus :picture, :about, :following?
               posts (r/atom {})
               next (r/atom nil)
               form-open (r/atom false)
               bio-input (r/atom "")
               _ (.then (app/profile pub)
                        (fn [p]
                          (let [{:keys [picture about]} (js->clj p :keywordize-keys true)]
                            (swap! info assoc :loaded? true :found? (some? p) :picture picture :about (or about "")))))
               _ (.then (app/isFollowing pub) #(swap! info assoc :following? %))
               _ (load-page! posts next pub)
               stop-posts (watch! posts [pub])]
    (let [{:keys [loaded? found? picture about following?]} @info]
      (cond
        (not loaded?) [:div]
        (not found?) [user-not-found username]
        :else
        [:div
         [:> Box {:sx {:display "flex"
                       :flex-direction "column"
                       :align-items "center"}}
          [:> Paper {:variant "outlined"                                   ;; user banner
                     :sx {:min-height 200 :height "auto" :width 850 :mb 2 :display "flex"}}
           [common/avatar {:picture picture :author pub :username username
                           :sx {:mx 4 :my 6 :width 100 :height 100}}]
           [:> Box {:sx {:my 6 :width 450}}
            [:> Typography {:sx {:font-size "30px"}}
             username]
            [:> Typography {:sx {:font-size "15px" :white-space "break-spaces" :word-wrap "break-word"}}
             about]]
           [:> Box {:style {:display "flex" :flex-grow 1 :justify-content "flex-end"}}
            (cond
              (= self pub)                                                                      ;; own profile: edit it
              [:> Button {:sx {:mt 16 :mb 4 :mr 4 :width 140 :height 40 :border-radius 30}
                          :variant "contained"
                          :on-click (fn []
                                      (reset! bio-input about)
                                      (reset! form-open true))}
               "Edit Profile"]

              following?
              [:> Box {:sx {:display "flex" :flex-direction "row"}}
               [:> Button {:sx {:mt 16 :mb 4 :mr 2 :width 100 :height 40 :border-radius 30}
                           :variant "contained"
                           :href (reitit-fe/href :wejure.core/chat)
                           :on-click (fn []                                      ;; chat page opens this conversation
                                       (js/sessionStorage.setItem "chat_peer" pub)
                                       (js/sessionStorage.setItem "chat_peer_name" username))}
                "Message"]
               [:> Button {:sx {:mt 16 :mb 4 :mr 4 :width 100 :height 40 :border-radius 30}
                           :variant "outlined"
                           :on-click #(.then (app/unfollow pub)
                                             (fn [err]
                                               (if err (js/alert err) (swap! info assoc :following? false))))}
                "Unfollow"]]

              :else
              [:> Button {:sx {:mt 16 :mb 4 :mr 4 :width 100 :height 40 :border-radius 30}
                          :variant "contained"
                          :on-click #(.then (app/follow pub)
                                            (fn [err]
                                              (if err (js/alert err) (swap! info assoc :following? true))))}
               "Follow"])]]]

         [post-list posts]
         [load-more next #(load-page! posts next pub)]

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
                         (let [bio @bio-input]
                           (.then (app/updateBio bio)
                                  (fn [err]
                                    (if err
                                      (js/alert err)
                                      (do (swap! info assoc :about bio)
                                          (reset! form-open false)))))))}
            "Save changes"]]]]))
    (finally
      (stop-posts))))

;; /user/~<pubkey> names the account directly; its display name comes from the
;; account's signed profile.
(defn- pub-profile-page [pub]
  (let [username (r/atom nil)
        loaded? (r/atom false)]
    (.then (app/profile pub)
           (fn [^js p]
             (reset! username (some-> p .-username))
             (reset! loaded? true)))
    (fn []
      (cond
        (not @loaded?) [:div]
        (nil? @username) [user-not-found (str "~" pub)]
        :else [loaded-profile-page @username pub]))))

(defn- alias-profile-page [username]
  (let [lookup (r/atom nil)]                                             ;; nil while resolving, then the pubkeys
    (.then (app/lookupUser username) #(reset! lookup (vec %)))
    (fn []
      (let [pubs @lookup]
        (cond
          (nil? pubs) [:div]
          (empty? pubs) [user-not-found username]
          (= 1 (count pubs)) [loaded-profile-page username (first pubs)]
          :else [user-ambiguous username pubs])))))

;; Usernames are \w{3,20}, so a leading "~" always means a public key.
(defn profile-page [{{:keys [username]} :path-params}]
  (if (= "~" (first username))
    [pub-profile-page (subs username 1)]
    [alias-profile-page username]))
