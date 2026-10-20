(ns wejure.components.mainPage
  (:require ["../js/post" :as post]
            ["@mui/icons-material/AddAPhotoSharp$default" :as AddAPhotoSharpIcon]
            ["@mui/material/Box$default" :as Box]
            ["@mui/material/Button$default" :as Button]
            ["@mui/material/CircularProgress$default" :as CircularProgress]
            ["@mui/material/IconButton$default" :as IconButton]
            ["@mui/material/Typography$default" :as Typography]
            [reagent.core :as r]
            [wejure.common :as common]
            [wejure.components.postCard :refer [add-post! post-list]]
            [wejure.components.textField :refer [text-field]]))

;; uploads the image (if any) to IPFS, then stores the post in gunDB
(defn- submit-post [text image loading]
  (reset! loading true)
  (-> (if @image
        (common/ipfs-add @image)
        (js/Promise.resolve nil))
      (.then (fn [image-cid]
               (post/storePost (common/current-username) (not-empty @text) image-cid)
               (reset! text "")
               (reset! image nil)))
      (.catch (fn [^js err]
                (js/alert (str "Could not upload the image: " (.-message err)))))
      (.finally #(reset! loading false))))

(defn main-page []
  (let [posts (r/atom {})
        text (r/atom "")
        image (r/atom nil)
        loading (r/atom false)]
    (post/loadFeed (common/current-username) (add-post! posts))
    (fn []
      [:div
       [:> Box {:sx {:display "flex"                                                ;; components for starting a new post
                     :flex-direction "column"
                     :align-items "center"}}
        [:> Box
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
            :value @text
            :on-change (fn [e] (reset! text (.. e -target -value)))}]]

         [:> Box
          {:sx {:display "flex"
                :justify-content "space-between"}}
          [:div {:style {:width "80px" :margin-top 15}}
           [:> CircularProgress {:sx {:visibility (when (not @loading) "hidden")}}]]

          [:div {:style {:text-align "center"}}                                  ;; image input for image content of the new post
           [:label
            {:html-for "upload-image"}
            [:input
             {:accept "image/*"
              :id "upload-image"
              :type "file"
              :style {:display "none"}
              :on-change #(reset! image (-> % .-target .-files (aget 0)))}]
            [:> IconButton
             {:component "span"}
             [:> AddAPhotoSharpIcon]]]
           [:> Typography
            {:variant "h6"
             :component "div"
             :sx {:color (if @image "#070707" "#d32f2f")
                  :font-size "12px"
                  :font-weight "500"}}
            (if @image (.-name @image) "no photo uploaded")]]

          [:div {:style {:text-align "right" :margin-top 15}}                  ;; button for submitting the new post
           [:> Button
            {:variant "contained"
             :disabled (or (and (empty? @text) (nil? @image)) @loading)
             :disable-elevation true
             :on-click #(submit-post text image loading)}
            "Post"]]]]]

       [post-list posts]])))
