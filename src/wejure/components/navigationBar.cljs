(ns wejure.components.navigationBar
  (:require [reagent.core :as r]
            [reagent-mui.material.app-bar :refer [app-bar]]
            [reagent-mui.material.toolbar :refer [toolbar]]
            [reitit.frontend.easy :as reitit-fe]
            [reagent-mui.material.button :refer [button]]
            [reagent-mui.material.typography :refer [typography]]
            ["../js/accSystem" :as acc]))

(def ipfsUrl "https://wejure.infura-ipfs.io/ipfs/")               ;; IPFS gateway for retrieving files from IPFS

(defn logoutFunction []
  (acc/logout)
  (set! js/window.location.href (reitit-fe/href :wejure.core/title)))

(defn title-page-bar []
  [app-bar
   {:position "static"
    :sx {:background-color "#070707"}}
   [toolbar
    [:img
     {:src "logo_white.png"
      :style {:height "50px"
              :margin "0 20px 0 0"}}]
    [:div
     {:style {:flex-grow "1"}}]
    [:div
     [button
      {:color "inherit"
       :on-click #(set! js/window.location.href (reitit-fe/href :wejure.core/register))}
      "Sign Up"]
     [button
      {:color "inherit"
       :on-click #(set! js/window.location.href (reitit-fe/href :wejure.core/login))}
      "Login"]]]])

(defn sign-in-bar []
  [app-bar
   {:position "static"
    :sx {:background-color "#070707"}}
   [toolbar
    [:img
     {:src "logo_white.png"
      :style {:height "50px"
              :margin "0 20px 0 0"}}]
    [:div
     {:style {:flex-grow "1"}}]
    [button
     {:color "inherit"
      :variant "outlined"
      :on-click #(set! js/window.location.href (reitit-fe/href :wejure.core/title))}
     "Back"]]])

(defn main-page-bar []
  [app-bar
   {:position "static"
    :sx {:background-color "#070707"}}
   [toolbar
    [:img
     {:src "logo_white.png"
      :style {:height "50px"
              :margin "0 20px 0 0"}}]
    [:div
     {:style {:flex-grow "1"}}]

    [:div
     {:style {:display "flex"
              :align-items "center"}}
     [:div
      {:style {:margin "0 20px 0 0" :display "flex" :alignItems "center"}}
      [typography
       {:variant "h6"
        :component "div"
        :sx {:font-size "12px" :margin "0 20px 0 0"}}
       (js/sessionStorage.getItem "username")]

      [:div
       {:style {:margin "0 20px 0 0"}}
       [:img
        {:src (str ipfsUrl (js/sessionStorage.getItem "iconCID"))        ;; retrieve the user icon image from IPFS
         :width 50
         :height 50
         :style {:border-radius "50%"}}]]
      [button
       {:color "inherit"
        :variant "outlined"
        :on-click #(set! js/window.location.href (reitit-fe/href :wejure.core/chat))}
       "Message"]]
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
    [:img
     {:src "logo_white.png"
      :style {:height "50px"
              :margin "0 20px 0 0"}}]
    [:div
     {:style {:flex-grow "1"}}]

    [:div
     {:style {:display "flex"
              :align-items "center"}}
     [:div
      {:style {:margin "0 20px 0 0" :display "flex" :alignItems "center"}}
      [typography
       {:variant "h6"
        :component "div"
        :sx {:font-size "12px" :margin "0 20px 0 0"}}
       (js/sessionStorage.getItem "username")]

      [:div
       {:style {:margin "0 20px 0 0"}}
       [:img
        {:src (str ipfsUrl (js/sessionStorage.getItem "iconCID"))        ;; retrieve the user icon image from IPFS
         :width 50
         :height 50
         :style {:border-radius "50%"}}]]
      [button
       {:color "inherit"
        :variant "outlined"
        :on-click #(set! js/window.location.href (reitit-fe/href :wejure.core/main))}
       "Main Page"]]
     [button
      {:color "inherit"
       :variant "outlined"
       :on-click #(logoutFunction)}
      "Logout"]]]])