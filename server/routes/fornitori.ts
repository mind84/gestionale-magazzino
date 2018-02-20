import { Request, Response, NextFunction as NFunc } from "express";
import * as express from "express";
import { Fornitori } from "../models/fornitori";
import * as shortid from 'shortid'
import * as _ from 'lodash'

var router = express.Router();

router.route("/insert").post((req: Request, res: Response, next: NFunc) => {
  let id;
  Fornitori.findOne({name:req.body.name}, (err,doc)=>{
    if(err) return res.send(err)
    else if (doc && doc.name) return res.json({msg:"Errore", result: "Categoria già esistente"})
      let code = shortid.generate()
      let insert= Object.assign({}, req.body)
      insert.code=code;
        let newForn = new Fornitori(insert);
          newForn.save((err: any) => {
            if (err) return res.json({msg:"Errore", result: err});
            else return res.json({ msg: "OK", result: "Fornitore inserito correttamente",cback: newForn });
          })


        })

});

router.route("/update").post((req: Request, res: Response, next: NFunc) => {
  let qs = _.omit(req.body, 'id')
  let updquery = Fornitori.findOneAndUpdate({id: req.body.id},{$set: qs},{ new: true })
  //controllo su campo specifico name
  if (req.body.name) {
  //controllo se esiste già la categoria con lo stesso NOME
    Fornitori.find({name: req.body.name}).exec((err:any, find:any)=>{
      if (find && find.length) return res.json({msg:"Errore", result: "Fornitore già esistente"});
      else updquery.exec((err: any, docs:any)=>{
            if(err) return res.send(err)
            else return res.json({ msg: "OK", result: "Fornitore modificato correttamente",cback: docs });
              })
    })
  }
  else updquery.exec((err: any, docs:any)=>{
    if(err) return res.send(err)
    else return res.json({ msg: "OK", result: "Fornitore modificato correttamente",cback: docs });
      })

});

router.route("").get((req: Request, res: Response, next: NFunc) => {
  let qname = null;
  let qs;
  if (req.query.name !== 'null') qname= '.*'+req.query.name+'.*';


  if(qname){
    qs = {name: {$regex: qname, $options: "i"}};
  }
  Fornitori.find(qs, (err: any, docs:any)=> {
    res.json(docs)
  })
})


export { router };
