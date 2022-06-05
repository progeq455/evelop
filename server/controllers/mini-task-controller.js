const MiniTask = require("../models/MiniTask");
const MiniTaskService = require("../services/mini-task-service");
const Task = require("../models/Task");
const Category = require("../models/Category");
const Comment = require("../models/Comment");

class MiniTaskController {
  async create(req, res) {
    try {
      const { title, description, completed, color, parent_task, category } =
        req.body;

      let par;
      let cat;

      if (parent_task) {
        par = await Task.findOne({
          author: req.user.id,
          _id: parent_task,
        });
      }

      if (category) {
        cat = await Category.findOne({
          author: req.user.id,
          _id: category,
        });
      }

      if (par) {
        const miniTask = new MiniTask({
          author: req.user.id,
          title: title,
          description: description,
          completed: completed,
          color: color,
          parent_task: parent_task,
          category: cat ? category : null,
        });
        await miniTask.save();
        res.json(miniTask);
      } else {
        res.json({ message: "Ошибка при создании подзадачи" });
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.body;

      const miniTask = await MiniTask.findOne({
        author: req.user.id,
        _id: id,
      });

      if (miniTask) {
        const deletedMiniTask = await MiniTaskService.delete(id);

        await Comment.deleteMany({ author: req.user.id, task_id: id });

        return res.json(deletedMiniTask);
      } else {
        res.json({ message: "Ошибка при удалении" });
      }
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async update(req, res) {
    try {
      const miniTask = await MiniTask.findOne({
        author: req.user.id,
        _id: req.body._id,
      });

      const par = req.body.parent_task;
      let parent;

      if (par) {
        parent = await Task.findOne({
          author: req.user.id,
          _id: req.body.parent_task,
        });
      }

      if (par && !parent) {
        return res.json({ message: "Ошибка при обновлении" });
      }

      if (miniTask) {
        const updatedMiniTask = await MiniTaskService.update(req.body);
        res.json(updatedMiniTask);
      } else {
        res.json({ message: "Ошибка при обновлении" });
      }
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async getMiniTasks(req, res) {
    try {
      const miniTasks = await MiniTaskService.get(req.user.id, req.body.id);
      res.json(miniTasks);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

module.exports = new MiniTaskController();
