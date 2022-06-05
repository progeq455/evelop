const { model, Schema, ObjectId } = require("mongoose");

const Task = new Schema({
  author: { type: ObjectId, ref: "User" },
  title: { type: String, required: true, maxlength: 80 },
  description: { type: String, maxlength: 180 },
  completed: { type: Boolean, default: false, required: true },
  priority: { type: Number, min: 1, max: 3 },
  color: { type: Number, min: 1, max: 8 },
  label: { type: ObjectId, ref: "Label" },
  urgency: { type: Number, min: 1, max: 3 },
  category: { type: ObjectId, ref: "Category" },
  date: { type: Date },
});

module.exports = model("Task", Task);
