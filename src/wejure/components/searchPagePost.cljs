(ns wejure.components.searchPagePost
  (:require ["../js/post" :as post]
            ["@mui/material/Paper$default" :as Paper]
            ["@mui/material/Typography$default" :as Typography]
            [reagent.core :as r]
            [wejure.common :as common]
            [wejure.components.postCard :refer [add-post! post-list]]))

(defn search-page-post [{{:keys [search-input]} :path-params}]
  (let [posts (r/atom {})]
    (post/searchPosts (common/current-pub) search-input (add-post! posts))
    (fn [{{:keys [search-input]} :path-params}]
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
         [post-list posts])])))
