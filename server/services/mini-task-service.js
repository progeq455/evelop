const MiniTask = require("../models/MiniTask");

class MiniTaskService {
  async delete(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const deletedMiniTask = await MiniTask.findByIdAndDelete(id);
    return deletedMiniTask;
  }

  async update(miniTask) {
    if (!miniTask._id) {
      throw new Error("не указан ID");
    }
    const updatedMiniTask = await MiniTask.findOneAndUpdate(
      { _id: miniTask._id },
      miniTask,
      { new: true, runValidators: true }
    );
    return updatedMiniTask;
  }

  async get(user, id) {
    const miniTasks = await MiniTask.find({author: user, parent_task: id});
    return miniTasks;
  }
}

module.exports = new MiniTaskService();
