(ns wejure.common
  "Session and IPFS helpers shared by the pages.")

;; The login session lives in sessionStorage: "username", "icon_cid", and the
;; key pair "pair" stored by gun's user.recall (see js/db.js).

(defn current-username []
  (js/sessionStorage.getItem "username"))

(defn logged-in? []
  (some? (js/sessionStorage.getItem "pair")))

;; IPFS runs locally: the HTTP API on port 5001 for uploads, the gateway on 8080
;; for reading files back.

(def ^:private ipfs-api "http://127.0.0.1:5001/api/v0/add")
(def ^:private ipfs-gateway "http://localhost:8080/ipfs/")

(defn ipfs-url
  "Gateway URL of a CID, or nil when there is no CID."
  [cid]
  (when (seq cid)
    (str ipfs-gateway cid)))

(defn ipfs-add
  "Uploads a js/File to IPFS. Returns a promise of its CID."
  [^js file]
  (let [form-data (js/FormData.)]
    (.append form-data "file" file (.-name file))
    (-> (js/fetch ipfs-api #js {:method "POST" :body form-data})
        (.then (fn [^js response]
                 (if (.-ok response)
                   (.json response)
                   (throw (js/Error. (str "IPFS upload failed: HTTP " (.-status response)))))))
        (.then (fn [^js data] (.-Hash data))))))
