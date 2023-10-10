const dotenv = require("dotenv").config();
const asyncHandler = require("express-async-handler");

const User = require("../Model/userModel");

const returnUser = asyncHandler(async (req, res) => {
  console.log(req.query.email);

  const email = req.query.email;
  const userExists = await User.findOne({ email: email });
  console.log(userExists);
  res.json(userExists);
});

module.exports = returnUser;
