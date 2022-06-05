const router = require("express").Router();
const categoryController = require("../controllers/category-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/", authMiddleware, categoryController.create);
router.get("/all", authMiddleware, categoryController.getCategoriesList);
router.get("/one", authMiddleware, categoryController.getCategory);
router.put("/update", authMiddleware, categoryController.update);
router.delete("/delete", authMiddleware, categoryController.delete);

module.exports = router; 