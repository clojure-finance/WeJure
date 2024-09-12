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

(defn vector-append [target-atom value]
  (swap! target-atom conj value))

(defn vector-prepend [target-atom value]
  (reset! target-atom (into (vector value) @target-atom)))

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
;;def ipfs-url "https://ipfs.io/ipfs/")
(def ipfs-url "http://localhost:8080/ipfs/")

(defn search-page-post [{{:keys [search-input]} :path-params}]
  (println "Search input:" search-input)
  (when (= 0 (count @post-result-list))                           ;; search for post results based on the search input string in the navigation bar
    (println "Search post result")
    (search-post search-input))
  [:div
   {:style {:margin "25px 20% 25px 20%"}}
   [typography
    {:variant "h5"
     :component "div"}
    "Search result for: " search-input]
   [paper {:id "search-result-box"                           ;; display the post search result
           :variant "outlined"
           :sx {:height 800 :my 2 :overflow "auto"}}
    (for [result (js->clj @post-result-list :keywordize-keys true)]
      ^{:key (:timestamp result)}
      [box {:sx {:display "flex" :box-shadow 1}}
       [avatar {:sx {:mx 4 :my 2 :width 48 :height 48}                            ;; user avatar
                :src (str ipfs-url (get result :icon_cid))}]
       [box {:sx {:display "flex" :flex-direction "column"}}
        [typography {:sx {:mx 2 :my 1 :font-size "20px"}}                          ;; username
         (get result :username)]
        [typography {:sx {:mx 2 :my 1 :font-size "16px" :color "text.secondary"}}  ;; timestamp
         (get result :timestamp)]]
       [typography {:sx {:mx 4 :my 2}}                                            ;; post text
        (get result :text)]
       (when (get result :image)                                                 ;; post image (if exists)
         [box {:sx {:display "flex" :justify-content "center"}}
          [:img {:src (str ipfs-url (get result :image)) :style {:max-width "100%" :max-height 400}}]])])]])

;; 加一个点头像能redirect到用户profile的功能