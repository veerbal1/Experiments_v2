const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isCompleted:{
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("Todo", TodoSchema);
