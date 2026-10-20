(ns wejure.components.loginPage
  (:require ["../js/account" :as acc]
            ["@mui/material/Box$default" :as Box]
            ["@mui/material/Button$default" :as Button]
            ["@mui/material/CircularProgress$default" :as CircularProgress]
            ["@mui/material/Typography$default" :as Typography]
            [reagent.core :as r]
            [reitit.frontend.easy :as reitit-fe]
            [wejure.components.textField :refer [text-field]]))

(defn- authenticate [name password loading]
  (reset! loading true)
  (acc/login @name @password
             (fn [err]
               (reset! loading false)
               (if err
                 (js/alert err)
                 (set! js/window.location.href (reitit-fe/href :wejure.core/home))))))   ;; full reload starts the session fresh

(defn login-page []
  (let [name (r/atom "") password (r/atom "") loading (r/atom false)]
    (fn []
      [:div
       {:style {:height "100%" :display "flex" :justify-content "center" :align-items "center"}}
       [:> Box
        {:sx {:height "300px"
              :width "350px"
              :background-color "#FFFEF7"
              :border-radius "30px"
              :display "flex"
              :flex-direction "column"
              :justify-content "space-between"
              :padding "50px 30px"}
         :component "form"
         :on-submit (fn [e] (.preventDefault e) (authenticate name password loading))}

        [:> Typography
         {:variant "h5"
          :component "div"}
         "Login your WeJure account"]

        [:div
         {:style {:display "flex"
                  :flex-direction "column"}}

         [:> Typography
          {:variant "h6"
           :component "div"}
          "1. Enter your username"]

         [text-field
          {:variant "filled"
           :value @name
           :on-change (fn [e] (reset! name (.. e -target -value)))
           :error (empty? @name)
           :helper-text (if (empty? @name) "Please enter your username" " ")
           :slot-props {:html-input {:max-length 20}}}]]

        [:div
         {:style {:display "flex"
                  :flex-direction "column"}}

         [:> Typography
          {:variant "h6"
           :component "div"}
          "2. Enter your password"]

         [text-field
          {:variant "filled"
           :type "password"
           :value @password
           :on-change (fn [e] (reset! password (.. e -target -value)))
           :error (empty? @password)
           :helper-text (if (empty? @password) "Please enter your password" " ")
           :slot-props {:html-input {:max-length 20}}}]]

        [:div
         {:style {:display "flex"
                  :flex-direction "column"
                  :align-items "center"}}
         [:> Button
          {:variant "contained"
           :type "submit"
           :disable-elevation true
           :disabled (or (empty? @name) (empty? @password) @loading)}
          "Submit"]
         [:> CircularProgress {:sx {:margin "10px" :visibility (when (not @loading) "hidden")}}]]]])))
