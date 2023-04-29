(ns wejure.core
  (:require [reagent.core :as r]
            [reagent.dom :as rdom]
            [wejure.components.testPage :refer [test-page]]
            [reitit.frontend :as reitit-f]
            [reitit.frontend.easy :as reitit-fe]
            [reitit.frontend.controllers :as reitit-fc]
            [reitit.coercion.spec :as rss]
            [spec-tools.data-spec :as ds]
            [wejure.components.mainPage :refer [main-page]]
            [wejure.components.navigationBar :refer [title-page-bar sign-in-bar main-page-bar chat-page-bar test-page-bar]]
            [wejure.components.titlePage :refer [title-page]]
            [wejure.components.registrationPage :refer [registration-page]]
            [wejure.components.loginPage :refer [login-page]]
            [wejure.components.profilePage :refer [profile-page]]
            [wejure.components.chatPage :refer [chat-page]]
            [wejure.components.searchPage :refer [search-page]]))   

(defonce route-state (r/atom nil))

(def routes
   [["/" {:name ::title
          :view title-page
          :controllers [{:start (fn []                                                            ;; redirect to home page if logged in
                                  (when (not= nil (js/sessionStorage.getItem "pair"))
                                    (set! js/window.location.href (reitit-fe/href :wejure.core/home))))}]}]
    ["/test" {:name ::test
              :view test-page}]
    ["/register" {:name ::register
                  :view registration-page
                  :controllers [{:start (fn []                                                    ;; redirect to home page if logged in
                                          (when (not= nil (js/sessionStorage.getItem "pair"))
                                            (set! js/window.location.href (reitit-fe/href :wejure.core/home))))}]}]
    ["/login" {:name ::login
               :view login-page
               :controllers [{:start (fn []                                                       ;; redirect to home page if logged in
                                       (when (not= nil (js/sessionStorage.getItem "pair"))
                                         (set! js/window.location.href (reitit-fe/href :wejure.core/home))))}]}]
    ["/home" {:name ::home
              :view main-page
              :controllers [{:start (fn []                                                        ;; redirect to title page if not logged in
                                      (when (= nil (js/sessionStorage.getItem "pair"))
                                               (set! js/window.location.href (reitit-fe/href :wejure.core/title))))}]}]
    ["/search/:search-input" {:name ::search
                              :view search-page
                              :parameters {:path {:search-input string?}}
                              :controllers [{:parameters {:path [:search-input]}
                                             :start (fn []                                        ;; redirect to title page if not logged in
                                                      (when (= nil (js/sessionStorage.getItem "pair"))
                                                        (set! js/window.location.href (reitit-fe/href :wejure.core/title))))}]}]
    ["/user/:username" {:name ::user
                        :view profile-page
                        :parameters {:path {:username string?}}
                        :controllers [{:parameters {:path [:username]}
                                       :start (fn []                                              ;; redirect to title page if not logged in
                                                (when (= nil (js/sessionStorage.getItem "pair"))
                                                  (set! js/window.location.href (reitit-fe/href :wejure.core/title))))}]}] 
    ["/chat" {:name ::chat
              :view chat-page
              :controllers [{:start (fn []                                                        ;; redirect to title page if not logged in
                                      (when (= nil (js/sessionStorage.getItem "pair")) 
                                        (set! js/window.location.href (reitit-fe/href :wejure.core/title))))}]}]])

(defn router-start []
  (reitit-fe/start!
    (reitit-f/router routes {:data {:coercion rss/coercion}})
    (fn [new-match]
      (swap! route-state (fn [old-match]
                           (if new-match
                             (assoc new-match :controllers (reitit-fc/apply-controllers (:controllers old-match) new-match))    ;; navigate to the page if URL match found
                             (set! js/window.location.href (reitit-fe/href :wejure.core/title))))))                             ;; navigate to title page if URL match not found
    {:use-fragment false}))

(defn app []
  [:div
   {:style {:height "100%"
            :display "flex"
            :flex-direction "column"}}
   (case (-> @route-state :data :name)
     :wejure.core/title [title-page-bar]
     :wejure.core/register [sign-in-bar]
     :wejure.core/login [sign-in-bar]
     :wejure.core/main [main-page-bar]
     :wejure.core/search [main-page-bar]
     :wejure.core/chat [chat-page-bar]
     :wejure.core/test [test-page-bar]
     [main-page-bar])
   [:div 
    {:style {:height "100%" :overflow "auto"}}
    (let [current-page (-> @route-state :data :view)]
      [current-page @route-state])]])

(defn stop []
  (js/console.log "Stopping..."))

(defn start []
  (js/console.log "Starting...")
  (router-start)
  (rdom/render [app]
            (.getElementById js/document "app")))

(defn ^:export init []
  (start))