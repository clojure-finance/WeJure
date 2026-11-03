(ns wejure.components.communitiesPage
  "The user's communities and invitations; creating a community, joining an open one."
  (:require ["@mui/material/Box$default" :as Box]
            ["@mui/material/Button$default" :as Button]
            ["@mui/material/Chip$default" :as Chip]
            ["@mui/material/MenuItem$default" :as MenuItem]
            ["@mui/material/Paper$default" :as Paper]
            ["@mui/material/TextField$default" :as TextField]
            ["@mui/material/Typography$default" :as Typography]
            ["wejure-nostr/app.js" :as app]
            [clojure.string :as str]
            [reagent.core :as r]
            [reitit.frontend.easy :as reitit-fe]
            [wejure.components.textField :refer [text-field]]))

(defn- section [title & body]
  (into [:> Paper {:variant "outlined" :sx {:width 850 :p 3 :mb 2}}
         [:> Typography {:variant "h6" :gutter-bottom true} title]]
        body))

(defn- community-ref
  "The community id in a pasted link (.../c/<id>) or id, or nil."
  [text]
  (let [s (-> (str/trim text) (str/split #"[?#]") first (str/split #"/c/") last (str/replace #"/+$" ""))]
    (try
      (let [ref (js/decodeURIComponent s)]
        (when (re-matches #"[0-9a-f]{64}:[0-9a-f]+" ref) ref))
      (catch :default _ nil))))

(defn- open-community! [ref]
  (reitit-fe/push-state :wejure.core/community {:ref ref}))

(defn communities-page []
  (r/with-let [state (r/atom nil)                                         ;; {:joined [...] :invitations [...]}
               new-name (r/atom "")
               new-mode (r/atom "private")
               join-ref (r/atom "")
               error (r/atom nil)
               busy (r/atom false)
               load! (fn []
                       (.then (app/myCommunities)
                              #(reset! state (js->clj % :keywordize-keys true))))
               _ (load!)
               stop-inbox (app/watchInbox load!)]                            ;; invitations arrive as gift wraps
    (let [{:keys [joined invitations]} @state]
      [:> Box {:sx {:display "flex" :flex-direction "column" :align-items "center" :my 3}}
       (when (seq invitations)
         [section "Invitations"
          (for [{:keys [ref name from]} invitations]
            ^{:key ref}
            [:> Box {:sx {:display "flex" :align-items "center" :my 1}}
             [:> Typography {:sx {:flex-grow 1}}
              [:b name] (str " – invited by " (str/join ", " from))]
             [:> Button {:variant "contained"
                         :on-click #(.then (app/acceptInvitation ref)
                                           (fn [err]
                                             (reset! error err)
                                             (load!)))}
              "Accept"]])])

       [section "Your communities"
        (cond
          (nil? @state) [:> Typography {:color "textSecondary"} "Loading…"]
          (empty? joined) [:> Typography {:color "textSecondary"} "You are not in any community yet."]
          :else
          (for [{:keys [ref name mode myRole]} (sort-by :name joined)]
            ^{:key ref}
            [:> Box {:sx {:display "flex" :align-items "center" :my 1 :gap 1}}
             [:a {:href (reitit-fe/href :wejure.core/community {:ref ref})
                  :style {:flex-grow 1 :color "inherit"}}
              [:> Typography {:sx {:font-size "18px"}} name]]
             [:> Chip {:size "small" :label mode}]
             [:> Chip {:size "small" :variant "outlined" :label myRole}]]))]

       [section "Create a community"
        [:> Box {:sx {:display "flex" :gap 2 :align-items "center"}}
         [text-field {:label "Name" :size "small" :value @new-name
                      :on-change #(reset! new-name (.. % -target -value))}]
         [:> TextField {:select true :label "Kind" :size "small" :value @new-mode :sx {:width 260}
                        :on-change #(reset! new-mode (.. % -target -value))}
          [:> MenuItem {:value "private"} "Private (encrypted, invite only)"]
          [:> MenuItem {:value "open"} "Open (public, anyone can join)"]]
         [:> Button {:variant "contained"
                     :disabled (or (empty? @new-name) @busy)
                     :on-click (fn []
                                 (reset! busy true)
                                 (reset! error nil)
                                 (-> (app/createCommunity @new-name @new-mode "open")
                                     (.then open-community!)
                                     (.catch #(reset! error (str "Could not create it: " (.-message ^js %))))
                                     (.finally #(reset! busy false))))}
          "Create"]]]

       [section "Join an open community"
        [:> Box {:sx {:display "flex" :gap 2 :align-items "center"}}
         [text-field {:label "Community link or id" :size "small" :sx {:flex-grow 1} :value @join-ref
                      :on-change #(reset! join-ref (.. % -target -value))}]
         [:> Button {:variant "contained"
                     :disabled (or (empty? @join-ref) @busy)
                     :on-click (fn []
                                 (reset! error nil)
                                 (if-let [ref (community-ref @join-ref)]
                                   (do (reset! busy true)
                                       (-> (app/joinCommunity ref)
                                           (.then (fn [err]
                                                    (if err (reset! error err) (open-community! ref))))
                                           (.finally #(reset! busy false))))
                                   (reset! error "That is not a community link.")))}
          "Join"]]]

       (when @error
         [:> Typography {:color "error"} @error])])
    (finally
      (stop-inbox))))
