(ns wejure.components.navigationBar
  (:require ["../js/account" :as acc]
            [reagent.core :as r]
            [reagent-mui.material.app-bar :refer [app-bar]]
            [reagent-mui.material.avatar :refer [avatar]]
            [reagent-mui.material.button :refer [button]]
            [reagent-mui.material.text-field :refer [text-field]]
            [reagent-mui.material.toolbar :refer [toolbar]]
            [reagent-mui.material.typography :refer [typography]]
            [reitit.frontend.easy :as reitit-fe]
            [wejure.common :as common]))

(defn- logout []
  (acc/logout)
  (set! js/window.location.href (reitit-fe/href :wejure.core/title)))

(defn- bar [& children]
  [app-bar
   {:position "static"
    :sx {:background-color "#070707"}}
   (into [toolbar] children)])

(defn- logo []
  [:img
   {:src "/logo_white.png"
    :style {:height "50px"
            :margin "3px 20px 0 0"}}])

(def ^:private spacer
  [:div {:style {:flex-grow "1"}}])

(defn title-page-bar []
  [bar
   [logo]
   spacer
   [:div
    [button
     {:color "inherit"
      :href (reitit-fe/href :wejure.core/register)}
     "Sign Up"]
    [button
     {:color "inherit"
      :href (reitit-fe/href :wejure.core/login)}
     "Login"]]])

(defn sign-in-bar []
  [bar
   [logo]
   spacer
   [button
    {:color "inherit"
     :variant "outlined"
     :href (reitit-fe/href :wejure.core/title)}
    "Back"]])

(def ^:private search-input (r/atom ""))

(def ^:private search-mode (r/atom :user))                                 ;; :user or :post

(defn- search-box []
  [:<>
   [button                                                                 ;; switch between searching users and posts
    {:color "inherit"
     :variant (if (= @search-mode :user) "contained" "outlined")
     :on-click #(swap! search-mode {:user :post, :post :user})}
    (if (= @search-mode :user) "User" "Post")]
   [text-field {:sx {:background-color "white" :mx 2}
                :variant "filled"
                :placeholder "Search"
                :size "small"
                :hidden-label true
                :value @search-input
                :on-change #(reset! search-input (.. % -target -value))
                :on-key-down (fn [e]
                               (when (and (= (.-key e) "Enter") (seq @search-input))
                                 (reitit-fe/push-state (case @search-mode
                                                         :user :wejure.core/search
                                                         :post :wejure.core/search-post)
                                                       {:search-input @search-input})))}]])

;; bar for logged-in pages; on the chat page the "Message" button becomes "Main Page"
(defn- logged-in-bar [page]
  (let [username (common/current-username)]
    [bar
     [:a {:href (reitit-fe/href :wejure.core/home)}
      [logo]]
     spacer
     [:div
      {:style {:display "flex"
               :align-items "center"
               :margin "0 2px 0 0"}}
      [search-box]
      [typography
       {:variant "h6"
        :component "div"
        :sx {:font-size "12px" :margin "0 20px 0 0"}}
       username]
      [:a {:href (reitit-fe/href :wejure.core/user {:username username})}
       [avatar {:sx {:width 50 :height 50}
                :src (common/ipfs-url (js/sessionStorage.getItem "icon_cid"))}]]
      (if (= page :chat)
        [button
         {:color "inherit"
          :variant "outlined"
          :sx {:mx 2}
          :href (reitit-fe/href :wejure.core/home)}
         "Main Page"]
        [button
         {:color "inherit"
          :variant "outlined"
          :sx {:mx 2}
          :href (reitit-fe/href :wejure.core/chat)}
         "Message"])
      [button
       {:color "inherit"
        :variant "outlined"
        :on-click logout}
       "Logout"]]]))

(defn main-page-bar []
  [logged-in-bar :main])

(defn chat-page-bar []
  [logged-in-bar :chat])
