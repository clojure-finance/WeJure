(ns wejure.components.searchPagePost
  (:require ["../js/post" :as post]
            [reagent-mui.material.paper :refer [paper]]
            [reagent-mui.material.typography :refer [typography]]
            [reagent.core :as r]
            [wejure.components.postCard :refer [add-post! post-list]]))

(defn search-page-post [{{:keys [search-input]} :path-params}]
  (let [posts (r/atom {})]
    (post/searchPosts search-input (add-post! posts))
    (fn [{{:keys [search-input]} :path-params}]
      [:div
       {:style {:margin "25px 10% 25px 10%"}}
       [typography
        {:variant "h5"
         :component "div"
         :gutter-bottom true}
        "Search results for: " search-input]
       (if (empty? @posts)
         [paper {:variant "outlined" :sx {:p 2 :mb 2}}
          [typography {:align "center"} "No results found."]]
         [post-list posts])])))
