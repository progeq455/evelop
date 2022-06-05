const router = require("express").Router();
const commentController = require("../controllers/comment-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/", authMiddleware, commentController.create);
router.get("/one", authMiddleware, commentController.getComment);
router.delete("/delete", authMiddleware, commentController.delete);

module.exports = router;