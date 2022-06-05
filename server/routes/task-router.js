const router = require("express").Router();
const taskController = require("../controllers/task-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/", authMiddleware, taskController.create);
router.get("/all", authMiddleware, taskController.getAllTasks);
router.get("/task", authMiddleware, taskController.getTask);
router.get("/day", authMiddleware, taskController.getDayTasks);
router.get("/later", authMiddleware, taskController.getLaterTasks);
router.get("/label", authMiddleware, taskController.getTasksWithLabel);
router.get("/category", authMiddleware, taskController.getTasksFromCategory);
router.get("/kanban", authMiddleware, taskController.getTasksFromKanban);
router.get('/search', authMiddleware, taskController.searchTask);
router.put("/update", authMiddleware, taskController.update);
router.delete("/delete", authMiddleware, taskController.delete);
router.delete("/delete/overdue", authMiddleware, taskController.deleteOverdueTask);

module.exports = router;