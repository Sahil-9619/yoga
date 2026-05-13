const express = require("express");

const controller =
    require("./workshop.controller");

const authMiddleware =
    require("../../middleware/auth.middleware");

const upload = require("../../middleware/upload.middleware");

const router = express.Router();


// Create Workshop
router.post(
    "/create",
    authMiddleware,
    upload.single('photo'),
    controller.create
);


// Get All Workshops
router.get(
    "/all",
    controller.getAll
);


// Get Single Workshop
router.get(
    "/:id",
    controller.getOne
);


// Update Workshop
router.put(
    "/:id",
    authMiddleware,
    upload.single('photo'),
    controller.update
);


// Delete Workshop
router.delete(
    "/:id",
    authMiddleware,
    controller.remove
);


module.exports = router;