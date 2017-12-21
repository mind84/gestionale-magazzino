"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var express = require("express");
var session = require("express-session");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var materiali_1 = require("./routes/materiali");
var umisura_1 = require("./routes/umisura");
var categorie_articoli_1 = require("./routes/categorie-articoli");
var redisStore = require("connect-redis")(session);
var app = express();
app.use("/node_modules", express.static("node_modules"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var cred = require("./config/cred.json");
app.locals.config = cred;
var mongoClient = mongoose.connect(cred["mongo"]["url"]);
app.use("/mat", materiali_1.router);
app.use("/um", umisura_1.router);
app.use("/catart", categorie_articoli_1.router);
app.use(function (req, res) { return res.sendFile(path.join(__dirname, '../public', 'index.html')); });
app.listen(9005);
//# sourceMappingURL=main.js.map