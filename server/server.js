const express = require("express");
const cors = require("cors");

const connectDb = require("./connection.js");

connectDb();
const app = express();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/auth/google", require("./routes/authRoutes"));
app.use("/index", require("./routes/indexRoutes"));
app.use("/user", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
