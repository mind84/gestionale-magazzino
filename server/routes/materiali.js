"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var materiali_1 = require("../models/materiali");
var categorie_articoli_1 = require("../models/categorie-articoli");
var _ = require("lodash");
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
router.route("/update").post(function (req, res, next) {
    var qs = _.omit(req.body, 'realcode');
    var qm = materiali_1.Materiali.findOneAndUpdate({ code: req.body.realcode }, { $set: qs }, { new: true }).lean();
    qm.exec(function (err, docs) {
        var qCat = categorie_articoli_1.Categorie.findOne({ id: docs.categ });
        qCat.exec(function (err, catres) {
            if (err)
                return res.send(err);
            else {
                docs.catdet = [];
                docs.catdet.push(catres);
                return res.json({ msg: "OK", result: "Articolo modificato correttamente", cback: docs });
            }
        });
    });
});
router.route("").get(function (req, res, next) {
    var ObjectId = require('mongoose').Types.ObjectId;
    var qname = null;
    var qcode = null;
    var qcat = null;
    var qs;
    if (req.query.name !== 'null')
        qname = '.*' + req.query.name + '.*';
    if (req.query.code !== 'null')
        qcode = '.*' + req.query.code + '.*';
    if (req.query.categ !== 'null')
        qcat = req.query.categ;
    if (qname && qcode && !qcat) {
        qs = { $and: [{ name: { $regex: qname, $options: "i" } }, { code: { $regex: qcode, $options: "i" } }] };
    }
    if (qname && qcode && qcat) {
        qs = { $and: [{ name: { $regex: qname, $options: "i" } }, { code: { $regex: qcode, $options: "i" } }, { categ: qcat }] };
    }
    else if (qname && !qcode && !qcat) {
        qs = { name: { $regex: qname, $options: "i" } };
    }
    else if (!qname && qcode && !qcat) {
        qs = { code: { $regex: qcode, $options: "i" } };
    }
    else if (!qname && !qcode && qcat) {
        qs = { categ: qcat };
    }
    else if (!qname && qcode && qcat) {
        qs = { $and: [{ code: { $regex: qcode, $options: "i" } }, { categ: qcat }] };
    }
    else if (qname && !qcode && qcat) {
        qs = { $and: [{ name: { $regex: qname, $options: "i" } }, { categ: qcat }] };
    }
    materiali_1.Materiali.aggregate([
        {
            $match: qs
        },
        {
            $lookup: {
                from: "CategorieArticoli",
                localField: "categ",
                foreignField: "id",
                as: "catdet"
            }
        }
    ], function (err, docs) {
        res.json(docs);
    });
});
router.route("/byname").get(function (req, res, next) {
    var qname = null;
    var qs;
    if (req.query.name !== 'null')
        qname = '^' + req.query.name + '.*';
    if (qname) {
        qs = { name: { $regex: qname, $options: "i" } };
    }
    materiali_1.Materiali.find(qs, function (err, docs) {
        res.json(docs);
    });
});
router.route("/bycode").get(function (req, res, next) {
    var qcode = null;
    var qs;
    if (req.query.code !== 'null')
        qcode = req.query.code;
    if (qcode) {
        qs = { code: qcode };
    }
    materiali_1.Materiali.find(qs, function (err, docs) {
        res.json(docs);
    });
});
//# sourceMappingURL=materiali.js.map