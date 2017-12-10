"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var materiali_1 = require("../models/materiali");
var router = express.Router();
exports.router = router;
router.route("/insert").post(function (req, res, next) {
    materiali_1.Materiali.findOne({ code: req.body.code }, function (err, docs) {
        if (err)
            return res.send(err);
        else if (docs && docs.code)
            return res.json({ msg: "Errore", result: "Articolo già esistente" });
        else {
            var newArticle_1 = new materiali_1.Materiali(req.body);
            newArticle_1.save(function (err) {
                if (err)
                    return res.json({ msg: "Errore", result: err });
                else
                    return res.json({ msg: "OK", result: "Articolo inserito correttamente", cback: newArticle_1 });
            });
        }
    });
});
router.route("").get(function (req, res, next) {
    var ObjectId = require('mongoose').Types.ObjectId;
    var qname = null;
    var qcode = null;
    var qs;
    if (req.query.name !== 'null')
        qname = '.*' + req.query.name + '.*';
    if (req.query.code !== 'null')
        qcode = '.*' + req.query.code + '.*';
    if (qname && qcode) {
        qs = { $and: [{ name: { $regex: qname, $options: "i" } }, { code: { $regex: qcode, $options: "i" } }] };
    }
    else if (qname && !qcode) {
        qs = { name: { $regex: qname, $options: "i" } };
    }
    else if (!qname && qcode) {
        qs = { code: { $regex: qcode, $options: "i" } };
    }
    materiali_1.Materiali.find(qs, function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
});
//# sourceMappingURL=materiali.js.map