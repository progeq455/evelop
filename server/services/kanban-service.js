const Kanban = require("../models/Kanban");
const KanbanTask = require("../models/KanbanTask");
const KanbanTaskMini = require("../models/KanbanMiniTask");

class KanbanService {
  async delete(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const deletedKanban = await Kanban.findByIdAndDelete(id);
    return deletedKanban;
  }

  async deleteTask(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const deletedKanbanTask = await KanbanTask.findByIdAndDelete(id);
    return deletedKanbanTask;
  }

  async deleteTaskMini(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const deletedKanbanTaskMini = await KanbanTaskMini.findByIdAndDelete(id);
    return deletedKanbanTaskMini;
  }

  async update(kanban) {
    if (!kanban._id) {
      throw new Error("не указан ID");
    }
    const updatedKanban = await Kanban.findOneAndUpdate(
      { _id: kanban._id },
      kanban,
      {
        new: true,
        runValidators: true,
      }
    );
    return updatedKanban;
  }

  async updateTask(kanbanTask) {
    if (!kanbanTask._id) {
      throw new Error("не указан ID");
    }
    const updatedKanbanTask = await KanbanTask.findOneAndUpdate(
      { _id: kanbanTask._id },
      kanbanTask,
      { new: true, runValidators: true }
    );
    return updatedKanbanTask;
  }

  async updateTaskMini(kanbanTaskMini) {
    if (!kanbanTaskMini._id) {
      throw new Error("не указан ID");
    }
    const updatedKanbanTaskMini = await KanbanTaskMini.findOneAndUpdate(
      { _id: kanbanTaskMini._id },
      kanbanTaskMini,
      { new: true, runValidators: true }
    );
    return updatedKanbanTaskMini;
  }

  async get(user) {
    const kanbans = await Kanban.find({ author: user });
    return kanbans;
  }

  async getOne(user, id) {
    const kanban = await Kanban.find({ author: user, _id: id });
    return kanban;
  }

  async getTask(user, id) {
    const kanbanTask = await KanbanTask.find({ author: user, _id: id });
    return kanbanTask;
  }

  async getMiniTask(user, id) {
    const kanbanMiniTask = await KanbanTaskMini.find({ author: user, parent_kanban_task: id });
    return kanbanMiniTask;
  }
}

module.exports = new KanbanService();
