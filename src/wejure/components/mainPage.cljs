(ns wejure.components.mainPage
  (:require ["../js/guncljs" :as gun]
            ["../js/profile" :as profile]
            ["../js/post" :as post]
            [cljs-ipfs-api.core :as icore :refer [init-ipfs]]
            [cljs-ipfs-api.files :as ifiles]
            clojure.walk
            [reagent-mui.icons.add-a-photo-sharp :refer [add-a-photo-sharp]]
            [reagent-mui.material.avatar :refer [avatar]]
            [reagent-mui.material.box :refer [box]]
            [reagent-mui.material.button :refer [button]]
            [reagent-mui.material.circular-progress :refer [circular-progress]]
            [reagent-mui.material.icon-button :refer [icon-button]]
            [reagent-mui.material.paper :refer [paper]]
            [reagent-mui.material.text-field :refer [text-field]]
            [reagent-mui.material.typography :refer [typography]]
            [reagent.core :as r]
            [reitit.frontend.easy :as reitit-fe]
            [cljs.core :as c]))
;;(def ipfs-url "https://ipfs.io/ipfs/")
(def ipfs-url "http://localhost:8080/ipfs/") ;;the default port of local ipfs app

(def post-list (r/atom {}))

(def text-input (r/atom nil))

(def image-input (r/atom nil))

(defn clear-gun-db []
  (let [confirmation (js/confirm "Are you sure you want to clear all data in GunDB? This action cannot be undone.")]
    (when confirmation
      (gun/clear)
      (js/alert "GunDB data has been cleared.")
      ;; (js/window.location.reload)
      )))

;; function for storing the post made by the user in gunDB 
(defn store-post [username text image-cid]
  (let [timestamp (.toUTCString (new js/Date.))
        unixtime (.getTime (new js/Date.))
        post {:username username, :timestamp timestamp, :text text, :image image-cid, :unixtime unixtime}]
    (gun/put "post" username timestamp (clj->js post))))

(defn load-post []
  (println "current time" (.getTime (new js/Date.)))
  (gun/map-once "user" (js/sessionStorage.getItem "username") "is_following"
                (fn [label username]
                  (when username
                    (gun/map-once "post" username (fn [post time-key]
                                                    (when (not= post nil)
                                                      (if (= nil ((keyword time-key) @post-list))
                                                        (let [post-with-icon-cid (atom (clojure.walk/keywordize-keys (into {} (rest (js->clj post)))))]
                                                          (.then (js/Promise.resolve (profile/getIconCID (:username @post-with-icon-cid)))
                                                                 (fn [resolve]
                                                                   (swap! post-with-icon-cid assoc :icon_cid resolve)
                                                                   (swap! post-list assoc (keyword time-key) @post-with-icon-cid))))
                                                        (swap! post-list assoc (keyword time-key) (conj ((keyword time-key) @post-list) (clojure.walk/keywordize-keys (into {} (rest (js->clj post))))))))))))))
  
(defn delete-post [username timekey]
  (gun/del "post" username timekey)
  (js/window.location.reload))

