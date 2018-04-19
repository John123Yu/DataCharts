"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var dataSchema = new mongoose.Schema({
    name: String,
    data_object: Object,
    data_list: Object
});
var Data = mongoose.model('Data', dataSchema);
exports.default = Data;
//# sourceMappingURL=data.js.map