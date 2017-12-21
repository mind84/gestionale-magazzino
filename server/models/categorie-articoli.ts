import * as mongoose from "mongoose";


let Schema = mongoose.Schema;

var categorie = new Schema({
    id: {type: String, required: true},
    searchFor: {type: Array, default: []},
    name: {type: String, required: true},
    descr: {type: String, required: true}
}, { timestamps: true, collection: "CategorieArticoli" });

categorie.index({name: 'text', searchFor: 'text'});
categorie.index({name:1})

let Categorie = mongoose.model("categorie", categorie) as any;

export { Categorie };
