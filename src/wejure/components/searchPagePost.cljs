(ns wejure.components.searchPagePost
  (:require ["../js/profile" :as profile]
            ["../js/post" :as post]
            ["../js/guncljs" :as gun]
            [reagent-mui.material.box :refer [box]]
            [reagent-mui.material.button :refer [button]]
            [reagent-mui.material.paper :refer [paper]]
            [reagent-mui.material.avatar :refer [avatar]]
            [clojure.string :as string]
            [reagent-mui.material.typography :refer [typography]]
            [reitit.frontend.easy :as reitit-fe]
            [clojure.walk :as clojure.walk]
            [reagent.core :as r]))

(def post-result-list (r/atom []))

(defn search-post [post-search]
  (js/console.log "Post search:" post-search)
  (reset! post-result-list [])
  (gun/map-once "post"
                (fn [user-posts user]
                  (gun/map-once "post" user
                                (fn [post time-key]
                                  (when (not= post nil)
                                    (let [post-data (clojure.walk/keywordize-keys (into {} (rest (js->clj post))))]
                                      (if (string/includes? (string/lower-case (:text post-data)) (string/lower-case post-search))
                                        (do (println "post found" post-data)
                                         (swap! post-result-list conj post-data))
                                        (js/console.log "Post not found")))))))))

(def ipfs-url "http://localhost:8080/ipfs/")

(defn search-page-post [{{:keys [search-input]} :path-params}]
  (println "Search input:" search-input)
  (when (= 0 (count @post-result-list))
    (println "Search post result")
    (search-post search-input))
  [:div
   {:style {:margin "25px 10% 25px 10%"}}
   [typography
    {:variant "h5"
     :component "div"
     :gutterBottom true}
    "Search Results for: " search-input]
   [paper {:variant "outlined"
           :sx {:p 2, :mb 2}}
    (if (empty? @post-result-list)
      [typography {:align "center"} "No results found."]
      (for [result (js->clj @post-result-list :keywordize-keys true)]
        ^{:key (:timestamp result)}
        [paper {:sx {:mb 2, :p 2}}
         [box {:sx {:display "flex" :alignItems "center"}}
          [avatar {:sx {:mr 2}
                   :src (str ipfs-url (get result :icon_cid))}]
          [box
           [typography {:variant "subtitle1"} (get result :username)]
           [typography {:variant "caption" :color "text.secondary"} (get result :timestamp)]]]
         [typography {:sx {:mt 1}} (get result :text)]
         (when (get result :image)
           [box {:sx {:display "flex" :justifyContent "center"}}
            [:img {:src (str ipfs-url (get result :image))
                   :style {:maxWidth "100%" :maxHeight 400}}]])]))]])