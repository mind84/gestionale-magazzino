import { Request, Response, NextFunction as NFunc } from "express";
import * as express from "express";
import { Categorie } from "../models/categorie-articoli";
import * as _ from 'lodash'

var router = express.Router();

router.route("/insert").post((req: Request, res: Response, next: NFunc) => {
  let id;
  console.log(req.body);
  Categorie.findOne({name:req.body.name}, (err,doc)=>{
    if(err) return res.send(err)
    else if (doc && doc.name) return res.json({msg:"Errore", result: "Categoria già esistente"})
    let queryID = Categorie.find({});
    queryID.sort({id:-1})
      queryID.exec((err: any, docs:any)=>{
      if(err) return res.send(err)
      else if (docs && docs.length==0) {
        id = 0;
      }
      else {
        id = (+docs[0].id +1).toString();
      }
      req.body.id=id;
        let newCat = new Categorie(req.body);
          newCat.save((err: any) => {
            if (err) return res.json({msg:"Errore", result: err});
            else return res.json({ msg: "OK", result: "Articolo inserito correttamente",cback: newCat });
          })

        })
        })
    });

router.route("").get((req: Request, res: Response, next: NFunc) => {
  let qname = null;
  let qs;
  if (req.query.name !== 'null') qname= '.*'+req.query.name+'.*';


  if(qname){
    qs = {name: {$regex: qname, $options: "i"}};
  }
  Categorie.find(qs, (err: any, docs:any)=> {
    res.json(docs)
  })
})

router.route("/update").post((req: Request, res: Response, next: NFunc) => {
    let qs = _.omit(req.body, 'id')
    Categorie.findOneAndUpdate({id: req.body.id},{$set: qs},{ new: true }, (err: any, docs:any)=>{
      if(err) return res.send(err)
      else return res.json({ msg: "OK", result: "Categoria modificata correttamente",cback: docs });
        })
    });

export { router };
