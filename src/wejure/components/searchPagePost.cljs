(ns wejure.components.searchPagePost
  (:require ["../js/post" :as post]
            ["@mui/material/Paper$default" :as Paper]
            ["@mui/material/Typography$default" :as Typography]
            [reagent.core :as r]
            [wejure.common :as common]
            [wejure.components.postCard :refer [post-list sync-posts!]]))

(defn search-page-post [{{:keys [search-input]} :path-params}]
  (r/with-let [posts (r/atom {})
               stop-search (post/searchPosts (common/current-pub) search-input (sync-posts! posts))]
    [:div
     {:style {:margin "25px 10% 25px 10%"}}
     [:> Typography
      {:variant "h5"
       :component "div"
       :gutter-bottom true}
      "Search results for: " search-input]
     (if (empty? @posts)
       [:> Paper {:variant "outlined" :sx {:p 2 :mb 2}}
        [:> Typography {:align "center"} "No results found."]]
       [post-list posts])]
    (finally
      (stop-search))))
