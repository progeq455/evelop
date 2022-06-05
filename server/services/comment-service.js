const Comment = require("../models/Comment");

class CommentService {
  async delete(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const deletedComment = await Comment.findByIdAndDelete(id);
    return deletedComment;
  }

  async getOne(user, id) {
    const comment = await Comment.find({ author: user, task_id: id });
    return comment;
  }
}

module.exports = new CommentService();
