(ns wejure.components.communityPage
  "One community, laid out like Zulip: channels on the left, the selected
  channel's topics in the middle, the selected topic's messages on the right."
  (:require ["@mui/icons-material/Lock$default" :as LockIcon]
            ["@mui/material/Box$default" :as Box]
            ["@mui/material/Button$default" :as Button]
            ["@mui/material/Chip$default" :as Chip]
            ["@mui/material/List$default" :as List]
            ["@mui/material/ListItemButton$default" :as ListItemButton]
            ["@mui/material/ListItemText$default" :as ListItemText]
            ["@mui/material/Paper$default" :as Paper]
            ["@mui/material/Typography$default" :as Typography]
            ["wejure-nostr/app.js" :as app]
            [reagent.core :as r]
            [reitit.frontend.easy :as reitit-fe]
            [wejure.common :as common]
            [wejure.components.communitySettings :refer [settings-dialog]]
            [wejure.components.textField :refer [text-field]]))

(defn- column [sx & children]
  (into [:> Paper {:variant "outlined" :sx (merge {:height "100%" :overflow "auto"} sx)}] children))

(defn- column-title [text]
  [:> Typography {:variant "overline" :sx {:px 2 :pt 1 :display "block"}} text])

(defn- channel-list [channels selected on-select]
  [column {:width 220 :flex-shrink 0}
   [column-title "Channels"]
   [:> List {:dense true}
    (for [{:keys [id name visibility]} (sort-by :name (filter :readable channels))]
      ^{:key id}
      [:> ListItemButton {:selected (= id selected) :on-click #(on-select id)}
       [:> ListItemText {:primary (str "# " name)}]
       (when (= visibility "private")
         [:> LockIcon {:font-size "small" :color "action"}])])]])

(defn- topic-list [topics selected on-select]
  [column {:width 240 :flex-shrink 0}
   [column-title "Topics"]
   [:> List {:dense true}
    [:> ListItemButton {:selected (nil? selected) :on-click #(on-select nil)}
     [:> ListItemText {:primary "All topics"}]]
    (for [{:keys [topic count]} topics]
      ^{:key topic}
      [:> ListItemButton {:selected (= topic selected) :on-click #(on-select topic)}
       [:> ListItemText {:primary topic}]
       [:> Typography {:variant "body2" :color "textSecondary"} count]])]])

(defn- message-row [ref {:keys [id from username picture topic text time mine canHide]} show-topic? act!]
  [:> Box {:sx {:display "flex" :gap 1.5 :px 2 :py 1}}
   [common/avatar {:picture picture :author from :username username :sx {:width 36 :height 36}}]
   [:> Box {:sx {:flex-grow 1 :min-width 0}}
    [:> Box {:sx {:display "flex" :gap 1 :align-items "baseline"}}
     [:> Typography {:sx {:font-weight 600}} username]
     (when show-topic?
       [:> Typography {:variant "body2" :color "textSecondary"} (str "› " topic)])
     [:> Typography {:variant "caption" :color "textSecondary"} (.toLocaleString (js/Date. time))]]
    [:> Typography {:sx {:white-space "break-spaces" :word-wrap "break-word"}} text]]
   (cond
     mine [:> Button {:size "small" :on-click #(act! (app/retractMessage ref id))} "Delete"]
     canHide [:> Button {:size "small" :on-click #(act! (app/hideMessage ref id))} "Hide"])])

(defn- not-a-member [{:keys [ref name description mode]} on-joined]
  (r/with-let [error (r/atom nil)]
    [:> Box {:sx {:display "flex" :justify-content "center" :mt 6}}
     [:> Paper {:variant "outlined" :sx {:p 4 :width 500}}
      [:> Typography {:variant "h5" :gutter-bottom true} name]
      [:> Typography {:sx {:mb 2}} description]
      (if (= mode "open")
        [:> Button {:variant "contained"
                    :on-click #(.then (app/joinCommunity ref)
                                      (fn [err] (if err (reset! error err) (on-joined))))}
         "Join"]
        [:> Typography {:color "textSecondary"} "You are not a member of this community."])
      (when @error [:> Typography {:color "error" :sx {:mt 1}} @error])]]))

(defn community-page [{{:keys [ref]} :path-params}]
  (r/with-let [view (r/atom :loading)
               channel (r/atom nil)                                    ;; selected channel id
               topic (r/atom nil)                                      ;; selected topic, nil for all
               topics (r/atom [])
               messages (r/atom [])
               new-topic (r/atom "")
               draft (r/atom "")
               error (r/atom nil)
               settings? (r/atom false)
               load-channel! (fn []
                               (when-let [c @channel]
                                 (.then (app/topics ref c)
                                        #(when (= c @channel) (reset! topics (js->clj % :keywordize-keys true))))
                                 (let [t @topic]
                                   (.then (app/messages ref c t)
                                          #(when (and (= c @channel) (= t @topic))
                                             (reset! messages (js->clj % :keywordize-keys true)))))))
               load! (fn []
                       (.then (app/community ref)
                              (fn [v]
                                (let [v (js->clj v :keywordize-keys true)
                                      readable (filter :readable (:channels v))]
                                  (reset! view v)
                                  (when-not (some #(= @channel (:id %)) readable)   ;; first load, or channel gone
                                    (reset! channel (:id (first (sort-by :name readable))))
                                    (reset! topic nil))
                                  (load-channel!)))))
               select-channel! (fn [id]
                                 (reset! channel id)
                                 (reset! topic nil)
                                 (reset! topics [])
                                 (reset! messages [])
                                 (load-channel!))
               select-topic! (fn [t]
                               (reset! topic t)
                               (reset! new-topic (or t ""))
                               (load-channel!))
               act! (fn [p]                                 ;; runs a change, then reloads
                                 (reset! error nil)
                                 (.then p (fn [err]
                                            (when err (reset! error err))
                                            (load!))))
               send! (fn []
                       (let [text @draft
                             t (or (not-empty @topic) @new-topic)]
                         (reset! draft "")
                         (.then (app/sendCommunityMessage ref @channel t text)
                                (fn [err]
                                  (if err
                                    (do (reset! draft text) (reset! error err))
                                    (do (reset! topic t) (load-channel!)))))))
               _ (load!)
               stop (app/watchCommunity ref load!)]
    (let [v @view]
      (cond
        (= v :loading) [:div]
        (nil? v) [:> Box {:sx {:display "flex" :justify-content "center" :mt 6}}
                  [:> Typography {:variant "h6" :color "textSecondary"} "Community not found, or you have no access."]]
        (not (:isMember v)) [not-a-member v load!]
        :else
        [:> Box {:sx {:display "flex" :flex-direction "column" :height "100%" :p 1 :gap 1 :box-sizing "border-box"}}
         [:> Paper {:variant "outlined" :sx {:display "flex" :align-items "center" :gap 1 :px 2 :py 1}}
          [:> Typography {:variant "h6" :sx {:flex-grow 1}} (:name v)]
          [:> Chip {:size "small" :label (:mode v)}]
          [:> Chip {:size "small" :variant "outlined" :label (:myRole v)}]
          (when (= (:mode v) "open")
            [:> Button {:size "small"
                        :on-click #(.. js/navigator -clipboard (writeText (str js/location.origin
                                                                               (reitit-fe/href :wejure.core/community {:ref ref}))))}
             "Copy link"])
          [:> Button {:size "small" :variant "outlined" :on-click #(reset! settings? true)} "Settings"]
          [:> Button {:size "small" :color "error"
                      :on-click #(.then (app/leaveCommunity ref)
                                        (fn [err]
                                          (if err (reset! error err) (reitit-fe/push-state :wejure.core/communities))))}
           "Leave"]]
         (when @error
           [:> Typography {:color "error" :sx {:px 1}} @error])
         [:> Box {:sx {:display "flex" :gap 1 :flex-grow 1 :min-height 0}}
          [channel-list (:channels v) @channel select-channel!]
          [topic-list @topics @topic select-topic!]
          [column {:flex-grow 1 :display "flex" :flex-direction "column"}
           [:> Box {:sx {:flex-grow 1 :overflow "auto"}}
            (if (empty? @messages)
              [:> Typography {:color "textSecondary" :sx {:p 2}} "No messages yet. Start a topic below."]
              (for [m @messages]
                ^{:key (:id m)} [message-row ref m (nil? @topic) act!]))]
           (when @channel
             [:> Box {:sx {:display "flex" :gap 1 :p 1 :border-top 1 :border-color "divider"}}
              (when (nil? @topic)
                [text-field {:size "small" :placeholder "Topic" :sx {:width 180} :value @new-topic
                             :on-change #(reset! new-topic (.. % -target -value))}])
              [text-field {:size "small" :placeholder "Message" :full-width true :value @draft
                           :on-change #(reset! draft (.. % -target -value))
                           :on-key-down #(when (and (= (.-key %) "Enter") (seq @draft) (seq (or @topic @new-topic)))
                                           (send!))}]
              [:> Button {:variant "contained"
                          :disabled (or (empty? @draft) (empty? (or @topic @new-topic)))
                          :on-click send!}
               "Send"]])]]
         [settings-dialog {:open? @settings? :on-close #(reset! settings? false) :view v :on-change load!}]]))
    (finally
      (stop))))
