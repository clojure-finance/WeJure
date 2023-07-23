(ns wejure.components.chatPage
  (:require ["../js/chat" :as chat]
            [reagent-mui.material.box :refer [box]]
            [reagent-mui.material.button :refer [button]]
            [reagent-mui.material.form-control :refer [form-control]]
            [reagent-mui.material.grid :refer [grid]]
            [reagent-mui.material.input-label :refer [input-label]]
            [reagent-mui.material.menu-item :refer [menu-item]]
            [reagent-mui.material.paper :refer [paper]]
            [reagent-mui.material.select :refer [select]]
            [reagent-mui.material.text-field :refer [text-field]]
            [reagent-mui.material.typography :refer [typography]]
            [reagent.core :as r]))

(def recipient-list (r/atom []))

(def selected-recipient (r/atom ""))

(def message (r/atom ""))

(def message-list (r/atom []))

(def username (atom (js/sessionStorage.getItem "username")))

;; automatically scroll the message box to the bottom
(defn async-scroll [delay]
  (let [promise (js/Promise. (fn [resolve]
                               (js/setTimeout #(resolve (.scrollIntoView (.getElementById js/document "bottom"))) delay)))]
    promise))

;; used in chatSystem.js, replicate the reset! function in clojure
(defn ^:export atom-reset [target-atom value]
  (reset! target-atom value))

;; used in chatSystem.js, replicate the conj function used with swap! in clojure
(defn ^:export atom-conj [target-atom value]  
  (swap! target-atom conj value))

;; used in chatSystem.js, show the updated messages in chatbox
(defn ^:export add-message [target-atom value] 
  (let [sender (get (js->clj value :keywordize-keys true) :sender)]
  (when (and (not= (get (js->clj value :keywordize-keys true) :timestamp) (get (js->clj (last @target-atom) :keywordize-keys true) :timestamp))
             (or (= sender @username) (= sender @selected-recipient)))
    (async-scroll 100)
    (swap! target-atom conj value))))

(defn chat-page []
  (when (= 0 (count @recipient-list))
    (chat/init @username))
  (when (not= (js/sessionStorage.getItem "chat_peer") nil)                                          ;; navigated from a user's profile page
    (reset! selected-recipient (js/sessionStorage.getItem "chat_peer"))
    (js/sessionStorage.removeItem "chat_peer")
    (println @selected-recipient)
    (reset! message-list [])
    (chat/displayMessage @selected-recipient))
  [:div
   [grid {:container true :spacing 2 :px "20%" :my 1}                                               ;; using grid layout for the page
    [grid {:item true :xs 9}
     [typography
      {:variant "h4"
       :component "div"}
      "Direct Messages"]]
    
    [grid {:item true :xs 3}                                                                        ;; select box for selecting message recipient
     [box {:display "flex" :justify-content "flex-end"}
      [form-control {:variant "filled" :size "small" :sx {:min-width 200}}
       [input-label "Recipient"]
       [select {:value @selected-recipient
                :auto-width true
                :style {:background-color "white"}
                :on-change (fn [event]
                             (reset! selected-recipient (-> event .-target .-value))
                             (reset! message-list [])                                               ;; clear the previous message output                           
                             (chat/displayMessage @selected-recipient))}
        (for [recipient @recipient-list]                                                            ;; retrieve the user list and add them in the peer selection box
          [menu-item {:key recipient :value recipient} recipient])]]]]
    
    [grid {:item true :xs 12}                                                                       ;; message box
     [paper {:id "message-box" :variant "outlined" :sx {:height 700 :overflow "auto"}}
      (for [message-line (js->clj @message-list :keywordize-keys true)]                             ;; show all the messages in the message list in the chatbox
        (if (= (get message-line :sender) @username)
          ^{:key message-line}                                                                      ;; align the message right when it's sent by the user
          [box {:sx {:m 1 :display "flex" :justify-content "flex-end"}}
           [typography {:sx {:border 1
                             :border-radius 4
                             :px 2
                             :max-width 600
                             :background-color "#f8edeb"}}
            "[" (subs (get message-line :timestamp) 5 11) " " (subs (get message-line :timestamp) 17 22) "] " (get message-line :content)]]
          ^{:key message-line}                                                                      ;; align the message left when it's sent by the user
          [box {:sx {:m 1 :display "flex"}}
           [typography {:sx {:border 1
                             :border-radius 8
                             :px 2
                             :max-width 600
                             :background-color "#f2f2f2"}}
            "[" (subs (get message-line :timestamp) 5 11) " " (subs (get message-line :timestamp) 17 22) "] " (get message-line :content)]]))
      [:div {:id "bottom"}]]]
    
    [grid {:item true :xs 11}                                                                      ;; text field for message input 
     [text-field {:full-width true
                  :style {:background-color "white"}
                  :placeholder "Input message"
                  :variant "outlined"
                  :size "small"
                  :value @message
                  :on-change (fn [event]
                               (reset! message (-> event .-target .-value)))}]]
    
    [grid {:item true :xs 1}                                                                       ;; button for sending message
     [box {:display "flex" :justify-content "flex-end"}
     [button
      {:variant "contained"
       :disable-elevation true
       :size "small"
       :on-click #(chat/storeMessage @selected-recipient @message)}
      "send"]]]]])


