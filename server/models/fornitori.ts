import * as mongoose from "mongoose";


let Schema = mongoose.Schema;

var fornitori = new Schema({
    code: {type: String, required: true},
    name: {type: String, required: true},
    mail: {type:String},
    sconto: {type:Number, required:true},
    telefono: {type:Number},
    indirizzo: {type:String},
    note: {type:String}
}, { timestamps: true, collection: "Fornitori" });

fornitori.index({name: 'text', searchFor: 'text'});

let Fornitori = mongoose.model("fornitori", fornitori) as any;

export { Fornitori };
