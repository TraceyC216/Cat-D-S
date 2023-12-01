const mongoose = require("mongoose")

const inventorySchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    img: {type: String},
    price: {type: Number, min:0},
    review: {type: String},
    likes: {type:Number, min: 0}
}, {timestamps: true})

const Inventory = mongoose.model("Inventory", inventorySchema)
module.exports = Inventory;