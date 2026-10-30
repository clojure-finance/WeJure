(ns wejure.components.postCard
  "Post state and rendering shared by the feed, profile and post-search pages.
  A posts atom maps [author key] to a post map with the keys of js/post.js
  plus :key (its gun key), :author (the author's pub) and the author's
  :username and :icon_cid from their signed profile."
  (:require ["../js/post" :as post]
            ["../js/profile" :as profile]
            ["@mui/material/Avatar$default" :as Avatar]
            ["@mui/material/Box$default" :as Box]
            ["@mui/material/Button$default" :as Button]
            ["@mui/material/Paper$default" :as Paper]
            ["@mui/material/Typography$default" :as Typography]
            [reitit.frontend.easy :as reitit-fe]
            [wejure.common :as common]))

(defn sync-posts!
  "Returns an onPost callback for js/post.js that adds each post to posts and
  removes deleted ones."
  [posts]
  (let [live (atom #{})]                                                 ;; a deletion can overtake the profile fetch
    (fn [js-post key author]
      (let [k [author key]]
        (if (nil? js-post)
          (do (swap! live disj k)
              (swap! posts dissoc k))
          (let [p (-> (js->clj js-post :keywordize-keys true)
                      (dissoc :_)
                      (assoc :key key :author author))]
            (swap! live conj k)
            (.then (profile/getProfile author)
                   (fn [js-profile]
                     (let [{:keys [alias icon_cid]} (js->clj js-profile :keywordize-keys true)]
                       (when (contains? @live k)
                         (swap! posts assoc k (assoc p :username alias :icon_cid icon_cid))))))))))))

(defn- delete-post! [posts {:keys [author key]}]
  (post/deletePost key)
  (swap! posts dissoc [author key]))

(defn- post-card [posts pending? {:keys [author username unixtime text image icon_cid] :as p}]
  [:> Paper {:variant "outlined" :sx {:width 850 :my 1}}
   [:> Box {:sx {:display "flex" :justify-content "space-between" :box-shadow 3}}
    [:> Box {:sx {:my 1 :display "flex"}}
     [:a {:href (reitit-fe/href :wejure.core/user {:username username})}
      [:> Avatar {:sx {:mx 2 :my 1 :width 36 :height 36}
                  :src (common/ipfs-url icon_cid)}]]
     [:> Typography {:sx {:my 1 :font-size "20px"}}
      username]]
    [:> Typography {:sx {:mx 1 :my 3 :font-size "10px"}}
     (.toLocaleString (js/Date. unixtime))]]
   (when (seq text)
     [:> Typography {:sx {:mx 2 :my 2 :font-size "16px" :white-space "break-spaces"}}
      text])
   (when (seq image)
     [:> Box {:sx {:background-color "black" :display "flex" :justify-content "center"}}
      [:img {:style {:max-width "850px"}
             :src (common/ipfs-url image)}]])
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
  "The posts in posts, newest first. pending holds the keys of the user's own
  posts that the relay has not confirmed yet."
  ([posts] (post-list posts nil))
  ([posts pending]
   (let [pending (if pending @pending #{})]
     [:> Box {:sx {:display "flex" :flex-direction "column" :align-items "center"}}
      (for [p (sort-by :unixtime > (vals @posts))]
        ^{:key [(:author p) (:key p)]}
        [post-card posts (and (= (:author p) (common/current-pub)) (contains? pending (:key p))) p])])))
