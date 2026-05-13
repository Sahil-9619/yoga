const express = require("express");

const controller =
    require("./category.controller");

const authMiddleware =
    require("../../middleware/auth.middleware");

const router = express.Router();


// Create Category
router.post(
    "/create",
    authMiddleware,
    controller.create
);


// Get All Categories
router.get(
    "/all",
    controller.getAll
);


// Get Single Category
router.get(
    "/:id",
    controller.getOne
);


// Delete Category
router.delete(
    "/:id",
    authMiddleware,
    controller.remove
);


module.exports = router;