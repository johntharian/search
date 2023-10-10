const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    given_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: [true, "Please add email"],
      unique: [true, "email already exists"],
    },
    picture: {
      type: String,
      required: false,
    },
    access_token: {
      type: String,
      required: true,
    },
    refresh_token: {
      type: String,
      required: true,
    },
    expiry_date: {
      type: Number,
      required: true,
    },
    indexed: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
