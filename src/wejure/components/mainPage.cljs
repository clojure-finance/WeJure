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
            [wejure.components.postCard :refer [post-list sync-posts!]]
            [wejure.components.textField :refer [text-field]]))

;; Uploads the image (if any) to IPFS, then stores the post in gunDB. The draft
;; stays in the composer until the relay has confirmed the post, and stays
;; there with an error if it does not. The composer remains editable meanwhile,
;; so a confirmation clears only what was submitted, never a newer draft.
(defn- submit-post [text image loading error pending]
  (let [submitted-text @text
        submitted-image @image]
    (reset! loading true)
    (reset! error nil)
    (-> (if submitted-image
          (common/ipfs-add submitted-image)
          (js/Promise.resolve nil))
        (.then (fn [image-cid]
                 (let [[key saved] (post/storePost (not-empty submitted-text) image-cid)]
                   (swap! pending conj key)
                   (.then saved (fn [err]
                                  (swap! pending disj key)
                                  (if err
                                    (reset! error err)
                                    (do (when (= @text submitted-text) (reset! text ""))
                                        (when (identical? @image submitted-image) (reset! image nil)))))))))
        (.catch (fn [^js err]
                  (reset! error (str "Could not upload the image: " (.-message err)))))
        (.finally #(reset! loading false)))))

(defn main-page []
  (r/with-let [posts (r/atom {})
               pending (r/atom #{})                                          ;; keys of own posts awaiting the relay
               text (r/atom "")
               image (r/atom nil)
               loading (r/atom false)
               error (r/atom nil)
               stop-feed (post/loadFeed (common/current-pub) (sync-posts! posts))]
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
           :on-click #(submit-post text image loading error pending)}
          "Post"]]]
       (when @error
         [:> Typography {:sx {:mt 2 :color "error.main" :font-size "14px"}}
          @error])]]

     [post-list posts pending]]
    (finally
      (stop-feed))))
