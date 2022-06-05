const Task = require("../models/Task");
const KanbanTask = require("../models/KanbanTask");

class TaskService {
  async delete(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const deletedTask = await Task.findByIdAndDelete(id);
    return deletedTask;
  }

  async update(task) {
    if (!task._id) {
      throw new Error("не указан ID");
    }
    const updatedTask = await Task.findOneAndUpdate({ _id: task._id }, task, {
      new: true,
      runValidators: true,
    });
    return updatedTask;
  }

  async getAll(user, sort) {
    let tasks;
    switch (sort) {
      case "priority":
        tasks = await Task.find({ author: user, category: null }).sort({
          priority: 1,
        });
        break;

      case "completed":
        tasks = await Task.find({ author: user, category: null }).sort({
          completed: -1,
        });
        break;

      case "nocompleted":
        tasks = await Task.find({ author: user, category: null }).sort({
          completed: 1,
        });
        break;

      default:
        tasks = await Task.find({ author: user, category: null }).sort({
          date: 1,
        });
        break;
    }
    return tasks;
  }

  async getTask(user, id) {
    const task = await Task.find({ author: user, _id: id });
    return task;
  }

  async getTasksWithL(user, id) {
    const tasks = await Task.find({ author: user, label: id });
    return tasks;
  }

  async getTasksFromC(user, id, sort) {
    let tasks;
    switch (sort) {
      case "priority":
        tasks = await Task.find({ author: user, category: id }).sort({
          priority: 1,
        });
        break;

      case "completed":
        tasks = await Task.find({ author: user, category: id }).sort({
          completed: -1,
        });
        break;

      case "nocompleted":
        tasks = await Task.find({ author: user, category: id }).sort({
          completed: 1,
        });
        break;

      default:
        tasks = await Task.find({ author: user, category: id }).sort({
          date: 1,
        });
        break;
    }
    return tasks;
  }

  async getTasksFromK(user, id) {
    const tasks = await KanbanTask.find({ author: user, kanban: id }).sort({
      kanban_group: 1,
    });
    return tasks;
  }

  async getDayT(user, date, sort) {
    let tasks;
    switch (sort) {
      case "priority":
        tasks = await Task.find({ author: user, date: date }).sort({
          priority: 1,
        });
        break;

      case "completed":
        tasks = await Task.find({ author: user, date: date }).sort({
          completed: -1,
        });
        break;

      case "nocompleted":
        tasks = await Task.find({ author: user, date: date }).sort({
          completed: 1,
        });
        break;

      case "overdue":
        let today = date;
        tasks = await Task.find({
          author: user,
          date: { $lt: new Date(today) },
          completed: false,
        });
        break;

      default:
        tasks = await Task.find({ author: user, date: date }).sort({
          date: 1,
        });
        break;
    }
    return tasks;
  }

  async getLaterT(user, date, type) {
    let tasks;
    switch (type) {
      case "week":
        function addDays(date, days) {
          var result = new Date(date);
          result.setDate(result.getDate() + days);
          result = `${result.getFullYear()}-${
            result.getMonth() + 1
          }-${result.getDate()}`;
          return result;
        }

        let today = date;
        let lastDayWeek = addDays(today, 6);

        tasks = await Task.find({
          author: user,
          date: { $gte: new Date(today), $lte: new Date(lastDayWeek) },
        }).sort({
          date: 1,
        });
        break;

      case "overdue":
        tasks = await Task.find({
          author: user,
          date: { $lt: new Date(date) },
          completed: false,
        });
        break;

      default:
        tasks = await Task.find({
          author: user,
          date: { $gte: new Date(date) },
        }).sort({
          date: 1,
        });
        break;
    }
    return tasks;
  }

  async deleteOverdue(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const deletedTask = await Task.findByIdAndDelete(id);
    return deletedTask;
  }
}

module.exports = new TaskService();
