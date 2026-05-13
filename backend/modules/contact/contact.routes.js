const express = require("express");

const controller =
    require("./contact.controller");

const authMiddleware =
    require("../../middleware/auth.middleware");

const router = express.Router();


router.post(
    "/create",
    controller.create
);


router.get(
    "/all",
    authMiddleware,
    controller.getAll
);

router.get(
    "/:id",
    authMiddleware,
    controller.getOne
);

router.delete(
    "/:id",
    authMiddleware,
    controller.remove
);


module.exports = router;