;; (ns wejure.components.chatPage
;;   (:require ["../js/chat" :as chat]
;;             [reagent-mui.material.box :refer [box]]
;;             [reagent-mui.material.button :refer [button]]
;;             [reagent-mui.material.form-control :refer [form-control]]
;;             [reagent-mui.material.grid :refer [grid]]
;;             [reagent-mui.material.input-label :refer [input-label]]
;;             [reagent-mui.material.menu-item :refer [menu-item]]
;;             [reagent-mui.material.paper :refer [paper]]
;;             [reagent-mui.material.select :refer [select]]
;;             [reagent-mui.material.text-field :refer [text-field]]
;;             [reagent-mui.material.typography :refer [typography]]
;;             ["@mui/material/Dialog" :default Dialog]
;;             ["@mui/material/DialogActions" :default DialogActions]
;;             ["@mui/material/DialogContent" :default DialogContent]
;;             ["@mui/material/DialogContentText" :default DialogContentText]
;;             ["@mui/material/DialogTitle" :default DialogTitle]
;;             [reagent.core :as r]))

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
            [reagent-mui.material.list :refer [list]]
            [reagent-mui.material.list-item :refer [list-item]]
            [reagent-mui.material.list-item-text :refer [list-item-text]]
            [reagent-mui.material.list-item-avatar :refer [list-item-avatar]]
            [reagent-mui.material.avatar :refer [avatar]]
            [reagent-mui.material.divider :refer [divider]]
            [reagent-mui.icons.block :refer [block]]
            [reagent-mui.icons.group :refer [group]]
            [reagent.core :as r]
            [cljs-time.core :as t]
            [cljs-time.format :as tf]))

;; Atoms
(def recipient-list (r/atom []))
(def group-list (r/atom []))
(def sorted-recipient-list (r/atom []))
(def sorted-group-list (r/atom []))
(def selected-recipient (r/atom ""))
(def message (r/atom ""))
(def message-list (r/atom []))
(def username (atom (js/sessionStorage.getItem "username")))
(def blocked (atom false))
(def blocking (atom false))

;; IPFS URL for avatars
(def ipfs-url "http://localhost:8080/ipfs/")

;; Helper functions
(defn ^:export atom-reset [target-atom value]
  (reset! target-atom value))

(defn ^:export atom-conj [target-atom value]  
  (swap! target-atom conj value))

(defn sort-messages-by-timestamp [messages]
  (sort-by :timestamp messages))

