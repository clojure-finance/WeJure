(ns wejure.components.searchPage
  (:require ["../js/profile" :as profile]
            ["@mui/material/Avatar$default" :as Avatar]
            ["@mui/material/Box$default" :as Box]
            ["@mui/material/Button$default" :as Button]
            ["@mui/material/Paper$default" :as Paper]
            ["@mui/material/Typography$default" :as Typography]
            [reagent.core :as r]
            [reitit.frontend.easy :as reitit-fe]
            [wejure.common :as common]))

(defn search-page [{{:keys [search-input]} :path-params}]
  (let [results (r/atom [])]                                         ;; [{:username :pub :icon_cid}], exact matches only
    (profile/searchUser search-input
                        #(swap! results conj (js->clj % :keywordize-keys true)))
    (fn [{{:keys [search-input]} :path-params}]
      [:div
       {:style {:margin "25px 20% 25px 20%"}}
       [:> Typography
        {:variant "h5"
         :component "div"}
        "Search result for: " search-input]
       [:> Paper {:variant "outlined"
                  :sx {:height 800 :my 2 :overflow "auto"}}
        (for [{:keys [username pub icon_cid]} @results]
          ^{:key pub}
          [:> Box {:sx {:display "flex" :box-shadow 1}}
           [:> Avatar {:sx {:mx 4 :my 2 :width 48 :height 48}
                       :src (common/ipfs-url icon_cid)}]
           [:> Typography {:sx {:mx 2 :my 3 :font-size "20px"}}
            username]
           [:> Box {:style {:display "flex" :flex-grow 1 :justify-content "flex-end"}}
            [:> Button {:sx {:my 3 :mr 4 :width 80 :height 35}
                        :variant "contained"
                        :href (reitit-fe/href :wejure.core/user {:username username})}
             "Profile"]]])]])))
