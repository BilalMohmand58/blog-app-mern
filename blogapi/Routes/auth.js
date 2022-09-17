const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      profile: req.body.profile,
      bio: req.body.bio,
    });
    const user = await newUser.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).send("wrong credentials!");
    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).send("wrong credentials!");
    const { password, ...others } = user._doc;

    res.status(200).send(others);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
