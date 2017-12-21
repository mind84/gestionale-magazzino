import { Request, Response, NextFunction as NFunc } from "express";
import * as express from "express";
import { UMisura } from "../models/umisura";

var router = express.Router();

router.route("/insert").post((req: Request, res: Response, next: NFunc) => {
  let id;
  UMisura.findOne({umsymb:req.body.umsymb}, (err,doc)=>{
    if(err) return res.send(err)
    else if (doc && doc.umsymb) return res.json({msg:"Errore", result: "Unità di misura già esistente"})
    let queryID = UMisura.find({});
    queryID.nor({class:"mainReference"}).sort({id:-1})
      queryID.exec((err: any, docs:any)=>{
      if(err) return res.send(err)
      else if (docs && docs.length==0) {
        id = 0;
      }
      else {
        id = (+docs[0].id +1).toString();
      }
      req.body.id=id;
        let newUM = new UMisura(req.body);
          newUM.save((err: any) => {
            if (err) return res.json({msg:"Errore", result: err});
            else return res.json({ msg: "OK", result: "Unità di misura inserita correttamente",cback: newUM });
          })

        })
        })
    });

router.route("").get((req: Request, res: Response, next: NFunc) => {
  UMisura.find({}, (err: any, docs:any)=> {
    res.json(docs)
  })
})

router.route("/code").get((req: Request, res: Response, next: NFunc) => {
  UMisura.find({id:req.query.code}, (err: any, docs:any)=> {
    res.json(docs)
  })
})

export { router };
