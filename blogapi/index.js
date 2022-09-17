const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./Routes/auth");
const userRoute = require("./Routes/users");
const postRoute = require("./Routes/posts");
const categoryRoute = require("./Routes/categories");
const cors = require("cors");

const app = express();

dotenv.config();
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((err) => {
    console.log(err.message);
  });

// routes
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// static files

app.use(express.static(path.join(__dirname, "/blogfrontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/blogfrontend/build", "index.html"));
});

// server connection
app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
