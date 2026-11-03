(ns wejure.common
  "Session and media helpers shared by the pages."
  (:require ["@mui/material/Avatar$default" :as Avatar]
            ["wejure-nostr/app.js" :as app]
            [reagent.core :as r]))

;; The session lives in the data layer (wejure-nostr/session.js keeps it in
;; sessionStorage, so a reload stays logged in).

(defn logged-in? []
  (app/loggedIn))

(defn- me []
  (js->clj (app/me) :keywordize-keys true))

(defn current-username []
  (:username (me)))

(defn current-pub []
  (:pk (me)))

(defn current-picture []
  (:picture (me)))

(defn- media-url
  "An atom that receives the browser URL of the file with hash sha256 once it is
  fetched and checked (nil until then, or if no server has it)."
  [sha256 author]
  (let [url (r/atom nil)]
    (when (seq sha256)
      (.then (app/mediaUrl sha256 author) #(reset! url %)))
    url))

(defn avatar
  "A user's picture (a Blossom hash), or the first letter of their name."
  [{:keys [picture author username sx]}]
  (r/with-let [url (media-url picture author)]
    [:> Avatar {:sx sx :src @url :alt username}
     (when (and (nil? @url) (seq username))
       (.toUpperCase (subs username 0 1)))]))

(defn media-image
  "The picture with hash sha256, shown once it has loaded."
  [{:keys [sha256 author style]}]
  (r/with-let [url (media-url sha256 author)]
    (when @url
      [:img {:style style :src @url}])))
