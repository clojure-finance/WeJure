(ns wejure.components.postCard
  "Post state and rendering shared by the feed, profile and post-search pages.
  A posts atom maps [username key] to a post map with the keys of js/post.js
  plus :key (its gun key) and :icon_cid (its author's avatar)."
  (:require ["../js/post" :as post]
            ["../js/profile" :as profile]
            [reagent-mui.material.avatar :refer [avatar]]
            [reagent-mui.material.box :refer [box]]
            [reagent-mui.material.button :refer [button]]
            [reagent-mui.material.paper :refer [paper]]
            [reagent-mui.material.typography :refer [typography]]
            [reitit.frontend.easy :as reitit-fe]
            [wejure.common :as common]))

(defn add-post!
  "Returns an onPost callback for js/post.js that adds each post to posts."
  [posts]
  (fn [js-post key]
    (let [p (-> (js->clj js-post :keywordize-keys true)
                (dissoc :_)
                (assoc :key key))]
      (.then (profile/getIconCID (:username p))
             (fn [cid]
               (swap! posts assoc [(:username p) key] (assoc p :icon_cid cid)))))))

(defn- delete-post! [posts {:keys [username key]}]
  (post/deletePost username key)
  (swap! posts dissoc [username key]))

(defn- post-card [posts {:keys [username timestamp text image icon_cid] :as p}]
  [paper {:variant "outlined" :sx {:width 850 :my 1}}
   [box {:sx {:display "flex" :justify-content "space-between" :box-shadow 3}}
    [box {:sx {:my 1 :display "flex"}}
     [:a {:href (reitit-fe/href :wejure.core/user {:username username})}
      [avatar {:sx {:mx 2 :my 1 :width 36 :height 36}
               :src (common/ipfs-url icon_cid)}]]
     [typography {:sx {:my 1 :font-size "20px"}}
      username]]
    [typography {:sx {:mx 1 :my 3 :font-size "10px"}}
     (.toLocaleString (js/Date. timestamp))]]
   (when (seq text)
     [typography {:sx {:mx 2 :my 2 :font-size "16px" :white-space "break-spaces"}}
      text])
   (when (seq image)
     [box {:sx {:background-color "black" :display "flex" :justify-content "center"}}
      [:img {:style {:max-width "850px"}
             :src (common/ipfs-url image)}]])
   (when (= username (common/current-username))
     [box {:sx {:display "flex" :justify-content "flex-end"}}
      [button {:variant "outlined"
               :sx {:mx 1 :my 1}
               :on-click #(delete-post! posts p)}
       "Delete"]])])

(defn post-list
  "The posts in posts, newest first."
  [posts]
  [box {:sx {:display "flex" :flex-direction "column" :align-items "center"}}
   (for [p (sort-by #(js/Date.parse (:timestamp %)) > (vals @posts))]
     ^{:key [(:username p) (:key p)]}
     [post-card posts p])])