(defn ^:export add-message [target-atom value]
  (when value ; 
    (let [new-message (js->clj value :keywordize-keys true)
          current-messages @message-list
          message-exists? (some #(= (:timestamp %) (:timestamp new-message)) current-messages)]
      (when-not message-exists? 
        (reset! message-list (sort-messages-by-timestamp (conj current-messages new-message)))))))

(defn async-scroll [delay]
  (js/setTimeout #(.scrollIntoView (.getElementById js/document "bottom")) delay))

(defn format-timestamp [timestamp]
  (try
    (let [date (js/Date. timestamp)
          now (js/Date.)
          diff-ms (- now date)
          diff-days (/ diff-ms (* 1000 60 60 24))]
      (cond
        (< diff-ms (* 1000 60 60)) (str "Today " (.toLocaleTimeString date "en-US" #js {:hour "2-digit" :minute "2-digit"}))
        (< diff-days 1) (str "Yesterday " (.toLocaleTimeString date "en-US" #js {:hour "2-digit" :minute "2-digit"}))
        :else (.toLocaleDateString date "en-US" #js {:month "short" :day "numeric"})))
    (catch :default e
      timestamp)))

(defn sort-contacts-by-last-message [contacts]
  (println "Sorting contacts:" contacts)
  (sort-by (fn [contact] 
             (let [contact-map (if (js/Object.prototype.toString.call contact) 
                                 (js->clj contact :keywordize-keys true) 
                                 contact)]
               (or (:last-message-time contact-map) 0))) > contacts))

(defn update-sorted-lists []
  (println "Updating sorted lists manually...")
  (println "Raw recipient list:" @recipient-list)
  (try
    ;; Convert JavaScript objects to Clojure maps
    (let [converted-recipients (js->clj @recipient-list :keywordize-keys true)
          converted-groups (js->clj @group-list :keywordize-keys true)]
      (println "Converted recipients:" converted-recipients)
      (reset! sorted-recipient-list (sort-contacts-by-last-message converted-recipients))
      (reset! sorted-group-list (sort-contacts-by-last-message converted-groups))
      (println "Sorted lists updated successfully")
      (println "Final sorted recipient list:" @sorted-recipient-list))
    (catch :default e
      (println "Error updating sorted lists:" e)
      ;; Fallback to unsorted lists
      (let [converted-recipients (js->clj @recipient-list :keywordize-keys true)
            converted-groups (js->clj @group-list :keywordize-keys true)]
        (reset! sorted-recipient-list converted-recipients)
        (reset! sorted-group-list converted-groups)))))

;; Manual refresh function
(defn manual-refresh []
  (println "Manual refresh triggered")
  (chat/init @username)
  (update-sorted-lists))

;; Initialize chat and sort lists
(defn init-chat []
  (when (or (empty? @recipient-list) (empty? @group-list))
    ;; (println "username  is: " @username)
    (chat/init @username)
    (println "recipient list: "@recipient-list)
    ;; Remove automatic timeout - make it manual only
    ;; (js/setTimeout update-sorted-lists 1000)
    )
  (when (not= (js/sessionStorage.getItem "chat_peer") nil)
    (reset! selected-recipient (js/sessionStorage.getItem "chat_peer"))
    (js/sessionStorage.removeItem "chat_peer")
    (reset! message-list [])
    (chat/displayMessage @selected-recipient)))

;; Prevent empty page by ensuring minimum state
(defn ensure-minimal-state []
  (when (empty? @recipient-list)
    (reset! recipient-list []))
  (when (empty? @sorted-recipient-list)
    (reset! sorted-recipient-list []))
  (when (empty? @group-list)
    (reset! group-list []))
  (when (empty? @sorted-group-list)
    (reset! sorted-group-list [])))

;; Recover from corrupted state
(defn recover-from-corruption []
  (when (or (nil? @recipient-list) (nil? @sorted-recipient-list))
    (reset! recipient-list [])
    (reset! sorted-recipient-list [])
    (reset! group-list [])
    (reset! sorted-group-list [])
    (init-chat)))

;; Block user function
(defn block-current-user []
  (if (not= @selected-recipient "")
    (do
      (chat/addToBlacklist @selected-recipient)
      (reset! selected-recipient "")
      (reset! message-list [])
      ;; Remove automatic refresh - make it manual
      ;; (js/setTimeout #(do (init-chat) (update-sorted-lists)) 500)
      (js/alert (str "Blocked user: " @selected-recipient)))
    (js/alert "Please select a user first")))

;; UI components
(defn contact-item [contact]
  ;; Ensure contact is a Clojure map
  (let [contact-map (if (js/Object.prototype.toString.call contact) 
                      (js->clj contact :keywordize-keys true) 
                      contact)]
    [list-item
     {:button true
      :selected (= @selected-recipient (:id contact-map))
      :on-click (fn []
                  (reset! selected-recipient (:id contact-map))
                  (reset! message-list [])
                  (chat/displayMessage (:id contact-map))
                  ;; 添加滚动到底部
                  (async-scroll 100)
                  ;; 如果需要，添加日志
                  (println "Selected recipient:" (:id contact-map)))}
     [list-item-avatar
      (if (and (:avatar contact-map) (not= (:avatar contact-map) ""))
        [avatar {:src (str ipfs-url (:avatar contact-map)) :alt (:name contact-map)}]
        [avatar {:sx {:bgcolor "primary.main"}}
         (subs (:name contact-map) 0 1)])]
     [list-item-text
      {:primary (:name contact-map)
       :secondary (if (:last-message contact-map)
                    (str (subs (or (:last-message contact-map) "") 0
                               (min 20 (count (or (:last-message contact-map) ""))))
                         (when (> (count (or (:last-message contact-map) "")) 20) "..."))
                    "Click to chat")}]
     [typography {:variant "body2" :color "textSecondary"}
      (if (:last-message-time contact-map)
        (format-timestamp (:last-message-time contact-map))
        "")]]))

(defn group-item [group]
  [list-item 
   {:button true
    :on-click (fn []
                (reset! selected-recipient "")
                (js/alert "Group chat functionality"))}
   [list-item-avatar
    [avatar {:sx {:bgcolor "primary.main"}}
     [group]]]
   [list-item-text 
    {:primary (:name group)
     :secondary (str (count (:members group)) " members")}]
   [typography {:variant "body2" :color "textSecondary"}
    (format-timestamp (:last-message-time group))]])

(defn message-bubble [message-line]
  (let [is-sender? (= (get message-line :sender) @username)]
    [box {:sx {:m 1 
               :display "flex" 
               :justify-content (if is-sender? "flex-end" "flex-start")}}
     [box {:sx {:max-width "70%"
                :display "flex"
                :flex-direction "column"
                :align-items (if is-sender? "flex-end" "flex-start")}}
      [typography {:variant "caption" :color "textSecondary" :sx {:mb 0.5}}
       (if is-sender? "You" (get message-line :sender))]
      [box {:sx {:px 2
                 :py 1
                 :border-radius 4
                 :bgcolor (if is-sender? "primary.light" "grey.100")}}
       [typography (get message-line :content)]]
      [typography {:variant "caption" :color "textSecondary" :sx {:mt 0.5}}
       (-> (get message-line :timestamp)
           (format-timestamp))]]]))

(defn chat-page []
  (init-chat)
  ;; Remove automatic state management - make it manual only
  ;; (ensure-minimal-state)
  ;; (recover-from-corruption)
  
  ;; Add debugging
  (println "Chat page rendering...")
  (println "Recipient list count:" (count @recipient-list))
  (println "Sorted recipient list count:" (count @sorted-recipient-list))
  (println "Sorted recipient list:" @sorted-recipient-list)
  
  ;; Fallback UI if everything is empty
  (when (and (empty? @sorted-recipient-list) (empty? @sorted-group-list))
    [:div {:style {:height "100vh" :display "flex" :justify-content "center" :align-items "center"}}
     [box {:sx {:text-align "center"}}
      [typography {:variant "h6" :color "textSecondary"} "No contacts loaded"]
      [button 
       {:variant "contained" 
        :sx {:mt 2}
        :on-click manual-refresh}
       "Load Contacts"]]])
  
  [:div
   [grid {:container true :spacing 2 :sx {:height "100vh"}}
    ;; Left sidebar - Contacts and Groups
    [grid {:item true :xs 3 :sx {:border-right 1 :border-color "divider" :height "100%"}}
     [box {:sx {:p 2 :display "flex" :justify-content "space-between" :align-items "center"}}
      [typography {:variant "h6"} "Contacts"]
      [button 
       {:variant "outlined" 
        :size "small"
        :on-click manual-refresh}
       "Refresh"]]
     [list {:dense true :sx {:overflow "auto" :max-height "40vh"}}
      (if (empty? @sorted-recipient-list)
        [box {:sx {:p 2 :text-align "center"}}
         [typography {:variant "body2" :color "textSecondary"} "No contacts found"]
         [typography {:variant "caption" :color "textSecondary"} "Click refresh to load contacts"]
         [button 
          {:variant "outlined" 
           :size "small"
           :sx {:mt 1}
           :on-click manual-refresh}
          "Refresh"]]
        (for [contact @sorted-recipient-list]
          ^{:key (:id contact)} [contact-item contact]))]
     
     [divider]
     
     [typography {:variant "h6" :sx {:p 2}} "Groups"]
     [list {:dense true :sx {:overflow "auto" :max-height "40vh"}}
      (for [group @sorted-group-list]
        ^{:key (:id group)} [group-item group])]
     [button 
      {:variant "contained" 
       :sx {:m 2}
       :on-click #(js/alert "Create group functionality")}
      "Create Group"]]
    
    ;; Right main area - Chat messages
    [grid {:item true :xs 9 :sx {:display "flex" :flex-direction "column" :height "100%"}}
     ;; Chat header
     [box {:sx {:p 2 :border-bottom 1 :border-color "divider" :display "flex" :align-items "center"}}
      (if (not= @selected-recipient "")
        [typography {:variant "h6"} @selected-recipient]
        [typography {:variant "h6" :color "textSecondary"} "Select a contact to start chatting"])
      
      (when (not= @selected-recipient "")
        [button {:variant "outlined"
                 :color "error"
                 :size "small"
                 :start-icon (r/as-element [block])
                 :on-click block-current-user
                 :sx {:ml "auto"}}
         "Block User"])]
     
     ;; Messages area
     [paper {:sx {:flex-grow 1 :overflow "auto" :p 2}}
      (if (not= @selected-recipient "")
        ;; (for [message-line (js->clj @message-list :keywordize-keys true)]
        (for [message-line @message-list]
          ^{:key (hash message-line)} [message-bubble message-line])
        [box {:sx {:height "100%" :display "flex" :justify-content "center" :align-items "center"}}
         [typography {:variant "h6" :color "textSecondary"} "Select a contact to start chatting"]])
      [:div {:id "bottom"}]]
     
     ;; Message input area
     [box {:sx {:p 2 :border-top 1 :border-color "divider"}}
      [grid {:container true :spacing 1 :align-items "center"}
       [grid {:item true :xs 10}
        [text-field {:full-width true
                     :variant "outlined"
                     :size "small"
                     :placeholder "Type your message..."
                     :value @message
                     :on-change #(reset! message (-> % .-target .-value))
                     :on-key-press (fn [e]
                                     (when (= (.-key e) "Enter")
                                       (chat/storeMessage @selected-recipient @message)
                                       (reset! message "")))}]]
       [grid {:item true :xs 2}
        [button {:variant "contained"
                 :full-width true
                 :disabled (or (= @selected-recipient "") (= @message ""))
                 :on-click (fn []
                             (chat/storeMessage @selected-recipient @message)
                             (reset! message ""))}
         "Send"]]]]]]])
;; (def dialog (r/adapt-react-class Dialog))
;; (def dialog-title (r/adapt-react-class DialogTitle))
;; (def dialog-content (r/adapt-react-class DialogContent))
;; (def dialog-content-text (r/adapt-react-class DialogContentText))
;; (def dialog-actions (r/adapt-react-class DialogActions))
;; (def recipient-list (r/atom []))
;; (def group-list (r/atom []))

;; (def selected-recipient (r/atom ""))

;; (def message (r/atom ""))

;; (def message-list (r/atom []))

;; (def username (atom (js/sessionStorage.getItem "username")))

;; ;; automatically scroll the message box to the bottom
;; (defn async-scroll [delay]
;;   (let [promise (js/Promise. (fn [resolve]
;;                                (js/setTimeout #(resolve (.scrollIntoView (.getElementById js/document "bottom"))) delay)))]
;;     promise))

;; ;; used in chatSystem.js, replicate the reset! function in clojure
;; (defn ^:export atom-reset [target-atom value]
;;   (reset! target-atom value))

;; ;; used in chatSystem.js, replicate the conj function used with swap! in clojure
;; (defn ^:export atom-conj [target-atom value]  
;;   (swap! target-atom conj value))

;; ;; used in chatSystem.js, show the updated messages in chatbox
;; (defn ^:export add-message [target-atom value] 
;;   (let [sender (get (js->clj value :keywordize-keys true) :sender)]
;;   (when (and (not= (get (js->clj value :keywordize-keys true) :timestamp) (get (js->clj (last @target-atom) :keywordize-keys true) :timestamp))
;;              (or (= sender @username) (= sender @selected-recipient)))
;;     (async-scroll 100)
;;     (swap! target-atom conj value))))

;; (defn chat-page []
;;   (when (= 0 (count @recipient-list))
;;     (chat/init @username))
;;   (when (not= (js/sessionStorage.getItem "chat_peer") nil)                                          ;; navigated from a user's profile page
;;     (reset! selected-recipient (js/sessionStorage.getItem "chat_peer"))
;;     (js/sessionStorage.removeItem "chat_peer")
;;     (println @selected-recipient)
;;     (reset! message-list [])
;;     (chat/displayMessage @selected-recipient))
;;   [:div
;;    [grid {:container true :spacing 2 :px "20%" :my 1}                                               ;; using grid layout for the page
;;     [grid {:item true :xs 9}
;;      [typography
;;       {:variant "h4"
;;        :component "div"}
;;       "Direct Messages"]]
    
;;     [grid {:item true :xs 3}                                                                        ;; select box for selecting message recipient
;;      [box {:display "flex" :justify-content "flex-end"}
;;       [form-control {:variant "filled" :size "small" :sx {:min-width 200}}
;;        [input-label "Recipient"]
;;        [select {:value @selected-recipient
;;                 :auto-width true
;;                 :style {:background-color "white"}
;;                 :on-change (fn [event]
;;                              (reset! selected-recipient (-> event .-target .-value))
;;                              (reset! message-list [])                                               ;; clear the previous message output                           
;;                              (chat/displayMessage @selected-recipient))}
;;         (for [recipient @recipient-list]                                                            ;; retrieve the user list and add them in the peer selection box
;;           [menu-item {:key recipient :value recipient} recipient])]]]]
    
;;     [grid {:item true :xs 12}                                                                       ;; message box
;;      [paper {:id "message-box" :variant "outlined" :sx {:height 700 :overflow "auto"}}
;;       (for [message-line (js->clj @message-list :keywordize-keys true)]                             ;; show all the messages in the message list in the chatbox
;;         (if (= (get message-line :sender) @username)
;;           ^{:key message-line}                                                                      ;; align the message right when it's sent by the user
;;           [box {:sx {:m 1 :display "flex" :justify-content "flex-end"}}
;;            [typography {:sx {:border 1
;;                              :border-radius 4
;;                              :px 2
;;                              :max-width 600
;;                              :background-color "#f8edeb"}}
;;             "[" (subs (get message-line :timestamp) 5 11) " " (subs (get message-line :timestamp) 17 22) "] " (get message-line :content)]]
;;           ^{:key message-line}                                                                      ;; align the message left when it's sent by the user
;;           [box {:sx {:m 1 :display "flex"}}
;;            [typography {:sx {:border 1
;;                              :border-radius 8
;;                              :px 2
;;                              :max-width 600
;;                              :background-color "#f2f2f2"}}
;;             "[" (subs (get message-line :timestamp) 5 11) " " (subs (get message-line :timestamp) 17 22) "] " (get message-line :content)]]))
;;       [:div {:id "bottom"}]]]
    
;;     [grid {:item true :xs 11}                                                                      ;; text field for message input 
;;      [text-field {:full-width true
;;                   :style {:background-color "white"}
;;                   :placeholder "Input message"
;;                   :variant "outlined"
;;                   :size "small"
;;                   :value @message
;;                   :on-change (fn [event]
;;                                (reset! message (-> event .-target .-value)))}]]
    
;;     [grid {:item true :xs 1}                                                                       ;; button for sending message
;;      [box {:display "flex" :justify-content "flex-end"}
;;      [button
;;       {:variant "contained"
;;        :disable-elevation true
;;        :size "small"
;;        :on-click #(chat/storeMessage @selected-recipient @message)}
;;       "send"]]]]])


