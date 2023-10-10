const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDb = async () => {
  try {
    CONNECTION_STRING = process.env.CONNECTION_STRING;
    const connect = await mongoose.connect(CONNECTION_STRING);
    console.log(
      "Connected to DB",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log("Error connection to MongoDB ", err);
  }
};

module.exports = connectDb;
