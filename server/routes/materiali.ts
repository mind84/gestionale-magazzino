import { Request, Response, NextFunction as NFunc } from "express";
import * as express from "express";
import { Materiali } from "../models/materiali";
import { Categorie } from "../models/categorie-articoli";
import * as _ from 'lodash'

var router = express.Router();

router.route("/insert").post((req: Request, res: Response, next: NFunc) => {

    Materiali.findOne({code: req.body.code}, (err: any, docs:any)=>{
      if(err) return res.send(err)
      else if (docs && docs.code) return res.json({msg:"Errore", result: "Articolo già esistente"})
      else {
        let newArticle = new Materiali(req.body);
          newArticle.save((err: any) => {
            if (err) return res.json({msg:"Errore", result: err});
            else return res.json({ msg: "OK", result: "Articolo inserito correttamente",cback: newArticle });
          })
        }
        })
    });

    router.route("/update").post((req: Request, res: Response, next: NFunc) => {
        let qs = _.omit(req.body, 'realcode')
        let qm = Materiali.findOneAndUpdate({code: req.body.realcode},{$set: qs},{ new: true }).lean()
        qm.exec((err: any, docs:any)=>{
          //ricerca categoria
          let qCat = Categorie.findOne({id:docs.categ})
          qCat.exec((err,catres)=>{
            if (err) return res.send(err)
              else {
                docs.categname=catres.name
                // docs.catdet = [];
                // docs.catdet.push(catres);
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
    },
      {
      $addFields: {
        catdet: false,
        categname: {$arrayElemAt: ["$catdet.name",0]}
      }
    }
  ], (err: any, docs:any)=> {
    res.json(docs)
  })

  /*Materiali.find(qs, (err: any, docs:any)=> {
    res.json(docs)
  })*/
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

router.route("/bycode").get((req: Request, res: Response, next: NFunc) => {
  let qcode = null;
  let qs;
  //if (req.query.code !== 'null') qcode= '^'+req.query.code+'.*';
  if (req.query.code !== 'null') qcode= req.query.code;


  if(qcode){
    //qs = {code: {$regex: qcode, $options: "i"}};
    qs = {code: qcode};
  }
  Materiali.find(qs, (err: any, docs:any)=> {
    res.json(docs)
  })
})

router.route('/all').get((req: Request, res: Response, next: NFunc) => {
  let qs = Materiali.find({"totalInStore.tot":{$gt:0}}).collation({locale:'it',strength:2}).sort({name:1})
  qs.exec((err:any, docs:any)=>{
    if (err) return res.send(err)
    else return res.json(docs);
  })
});

export { router };
