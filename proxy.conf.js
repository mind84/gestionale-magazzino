const PROXY_CONFIG = [
    {
        context: [
          "/",
          "/magazzino",
          "/costi",
          "/ordini",
          "/mat",
          "/um"
        ],
        target: "http://localhost:9005",
        secure: false
    }
]

module.exports = PROXY_CONFIG;
