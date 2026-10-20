(ns wejure.core
  (:require [reagent.core :as r]
            [reagent.dom.client :as rdomc]
            [reitit.frontend :as reitit-f]
            [reitit.frontend.easy :as reitit-fe]
            [wejure.common :as common]
            [wejure.components.chatPage :refer [chat-page]]
            [wejure.components.loginPage :refer [login-page]]
            [wejure.components.mainPage :refer [main-page]]
            [wejure.components.navigationBar :refer [title-page-bar sign-in-bar main-page-bar chat-page-bar]]
            [wejure.components.profilePage :refer [profile-page]]
            [wejure.components.registrationPage :refer [registration-page]]
            [wejure.components.searchPage :refer [search-page]]
            [wejure.components.searchPagePost :refer [search-page-post]]
            [wejure.components.titlePage :refer [title-page]]))

(defonce route-state (r/atom nil))

;; :private? pages need a logged-in user; the others are only for logged-out visitors
(def routes
  [["/" {:name ::title :view title-page :bar title-page-bar}]
   ["/register" {:name ::register :view registration-page :bar sign-in-bar}]
   ["/login" {:name ::login :view login-page :bar sign-in-bar}]
   ["/home" {:name ::home :view main-page :bar main-page-bar :private? true}]
   ["/search/:search-input" {:name ::search :view search-page :bar main-page-bar :private? true}]
   ["/searchPost/:search-input" {:name ::search-post :view search-page-post :bar main-page-bar :private? true}]
   ["/user/:username" {:name ::user :view profile-page :bar main-page-bar :private? true}]
   ["/chat" {:name ::chat :view chat-page :bar chat-page-bar :private? true}]])

(defn- on-navigate [match]
  (cond
    (nil? match) (reitit-fe/replace-state ::title)                       ;; unknown URL
    (and (-> match :data :private?) (not (common/logged-in?))) (reitit-fe/replace-state ::title)
    (and (not (-> match :data :private?)) (common/logged-in?)) (reitit-fe/replace-state ::home)
    :else (reset! route-state match)))

(defn router-start []
  (reitit-fe/start! (reitit-f/router routes) on-navigate {:use-fragment false}))

(defn app []
  (let [{:keys [view bar]} (:data @route-state)]
    [:div
     {:style {:height "100%"
              :display "flex"
              :flex-direction "column"}}
     (when bar [bar])
     [:div
      {:style {:height "100%" :overflow "auto"}}
      (when view
        ^{:key (:path @route-state)} [view @route-state])]]))              ;; remount the page whenever the URL changes

(defn stop []
  (js/console.log "Stopping..."))

(defonce root (rdomc/create-root (.getElementById js/document "app")))

(defn start []
  (js/console.log "Starting...")
  (router-start)
  (rdomc/render root [app]))

(defn ^:export init []
  (start))
