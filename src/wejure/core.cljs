(ns wejure.core
  (:require [reagent.core :as r]
            [reagent.dom :as rdom]
            ;;[wejure.components.testPage :refer [test-page]]
            [reitit.frontend :as reitit-f]
            [reitit.frontend.easy :as reitit-fe]
            [reitit.coercion.spec :as rss]
            [spec-tools.data-spec :as ds]
            [wejure.components.mainPage :refer [main-page]]
            [wejure.components.navigationBar :refer [title-page-bar sign-in-bar main-page-bar chat-page-bar]]
            [wejure.components.titlePage :refer [title-page]]
            [wejure.components.registrationPage :refer [registration-page]]
            [wejure.components.loginPage :refer [login-page]]
            [wejure.components.chatPage :refer [chat-page]]))   

(defonce route-state (r/atom nil))

(def routes
   [["/" {:name ::title
          :view title-page}]
    ;;["/test" {:name ::test
    ;;          :view test-page}]
    ["/register" {:name ::register
                  :view registration-page}]
    ["/login" {:name ::login
               :view login-page}]
    ["/home" {:name ::main
              :view main-page}]
    ["/chat" {:name ::chat
              :view chat-page}]])

(defn router-start []
    (reitit-fe/start!
     (reitit-f/router routes {:data {:coercion rss/coercion}})
     (fn [m] (reset! route-state m))
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
     :wejure.core/chat [chat-page-bar]
     [title-page-bar])
   [:div
    {:style {:height "100%"}}
    (let [current-page (-> @route-state :data :view)]
      [current-page])]])

(defn stop []
  (js/console.log "Stopping..."))

(defn start []
  (js/console.log "Starting...")
  (router-start)
  (rdom/render [app]
            (.getElementById js/document "app")))

(defn ^:export init []
  (start))