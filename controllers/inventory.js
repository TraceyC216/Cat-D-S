const express = require("express")
const router = express.Router()
const Inventory = require("../models/inventory.js")
const Advice = require("../models/advice.js")

//INDEX

router.get("/", (req,res) => {
    Inventory.find({}, (err, allInventory) => {
        res.render("index.ejs", {
            meals:allInventory
        })
    })
});

router.get("/advice", (req, res) => {
    Advice.find({}, (err, allAdvice ) => {
        res.render("index_a.ejs", {
            ideas:allAdvice
        })
    })
   
})

//NEW
router.get("/new", (req, res) => {
    res.render("new.ejs")
})

//NEW ADVICE
router.get("/new_a", (req, res) => {
    res.render("new_a.ejs")
})

//HOME
router.get("/home", (req, res) => {
    res.render("home.ejs")
})


//DELETE
router.delete("/:id", (req, res) => {
    Inventory.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect("/cats")
    })
})

//UPDATE
router.put("/:id", (req, res) =>{
    Inventory.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedInventory) => {
        res.redirect("/cats")
    })
})

//UPDATE ADVICE
router.put("/:id", (req, res) => {
    Advice.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedAdvice) => {
        res.redirect("/cats/advice")
    })
})


//CREATE
router.post("/", (req, res) => {
    Inventory.create(req.body, (err, createdInventory) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.redirect("/cats")
        }
    })
})

//CREATE ADVICE
router.post("/advice", (req, res) => {
    Advice.create(req.body, (err, createdAdvice) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.redirect("/cats/advice")
        }
    })
} )

//EDIT
router.get("/:id/edit", (req, res) => {
    Inventory.findById(req.params.id, (err, foundInventory) => {
        res.render("edit.ejs", {inventory:foundInventory})
    })
})

//EDIT ADVICE
router.get("/:id/edit_a", (req, res) => {
    Inventory.findById(req.params.id, (err, foundInventory) => {
        res.render("edit_a.ejs", {inventory:foundInventory})
    })
})

//SHOW
router.get("/:id", (req, res) => {
    Inventory.findById(req.params.id, (err, foundInventory) => {
        res.render("show.ejs", {
            inventory:foundInventory
        })
    })
 })

//LIKES
router.put("/:id/likes", (req, res) => {
    Inventory.findByIdAndUpdate(
        req.params.id,
        {$inc: {likes: +1}},
        (err, data) => {
            res.redirect("/cats/" + req.params.id);
        }
    )
})

module.exports = router;
