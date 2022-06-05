const router = require("express").Router();
const kanbanController = require("../controllers/kanban-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/", authMiddleware, kanbanController.create);
router.post("/task", authMiddleware, kanbanController.createTask);
router.post("/task/mini", authMiddleware, kanbanController.createTaskMini);
router.get("/all", authMiddleware, kanbanController.getKanbansList);
router.get("/one", authMiddleware, kanbanController.getKanban);
router.get("/task", authMiddleware, kanbanController.getKanbanTask);
router.get("/task/mini", authMiddleware, kanbanController.getKanbanMiniTask);
router.put("/update", authMiddleware, kanbanController.update);
router.put("/update/task", authMiddleware, kanbanController.updateTask);
router.put("/update/task/mini", authMiddleware, kanbanController.updateTaskMini);
router.delete("/delete", authMiddleware, kanbanController.delete);
router.delete("/delete/task", authMiddleware, kanbanController.deleteTask);
router.delete("/delete/task/mini", authMiddleware, kanbanController.deleteTaskMini);

module.exports = router;