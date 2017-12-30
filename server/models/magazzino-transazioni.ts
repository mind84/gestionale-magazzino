import * as mongoose from "mongoose";


let Schema = mongoose.Schema;

var transazioni = new Schema({
    refId: {type: String, required: true},
    dateTime: {type: Date, required:true, default:Date.now},
    operation:{type:Number, required:true},
    reason:{type: String},
    note:{type:String}

}, { timestamps: true, collection: "Transazioni" });

transazioni.index({dateTime: 1});
transazioni.index({name:1})

let Transazioni = mongoose.model("categorie", transazioni) as any;

export { Transazioni };
