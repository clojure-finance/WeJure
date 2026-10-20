(ns wejure.components.chatPage
  (:require ["../js/chat" :as chat]
            ["@mui/icons-material/Block$default" :as BlockIcon]
            ["@mui/material/Avatar$default" :as Avatar]
            ["@mui/material/Box$default" :as Box]
            ["@mui/material/Button$default" :as Button]
            ["@mui/material/Grid$default" :as Grid]
            ["@mui/material/List$default" :as List]
            ["@mui/material/ListItemAvatar$default" :as ListItemAvatar]
            ["@mui/material/ListItemButton$default" :as ListItemButton]
            ["@mui/material/ListItemText$default" :as ListItemText]
            ["@mui/material/Paper$default" :as Paper]
            ["@mui/material/Typography$default" :as Typography]
            [reagent.core :as r]
            [wejure.common :as common]
            [wejure.components.textField :refer [text-field]]))

(defn- format-timestamp [timestamp]
  (let [date (js/Date. timestamp)
        yesterday (doto (js/Date.) (.setDate (dec (.getDate (js/Date.)))))
        time (.toLocaleTimeString date "en-US" #js {:hour "2-digit" :minute "2-digit"})]
    (condp = (.toDateString date)
      (.toDateString (js/Date.)) (str "Today " time)
      (.toDateString yesterday) (str "Yesterday " time)
      (.toLocaleDateString date "en-US" #js {:month "short" :day "numeric"}))))

(defn- scroll-to-bottom []
  (js/setTimeout #(some-> (.getElementById js/document "bottom") (.scrollIntoView)) 100))

(defn- contact-item [{:keys [id last_message_time] icon-cid :avatar} selected? on-select]
  [:> ListItemButton
   {:selected selected?
    :on-click on-select}
   [:> ListItemAvatar
    (if icon-cid
      [:> Avatar {:src (common/ipfs-url icon-cid) :alt id}]
      [:> Avatar {:sx {:bgcolor "primary.main"}}
       (subs id 0 1)])]
   [:> ListItemText {:primary id}]
   (when (pos? last_message_time)
     [:> Typography {:variant "body2" :color "textSecondary"}
      (format-timestamp last_message_time)])])

(defn- message-bubble [{:keys [sender content timestamp]} username]
  (let [own? (= sender username)]
    [:> Box {:sx {:m 1
                  :display "flex"
                  :justify-content (if own? "flex-end" "flex-start")}}
     [:> Box {:sx {:max-width "70%"
                   :display "flex"
                   :flex-direction "column"
                   :align-items (if own? "flex-end" "flex-start")}}
      [:> Typography {:variant "caption" :color "textSecondary" :sx {:mb 0.5}}
       (if own? "You" sender)]
      [:> Box {:sx {:px 2
                    :py 1
                    :border-radius 4
                    :bgcolor (if own? "primary.light" "grey.100")}}
       [:> Typography content]]
      [:> Typography {:variant "caption" :color "textSecondary" :sx {:mt 0.5}}
       (format-timestamp timestamp)]]]))

(defn chat-page []
  (r/with-let [username (common/current-username)
               contacts (r/atom [])                                   ;; [{:id :avatar :last_message_time}]
               peer (r/atom nil)                                      ;; username of the open conversation
               messages (r/atom (sorted-map))                         ;; gun time key (ms) -> {:timestamp :sender :content}
               draft (r/atom "")
               open-chat! (fn [p]
                            (reset! peer p)
                            (reset! messages (sorted-map))
                            (chat/displayMessage p (fn [from message time-key]
                                                     (when (= from @peer)   ;; ignore conversations opened earlier
                                                       (swap! messages assoc (js/parseInt time-key) (js->clj message :keywordize-keys true))
                                                       (scroll-to-bottom)))))
               send! (fn []
                       (let [text @draft]
                         (when (and @peer (seq text))
                           (reset! draft "")
                           (.then (chat/storeMessage @peer text)
                                  (fn [err]
                                    (when err
                                      (reset! draft text)
                                      (js/alert err)))))))
               stop-contacts (chat/init username #(reset! contacts (js->clj % :keywordize-keys true)))]
    (when-let [p (js/sessionStorage.getItem "chat_peer")]                ;; opened from a profile page's "Message" button
      (js/sessionStorage.removeItem "chat_peer")
      (open-chat! p))
    [:div
     [:> Grid {:container true :spacing 2 :sx {:height "100vh"}}
      ;; left sidebar: contacts, most recent conversation first
      [:> Grid {:size 3 :sx {:border-right 1 :border-color "divider" :height "100%"}}
       [:> Typography {:variant "h6" :sx {:p 2}} "Contacts"]
       [:> List {:dense true :sx {:overflow "auto" :max-height "80vh"}}
        (if (empty? @contacts)
          [:> Box {:sx {:p 2 :text-align "center"}}
           [:> Typography {:variant "body2" :color "textSecondary"}
            "Follow someone or receive a message to start chatting"]]
          (let [selected @peer]                                       ;; deref outside the lazy seq
            (for [contact (sort-by (juxt (comp - :last_message_time) :id) @contacts)]
              ^{:key (:id contact)}
              [contact-item contact (= selected (:id contact)) #(open-chat! (:id contact))])))]]

      ;; right side: the open conversation
      [:> Grid {:size 9 :sx {:display "flex" :flex-direction "column" :height "100%"}}
       [:> Box {:sx {:p 2 :border-bottom 1 :border-color "divider" :display "flex" :align-items "center"}}
        (if @peer
          [:> Typography {:variant "h6"} @peer]
          [:> Typography {:variant "h6" :color "textSecondary"} "Select a contact to start chatting"])
        (when @peer
          [:> Button {:variant "outlined"
                      :color "error"
                      :size "small"
                      :start-icon (r/as-element [:> BlockIcon])
                      :on-click (fn []
                                  (chat/addToBlacklist @peer)
                                  (js/alert (str "You have blocked " @peer))
                                  (reset! peer nil))
                      :sx {:ml "auto"}}
           "Block User"])]

       [:> Paper {:sx {:flex-grow 1 :overflow "auto" :p 2}}
        (for [[time-key message] @messages]
          ^{:key time-key} [message-bubble message username])
        [:div {:id "bottom"}]]

       [:> Box {:sx {:p 2 :border-top 1 :border-color "divider"}}
        [:> Grid {:container true :spacing 1 :sx {:align-items "center"}}
         [:> Grid {:size 10}
          [text-field {:full-width true
                       :variant "outlined"
                       :size "small"
                       :placeholder "Type your message..."
                       :disabled (nil? @peer)
                       :value @draft
                       :on-change #(reset! draft (.. % -target -value))
                       :on-key-down #(when (= (.-key %) "Enter") (send!))}]]
         [:> Grid {:size 2}
          [:> Button {:variant "contained"
                      :full-width true
                      :disabled (or (nil? @peer) (empty? @draft))
                      :on-click send!}
           "Send"]]]]]]]
    (finally
      (stop-contacts))))
