import { Request, Response, NextFunction as NFunc } from "express";
import * as express from "express";
import { Materiali } from "../models/materiali";
import { Transazioni } from "../models/magazzino-transazioni";
import * as _ from 'lodash'

var router = express.Router();

router.route("/add").post((req: Request, res: Response, next: NFunc) => {
    Materiali.findOne({code: req.body.currArt.code}, (err: any, docs:any)=>{
      if(err) return res.json({msg:"Errore", result: err})
      else if (docs && docs.code) {
        let date= Date.now();
        let insertObj:any = {};
        insertObj.refId = req.body.currArt.code;
        insertObj.dateTime = date;
        insertObj.operation = 'add';
        insertObj.quantity = +req.body.trans.qtadd;
        insertObj.reason = req.body.trans.motivazioni;
        if (req.body.trans.numorder) insertObj.ordernum = req.body.trans.numorder;
        if (req.body.trans.note) insertObj.note = req.body.trans.note;

        let newAddTransaction = new Transazioni(insertObj);

        newAddTransaction.save((err:any, savedoc:any)=>{
          if (err) return res.json({msg:"Errore", result: err});
          else {
            let trs = {totalInStore: {tot: (+req.body.currArt.totalInStore.tot) + (+req.body.trans.qtadd),date: date}}
            let qupd = Materiali.findOneAndUpdate({code: req.body.currArt.code},{$set: trs},{ new: true }).lean()

            qupd.exec((saverr:any, savedoc:any)=>{
              if (err) {
                Transazioni.remove({_id:savedoc._id}, (err, res)=>{
                  return res.json({msg:"Errore", result: saverr })
                })
              }
              else {
                return res.json({ msg: "OK", result: "Transazione inserita correttamente",cback: savedoc });
              }
            })
          }
        })
      }
      else {
        return res.json({msg:"Errore", result: "Articolo non trovato"})
        }
        })
    });

    router.route("/remove").post((req: Request, res: Response, next: NFunc) => {
        Materiali.findOne({code: req.body.currArt.code}, (err: any, docs:any)=>{
          if(err) return res.json({msg:"Errore", result: err})
          else if (docs && docs.code) {
            if (docs.totalInStore.tot < req.body.trans.qtsub) {
              return res.json({msg:"Errore", result: 'Impossibile sottrarre più elementi di quelli presenti'})
            }
            let date= Date.now();
            let insertObj:any = {};
            insertObj.refId = req.body.currArt.code;
            insertObj.dateTime = date;
            insertObj.operation = 'remove';
            insertObj.quantity = +req.body.trans.qtsub;
            insertObj.reason = req.body.trans.motivazioni;
            if (req.body.trans.numorder) insertObj.ordernum = req.body.trans.numorder;
            if (req.body.trans.note) insertObj.note = req.body.trans.note;

            let newAddTransaction = new Transazioni(insertObj);

            newAddTransaction.save((err:any, savedoc:any)=>{
              if (err) return res.json({msg:"Errore", result: err});
              else {
                let trs = {totalInStore: {tot:(+req.body.currArt.totalInStore.tot) - (+req.body.trans.qtsub),date: date}}
                let qupd = Materiali.findOneAndUpdate({code: req.body.currArt.code},{$set: trs},{ new: true }).lean()

                qupd.exec((saverr:any, savedoc:any)=>{
                  if (err) {
                    Transazioni.remove({_id:savedoc._id}, (err, res)=>{
                      return res.json({msg:"Errore", result: saverr })
                    })
                  }
                  else {
                    return res.json({ msg: "OK", result: "Transazione inserita correttamente",cback: savedoc });
                  }
                })
              }
            })
          }
          else {
            return res.json({msg:"Errore", result: "Articolo non trovato"})
            }
            })
        });
/*
    router.route("/update").post((req: Request, res: Response, next: NFunc) => {
        let qs = _.omit(req.body, 'realcode')
        let qm = Materiali.findOneAndUpdate({code: req.body.realcode},{$set: qs},{ new: true }).lean()
        qm.exec((err: any, docs:any)=>{
          //ricerca categoria
          let qCat = Categorie.findOne({id:docs.categ})
          qCat.exec((err,catres)=>{
            if (err) return res.send(err)
              else {
                docs.catdet = [];
                docs.catdet.push(catres);
                return res.json({ msg: "OK", result: "Articolo modificato correttamente",cback: docs });
            }
          })


            })
        });

router.route("").get((req: Request, res: Response, next: NFunc) => {
  var ObjectId = require('mongoose').Types.ObjectId;
  let qname = null;
  let qcode = null;
  let qcat = null;
  let qs;
  if (req.query.name !== 'null') qname= '.*'+req.query.name+'.*';
  if (req.query.code !== 'null') qcode= '.*'+req.query.code+'.*';
  if (req.query.categ !=='null') qcat = req.query.categ;

  if (qname && qcode && !qcat) {
    qs= {$and:[{name: {$regex: qname, $options: "i"}}, {code: {$regex: qcode, $options:"i"}}]}
  }
  if (qname && qcode && qcat) {
    qs= {$and:[{name: {$regex: qname, $options: "i"}}, {code: {$regex: qcode, $options:"i"}}, {categ:qcat}]}
  }
  else if(qname && !qcode && !qcat){
    qs = {name: {$regex: qname, $options: "i"}};
  }
  else if(!qname && qcode && !qcat){
    qs = {code: {$regex: qcode, $options: "i"}};
  }
  else if(!qname && !qcode && qcat){
    qs = {categ:qcat};
  }
  else if(!qname && qcode && qcat){
    qs= {$and:[{code: {$regex: qcode, $options:"i"}}, {categ:qcat}]}
  }
  else if(qname && !qcode && qcat){
    qs= {$and:[{name: {$regex: qname, $options: "i"}}, {categ:qcat}]}
  }

  Materiali.aggregate([
    {
      $match: qs
    },
    {
      $lookup : {
        from:"CategorieArticoli",
        localField: "categ",
        foreignField: "id",
        as: "catdet"
      }
    }
  ], (err: any, docs:any)=> {
    res.json(docs)
  })

  /*Materiali.find(qs, (err: any, docs:any)=> {
    res.json(docs)
  })
})

router.route("/byname").get((req: Request, res: Response, next: NFunc) => {
  let qname = null;
  let qs;
  if (req.query.name !== 'null') qname= '^'+req.query.name+'.*';


  if(qname){
    qs = {name: {$regex: qname, $options: "i"}};
  }
  Materiali.find(qs, (err: any, docs:any)=> {
    res.json(docs)
  })
})
*/

export { router };
