import { Request, Response, NextFunction as NFunc } from "express";
import * as express from "express";
import { Materiali } from "../models/materiali";
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
        Materiali.findOneAndUpdate({code: req.body.realcode},{$set: qs},{ new: true }, (err: any, docs:any)=>{
          if(err) return res.send(err)
          else return res.json({ msg: "OK", result: "Articolo modificato correttamente",cback: docs });
            })
        });

router.route("").get((req: Request, res: Response, next: NFunc) => {
  var ObjectId = require('mongoose').Types.ObjectId;
  let qname = null;
  let qcode = null;
  let qs;
  if (req.query.name !== 'null') qname= '.*'+req.query.name+'.*';
  if (req.query.code !== 'null') qcode= '.*'+req.query.code+'.*';

  if (qname && qcode) {
    qs= {$and:[{name: {$regex: qname, $options: "i"}}, {code: {$regex: qcode, $options:"i"}}]}
  }
  else if(qname && !qcode){
    qs = {name: {$regex: qname, $options: "i"}};
  }
  else if(!qname && qcode){
    qs = {code: {$regex: qcode, $options: "i"}};
  }
  Materiali.find(qs, (err: any, docs:any)=> {
    res.json(docs)
  })
})
export { router };
