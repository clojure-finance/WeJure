// Where this WeJure site keeps its data. Empty lists mean "the server this page
// came from" (server/index.js runs a relay and a media server next to the app).
// List several to spread data across independent servers, e.g.
//   relays: ["wss://relay-one.example", "wss://relay-two.example"],
//   mediaServers: ["https://media-one.example", "https://media-two.example"],
window.WEJURE_CONFIG = {
    relays: [],
    mediaServers: [],
};
