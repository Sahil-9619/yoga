const express = require("express");
const controller = require("./testimonial.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const upload = require("../../middleware/upload.middleware");

const router = express.Router();

router.post("/create", authMiddleware, upload.single('media'), controller.create);
router.get("/all", controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id", authMiddleware, upload.single('media'), controller.update);
router.delete("/:id", authMiddleware, controller.remove);

module.exports = router;
