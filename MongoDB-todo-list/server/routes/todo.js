const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

router.get("/", (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) {
      res.send(err);
    }
    res.json(todos);
  });
});

// post
router.post("/", (req, res) => {
  const todo = new Todo({
    todo: req.body.todo,
  });
  todo
    .save()
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => {
      res.json(err);
    });
  console.log(req.body);
});

module.exports = router;
