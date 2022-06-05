const Label = require("../models/Label");
const LabelService = require("../services/label-service");
const Task = require("../models/Task");

class LabelController {
  async create(req, res) {
    try {
      const { title } = req.body;
      const label = new Label({
        author: req.user.id,
        title: title,
      });
      await label.save();
      res.json(label);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.body;

      const label = await Label.findOne({
        author: req.user.id,
        _id: id,
      });

      if (label) {
        const deletedLabel = await LabelService.delete(id);

        await Task.updateMany(
          { author: req.user.id, label: id },
          { $set: { label: null } }
        );

        return res.json(deletedLabel);
      } else {
        res.json({ message: "Ошибка при удалении" });
      }
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async update(req, res) {
    try {
      const label = await Label.findOne({
        author: req.user.id,
        _id: req.body._id,
      });

      if (label) {
        const updatedLabel = await LabelService.update(req.body);
        res.json(updatedLabel);
      } else {
        res.json({ message: "Ошибка при обновлении" });
      }
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async getLabelsList(req, res) {
    try {
      const labels = await LabelService.get(req.user.id);
      res.json(labels);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getLabel(req, res) {
    try {
      const label = await LabelService.getOne(req.user.id, req.body.id);
      res.json(label);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

module.exports = new LabelController();
