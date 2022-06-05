const Label = require("../models/Label");

class LabelService {
  async delete(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const deletedLabel = await Label.findByIdAndDelete(id);
    return deletedLabel;
  }

  async update(label) {
    if (!label._id) {
      throw new Error("не указан ID");
    }
    const updatedLabel = await Label.findByIdAndUpdate(label._id, label, {
      new: true,
    });
    return updatedLabel;
  }

  async get(user) {
    const labels = await Label.find({ author: user });
    return labels;
  }

  async getOne(user, id) {
    const label = await Label.find({ author: user, _id: id });
    return label;
  }
}

module.exports = new LabelService();
