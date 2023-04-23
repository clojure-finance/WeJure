(ns wejure.components.profilePage
  (:require ["../js/profile" :as profile]
            [reagent-mui.material.box :refer [box]]
            [reagent-mui.material.button :refer [button]]
            [reagent-mui.material.paper :refer [paper]]
            [reagent-mui.material.avatar :refer [avatar]]
            [reagent-mui.material.typography :refer [typography]]
            [reagent.core :as r]))

(def ipfs-url "https://ipfs.io/ipfs/")               ;; IPFS gateway for retrieving files from IPFS

(def profile-info (r/atom nil))

(defn assoc-icon-cid [target-atom value]
  (swap! target-atom assoc :iconCID value))

(defn ^:export profile-page [{{:keys [username]} :path-params}]
  ;;(swap! profile-info assoc :iconCID (profile/getIconCID username))
  (profile/getIconCID username)
  [:div {:style {:margin "0 20% 25px 20%"}}
    [paper {:id "user-card"
            :variant "outlined"
            :sx {:height 200 :mb 2 :display "flex"}}
     [avatar {:sx {:mx 4 :my 6 :width 100 :height 100}
              :src (str ipfs-url (get @profile-info :iconCID))}]
     [box {:sx {:my 6}}
      [typography {:sx {:font-size "30px"}}
       username]]
     [box {:style {:display "flex" :flex-grow 1 :justify-content "flex-end"}}
      [button {:sx {:mt 16 :mb 4 :mr 4 :width 100 :height 40 :border-radius 30}
               :variant "outlined"}
       "Follow"]]]])