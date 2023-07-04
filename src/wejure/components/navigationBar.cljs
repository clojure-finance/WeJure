(ns wejure.components.navigationBar
  (:require [reagent.core :as r]
            [reagent-mui.material.app-bar :refer [app-bar]]
            [reagent-mui.material.toolbar :refer [toolbar]]
            [reitit.frontend.easy :as reitit-fe]
            [reagent-mui.material.button :refer [button]]
            [reagent-mui.material.typography :refer [typography]]
            [reagent-mui.material.text-field :refer [text-field]]
            [reagent-mui.material.avatar :refer [avatar]]
            ["../js/account" :as acc]))

;;(def ipfs-url "https://ipfs.io/ipfs/")               ;; IPFS gateway for retrieving files from IPFS
(def ipfs-url "http://localhost:8080/ipfs/") ;;the default port of local ipfs app

(defn logoutFunction []
  (acc/logout)
  (set! js/window.location.href (reitit-fe/href :wejure.core/title)))

(def search-input (r/atom ""))

(defn title-page-bar []
  [app-bar
   {:position "static"
    :sx {:background-color "#070707"}}
   [toolbar
    [:img
     {:src "http://localhost:8020/logo_white.png"
      :style {:height "50px"
              :margin "0 20px 0 0"}}]
    [:div
     {:style {:flex-grow "1"}}]
    [:div
     [button
      {:color "inherit"
       :href (reitit-fe/href :wejure.core/register)}
      "Sign Up"]
     [button
      {:color "inherit"
       :href (reitit-fe/href :wejure.core/login)}
      "Login"]]]])

(defn sign-in-bar []
  [app-bar
   {:position "static"
    :sx {:background-color "#070707"}}
   [toolbar
    [:img
     {:src "http://localhost:8020/logo_white.png"
      :style {:height "50px"
              :margin "0 20px 0 0"}}]
    [:div
     {:style {:flex-grow "1"}}]
    [button
     {:color "inherit"
      :variant "outlined"
      :href (reitit-fe/href :wejure.core/title)}
     "Back"]]])

(defn main-page-bar []
  [app-bar
   {:position "static"
    :sx {:background-color "#070707"}}
   [toolbar
    [:a.navbar-item
     {:href (reitit-fe/href :wejure.core/home)}
     [:img
      {:src "http://localhost:8020/logo_white.png"
       :style {:height "50px"
               :margin "3px 20px 0 0"}}]]
    [:div
     {:style {:flex-grow "1"}}]
    [:div
     {:style {:display "flex"
              :align-items "center"
              :margin "0 2px 0 0"}}
     [text-field {:sx {:background-color "white" :mx 2}
                  :variant "filled"
                  :placeholder "Search"
                  :size "small"
                  :hidden-label true
                  :value @search-input
                  :on-change (fn [event]
                               (reset! search-input (-> event .-target .-value)))
                  :on-key-down (fn [event]
                                 (when (= (.-keyCode event) 13)                            ;; navigate to search result page when Enter is pressed
                                   (set! js/window.location.href (reitit-fe/href :wejure.core/search {:search-input @search-input}))))}]
     [typography
      {:variant "h6"
       :component "div"
       :sx {:font-size "12px" :margin "0 20px 0 0"}}
      (js/sessionStorage.getItem "username")]
     [:a.navbar-item
      {:href (reitit-fe/href :wejure.core/user {:username (js/sessionStorage.getItem "username")})}
      [avatar {:sx {:width 50 :height 50}
               :src (str ipfs-url (js/sessionStorage.getItem "icon_cid"))}]]     ;; retrieve the user icon image from IPFS

     [button
      {:color "inherit"
       :variant "outlined"
       :sx {:mx 2}
       :href (reitit-fe/href :wejure.core/chat)}
      "Message"]
     [button
      {:color "inherit"
       :variant "outlined"
       :on-click #(logoutFunction)}
      "Logout"]]]])

(defn chat-page-bar []
  [app-bar
   {:position "static"
    :sx {:background-color "#070707"}}
   [toolbar
    [:a.navbar-item
     {:href (reitit-fe/href :wejure.core/home)}
     [:img
      {:src "http://localhost:8020/logo_white.png"
       :style {:height "50px"
               :margin "3px 20px 0 0"}}]]
    [:div
     {:style {:flex-grow "1"}}]
    [:div
     {:style {:display "flex"
              :align-items "center"
              :margin "0 2px 0 0"}}
     [text-field {:sx {:background-color "white" :mx 2}
                  :variant "filled"
                  :placeholder "Search"
                  :size "small"
                  :hidden-label true
                  :value @search-input
                  :on-change (fn [event]
                               (reset! search-input (-> event .-target .-value)))
                  :on-key-down (fn [event]
                                 (when (= (.-keyCode event) 13)                                       ;; navigate to search result page when Enter is pressed
                                   (set! js/window.location.href (reitit-fe/href :wejure.core/search {:search-input @search-input}))))}]
     [typography
      {:variant "h6"
       :component "div"
       :sx {:font-size "12px" :margin "0 20px 0 0"}}
      (js/sessionStorage.getItem "username")]
     [:a.navbar-item
      {:href (reitit-fe/href :wejure.core/user {:username (js/sessionStorage.getItem "username")})}
      [avatar {:sx {:width 50 :height 50}
               :src (str ipfs-url (js/sessionStorage.getItem "icon_cid"))}]]     ;; retrieve the user icon image from IPFS
     [button
      {:color "inherit"
       :variant "outlined"
       :sx {:mx 2}
       :href (reitit-fe/href :wejure.core/home)}
      "Main Page"]
     [button
      {:color "inherit"
       :variant "outlined"
       :on-click #(logoutFunction)}
      "Logout"]]]])

(defn test-page-bar []
  [app-bar
   {:position "static"
    :sx {:background-color "#070707"}}
   [toolbar
    [:a.navbar-item
     {:href (reitit-fe/href :wejure.core/home)}
     [:img
      {:src "http://localhost:8020/logo_white.png"
       :style {:height "50px"
               :margin "3px 20px 0 0"}}]]
    [:div
     {:style {:flex-grow "1"}}]
  
    [:div
     {:style {:display "flex"
              :align-items "center"
              :margin "0 2px 0 0"}}

     [text-field {:sx {:background-color "white" :mx 2}
                  :variant "filled"
                  :placeholder "Search"
                  :size "small"
                  :hidden-label true
                  :value @search-input
                  :on-change (fn [event]
                               (reset! search-input (-> event .-target .-value)))
                  :on-key-down (fn [event]
                                 (when (= (.-keyCode event) 13)                                            ;; navigate to search result page when Enter is pressed
                                   (set! js/window.location.href (reitit-fe/href :wejure.core/search {:search-input @search-input}))))}]
     [typography
      {:variant "h6"
       :component "div"
       :sx {:font-size "12px" :margin "0 20px 0 0"}}
      (js/sessionStorage.getItem "username")]

     [:a.navbar-item
      {:href (reitit-fe/href :wejure.core/user {:username (js/sessionStorage.getItem "username")})}
      [avatar {:sx {:width 50 :height 50}
               :src (str ipfs-url (js/sessionStorage.getItem "icon_cid"))}]]     ;; retrieve the user icon image from IPFS

     [button
      {:color "inherit"
       :variant "outlined"
       :sx {:mx 2}
       :href (reitit-fe/href :wejure.core/chat)}
      "Message"]

     [button
      {:color "inherit"
       :variant "outlined"
       :on-click #(logoutFunction)}
      "Logout"]]]])
