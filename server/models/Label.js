const { model, Schema, ObjectId } = require("mongoose");

const Label = new Schema({
  author: { type: ObjectId, ref: "User" },
  title: { type: String, required: true, maxlength: 50 },
});

module.exports = model("Label", Label);
