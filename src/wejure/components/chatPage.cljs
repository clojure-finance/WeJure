(ns wejure.components.chatPage
  (:require [reagent.core :as r] 
            [reagent-mui.material.text-field :refer [text-field]]
            [reagent-mui.material.button :refer [button]]
            [reagent-mui.material.typography :refer [typography]]
            [reagent-mui.material.select :refer [select]]
            ["../js/chatSystem" :as chat]))

(def recipient-list (r/atom ["Select recipient"]))

(def selected-recipient (r/atom ""))

(def message (r/atom ""))

(def message-list (r/atom ""))

(defn ^:export atom-reset [target-atom value]
  (reset! target-atom value)
  target-atom)

(defn ^:export atom-conj [target-atom value]
  (swap! target-atom conj value)
  target-atom)

(defn ^:export atom-str [target-atom value]
  (swap! target-atom str value)
  target-atom)

(defn chat-page [{:keys [details step]}]
  (let [username (get @details :name) prev-peer (r/atom "")] 
    (when (= 1 (count @recipient-list))
      (chat/init username)) 
    [:div
     [typography
      {:variant "h4"
       :component "div"}
      "Direct Messages"]
     [:div
      [:label "Send to: "]
      [:select {:value @selected-recipient
                :on-change (fn [event] (reset! prev-peer @selected-recipient) (reset! selected-recipient (-> event .-target .-value)) (chat/displayMessage @selected-recipient @prev-peer))}
       (for [recipient @recipient-list]
         (when (not= recipient username)
           [:option {:key recipient :value recipient} recipient]))]]

     [:div
      {:style {:height "600px"
               :border "2px solid #ccc"
               :display "flex"
               :flex-direction "column"}}
      [:p {:dangerouslySetInnerHTML
           {:__html @message-list}}]]

     [:div
      [:input {:style {:width "100%"}
               :id "message"
               :type "text"
               :placeholder "Send message here"
               :value @message
               :on-change (fn [event]
                            (reset! message (-> event .-target .-value)))}]]

     [:div
      [button
       {:variant "contained"
        :disable-elevation true
        :size "small"
        :on-click #(chat/storeMessage @selected-recipient @message)}
       "send"]]]
  ))


