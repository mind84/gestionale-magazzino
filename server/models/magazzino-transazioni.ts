import * as mongoose from "mongoose";


let Schema = mongoose.Schema;

var transazioni = new Schema({
    refId: {type: String, required: true},
    dateTime: {type: Date, required:true},
    operation:{type:String, required:true},
    quantity: {type:Number, required:true},
    reason:{type: String, required:true},
    ordernum: {type:String},
    note:{type:String, default:""}

}, { timestamps: true, collection: "Transazioni" });

transazioni.index({dateTime: 1});
transazioni.index({name:1})

let Transazioni = mongoose.model("transazioni", transazioni) as any;

export { Transazioni };
