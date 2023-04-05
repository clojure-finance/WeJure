(ns wejure.components.loginPage
  (:require ["../js/accSystem" :as acc]
            [reagent-mui.material.box :refer [box]]
            [reagent-mui.material.button :refer [button]]
            [reagent-mui.material.circular-progress :refer [circular-progress]]
            [reagent-mui.material.text-field :refer [text-field]]
            [reagent-mui.material.typography :refer [typography]]
            [reagent.core :as r]))

(defn emptyField [field]
    (= (count @field) 0))

(def step-ref (atom ""))

(def loading-ref (atom ""))

(defn ^:export toMainPage []
  (reset! @step-ref 3))

(defn ^:export stopLoading []
  (reset! @loading-ref false))

(defn ^:export atom-assoc-cid [details cid]           ;; function for adding the icon CID to the details map
  (swap! details assoc :icon-cid cid))

(defn authenticate [name password details loading]
  (reset! loading-ref loading)
  (reset! loading true)
  (println (str "account: " (:account @details) " loading: " @loading))
  (swap! details assoc :name @name)
  (acc/setIconCID @name details)
  (acc/login @name @password))

(defn login-page [{:keys [details step]}]
  (let [name (r/atom nil) password (r/atom nil) loading (r/atom false)]
    (reset! step-ref step)
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
              :padding "50px 30px"}}

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
           :error (emptyField name)
           :helper-text (if (emptyField name) "no text entered (20 characters max)" " ")
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
           :error (emptyField password)
           :helper-text (if (emptyField password) "no text entered (20 characters max)" " ")
           :input-props {:max-length 20}}]]

        [:div
         {:style {:display "flex"
                  :flex-direction "column"
                  :align-items "center"}}
         [button
          {:variant "contained"
           :disable-elevation true
           :disabled (or (emptyField name) (emptyField password) @loading)
           :on-click #(authenticate name password details loading)}
          "Submit"]
         [circular-progress {:sx {:margin "10px" :visibility (when (not @loading) "hidden")}}]]]])))