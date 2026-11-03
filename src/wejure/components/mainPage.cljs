(ns wejure.components.mainPage
  (:require ["@mui/icons-material/AddAPhotoSharp$default" :as AddAPhotoSharpIcon]
            ["@mui/material/Box$default" :as Box]
            ["@mui/material/Button$default" :as Button]
            ["@mui/material/CircularProgress$default" :as CircularProgress]
            ["@mui/material/IconButton$default" :as IconButton]
            ["@mui/material/Typography$default" :as Typography]
            ["wejure-nostr/app.js" :as app]
            [reagent.core :as r]
            [wejure.components.postCard :refer [add-posts! load-more post-list watch!]]
            [wejure.components.textField :refer [text-field]]))

;; Uploads the image (if any) to the media servers, then shows the signed post
;; at once, marked as sending, while it goes to the relays. The draft stays in
;; the composer until a relay has confirmed the post; if none does, the post is
;; withdrawn and the draft stays with an error. The composer remains editable
;; meanwhile, so a confirmation clears only what was submitted.
(defn- submit-post [posts text image loading error pending]
  (let [submitted-text @text
        ^js submitted-image @image]
    (reset! loading true)
    (reset! error nil)
    (-> (if submitted-image
          (.catch (app/uploadFile submitted-image)
                  (fn [^js err] (throw (js/Error. (str "Could not upload the image: " (.-message err))))))
          (js/Promise.resolve nil))
        (.then (fn [image-hash]
                 (app/newPost submitted-text image-hash (some-> submitted-image .-type))))
        (.then (fn [[js-post saved]]
                 (let [id (.-id js-post)]
                   (add-posts! posts #js [js-post])
                   (swap! pending conj id)
                   (.then saved (fn [err]
                                  (swap! pending disj id)
                                  (if err
                                    (do (swap! posts dissoc id)
                                        (reset! error err))
                                    (do (when (= @text submitted-text) (reset! text ""))
                                        (when (identical? @image submitted-image) (reset! image nil)))))))))
        (.catch (fn [^js err]
                  (reset! error (.-message err))))
        (.finally #(reset! loading false)))))

(defn- load-page! [posts next]
  (.then (app/postsPage #js {:until @next})
         (fn [^js page]
           (add-posts! posts (.-posts page))
           (reset! next (.-next page)))))

(defn main-page []
  (r/with-let [posts (r/atom {})
               pending (r/atom #{})                                          ;; ids of own posts awaiting a relay
               next (r/atom nil)                                             ;; `until` of the next page, nil at the end
               text (r/atom "")
               image (r/atom nil)
               loading (r/atom false)
               error (r/atom nil)
               _ (load-page! posts next)
               stop-feed (watch! posts nil)]
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
            :on-change (fn [e]
                         (reset! image (-> e .-target .-files (aget 0)))
                         (set! (.. e -target -value) ""))}]                ;; so the same file can be chosen again
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
           :on-click #(submit-post posts text image loading error pending)}
          "Post"]]]
       (when @error
         [:> Typography {:sx {:mt 2 :color "error.main" :font-size "14px"}}
          @error])]]

     [post-list posts pending]
     [load-more next #(load-page! posts next)]]
    (finally
      (stop-feed))))
