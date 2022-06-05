const Kanban = require("../models/Kanban");
const KanbanService = require("../services/kanban-service");
const KanbanTask = require("../models/KanbanTask");
const KanbanTaskMini = require("../models/KanbanMiniTask");
const Comment = require("../models/Comment");

class KanbanController {
  async create(req, res) {
    try {
      const { caption, color } = req.body;
      const kanban = new Kanban({
        author: req.user.id,
        caption: caption,
        color: color,
      });
      await kanban.save();
      res.json(kanban);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.body;

      const kanban = await Kanban.findOne({
        author: req.user.id,
        _id: id,
      });

      if (kanban) {
        const deletedKanban = await KanbanService.delete(id);

        await KanbanTask.deleteMany({ author: req.user.id, kanban: id });
        await KanbanTaskMini.deleteMany({ author: req.user.id, kanban: id });
        await Comment.deleteMany({ author: req.user.id, kanban: id });

        return res.json(deletedKanban);
      } else {
        res.json({ message: "Ошибка при удалении" });
      }
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async update(req, res) {
    try {
      const kanban = await Kanban.findOne({
        author: req.user.id,
        _id: req.body._id,
      });

      if (kanban) {
        const updatedKanban = await KanbanService.update(req.body);
        res.json(updatedKanban);
      } else {
        res.json({ message: "Ошибка при обновлении" });
      }
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async createTask(req, res) {
    try {
      const {
        title,
        description,
        completed,
        priority,
        color,
        urgency,
        date,
        kanban,
        kanban_group,
      } = req.body;

      const kan = req.body.kanban;
      let kanb;

      if (kan) {
        kanb = await Kanban.findOne({
          author: req.user.id,
          _id: req.body.kanban,
        });
      }

      if (kan && !kanb) {
        return res.json({ message: "Ошибка при создании" });
      }

      const kanbanTask = new KanbanTask({
        author: req.user.id,
        title: title,
        description: description,
        completed: completed,
        priority: priority,
        color: color,
        urgency: urgency,
        date: date,
        kanban: kanban,
        kanban_group: kanban_group,
      });
      await kanbanTask.save();
      res.json(kanbanTask);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  async updateTask(req, res) {
    try {
      const kanbanTask = await KanbanTask.findOne({
        author: req.user.id,
        _id: req.body._id,
      });

      const kan = req.body.kanban;
      let kanb;

      if (kan) {
        kanb = await Kanban.findOne({
          author: req.user.id,
          _id: req.body.kanban,
        });
      }

      if (kan && !kanb) {
        return res.json({ message: "Ошибка при обновлении" });
      }

      if (kanbanTask) {
        const updatedKanbanTask = await KanbanService.updateTask(req.body);
        res.json(updatedKanbanTask);
      } else {
        res.json({ message: "Ошибка при обновлении" });
      }
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async deleteTask(req, res) {
    try {
      const { id } = req.body;

      const kanbanTask = await KanbanTask.findOne({
        author: req.user.id,
        _id: id,
      });

      if (kanbanTask) {
        const deletedKanbanTask = await KanbanService.deleteTask(id);

        await KanbanTaskMini.deleteMany({
          author: req.user.id,
          parent_kanban_task: id,
        });
        await Comment.deleteMany({ author: req.user.id, task_id: id });

        return res.json(deletedKanbanTask);
      } else {
        res.json({ message: "Ошибка при удалении" });
      }
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async createTaskMini(req, res) {
    try {
      const {
        title,
        description,
        completed,
        color,
        parent_kanban_task,
        kanban,
      } = req.body;

      const kan = req.body.kanban;
      const parkt = req.body.parent_kanban_task;
      let kanb;
      let parentkt;

      if (kan) {
        kanb = await Kanban.findOne({
          author: req.user.id,
          _id: req.body.kanban,
        });
      }

      if (parkt) {
        parentkt = await KanbanTask.findOne({
          author: req.user.id,
          _id: req.body.parent_kanban_task,
        });
      }

      if (kan && !kanb) {
        return res.json({ message: "Ошибка при создании" });
      }

      if (parkt && !parentkt) {
        return res.json({ message: "Ошибка при создании" });
      }

      const kanbanTaskMini = new KanbanTaskMini({
        author: req.user.id,
        title: title,
        description: description,
        completed: completed,
        color: color,
        parent_kanban_task: parent_kanban_task,
        kanban: kanban,
      });
      await kanbanTaskMini.save();
      res.json(kanbanTaskMini);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  async updateTaskMini(req, res) {
    try {
      const kanbanTaskMini = await KanbanTaskMini.findOne({
        author: req.user.id,
        _id: req.body._id,
      });

      const kan = req.body.kanban;
      const parkt = req.body.parent_kanban_task;
      let kanb;
      let parentkt;

      if (kan) {
        kanb = await Kanban.findOne({
          author: req.user.id,
          _id: req.body.kanban,
        });
      }

      if (parkt) {
        parentkt = await KanbanTask.findOne({
          author: req.user.id,
          _id: req.body.parent_kanban_task,
        });
      }

      if (kan && !kanb) {
        return res.json({ message: "Ошибка при обновлении" });
      }

      if (parkt && !parentkt) {
        return res.json({ message: "Ошибка при обновлении" });
      }

      if (kanbanTaskMini) {
        const updatedKanbanTaskMini = await KanbanService.updateTaskMini(
          req.body
        );
        res.json(updatedKanbanTaskMini);
      } else {
        res.json({ message: "Ошибка при обновлении" });
      }
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async deleteTaskMini(req, res) {
    try {
      const { id } = req.body;

      const kanbanTaskMini = await KanbanTaskMini.findOne({
        author: req.user.id,
        _id: id,
      });

      if (kanbanTaskMini) {
        const deletedKanbanTaskMini = await KanbanService.deleteTaskMini(id);

        await Comment.deleteMany({ author: req.user.id, task_id: id });

        return res.json(deletedKanbanTaskMini);
      } else {
        res.json({ message: "Ошибка при удалении" });
      }
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async getKanbansList(req, res) {
    try {
      const kanbans = await KanbanService.get(req.user.id);
      res.json(kanbans);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getKanban(req, res) {
    try {
      const kanban = await KanbanService.getOne(req.user.id, req.body.id);
      res.json(kanban);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getKanbanTask(req, res) {
    try {
      const kanbanTask = await KanbanService.getTask(req.user.id, req.body.id);
      res.json(kanbanTask);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getKanbanMiniTask(req, res) {
    try {
      const kanbanMiniTask = await KanbanService.getMiniTask(
        req.user.id,
        req.body.id
      );
      res.json(kanbanMiniTask);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

module.exports = new KanbanController();
