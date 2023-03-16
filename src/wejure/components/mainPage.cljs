(ns wejure.components.mainPage
  (:require [reagent.core :as r]
            [reagent-mui.material.box :refer [box]]))

;; main page to be developed
(defn main-page [{:keys [details]}]
  (let [length (r/atom 0)]
      (fn [{:keys [details]}]
        [:div
         {:style {:display "flex"
                  :flex-direction "column"
                  :align-items "center"}}
          ;;(for [id (reverse (range @length))]
          ;;  ^{:key id}
          ;;  [photos {:id id}]
          ;;)
         ])))