(ns wejure.components.searchPage
  (:require ["../js/profile" :as profile]
            [reagent-mui.material.box :refer [box]]
            [reagent-mui.material.button :refer [button]]
            [reagent-mui.material.paper :refer [paper]]
            [reagent-mui.material.avatar :refer [avatar]]
            [reagent-mui.material.typography :refer [typography]]
            [reitit.frontend.easy :as reitit-fe]
            [reagent.core :as r]))

(def result-list (r/atom []))

;;def ipfs-url "https://ipfs.io/ipfs/")
(def ipfs-url "http://localhost:8080/ipfs/") 

;; function to append element to the target vector, used in profile.js
(defn ^:export vector-append [target-atom value]             
  (swap! target-atom conj value))

;; function to prepend element to the target vector, used in profile.js
(defn ^:export vector-prepend [target-atom value]            
  (reset! target-atom (into (vector value) @target-atom)))

(defn search-page [{{:keys [search-input]} :path-params}]
  (when (= 0 (count @result-list))                           ;; search for user results based on the search input string in the navigation bar
    (profile/searchUser search-input))
  [:div
   {:style {:margin "25px 20% 25px 20%"}}
   [typography
    {:variant "h5"
     :component "div"}
    "Search result for: " search-input]
   [paper {:id "search-result-box"                           ;; display the user search result
           :variant "outlined"
           :sx {:height 800 :my 2 :overflow "auto"}}
    (for [result (js->clj @result-list :keywordize-keys true)] 
      ^{:key result} 
      [box {:sx {:display "flex" :box-shadow 1}}
       [avatar {:sx {:mx 4 :my 2 :width 48 :height 48}                            ;; user avatar
                :src (str ipfs-url (get result :icon_cid))}]
       [typography {:sx {:mx 2 :my 3 :font-size "20px"}}                          ;; username
        (get result :username)]
       [box {:style {:display "flex" :flex-grow 1 :justify-content "flex-end"}}   ;; button for redirecting to the user profile
        [button {:sx {:my 3 :mr 4 :width 80 :height 35}
                 :variant "contained"
                 :href (reitit-fe/href :wejure.core/user {:username (get result :username)})}
         "Profile"]]]   
    )]])
