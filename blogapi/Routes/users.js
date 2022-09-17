const router = require("express").Router();
const User = require("../Models/User");
const Post = require("../Models/Post");

const bcrypt = require("bcrypt");

// Update
router.put("/:id", async (req, res) => {
  if (req.body.userID === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).send(updatedUser);
    } catch (err) {
      res.status(500).send(err.message);
    }
  } else {
    res.status(403).send("access denied!");
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  if (req.body.userID === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("user has been deleted!");
      } catch (err) {
        res.status(500).send(err.message);
      }
    } catch (err) {
      res.status(403).send("user not found!");
    }
  } else {
    res.status(403).send("access denied!");
  }
});

// Get User

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).send(others);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
