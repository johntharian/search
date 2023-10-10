const express = require("express");

const indexImages = require("../controller/indexController");

const router = express.Router();

router.route("/images").post(indexImages);

module.exports = router;
