const { model, Schema, ObjectId } = require("mongoose");

const KanbanTask = new Schema({
  author: { type: ObjectId, ref: "User" },
  title: { type: String, required: true, maxlength: 80 },
  description: { type: String, maxlength: 180 },
  completed: { type: Boolean, default: false, required: true },
  priority: { type: Number, min: 1, max: 3 },
  color: { type: Number, min: 1, max: 8 },
  urgency: { type: Number, min: 1, max: 3 },
  date: { type: Date },
  kanban: { type: ObjectId, ref: "Kanban", required: true },
  kanban_group: { type: Number, min: 1, max: 3, required: true },
});

module.exports = model("KanbanTask", KanbanTask);
