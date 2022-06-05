const Category = require("../models/Category");
const CategoryService = require("../services/category-service");
const Task = require("../models/Task");
const MiniTask = require("../models/MiniTask");
const Comment = require("../models/Comment");

class CategoryController {
  async create(req, res) {
    try {
      const { caption, description, color, pinned_task } = req.body;

      let pint;

      if (pinned_task) {
        pint = await Task.findOne({
          author: req.user.id,
          _id: pinned_task,
        });
      }

      const category = new Category({
        author: req.user.id,
        caption: caption,
        description: description,
        color: color,
        pinned_task: pint ? pinned_task : null,
      });
      await category.save();
      res.json(category);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.body;

      const category = await Category.findOne({
        author: req.user.id,
        _id: id,
      });

      if (category) {
        const deletedCategory = await CategoryService.delete(id);
        await Task.deleteMany({ author: req.user.id, category: id });
        await MiniTask.deleteMany({ author: req.user.id, category: id });
        await Comment.deleteMany({ author: req.user.id, category: id });

        return res.json(deletedCategory);
      } else {
        res.json({ message: "Ошибка при удалении" });
      }
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async update(req, res) {
    try {
      const category = await Category.findOne({
        author: req.user.id,
        _id: req.body._id,
      });

      const pint = req.body.pinned_task;
      let pinned;

      if (pint) {
        pinned = await Task.findOne({
          author: req.user.id,
          _id: req.body.pinned_task,
        });
      }

      if (pint && !pinned) {
        return res.json({ message: "Ошибка при обновлении" });
      }

      if (category) {
        const updatedCategory = await CategoryService.update(req.body);
        res.json(updatedCategory);
      } else {
        res.json({ message: "Ошибка при обновлении" });
      }
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async getCategoriesList(req, res) {
    try {
      const categories = await CategoryService.getAll(req.user.id);
      res.json(categories);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getCategory(req, res) {
    try {
      const category = await CategoryService.getOne(req.user.id, req.body.id);
      res.json(category);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

module.exports = new CategoryController();
