(ns wejure.components.chatPage
  (:require ["@mui/icons-material/Block$default" :as BlockIcon]
            ["@mui/material/Box$default" :as Box]
            ["@mui/material/Button$default" :as Button]
            ["@mui/material/Grid$default" :as Grid]
            ["@mui/material/List$default" :as List]
            ["@mui/material/ListItemAvatar$default" :as ListItemAvatar]
            ["@mui/material/ListItemButton$default" :as ListItemButton]
            ["@mui/material/ListItemText$default" :as ListItemText]
            ["@mui/material/Paper$default" :as Paper]
            ["@mui/material/Typography$default" :as Typography]
            ["wejure-nostr/app.js" :as app]
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

(defn- contact-item [{:keys [pk username picture lastMessage]} selected? on-select]
  [:> ListItemButton
   {:selected selected?
    :on-click on-select}
   [:> ListItemAvatar
    [common/avatar {:picture picture :author pk :username username}]]
   [:> ListItemText {:primary username}]
   (when (pos? lastMessage)
     [:> Typography {:variant "body2" :color "textSecondary"}
      (format-timestamp lastMessage)])])

;; own? comes from who signed the message inside its encryption (NIP-17), so
;; a peer cannot pose as "You".
(defn- message-bubble [{:keys [text time own]} peer-name]
  [:> Box {:sx {:m 1
                :display "flex"
                :justify-content (if own "flex-end" "flex-start")}}
   [:> Box {:sx {:max-width "70%"
                 :display "flex"
                 :flex-direction "column"
                 :align-items (if own "flex-end" "flex-start")}}
    [:> Typography {:variant "caption" :color "textSecondary" :sx {:mb 0.5}}
     (if own "You" peer-name)]
    [:> Box {:sx {:px 2
                  :py 1
                  :border-radius 4
                  :bgcolor (if own "primary.light" "grey.100")}}
     [:> Typography text]]
    [:> Typography {:variant "caption" :color "textSecondary" :sx {:mt 0.5}}
     (format-timestamp time)]]])

(defn chat-page []
  (r/with-let [contacts (r/atom [])                                    ;; [{:pk :username :picture :lastMessage}]
               peer (r/atom nil)                                       ;; {:pk :username} of the open conversation
               messages (r/atom [])                                    ;; [{:id :own :text :time}], oldest first
               draft (r/atom "")
               load-contacts! (fn []
                                (.then (app/contacts)
                                       #(reset! contacts (js->clj % :keywordize-keys true))))
               load-messages! (fn []
                                (when-let [p @peer]
                                  (.then (app/conversation (:pk p))
                                         (fn [ms]
                                           (when (= p @peer)               ;; still the open conversation
                                             (reset! messages (js->clj ms :keywordize-keys true))
                                             (scroll-to-bottom))))))
               close-chat! (fn []
                             (reset! peer nil)
                             (reset! messages []))
               open-chat! (fn [p]
                            (reset! peer p)
                            (reset! messages [])
                            (load-messages!))
               send! (fn []
                       (let [text @draft
                             p @peer]
                         (when (and p (seq text))
                           (reset! draft "")
                           (.then (app/sendMessage (:pk p) text)
                                  (fn [err]
                                    (if err
                                      (do (reset! draft text)
                                          (js/alert err))
                                      (load-messages!)))))))
               _ (load-contacts!)
               stop-inbox (app/watchInbox (fn []                       ;; something new arrived
                                            (load-contacts!)
                                            (load-messages!)))]
    (when-let [p (js/sessionStorage.getItem "chat_peer")]                ;; opened from a profile page's "Message" button
      (js/sessionStorage.removeItem "chat_peer")
      (open-chat! {:pk p :username (js/sessionStorage.getItem "chat_peer_name")})
      (js/sessionStorage.removeItem "chat_peer_name"))
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
          (let [selected (:pk @peer)]                                   ;; deref outside the lazy seq
            (for [contact (sort-by (juxt (comp - :lastMessage) :username) @contacts)]
              ^{:key (:pk contact)}
              [contact-item contact (= selected (:pk contact))
               #(open-chat! (select-keys contact [:pk :username]))])))]]

      ;; right side: the open conversation
      [:> Grid {:size 9 :sx {:display "flex" :flex-direction "column" :height "100%"}}
       [:> Box {:sx {:p 2 :border-bottom 1 :border-color "divider" :display "flex" :align-items "center"}}
        (if @peer
          [:> Typography {:variant "h6"} (:username @peer)]
          [:> Typography {:variant "h6" :color "textSecondary"} "Select a contact to start chatting"])
        (when @peer
          [:> Button {:variant "outlined"
                      :color "error"
                      :size "small"
                      :start-icon (r/as-element [:> BlockIcon])
                      :on-click (fn []
                                  (let [{:keys [pk username]} @peer]
                                    (.then (app/block pk)
                                           (fn [err]
                                             (if err
                                               (js/alert err)
                                               (do (js/alert (str "You have blocked " username))
                                                   (close-chat!)
                                                   (load-contacts!)))))))
                      :sx {:ml "auto"}}
           "Block User"])]

       [:> Paper {:sx {:flex-grow 1 :overflow "auto" :p 2}}
        (let [peer-name (:username @peer)]
          (for [m @messages]
            ^{:key (:id m)} [message-bubble m peer-name]))
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
      (stop-inbox))))
