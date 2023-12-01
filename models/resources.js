const mongoose = require('mongoose');

const resourcesSchema = new mongoose.Schema({
   name: {type: String, required: true},
   webAddress: {type: String},
   description: {type: String} 
}, {timestamps: true})

const Inventory = mongoose.model('Resources', resourcesSchema);

module.exports = Resources