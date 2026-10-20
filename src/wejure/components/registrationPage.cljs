(ns wejure.components.registrationPage
  (:require ["../js/account" :as acc]
            [reagent.core :as r]
            [reagent-mui.icons.add-a-photo-sharp :refer [add-a-photo-sharp]]
            [reagent-mui.material.box :refer [box]]
            [reagent-mui.material.button :refer [button]]
            [reagent-mui.material.circular-progress :refer [circular-progress]]
            [reagent-mui.material.icon-button :refer [icon-button]]
            [reagent-mui.material.text-field :refer [text-field]]
            [reagent-mui.material.typography :refer [typography]]
            [reitit.frontend.easy :as reitit-fe]
            [wejure.common :as common]))

(defn- valid-username? [username]                                         ;; 3-20 letters, digits or underscores
  (some? (re-matches #"\w{3,20}" username)))

(defn- valid-password? [password]
  (<= 8 (count password)))

;; uploads the profile picture to IPFS, then creates the account
(defn- submit-profile [name password photo loading]
  (reset! loading true)
  (-> (common/ipfs-add @photo)
      (.then (fn [cid]
               (acc/register @name @password cid
                             (fn [err]
                               (reset! loading false)
                               (if err
                                 (js/alert err)
                                 (set! js/window.location.href (reitit-fe/href :wejure.core/login)))))))
      (.catch (fn [^js err]
                (reset! loading false)
                (js/alert (str "Could not upload the profile picture: " (.-message err)))))))

(defn registration-page []
  (let [name (r/atom "") password (r/atom "") password-confirm (r/atom "") profile-pic (r/atom nil) loading (r/atom false)]
    (fn []
      [:div
       {:style {:height "100%" :display "flex" :justify-content "center" :align-items "center"}}
       [box
        {:sx {:height "500px"
              :width "350px"
              :background-color "#FFFEF7"
              :border-radius "30px"
              :display "flex"
              :flex-direction "column"
              :justify-content "space-between"
              :padding "50px 30px"}
         :component "form"
         :on-submit (fn [e] (.preventDefault e) (submit-profile name password profile-pic loading))}

        [typography
         {:variant "h5"
          :component "div"}
         "Create your WeJure profile"]

        [:div
         {:style {:display "flex"
                  :flex-direction "column"}}

         [typography
          {:variant "h6"
           :component "div"}
          "1. Create a username"]

         [typography
          {:font-size 8
           :color "grey"}
          "Only allow alphabets, numbers and underscore(_)"]

         [text-field
          {:variant "filled"
           :value @name
           :on-change (fn [e] (reset! name (.. e -target -value)))
           :error (not (valid-username? @name))
           :helper-text (if (valid-username? @name) " " "Must contain 3-20 characters and no special characters")
           :input-props {:max-length 20}}]]

        [:div
         {:style {:display "flex"
                  :flex-direction "column"}}

         [typography
          {:variant "h6"
           :component "div"}
          "2. Create a password"]

         [text-field
          {:variant "filled"
           :type "password"
           :value @password
           :on-change (fn [e] (reset! password (.. e -target -value)))
           :error (not (valid-password? @password))
           :helper-text (if (valid-password? @password) " " "Must contain 8-20 characters")
           :input-props {:max-length 20}}]]

        [:div
         {:style {:display "flex"
                  :flex-direction "column"}}

         [typography
          {:variant "h6"
           :component "div"}
          "3. Confirm your password"]

         [text-field
          {:variant "filled"
           :type "password"
           :value @password-confirm
           :on-change (fn [e] (reset! password-confirm (.. e -target -value)))
           :error (not= @password @password-confirm)
           :helper-text (if (= @password @password-confirm) " " "Passwords do not match")
           :input-props {:max-length 20}}]]

        [:div
         {:style {:display "flex"
                  :flex-direction "column"}}

         [typography
          {:variant "h6"
           :component "div"}
          "4. Upload a profile picture"]

         [:label
          {:html-for "upload-image" :style {:margin "0 auto"}}
          [:input
           {:accept "image/*"
            :id "upload-image"
            :type "file"
            :style {:display "none"}
            :on-change #(reset! profile-pic (-> % .-target .-files (aget 0)))}]
          [icon-button
           {:component "span"}
           [add-a-photo-sharp]]]

         [typography
          {:variant "h6"
           :component "div"
           :sx {:color (if @profile-pic "#070707" "#d32f2f")
                :font-size "12px"
                :font-weight "500"
                :text-align "center"}}
          (if @profile-pic (.-name @profile-pic) "no photo uploaded")]]

        [:div
         {:style {:display "flex"
                  :flex-direction "column"
                  :align-items "center"}}
         [button
          {:variant "contained"
           :type "submit"
           :disable-elevation true
           :disabled (or (not (valid-username? @name))
                         (not (valid-password? @password))
                         (not= @password @password-confirm)
                         (nil? @profile-pic)
                         @loading)}
          "Submit"]
         [circular-progress {:sx {:margin "10px" :visibility (when (not @loading) "hidden")}}]]]])))
