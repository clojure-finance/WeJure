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

(def message-list (r/atom []))

(def username (atom ""))

;; used in chatSystem.js, replicate the reset! function in clojure
(defn ^:export atom-reset [target-atom value]
  (reset! target-atom value)
  target-atom)

;; used in chatSystem.js, replicate the conj function used with swap! in clojure
(defn ^:export atom-conj [target-atom value]                  
  (swap! target-atom conj value)
  target-atom)

;; used in chatSystem.js, show the updated messages in chatbox
(defn ^:export add-message [target-atom value] 
  (let [sender (get (js->clj value :keywordize-keys true) :sender)]
  (when (and (not= (get (js->clj value :keywordize-keys true) :timestamp) (get (js->clj (last @target-atom) :keywordize-keys true) :timestamp))
             (or (= sender @username) (= sender @selected-recipient)))
    (swap! target-atom conj value)
    target-atom)))

(defn chat-page [{:keys [details step]}]
  (reset! username (get @details :name))
  (when (= 1 (count @recipient-list))
    (chat/init @username))
  [:div
   [typography
    {:variant "h4"
     :component "div"}
    "Direct Messages"]
   [:div
    [:label "Send to: "]
    [:select {:value @selected-recipient
              :on-change (fn [event]
                           (reset! selected-recipient (-> event .-target .-value))                ;; perform peer selection
                           (reset! message-list [])                                               ;; clear the previous message output
                           (chat/displayMessage @selected-recipient))}                            ;; display all the stored messages between the user and the peer
     (for [recipient @recipient-list]                                                             ;; retrieve the user list and add them in the peer selection box
       (when (not= recipient @username)
         [:option {:key recipient :value recipient} recipient]))]]

   [:div
    {:style {:height "600px"
             :border "2px solid #ccc"
             :display "flex"
             :flex-direction "column"}}
    (for [message-line (js->clj @message-list :keywordize-keys true)]                             ;; show all the messages in the message list in the chatbox
      ^{:key message-line} [:p (get message-line :timestamp) " " [:span {:style {:color "red"}} (get message-line :sender) ":"] " " (get message-line :content)])]

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
     "send"]]])


