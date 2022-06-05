const Task = require("../models/Task");
const TaskService = require("../services/task-service");
const Label = require("../models/Label");
const Category = require("../models/Category");
const MiniTask = require("../models/MiniTask");
const Comment = require("../models/Comment");

class TaskController {
  async create(req, res) {
    try {
      const {
        title,
        description,
        completed,
        priority,
        color,
        label,
        urgency,
        category,
        date,
      } = req.body;

      let lab;
      let cat;

      if (label) {
        lab = await Label.findOne({
          author: req.user.id,
          _id: label,
        });
      }

      if (category) {
        cat = await Category.findOne({
          author: req.user.id,
          _id: category,
        });
      }

      const task = new Task({
        author: req.user.id,
        title: title,
        description: description,
        completed: completed,
        priority: priority,
        color: color,
        label: lab ? label : null,
        urgency: urgency,
        category: cat ? category : null,
        date: date,
      });

      await task.save();
      res.json(task);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.body;

      const task = await Task.findOne({
        author: req.user.id,
        _id: id,
      });

      if (task) {
        const deletedTask = await TaskService.delete(id);

        await MiniTask.deleteMany({ author: req.user.id, parent_task: id });
        await Comment.deleteMany({ author: req.user.id, task_id: id });
        await Category.updateMany(
          { author: req.user.id, pinned_task: id },
          { $set: { pinned_task: null } }
        );

        return res.json(deletedTask);
      } else {
        res.json({ message: "Ошибка при удалении" });
      }
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async update(req, res) {
    try {
      const task = await Task.findOne({
        author: req.user.id,
        _id: req.body._id,
      });

      const lab = req.body.label;
      const cat = req.body.category;
      let labl;
      let catg;

      if (lab) {
        labl = await Label.findOne({
          author: req.user.id,
          _id: req.body.label,
        });
      }

      if (cat) {
        catg = await Category.findOne({
          author: req.user.id,
          _id: req.body.category,
        });
      }

      if (lab && !labl) {
        return res.json({ message: "Ошибка при обновлении" });
      }

      if (cat && !catg) {
        return res.json({ message: "Ошибка при обновлении" });
      }

      if (task) {
        const updatedTask = await TaskService.update(req.body);
        res.json(updatedTask);
      } else {
        res.json({ message: "Ошибка при обновлении" });
      }
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async getAllTasks(req, res) {
    try {
      const { sort } = req.query;
      const tasks = await TaskService.getAll(req.user.id, sort);
      res.json(tasks);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getTask(req, res) {
    try {
      const task = await TaskService.getTask(req.user.id, req.body.id);
      res.json(task);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getDayTasks(req, res) {
    try {
      const { sort } = req.query;
      const tasks = await TaskService.getDayT(req.user.id, req.body.date, sort);
      res.json(tasks);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getLaterTasks(req, res) {
    try {
      const tasks = await TaskService.getLaterT(
        req.user.id,
        req.body.date,
        req.body.type
      );
      res.json(tasks);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getTasksWithLabel(req, res) {
    try {
      const tasksWithLabel = await TaskService.getTasksWithL(
        req.user.id,
        req.body.id
      );
      res.json(tasksWithLabel);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getTasksFromCategory(req, res) {
    try {
      const { sort } = req.query;
      const tasksCategory = await TaskService.getTasksFromC(
        req.user.id,
        req.body.id,
        sort
      );
      res.json(tasksCategory);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getTasksFromKanban(req, res) {
    try {
      const tasksKanban = await TaskService.getTasksFromK(
        req.user.id,
        req.body.id
      );
      res.json(tasksKanban);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async searchTask(req, res) {
    try {
      const searchName = req.query.q;
      let tasks = await Task.find({ user: req.user.id });
      tasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchName.toLowerCase())
      );
      return res.json(tasks);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Ошибка поиска" });
    }
  }

  async deleteOverdueTask(req, res) {
    try {
      const { id } = req.body;
      const { date } = req.body;

      const task = await Task.findOne({
        author: req.user.id,
        _id: id,
        date: { $lt: new Date(date) },
      });
  
      if (task) {
        const deletedTask = await TaskService.deleteOverdue(id);

        await MiniTask.deleteMany({ author: req.user.id, parent_task: id });
        await Comment.deleteMany({ author: req.user.id, task_id: id });
        await Category.updateMany(
          { author: req.user.id, pinned_task: id },
          { $set: { pinned_task: null } }
        );

        return res.json(deletedTask);
      } else {
        res.json({ message: "Ошибка при удалении" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Ошибка при удалении" });
    }
  }
}

module.exports = new TaskController();
