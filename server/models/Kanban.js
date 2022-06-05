const { model, Schema, ObjectId } = require("mongoose");

const Kanban = new Schema({
  author: { type: ObjectId, ref: "User" },
  caption: { type: String, required: true, maxlength: 50 },
  color: { type: Number, min: 1, max: 8 },
});

module.exports = model("Kanban", Kanban);
