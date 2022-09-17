const router = require("express").Router();
const User = require("../Models/User");
const Post = require("../Models/Post");
const Category = require("../Models/Category");

// create category
router.post("/", async (req, res) => {
  try {
    const newCategory = await new Category({
      name: req.body.name,
    });
    const category = await newCategory.save();
    res.status(200).send(category);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// get category
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) res.status(404).send("category not found!");
    res.status(200).send(category);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// get all category
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({});
    if (!categories) res.status(404).send("no category found!");
    res.status(200).send(categories);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
