const mongoose = require("mongoose")

const adviceSchema = new mongoose.Schema({
    tip: {type: String,},
    likes: {type:Number, min: 0}
}, {timestamps: true})

const Advice = mongoose.model("Advice", adviceSchema)
module.exports = Advice;