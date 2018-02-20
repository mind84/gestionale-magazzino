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
    forncode: { type: String, required: true },
    categ: { type: String, required: true },
    totalInStore: {
        tot: { type: Number, default: 0 },
        date: { type: Date, default: Date.now }
    },
    price: { type: Number, required: true },
    scontoprod: { type: Number },
    prezzoforn: { type: Number },
    iva: { type: Number, required: true },
    prezzofinale: { type: Number },
    collobj: { type: Number, required: true },
    note: String,
}, { timestamps: true, collection: "Materiali" });
materiali.index({ name: 'text', searchFor: 'text' });
var Materiali = mongoose.model("materiali", materiali);
exports.Materiali = Materiali;
//# sourceMappingURL=materiali.js.map