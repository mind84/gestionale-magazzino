const PROXY_CONFIG = [
    {
        context: [
          "/",
          "/magazzino",
          "/costi",
          "/materiali",
          "/ordini",
          "/mat"
        ],
        target: "http://localhost:9005",
        secure: false
    }
]

module.exports = PROXY_CONFIG;
