import * as mongoose from "mongoose";


let Schema = mongoose.Schema;

var materiali = new Schema({
    code: {type: String, required: true},
    name: {type: String, required: true},
    searchFor: {type: Array, default: []},
    fornitore: {type: String, required: true},
    price: {type: Number, required: true},
    collobj:{type: Number, required: true},
    note: String
}, { timestamps: true, collection: "Materiali" });
materiali.index({name: 'text', searchFor: 'text'});
let Materiali = mongoose.model("materiali", materiali) as any;

export { Materiali };
