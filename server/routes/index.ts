import express = require("express")
//import db = require("../../../db")

export function index(req: express.Request, res: express.Response) {
  res.render("index");
    // db.getUsers(function(users) {
    //     console.dir(users);
    //     res.render('index', { title: 'ImageBoard', users: users })
    // });
};

export function fakehome(req: express.Request, res: express.Response) {
    res.render("fakeHome");
};
