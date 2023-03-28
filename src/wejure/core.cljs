(ns wejure.core
  (:require [reagent.core :as r]
            [reagent.dom :as rdom]
            ;;[wejure.components.testPage :refer [test-page]]
            [cljs-ipfs-api.core :as icore :refer [init-ipfs]]
            [wejure.components.mainPage :refer [main-page]]
            [wejure.components.navigationBar :refer [navigation-bar]]
            [wejure.components.titlePage :refer [title-page]]
            [wejure.components.registrationPage :refer [registration-page]]
            [wejure.components.loginPage :refer [login-page]]
            [wejure.components.chatPage :refer [chat-page]]))   

(defn app []
  (let [step (r/atom 0) details (atom nil)]
    (fn []
      [:div
       {:style {:height "100%"
                :display "flex"
                :flex-direction "column"}}
       [navigation-bar {:step step :details details}]
       [:div
        {:style {:height "100%"}}
        (case @step                                               ;; the step atom determines which page to show, value will be changed in the respective pages
          ;;-1 [test-page]
          0 [title-page {:details details :step step}]
          1 [registration-page {:details details :step step}]
          2 [login-page {:details details :step step}]
          3 [main-page {:details details}]
          4 [chat-page {:details details}])]])))

(defn stop []
  (js/console.log "Stopping..."))

(defn start []
  (js/console.log "Starting...")
  (rdom/render [app]
            (.getElementById js/document "app")))

(defn ^:export init []
  (start))