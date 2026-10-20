(ns wejure.components.searchPage
  (:require ["../js/profile" :as profile]
            [reagent-mui.material.avatar :refer [avatar]]
            [reagent-mui.material.box :refer [box]]
            [reagent-mui.material.button :refer [button]]
            [reagent-mui.material.paper :refer [paper]]
            [reagent-mui.material.typography :refer [typography]]
            [reagent.core :as r]
            [reitit.frontend.easy :as reitit-fe]
            [wejure.common :as common]))

(defn search-page [{{:keys [search-input]} :path-params}]
  (let [results (r/atom [])]                                         ;; [{:username :icon_cid}], exact match first
    (profile/searchUser search-input
                        (fn [result exact?]
                          (let [result (js->clj result :keywordize-keys true)]
                            (swap! results #(if exact? (into [result] %) (conj % result))))))
    (fn [{{:keys [search-input]} :path-params}]
      [:div
       {:style {:margin "25px 20% 25px 20%"}}
       [typography
        {:variant "h5"
         :component "div"}
        "Search result for: " search-input]
       [paper {:variant "outlined"
               :sx {:height 800 :my 2 :overflow "auto"}}
        (for [{:keys [username icon_cid]} @results]
          ^{:key username}
          [box {:sx {:display "flex" :box-shadow 1}}
           [avatar {:sx {:mx 4 :my 2 :width 48 :height 48}
                    :src (common/ipfs-url icon_cid)}]
           [typography {:sx {:mx 2 :my 3 :font-size "20px"}}
            username]
           [box {:style {:display "flex" :flex-grow 1 :justify-content "flex-end"}}
            [button {:sx {:my 3 :mr 4 :width 80 :height 35}
                     :variant "contained"
                     :href (reitit-fe/href :wejure.core/user {:username username})}
             "Profile"]]])]])))
