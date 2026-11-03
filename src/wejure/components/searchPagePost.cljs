(ns wejure.components.searchPagePost
  (:require ["@mui/material/Paper$default" :as Paper]
            ["@mui/material/Typography$default" :as Typography]
            ["wejure-nostr/app.js" :as app]
            [reagent.core :as r]
            [wejure.components.postCard :refer [add-posts! post-list]]))

;; Searches the recent posts of the people the user follows.
(defn search-page-post [{{:keys [search-input]} :path-params}]
  (r/with-let [posts (r/atom {})
               done? (r/atom false)
               _ (.then (app/searchPosts search-input)
                        (fn [found]
                          (add-posts! posts found)
                          (reset! done? true)))]
    [:div
     {:style {:margin "25px 10% 25px 10%"}}
     [:> Typography
      {:variant "h5"
       :component "div"
       :gutter-bottom true}
      "Search results for: " search-input]
     (cond
       (seq @posts) [post-list posts]
       @done? [:> Paper {:variant "outlined" :sx {:p 2 :mb 2}}
               [:> Typography {:align "center"} "No results found."]])]))
