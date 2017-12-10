
import * as path from "path";
import { Request, Response } from "express";
import * as express from "express";
import * as session from "express-session";
import * as mongoose from "mongoose";
//import * as redis from "redis";
//import * as redisStore from "connect-redis";
import * as bodyParser from "body-parser";
//import * as cookieParser from "cookie-parser";
import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import * as routes from "./routes/index";
/*import { Accounts } from "./models/account"*/
import { router as materiali } from "./routes/materiali"
/*import { router as shop } from "./routes/shop"
import { router as getshop } from "./routes/getshop"
import { router as rated } from "./routes/rated"
import { router as imgal } from "./routes/imgal"
import { router as comments } from "./routes/comments"
import { router as imgUsers } from "./routes/imgUsers"
import { router as locations } from "./routes/locations"*/

var redisStore = require("connect-redis")(session);

/*
/Istanzio l'applicazione principale del server Express
*/

var app = express();

app.use("/node_modules", express.static("node_modules"));
//app.use(express.static(__dirname + 'public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

//Carico la configurazione e la associo a una variable locale all'applicazione
var cred = require("./config/cred.json");
app.locals.config = cred;

//Creo i due client per database NoSQL MongoDB e database in-memory Redis
var mongoClient = mongoose.connect(cred["mongo"]["url"]);
//var redisClient = redis.createClient(cred["redis"]["port"], cred["redis"]["host"]);


//Rende il logger una variabile locale all'applicazione. Potrà essere richiamato nei middleware con req.app.local.inklog
//app.locals.inklog = inklog;
//inklog.info("Ciao, sono attivo");
/*app.use(session({
    secret: cred["session"]["secret"],
    name: "inkTest",
    store: new redisStore({ client: redisClient, prefix: "INKSES" }),
    resave: false,
    saveUninitialized: false
}));*/
//app.use(passport.initialize());
//app.use(flash());
//app.use(passport.session());
//passport.use(new LocalStrategy(Account.authenticate()));
//passport.serializeUser(Account.serializeUser());
//passport.deserializeUser(Account.deserializeUser());


/*app.use(function (req, res, next) {
  if(req.session) console.log("Request received at Time " + Date.now() + " for the session with ID: " + req.sessionID+ " and " + JSON.stringify(req.session));
  else console.log('Request received at Time:', Date.now());
  next();
});*/

//app.get('/', routes.index);

/*app.get("/fakehome", routes.fakehome);

app.use("/auth", auth);
app.use("/search", shop);
app.use("/getshop", getshop);
app.use("/rated", rated);
app.use("/imgal", imgal);
app.use("/comments", comments);
app.use("/imgusers", imgUsers);
app.use("/neartoyou", locations);*/

app.use("/mat", materiali);
app.use((req, res) => res.sendFile(path.join(__dirname, '../public', 'index.html')));
app.listen(9005);
