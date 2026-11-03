(ns wejure.components.communitySettings
  "The community settings dialog: members and roles, owner votes, channels,
  name and join policy. It shows only what the user's role allows; the rules
  in wejure-nostr/community-state.js enforce them anyway."
  (:require ["@mui/icons-material/Close$default" :as CloseIcon]
            ["@mui/material/Box$default" :as Box]
            ["@mui/material/Button$default" :as Button]
            ["@mui/material/Checkbox$default" :as Checkbox]
            ["@mui/material/Dialog$default" :as Dialog]
            ["@mui/material/DialogContent$default" :as DialogContent]
            ["@mui/material/DialogTitle$default" :as DialogTitle]
            ["@mui/material/Divider$default" :as Divider]
            ["@mui/material/FormControlLabel$default" :as FormControlLabel]
            ["@mui/material/IconButton$default" :as IconButton]
            ["@mui/material/MenuItem$default" :as MenuItem]
            ["@mui/material/TextField$default" :as TextField]
            ["@mui/material/Typography$default" :as Typography]
            ["wejure-nostr/app.js" :as app]
            [reagent.core :as r]
            [wejure.common :as common]
            [wejure.components.textField :refer [text-field]]))

(defn- heading [text]
  [:> Typography {:variant "h6" :sx {:mt 3 :mb 1}} text])

