(ns wejure.components.titlePage
  (:require [reagent-mui.material.typography :refer [typography]]
            ["../js/accSystem" :as acc]))

(defn title-page []
  [:div
   {:style {:height "100%"
            :display "flex"
            :flex-direction "column"
            :align-items "center"
            :justify-content "center"}}
   [:img
    {:src "logo_black.png"
     :style {:height "300px"
             :width "300px"
             :flex "0 1 auto"}}]
   [typography
    {:variant "h6"
     :component "div"}
    "A decentralized social media."]])