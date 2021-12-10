const express = require("express");
const app = express();
const todoRouter = require("./routes/todo.js");
const mongoose = require("mongoose");
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/todos", todoRouter);

app.get("/", (req, res) => {
  res.send("Home page");
});

// Connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const server = app.listen(4000, () => {
  console.log("Listening on port %s...", server.address().port);
  console.log(`URL : http://localhost:${server.address().port}`);
  console.log("Press Ctrl+C to quit.");
});