(defn- select [{:keys [label value on-change sx]} options]
  (into [:> TextField {:select true :size "small" :label label :value value :sx sx
                       :on-change #(on-change (.. % -target -value))}]
        (for [[v text] options]
          ^{:key v} [:> MenuItem {:value v} text])))

(defn- members-section [{:keys [ref members canManage isOwner mode]} run!]
  (r/with-let [new-username (r/atom "")
               new-role (r/atom "member")]
    [:<>
     [heading "Members"]
     (for [{:keys [pk username picture role roleChoices canRemove]} (sort-by :username members)]
       ^{:key pk}
       [:> Box {:sx {:display "flex" :align-items "center" :gap 1 :my 0.5}}
        [common/avatar {:picture picture :author pk :username username :sx {:width 32 :height 32}}]
        [:> Typography {:sx {:flex-grow 1}} username]
        (if (seq roleChoices)
          [select {:label "Role" :value role :sx {:width 140}
                   :on-change #(run! (app/setRole ref pk %))}
           (for [c roleChoices] [c c])]
          [:> Typography {:color "textSecondary" :sx {:width 140}} role])
        (when canRemove
          [:> Button {:size "small" :color "error" :on-click #(run! (app/removeMember ref pk false))}
           "Remove"])
        (when (and canRemove (= mode "open"))
          [:> Button {:size "small" :color "error" :on-click #(run! (app/removeMember ref pk true))}
           "Ban"])])
     (when canManage
       [:> Box {:sx {:display "flex" :align-items "center" :gap 1 :mt 2}}
        [text-field {:label "Add by username" :size "small" :value @new-username
                     :on-change #(reset! new-username (.. % -target -value))}]
        [select {:label "As" :value @new-role :sx {:width 140} :on-change #(reset! new-role %)}
         (cond-> [["member" "member"] ["moderator" "moderator"]]
           isOwner (conj ["admin" "admin"]))]
        [:> Button {:variant "contained" :disabled (empty? @new-username)
                    :on-click (fn []
                                (run! (app/addMember ref @new-username @new-role))
                                (reset! new-username ""))}
         "Add"]])]))

(defn- proposals-section [{:keys [ref proposals isOwner]} run!]
  (when (seq proposals)
    [:<>
     [heading "Owner votes"]
     (for [{:keys [id type memberName role approvals approvedByMe]} proposals]
       ^{:key id}
       [:> Box {:sx {:display "flex" :align-items "center" :gap 1 :my 0.5}}
        [:> Typography {:sx {:flex-grow 1}}
         (if (= type "remove") (str "Remove " memberName) (str "Make " memberName " " role))
         [:span {:style {:color "grey"}} (str " – approved by " (apply str (interpose ", " approvals)))]]
        (when (and isOwner (not approvedByMe))
          [:> Button {:variant "contained" :size "small" :on-click #(run! (app/approve ref id))}
           "Approve"])])]))

(defn- channels-section [{:keys [ref channels members]} run!]
  (r/with-let [name (r/atom "")
               visibility (r/atom "community")
               history (r/atom "shared")
               chosen (r/atom #{})]
    [:<>
     [heading "Channels"]
     (for [{:keys [id name visibility history]} (sort-by :name channels)]
       ^{:key id}
       [:> Box {:sx {:display "flex" :align-items "center" :gap 1 :my 0.5}}
        [:> Typography {:sx {:flex-grow 1}} name
         [:span {:style {:color "grey"}} (str " – " visibility ", history " history)]]
        [:> Button {:size "small" :on-click #(run! (app/archiveChannel ref id))} "Archive"]])
     [:> Box {:sx {:display "flex" :align-items "center" :gap 1 :mt 2 :flex-wrap "wrap"}}
      [text-field {:label "New channel" :size "small" :value @name
                   :on-change #(reset! name (.. % -target -value))}]
      [select {:label "Who" :value @visibility :sx {:width 170} :on-change #(reset! visibility %)}
       [["community" "everyone"] ["private" "chosen members"]]]
      [select {:label "History" :value @history :sx {:width 210} :on-change #(reset! history %)}
       [["shared" "newcomers see the past"] ["from-join" "only from joining on"]]]
      [:> Button {:variant "contained" :disabled (empty? @name)
                  :on-click (fn []
                              (run! (app/createChannel ref (clj->js {:name @name :visibility @visibility
                                                                     :history @history :members (vec @chosen)})))
                              (reset! name "")
                              (reset! chosen #{}))}
       "Create"]]
     (when (= @visibility "private")
       (let [picked @chosen]                                               ;; deref outside the lazy seq
         [:> Box
          (for [{:keys [pk username]} (sort-by :username members)]
            ^{:key pk}
            [:> FormControlLabel {:label username
                                  :control (r/as-element
                                            [:> Checkbox {:checked (contains? picked pk)
                                                          :on-change (fn [] (swap! chosen (if (contains? @chosen pk) disj conj) pk) (r/flush))}])}])]))]))

(defn- about-section [{:keys [ref name description mode join]} run!]
  (r/with-let [new-name (r/atom name)
               new-description (r/atom description)
               new-join (r/atom join)]
    [:<>
     [heading "About"]
     [:> Box {:sx {:display "flex" :flex-direction "column" :gap 2}}
      [text-field {:label "Name" :size "small" :value @new-name
                   :on-change #(reset! new-name (.. % -target -value))}]
      [text-field {:label "Description" :size "small" :multiline true :value @new-description
                   :on-change #(reset! new-description (.. % -target -value))}]
      (when (= mode "open")
        [select {:label "Joining" :value @new-join :sx {:width 260} :on-change #(reset! new-join %)}
         [["open" "anyone can join"] ["invite" "by invitation only"]]])
      [:> Box
       [:> Button {:variant "contained"
                   :on-click #(run! (app/updateCommunity ref #js {:name @new-name :description @new-description
                                                                  :join @new-join}))}
        "Save"]]]]))

(defn settings-dialog
  "view: the community as app/community returns it; on-change reloads it."
  [{:keys [open? on-close view on-change]}]
  (r/with-let [error (r/atom nil)]
    (let [run! (fn [p]
                 (reset! error nil)
                 (.then p (fn [err]
                            (when err (reset! error err))
                            (on-change))))]
      [:> Dialog {:open open? :on-close on-close :full-width true :max-width "md"}
       [:> DialogTitle {:sx {:display "flex" :justify-content "space-between" :align-items "center"}}
        (str (:name view) " – settings")
        [:> IconButton {:on-click on-close} [:> CloseIcon]]]
       [:> DialogContent
        (when @error
          [:> Typography {:color "error"} @error])
        [members-section view run!]
        [proposals-section view run!]
        (when (:canManage view)
          [:<>
           [:> Divider {:sx {:mt 3}}]
           [channels-section view run!]
           [:> Divider {:sx {:mt 3}}]
           [about-section view run!]])]])))
