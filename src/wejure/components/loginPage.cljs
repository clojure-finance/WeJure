(ns wejure.components.loginPage
  (:require ["../js/account" :as acc]
            [reitit.frontend.easy :as reitit-fe]
            [reagent-mui.material.box :refer [box]]
            [reagent-mui.material.button :refer [button]]
            [reagent-mui.material.circular-progress :refer [circular-progress]]
            [reagent-mui.material.text-field :refer [text-field]]
            [reagent-mui.material.typography :refer [typography]]
            [reagent.core :as r]))

(defn input-length-at-least [field min]                                    ;; check if the length of the input is at least min
  (>= (count @field) min))


(def loading-ref (atom ""))

(defn ^:export toMainPage []
  (set! js/window.location.href (reitit-fe/href :wejure.core/home)))

(defn ^:export stopLoading []
  (reset! @loading-ref false))

(defn authenticate [name password loading]
  (reset! loading-ref loading)
  (reset! loading true)
  (acc/login @name @password))

(defn login-page []
  (let [name (r/atom nil) password (r/atom nil) loading (r/atom false)]
    (fn []
    [:div
     {:style {:height "100%" :display "flex" :justify-content "center" :align-items "center"}}
     [box
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

      [typography
       {:variant "h5"
        :component "div"}
       "Login your WeJure account"]

      [:div
       {:style {:display "flex"
                :flex-direction "column"}}

       [typography
        {:variant "h6"
         :component "div"}
        "1. Enter your username"]

       [text-field
        {:variant "filled"
         :value @name
         :on-change (fn [e] (reset! name (.. e -target -value)))
         :error (not (input-length-at-least name 1))
         :helper-text (if (not (input-length-at-least name 1)) "Please enter your username" " ")
         :input-props {:max-length 20}}]]

      [:div
       {:style {:display "flex"
                :flex-direction "column"}}

       [typography
        {:variant "h6"
         :component "div"}
        "2. Enter your password"]

       [text-field
        {:variant "filled"
         :type "password"
         :value @password
         :on-change (fn [e] (reset! password (.. e -target -value)))
         :error (not (input-length-at-least password 1))
         :helper-text (if (not (input-length-at-least password 1)) "Please enter your password" " ")
         :input-props {:max-length 20}}]]

      [:div
       {:style {:display "flex"
                :flex-direction "column"
                :align-items "center"}}
       [button
        {:variant "contained"
         :type "submit"
         :disable-elevation true
         :disabled (or (not (input-length-at-least name 1)) (not (input-length-at-least password 1)) @loading)}
        "Submit"]
       [circular-progress {:sx {:margin "10px" :visibility (when (not @loading) "hidden")}}]]]])))