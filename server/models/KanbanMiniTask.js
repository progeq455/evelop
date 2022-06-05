const { model, Schema, ObjectId } = require("mongoose");

const KanbanMiniTask = new Schema({
  author: { type: ObjectId, ref: "User" },
  title: { type: String, required: true, maxlength: 80 },
  description: { type: String, maxlength: 180 },
  completed: { type: Boolean, default: false, required: true },
  color: { type: Number, min: 1, max: 8 },
  parent_kanban_task: { type: ObjectId, ref: "KanbanTask", required: true },
  kanban: { type: ObjectId, ref: "Kanban", required: true },
});

module.exports = model("KanbanMiniTask", KanbanMiniTask);
