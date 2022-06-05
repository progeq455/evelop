const Comment = require("../models/Comment");
const CommentService = require("../services/comment-service");
const Task = require("../models/Task");
const Kanban = require("../models/Kanban");
const Category = require("../models/Category");

class CommentController {
  async create(req, res) {
    try {
      const { content, task_id, kanban, category } = req.body;

      let task;
      let kan;
      let cat;

      task = await Task.findOne({
        author: req.user.id,
        _id: task_id,
      });

      if (kanban) {
        kan = await Kanban.findOne({
          author: req.user.id,
          _id: kanban,
        });
      }

      if (category) {
        cat = await Category.findOne({
          author: req.user.id,
          _id: category,
        });
      }

      if (task) {
        const comment = new Comment({
          author: req.user.id,
          content: content,
          task_id: task_id,
          kanban: kan ? kanban : null,
          category: cat ? category : null,
        });
        await comment.save();
        return res.json(comment);
      } else {
        res.json({ message: "Ошибка при создании комментария" });
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.body;

      const comment = await Comment.findOne({
        author: req.user.id,
        _id: id,
      });

      if (comment) {
        const deletedComment = await CommentService.delete(id);
        return res.json(deletedComment);
      } else {
        res.json({ message: "Ошибка при удалении" });
      }
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async getComment(req, res) {
    try {
      const comment = await CommentService.getOne(req.user.id, req.body.task);
      res.json(comment);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

module.exports = new CommentController();
