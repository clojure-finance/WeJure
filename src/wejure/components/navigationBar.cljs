(ns wejure.components.navigationBar
    (:require 
        [reagent.core :as r]
        [reagent-mui.material.app-bar :refer [app-bar]]
        [reagent-mui.material.toolbar :refer [toolbar]]
        [reagent-mui.material.button :refer [button]]
        [reagent-mui.material.typography :refer [typography]]
        ["../js/accSystem" :as acc]))

(def ipfsUrl "https://wejure.infura-ipfs.io/ipfs/")               ;; IPFS gateway for retrieving files from IPFS

(defn registerFunction [step details]
  (reset! step 1))

(defn loginFunction [step details]
  (reset! step 2))

(defn logoutFunction [step details]
  (acc/logout)
  (reset! step 0))

(defn navigation-bar [{:keys [step details]}]
  [app-bar 
      {:position "static"
        :sx {:background-color "#070707"}}
      [toolbar
          [:img 
            {:src "logo_white.png"
              :style {:height "50px" 
                      :margin "0 20px 0 0"}}]
          [:div
              {:style {:flex-grow "1"}}]
          (if (not= @step 0)
              [:div
                  {:style {:display "flex"
                            :align-items "center"}}
                  (if (or (= @step 1) (= @step 2))     
                    [typography 
                      {:variant "p"
                        :component "div"
                        :sx {:margin "0 20px 0 0"
                        :font-size "12px"}}
                      (:account @details)]
                    [:div
                     {:style {:margin "0 20px 0 0" :display "flex" :alignItems "center"}}
                     [typography
                      {:variant "h6"
                       :component "div"
                       :sx {:font-size "12px" :margin "0 20px 0 0"}}
                      (:name @details)]
                     
                     [:div
                       {:style {:margin "0 20px 0 0"}}
                     [:img
                        {:src (str ipfsUrl (get @details :icon-cid))        ;; retrieve the user icon image from IPFS
                         :width 50
                         :height 50
                         :style {:border-radius "50%" }}]]
                     
                     (if (= @step 3)
                       [button
                        {:color "inherit"
                         :variant "outlined"
                         :on-click #(reset! step 4)}
                        "Message"]
                       [button
                        {:color "inherit"
                         :variant "outlined"
                         :on-click #(reset! step 3)}
                        "Main Page"])]
                  )
                  [button
                    {:color "inherit"
                      :variant "outlined"
                      :on-click #(logoutFunction step details)}
                    "Logout"]]
              [:div
               [button
                {:color "inherit"
                 :on-click #(registerFunction step details)}
                "Sign Up"]
               [button
                {:color "inherit"
                 :on-click #(loginFunction step details)}
                "Login"]]
              )]])