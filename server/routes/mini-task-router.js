const router = require("express").Router();
const miniTaskController = require("../controllers/mini-task-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/", authMiddleware, miniTaskController.create);
router.get("/minitasks", authMiddleware, miniTaskController.getMiniTasks);
router.put("/update", authMiddleware, miniTaskController.update);
router.delete("/delete", authMiddleware, miniTaskController.delete);

module.exports = router;