const express = require("express");
const controller = require("./admin.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const router = express.Router();

router.post("/login", controller.login);
router.put(
    "/update-password",
    authMiddleware,
    controller.updatePassword
);

module.exports = router;