const express = require("express");

const test = require("../controller/test");

const router = express.Router();

router.route("/").post(test);

module.exports = router;
