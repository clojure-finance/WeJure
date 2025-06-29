(ns wejure.components.registrationPage
  (:require [reagent.core :as r]
            [reagent-mui.material.box :refer [box]]
            [reagent-mui.material.button :refer [button]]
            [reagent-mui.material.typography :refer [typography]]
            [reagent-mui.material.text-field :refer [text-field]]
            [reagent-mui.material.circular-progress :refer [circular-progress]]
            [reagent-mui.material.icon-button :refer [icon-button]]
            [reagent-mui.icons.add-a-photo-sharp :refer [add-a-photo-sharp]]
            ["../js/account" :as acc]
            [reitit.frontend.easy :as reitit-fe]
            [cljs-ipfs-api.core :as icore :refer [init-ipfs]]))

(defn input-length-at-least [field min]                                    ;; check if the length of the input is at least min
    (>= (count @field) min))

(defn emptyPhoto [photo]
  (nil? @photo))

(defn is-pwd-matched [pwd pwd-confirm]
  (= @pwd @pwd-confirm))


(defn check-username-valid [username]
  (let [valid (atom true)]
    (doseq [chr @username]
      (when (= (re-seq #"\w" chr) nil)
        (reset! valid false)))
    @valid))

(def loading-ref (atom ""))

(defn ^:export toLoginPage []
  (set! js/window.location.href (reitit-fe/href :wejure.core/login)))

(defn ^:export stopLoading []
  (reset! @loading-ref false))  ;; bug? should be (reset! loading-ref false), but it works

(defn submitProfile [name password photo loading]
  (reset! loading-ref loading)
  (reset! loading true)

  (println "Creating form data...")
  (let [form-data (js/FormData.)]
    (.append form-data "file" @photo (.-name @photo))

    (println "Uploading to IPFS...")
    (-> (js/fetch "http://127.0.0.1:5001/api/v0/add"
                  #js {:method "POST"
                       :body form-data})
        (.then (fn [response] (.json response)))
        (.then (fn [data]
                 (let [cid (.-Hash data)]
                   (println "Uploaded to IPFS. CID:" cid)
                   (println "Registering user account...")
                   (acc/register @name @password cid)
                   (println "User account registered."))))
        (.catch (fn [err]
                  (println "Error uploading to IPFS:" err)
                  (reset! loading false)))
        (.finally (fn []
                    (reset! loading false))))))

;; (defn submitProfile [name password photo loading]
;;    (reset! loading-ref loading)
;;    (reset! loading true)

;;    (println "Uploading to IPFS...")
;;    (ifiles/add @photo
;;                (fn [err files]
;;                  (if err
;;                    (do
;;                      (println "Error uploading to IPFS:" err)
;;                      (reset! loading false))
;;                    (let [cid (get-in files [0 :hash])] ;; files 是一个数组，取第一个文件的 hash
;;                      (println "Uploaded to IPFS. CID:" cid)
;;                      (println "Registering user account...")
;;                      (acc/register @name @password cid)
;;                      (println "User account registered.")
;;                      (reset! loading false))))))

;; (defn submitProfile [name password photo loading]
;;   (reset! loading-ref loading)
;;   (reset! loading true)

;;   (println "Uploading to IPFS...")

;;   ;; 使用 FormData 构造多部分表单数据
;;   (let [form-data (js/FormData.)]
;;     (.append form-data "file" @photo) ;; 添加文件到表单
;;     (let [response-promise (js/fetch "http://127.0.0.1:5001/api/v0/add"
;;                                      (clj->js {:method "POST"
;;                                                :body form-data}))]
;;       (println "Response promise:" response-promise)
;;       (.then response-promise
;;              (fn [response]
;;                (if (.ok response)
;;                  (do
;;                    (println "Response OK, parsing JSON...")
;;                    (.then (.json response)
;;                           (fn [data]
;;                             (let [cid (get data "Hash")]
;;                               (println "Uploaded to IPFS. CID:" cid)
;;                               ;; 调用注册逻辑
;;                               (println "Registering user account...")
;;                               (acc/register @name @password cid)
;;                               (println "User account registered.")
;;                               (reset! loading false)))))
;;                  (do
;;                    (println "HTTP error:" (.status response))
;;                    (reset! loading false)))))
;;       ;; 捕获错误
;;       (.catch response-promise
;;               (fn [err]
;;                 (println "Error uploading to IPFS:" err)
;;                 (reset! loading false))))))

(defn registration-page []
  (let [name (r/atom nil) password (r/atom nil) password-confirm (r/atom nil) profile-pic (r/atom nil) loading (r/atom false)]
    (init-ipfs {:host "	http://127.0.0.1:5001"})                           ;; initialize IPFS with localhost (need to run a IPFS client locally)
    (fn []
      [:div
       {:style {:height "100%" :display "flex" :justify-content "center" :align-items "center", :posotion "relative"}}
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
         :on-submit (fn [e] (.preventDefault e) (submitProfile name password profile-pic loading))}

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
           :error (or (not (input-length-at-least name 3)) (not (check-username-valid name)))
           :helper-text (if (or (not (input-length-at-least name 3)) (not (check-username-valid name))) "Must contain 3-20 characters and no special characters" " ")
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
           :error (not (input-length-at-least password 8))
           :helper-text (if (not (input-length-at-least password 8)) "Must contain 8-20 characters" " ")
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
           :error (not (is-pwd-matched password password-confirm))
           :helper-text (if (not (is-pwd-matched password password-confirm)) "Passwords do not match" " ")
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
            :on-change #(let [uploaded (-> % .-target .-files (aget 0))] (reset! profile-pic uploaded))}]
          [icon-button
           {:component "span"}
           [add-a-photo-sharp]]]

         [typography
          {:variant "h6"
           :component "div"
           :sx {:color (if (emptyPhoto profile-pic)  "#d32f2f" "#070707")
                :font-size "12px"
                :font-weight "500"
                :text-align "center"}}
          (if (emptyPhoto profile-pic) "no photo uploaded" (.-name @profile-pic))]]

        [:div
         {:style {:display "flex"
                  :flex-direction "column"
                  :align-items "center"}}
         [button
          {:variant "contained"
           :type "submit"
           :disable-elevation true
           :disabled (or (not (input-length-at-least name 3)) (not (input-length-at-least password 8)) (emptyPhoto profile-pic) (not (is-pwd-matched password password-confirm)) (not (check-username-valid name)) @loading)}
          "Submit"]
         [circular-progress {:sx {:margin "10px" :visibility (when (not @loading) "hidden")}}]]
        
        [:div
             {:style {:position "absolute"
                      :bottom "20px"
                      :left "20px"}}
             ]]])))