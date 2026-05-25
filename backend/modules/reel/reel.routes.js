const express = require("express");
const router = express.Router();
const controller = require("./reel.controller");
const upload = require("../../middleware/upload.middleware");
const authMiddleware = require("../../middleware/auth.middleware");

// Use 'thumbnail' as the field name to match Video/Reel schema logic
router.post("/create", authMiddleware, upload.single("thumbnail"), controller.create);
router.get("/all", controller.getAll);
router.get("/:id", controller.getOne);
router.put("/:id", authMiddleware, upload.single("thumbnail"), controller.update);
router.delete("/:id", authMiddleware, controller.remove);

module.exports = router;
