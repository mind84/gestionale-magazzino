import * as mongoose from "mongoose";


let Schema = mongoose.Schema;

var umisura = new Schema({
    id: {type: String, required: true},
    refId: {type: String, required: true},
    searchFor: {type: Array, default: []},
    umdesc: {type: String, required: true},
    umsymb: {type: String, required: true},
    conversione:{type: Number, required: true}
}, { timestamps: true, collection: "UMisura" });

umisura.index({name: 'text', searchFor: 'text'});

let UMisura = mongoose.model("umisura", umisura) as any;

export { UMisura };
