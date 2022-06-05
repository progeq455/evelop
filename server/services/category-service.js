const Category = require("../models/Category");
const Task = require("../models/Task");

class CategoryService {
  async delete(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const deletedCategory = await Category.findByIdAndDelete(id);
    return deletedCategory;
  }

  async update(category) {
    if (!category._id) {
      throw new Error("не указан ID");
    }
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: category._id },
      category,
      { new: true, runValidators: true }
    );
    return updatedCategory;
  }

  async getAll(user) {
    const categories = await Category.find({ author: user });
    return categories;
  }

  async getOne(user, id) {
    const category = await Category.find({ author: user, _id: id });
    return category;
  }
}

module.exports = new CategoryService();
