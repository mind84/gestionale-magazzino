import * as mongoose from "mongoose";


let Schema = mongoose.Schema;

var materiali = new Schema({
    code: {type: String, required: true},
    name: {type: String, required: true},
    searchFor: {type: Array, default: []},
    qta: {type:Number, required:true},
    umId: {type:String, required:true},
    fornitore: {type: String, required: true},
    categ: {type:String, required:true},
    totalInStore: {
      tot: {type:Number, default:0},
      date: {type:Date, default:Date.now}
    },
    price: {type: Number, required: true},
    collobj:{type: Number, required: true},
    note: String,
}, { timestamps: true, collection: "Materiali" });
materiali.index({name: 'text', searchFor: 'text'});
let Materiali = mongoose.model("materiali", materiali) as any;

export { Materiali };
