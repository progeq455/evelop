const { model, Schema, ObjectId } = require("mongoose");

const MiniTask = new Schema({
  author: { type: ObjectId, ref: "User" },
  title: { type: String, required: true, maxlength: 50 },
  description: { type: String, maxlength: 100 },
  completed: { type: Boolean, default: false, required: true },
  color: { type: Number, min: 1, max: 8 },
  parent_task: { type: ObjectId, ref: "Task", required: true },
  category: { type: ObjectId, ref: "Category" },
});

module.exports = model("MiniTask", MiniTask);
