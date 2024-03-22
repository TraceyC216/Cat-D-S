const express = require("express");
const router = express.Router();
const Inventory = require("../models/inventory.js");
const Advice = require("../models/advice.js");
const Resources = require("../models/resources.js");

//INDEX

router.get("/", async (req, res) => {
  try {
    const allInventory = await Inventory.find({});

    return res.render("index.ejs", {
      meals: allInventory,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/advice", async (req, res) => {
  try {
    const allAdvice = await Advice.find({});

    return res.render("index_a.ejs", {
      ideas: allAdvice,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/resources", async (req, res) => {
    try {
  const allResources = await Resources.find({}); 
    return res.render("index_r.ejs", {
      help: allResources,
    });
} catch (error) {
    console.log(error);
}
});

//NEW
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

//NEW ADVICE
router.get("/new_a", (req, res) => {
  res.render("new_a.ejs");
});

//NEW RESOURCE
router.get("/new_r", (req, res) => {
  res.render("new_r.ejs");
});

//HOME
router.get("/home", (req, res) => {
  res.render("home.ejs");
});

//DELETE
router.delete("/:id", (req, res) => {
  Inventory.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/cats");
  });
});

//UPDATE
router.put("/:id", (req, res) => {
  Inventory.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedInventory) => {
      res.redirect("/cats");
    }
  );
});

//UPDATE ADVICE
router.put("/:id", (req, res) => {
  Advice.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedAdvice) => {
      res.redirect("/cats/advice");
    }
  );
});

//UPDATE RESOURCES
router.put("/:id", (req, res) => {
  Resources.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedResources) => {
      res.redirect("/cats/resources");
    }
  );
});

//CREATE
router.post("/", (req, res) => {
  Inventory.create(req.body, (err, createdInventory) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.redirect("/cats");
    }
  });
});

//CREATE ADVICE
router.post("/advice", (req, res) => {
  Advice.create(req.body, (err, createdAdvice) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.redirect("/cats/advice");
    }
  });
});

//CREATE RESOURCE
router.post("/resources", (req, res) => {
  Resources.create(req.body, (err, createdResources) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.redirect("/cats/resources");
    }
  });
});

//EDIT
router.get("/:id/edit", (req, res) => {
  Inventory.findById(req.params.id, (err, foundInventory) => {
    res.render("edit.ejs", { inventory: foundInventory });
  });
});

//EDIT ADVICE
router.get("/:id/edit_a", (req, res) => {
  Advice.findById(req.params.id, (err, foundAdvice) => {
    res.render("edit_a.ejs", { advice: foundAdvice });
  });
});

//EDIT ADVICE
router.get("/:id/edit_r", (req, res) => {
  Resources.findById(req.params.id, (err, foundResources) => {
    res.render("/edit_r.ejs", { resources: foundResources });
  });
});

//SHOW
router.get("/:id", (req, res) => {
  Inventory.findById(req.params.id, (err, foundInventory) => {
    res.render("show.ejs", {
      inventory: foundInventory,
    });
  });
});

//LIKES
router.put("/:id/likes", (req, res) => {
  Inventory.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: +1 } },
    (err, data) => {
      res.redirect("/cats/" + req.params.id);
    }
  );
});

module.exports = router;
