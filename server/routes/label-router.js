const router = require("express").Router();
const labelController = require("../controllers/label-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/", authMiddleware, labelController.create);
router.get("/all", authMiddleware, labelController.getLabelsList);
router.get("/one", authMiddleware, labelController.getLabel);
router.put("/update", authMiddleware, labelController.update);
router.delete("/delete", authMiddleware, labelController.delete);

module.exports = router;