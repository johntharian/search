const express = require("express");

const returnUser = require("../controller/UserController");

const router = express.Router();

router.route("/").get(returnUser);

module.exports = router;
