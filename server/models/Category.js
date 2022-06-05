const { model, Schema, ObjectId } = require("mongoose");

const Category = new Schema({
  author: { type: ObjectId, ref: "User" },
  caption: { type: String, required: true, maxlength: 50 },
  description: { type: String, maxlength: 150 },
  color: { type: Number, min: 1, max: 8 },
  pinned_task: { type: ObjectId, ref: "Task" },
});

module.exports = model("Category", Category);
