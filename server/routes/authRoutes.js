const express = require("express");

const authUser = require("../controller/authController");

const router = express.Router();

router.route("/").post(authUser);

module.exports = router;
