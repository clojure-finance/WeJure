(ns wejure.components.textField
  (:require ["@mui/material/TextField$default" :as TextField]
            [reagent.core :as r]))

;; Reagent re-renders after a ratom change on the next animation frame. A controlled
;; MUI TextField would meanwhile be reset to its old value by React, which moves the
;; caret to the end; flushing in on-change re-renders before React looks.
(defn text-field
  "MUI TextField, for use with a value kept in a ratom."
  [{:keys [on-change] :as props}]
  [:> TextField (cond-> props
                  on-change (assoc :on-change (fn [e]
                                                (on-change e)
                                                (r/flush))))])
