"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var materiali = new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    searchFor: { type: Array, default: [] },
    qta: { type: Number, required: true },
    umId: { type: String, required: true },
    fornitore: { type: String, required: true },
    categ: { type: String, required: true },
    price: { type: Number, required: true },
    collobj: { type: Number, required: true },
    note: String
}, { timestamps: true, collection: "Materiali" });
materiali.index({ name: 'text', searchFor: 'text' });
var Materiali = mongoose.model("materiali", materiali);
exports.Materiali = Materiali;
//# sourceMappingURL=materiali.js.map