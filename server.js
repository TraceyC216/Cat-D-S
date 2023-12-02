const express = require("express");
const app = express();
const port = 3000;
const foodInventory = require("./models/foods.js");
const tipsAdvice = require("./models/tips.js")
const mongoose = require("mongoose");
const methodOverride = require("method-override")
const catsController = require("./controllers/inventory.js")

//DATABASE CONNECTION
mongoose.connect(mongoUIR + "cats")
mongoose.connection.once("open", () => {
    console.log("connected to mongo")
})

//MIDDLEWARE
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(methodOverride("_method"))

//CONTROLLER FILES
app.use("/cats", catsController)


app.get("/", (req, res) => {
    res.redirect("/cats/home")
})




//======//
app.listen(port, () => {
    console.log("App is listening on " + port)
});