;; format and store the post in gunDB, post format (6 key-value pairs): {:image post-image CID, :text post-text, :timestamp javascript timestamp, :username username, :unixtime unix timestamp, :display true}
  (defn submit-post [post-text post-image loading]
    (let [username (atom "") text (atom nil) image-cid (atom nil)]
      (reset! loading true)
      (reset! username (js/sessionStorage.getItem "username"))
      (when (not= @post-text "")
        (reset! text @post-text))                                                ;; set text as text input if it is not empty string, set null otherwise
      (if (not= @post-image nil)
        (let [blob (js/Blob. (clj->js [@post-image]) #js {:type "image/*"})]     ;; convert the image to JavaScript blob object
          (ifiles/add blob {:path (.-name @post-image)}                          ;; upload the image to IPFS 
                      (fn [err files]
                        (if err
                          (println (str "err: " err))
                          (let [cid (. (. js/JSON parse files) -Hash)]           ;; get the image file CID after completing the upload to IPFS
                            (reset! image-cid cid)
                            (store-post @username @text @image-cid))))))         ;; store the post with the corresponding image cid
        (store-post @username @text @image-cid))                                 ;; store the post with image cid as null
      (reset! text-input nil)
      (reset! image-input nil)
      (reset! loading false)))




  (defn text-empty? [text]
    (= (count text) 0))

  (defn image-empty? [image]
    (nil? image))

  (defn main-page []
    (init-ipfs {:host "http://127.0.0.1:5001"})
    (load-post)
    (let [loading (r/atom false)]
      (fn []
        [:div
         [box {:sx {:display "flex"                                                   ;; components for starting a new post
                    :flex-direction "column"
                    :align-items "center"}}
          [box
           {:sx {:box-shadow "20"
                 :background-color "white"
                 :padding "30px"
                 :height "auto"
                 :width "790px"
                 :border "3px solid grey"}}
           [:div
            [text-field                                                              ;; text field for text content of the new post
             {:multiline true
              :full-width true
              :max-rows 10
              :placeholder "What's on your mind?"
              :value @text-input
              :on-change (fn [e] (reset! text-input (.. e -target -value)))}]]

           [box
            {:sx {:display "flex"
                  :justify-content "space-between"}}
            [:div {:style {:width "80px" :margin-top 15}}
             [circular-progress {:sx {:visibility (when (not @loading) "hidden")}}]]

            [:div {:style {:text-align "center"}}                                  ;; image input for image content of the new post
             [:label
              {:html-for "upload-image"}
              [:input
               {:accept "image/*"
                :id "upload-image"
                :type "file"
                :style {:display "none"}
                :on-change #(let [uploaded (-> % .-target .-files (aget 0))] (reset! image-input uploaded))}]
              [icon-button
               {:component "span"}
               [add-a-photo-sharp]]]
             [typography
              {:variant "h6"
               :component "div"
               :sx {:color (if (image-empty? @image-input)  "#d32f2f" "#070707")
                    :font-size "12px"
                    :font-weight "500"}}
              (if (image-empty? @image-input) "no photo uploaded" (.-name @image-input))]]

            [:div {:style {:text-align "right" :margin-top 15}}                  ;; button for submitting the new post
             [button
              {:variant "contained"
               :disabled (or (and (text-empty? @text-input) (image-empty? @image-input)) @loading)
               :disable-elevation true
               :on-click #(submit-post text-input image-input loading)}
              "Post"]]]]]
         
         [box {:sx {:display "flex" :justify-content "center"}}
          [button
           {:variant "contained"
            :color "secondary"
            :sx {:my 2}
            :on-click clear-gun-db}
           "Clear GunDB"]]

         [box {:sx {:display "flex" :flex-direction "column" :align-items "center"}}
          (for [post (vals (into (sorted-map-by >) @post-list))]
            ^{:key post} [paper {:variant "outlined" :sx {:height "auto" :width 850 :my 1}}
                          [box {:sx {:display "flex"
                                     :box-shadow 3}
                                :justify-content "space-between"}
                           [box {:sx {:my 1 :display "flex"}}
                            [:a
                             {:href (reitit-fe/href :wejure.core/user {:username (:username post)})}
                             [avatar {:sx {:mx 2 :my 1 :width 36 :height 36}
                                      :src (str ipfs-url (:icon_cid post))}]]
                            [typography {:sx {:my 1 :font-size "20px"}}
                             (:username post)]]
                           [typography {:sx {:mx 1 :my 3 :font-size "10px"}}
                            (.toLocaleString (new js/Date. (:timestamp post)))]
                          ]

                          (when (not= (:text post) nil)                                                      ;; post text
                            [typography {:sx {:mx 2 :my 2 :font-size "16px" :white-space "break-spaces"}}
                             (:text post)])
                          
                          (when (not= (:image post) nil)                                                     ;; post image
                            [box {:sx {:background-color "black" :display "flex" :justify-content "center"}}
                             [:img {:style {:max-width "850px"}
                                    :src (str ipfs-url (:image post))}]])
                          
                          ;; delete button
                      [box {:sx {:display "flex" :justify-content "flex-end"}}
                       (when (= (:username post) (js/sessionStorage.getItem "username"))
                         [button
                          {:variant "outlined"
                           :sx {:mx 1 :my 1}
                           :on-click #(delete-post (:username post) (keyword (:timestamp post)))}
                          "Delete"])]
                          ])]])))