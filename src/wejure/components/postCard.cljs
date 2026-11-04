(ns wejure.components.postCard
  "Post state and rendering shared by the feed, profile and post-search pages.
  A posts atom maps a post's id to the post as wejure-nostr/app.js returns it:
  :id, :author (pubkey), :text, :image (Blossom hash), :time (ms), :username
  and :picture."
  (:require ["@mui/material/Box$default" :as Box]
            ["@mui/material/Button$default" :as Button]
            ["@mui/material/Paper$default" :as Paper]
            ["@mui/material/Typography$default" :as Typography]
            ["wejure-nostr/app.js" :as app]
            [reitit.frontend.easy :as reitit-fe]
            [wejure.common :as common]))

(defn add-posts!
  "Adds posts (a JS array from app.js) to the posts atom."
  [posts js-posts]
  (swap! posts into (for [p (js->clj js-posts :keywordize-keys true)] [(:id p) p])))

(defn watch!
  "Keeps the posts atom up to date with new posts, deletions and blocks;
  authors nil means the people the user follows. Returns a function that
  stops it."
  [posts authors]
  (app/watchPosts #js {:authors (some-> authors clj->js)
                       :onPost #(add-posts! posts #js [%])
                       :onDelete (fn [id pk]
                                   (when (= pk (get-in @posts [id :author]))   ;; only the author's own deletion counts
                                     (swap! posts dissoc id)))
                       :onBlock (fn [pks]
                                  (let [blocked (set pks)]
                                    (swap! posts #(into {} (remove (fn [[_ p]] (blocked (:author p)))) %))))}))

(defn- delete-post! [posts {:keys [id]}]
  (.then (app/deletePost id)
         (fn [err]
           (if err
             (js/alert (str "The post was not deleted: " err))
             (swap! posts dissoc id)))))

(defn- post-card [posts pending? {:keys [author username time text image picture] :as p}]
  [:> Paper {:variant "outlined" :sx {:width 850 :my 1}}
   [:> Box {:sx {:display "flex" :justify-content "space-between" :box-shadow 3}}
    [:> Box {:sx {:my 1 :display "flex"}}
     [:a {:href (reitit-fe/href :wejure.core/user {:username (str "~" author)})   ;; the account, not a name anyone can claim
          :style {:text-decoration "none"}}
      [common/avatar {:picture picture :author author :username username
                      :sx {:mx 2 :my 1 :width 36 :height 36}}]]
     [:> Typography {:sx {:my 1 :font-size "20px"}}
      username]]
    [:> Typography {:sx {:mx 1 :my 3 :font-size "10px"}}
     (.toLocaleString (js/Date. time))]]
   (when (seq text)
     [:> Typography {:sx {:mx 2 :my 2 :font-size "16px" :white-space "break-spaces"}}
      text])
   (when (seq image)
     [:> Box {:sx {:background-color "black" :display "flex" :justify-content "center"}}
      [common/media-image {:sha256 image :author author :style {:max-width "850px"}}]])
   (cond
     pending?
     [:> Typography {:sx {:mx 2 :my 1 :font-size "12px" :color "grey" :text-align "right"}}
      "Sending…"]

     (= author (common/current-pub))
     [:> Box {:sx {:display "flex" :justify-content "flex-end"}}
      [:> Button {:variant "outlined"
                  :sx {:mx 1 :my 1}
                  :on-click #(delete-post! posts p)}
       "Delete"]])])

(defn post-list
  "The posts in posts, newest first. pending holds the ids of the user's own
  posts that no relay has confirmed yet."
  ([posts] (post-list posts nil))
  ([posts pending]
   (let [pending (if pending @pending #{})]
     [:> Box {:sx {:display "flex" :flex-direction "column" :align-items "center"}}
      (for [p (sort-by :time > (vals @posts))]
        ^{:key (:id p)}
        [post-card posts (contains? pending (:id p)) p])])))

(defn load-more
  "A Load more button for paged lists: shown while next (an atom holding the
  next page's `until`) is not nil; on-click loads that page."
  [next on-click]
  (when (some? @next)
    [:> Box {:sx {:display "flex" :justify-content "center" :my 2}}
     [:> Button {:variant "outlined" :on-click on-click} "Load more"]]))
