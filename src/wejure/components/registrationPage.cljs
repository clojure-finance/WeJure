(ns wejure.components.registrationPage
  (:require [reagent.core :as r]
            [reagent-mui.material.box :refer [box]]
            [reagent-mui.material.button :refer [button]]
            [reagent-mui.material.typography :refer [typography]]
            [reagent-mui.material.text-field :refer [text-field]]
            [reagent-mui.material.circular-progress :refer [circular-progress]]
            [reagent-mui.material.icon-button :refer [icon-button]]
            [reagent-mui.icons.add-a-photo-sharp :refer [add-a-photo-sharp]]
            ["../js/accSystem" :as acc]
            [reitit.frontend.easy :as reitit-fe]
            [cljs-ipfs-api.core :as icore :refer [init-ipfs]]
            [cljs-ipfs-api.files :as ifiles]))

(defn emptyField [field]
    (= (count @field) 0))

(defn emptyPhoto [photo]
  (nil? @photo))

(defn is-pwd-matched [password pwdConfirm]
  (= @password @pwdConfirm))

(def loading-ref (atom ""))

(defn ^:export toLoginPage []
  (set! js/window.location.href (reitit-fe/href :wejure.core/login)))

(defn ^:export stopLoading []
  (reset! @loading-ref false))

(defn submitProfile [name password photo loading]
  (reset! loading-ref loading)
  (reset! loading true)
  (let [blob (js/Blob. (clj->js [@photo]) #js {:type "image/*"})]          ;; convert the image to JavaScript blob object
    (ifiles/add blob {:path (.-name @photo)}                               ;; upload the image to IPFS
                (fn [err files]
                  (if err
                    (println (str "err: " err))
                    (let [cid (. (. js/JSON parse files) -Hash)]           ;; get the image file CID after completing the upload to IPFS
                      (acc/register @name @password cid)))))))             ;; register the user account and store the CID in gunDB

(defn registration-page []
  (let [name (r/atom nil) password (r/atom nil) pwdConfirm (r/atom nil) profilePic (r/atom nil) loading (r/atom false)]
    (init-ipfs {:host "	http://127.0.0.1:5001"})                           ;; initialize IPFS with localhost (need to run a IPFS client locally)
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
              :padding "50px 30px"}}

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

         [text-field
          {:variant "filled"
           :value @name
           :on-change (fn [e] (reset! name (.. e -target -value)))
           :error (emptyField name)
           :helper-text (if (emptyField name) "no text entered (20 characters max)" " ")
           :input-props {:max-length 20}}]]

        [:div
         {:style {:display "flex"
                  :flex-direction "column"}}

         [typography
          {:variant "h6"
           :component "div"}
          "2. Create a password (at least 8 digits)"]

         [text-field
          {:variant "filled"
           :type "password"
           :value @password
           :on-change (fn [e] (reset! password (.. e -target -value)))
           :error (emptyField password)
           :helper-text (if (emptyField password) "no text entered (20 characters max)" " ")
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
           :value @pwdConfirm
           :on-change (fn [e] (reset! pwdConfirm (.. e -target -value)))
           :error (emptyField pwdConfirm)
           :helper-text (if (emptyField pwdConfirm) "no text entered (20 characters max)" (if (is-pwd-matched password pwdConfirm) " " "Passwords do not match"))
           :input-props {:max-length 20}}]]

        [:div
         {:style {:display "flex"
                  :flex-direction "column"}}

         [typography
          {:variant "h6"
           :component "div"}
          "3. Upload a profile picture"]

         [:label
          {:html-for "upload-image" :style {:margin "0 auto"}}
          [:input
           {:accept "image/*"
            :id "upload-image"
            :type "file"
            :style {:display "none"}
            :on-change #(let [uploaded (-> % .-target .-files (aget 0))] (reset! profilePic uploaded))}]
          [icon-button
           {:component "span"}
           [add-a-photo-sharp]]]

         [typography
          {:variant "h6"
           :component "div"
           :sx {:color (if (emptyPhoto profilePic)  "#d32f2f" "#070707")
                :font-size "12px"
                :font-weight "500"
                :text-align "center"}}
          (if (emptyPhoto profilePic) "no photo uploaded" (.-name @profilePic))]]

        [:div
         {:style {:display "flex"
                  :flex-direction "column"
                  :align-items "center"}}
         [button
          {:variant "contained"
           :disable-elevation true
           :disabled (or (emptyField name) (emptyField password) (emptyPhoto profilePic) (not (is-pwd-matched password pwdConfirm)) @loading)
           :on-click #(submitProfile name password profilePic loading)}
          "Submit"]
         [circular-progress {:sx {:margin "10px" :visibility (when (not @loading) "hidden")}}]]]])))