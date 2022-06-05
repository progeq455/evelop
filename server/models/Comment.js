const { model, Schema, ObjectId } = require("mongoose");

const Comment = new Schema({
  author: { type: ObjectId, ref: "User" },
  content: { type: String, required: true, maxlength: 150 },
  task_id: { type: ObjectId, ref: "Task", required: true },
  kanban: { type: ObjectId, ref: "Kanban" },
  category: { type: ObjectId, ref: "Category" },
});

module.exports = model("Comment", Comment);
