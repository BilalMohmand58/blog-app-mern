const router = require("express").Router();
const User = require("../Models/User");
const Post = require("../Models/Post");

// Create Post

router.post("/", async (req, res) => {
  try {
    const newPost = await Post({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      username: req.body.username,
      categories: req.body.categories,
    });
    const post = await newPost.save();
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedPost);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete Post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).send("post deleted!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get Post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) res.status(400).send("no post found");

    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all posts

router.get("/", async (req, res) => {
  const username = req.query.username;
  const category = req.query.category;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (category) {
      posts = await Post.find({
        categories: {
          $in: [category],
        },
      });
    } else {
      posts = await Post.find({});
    }
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
