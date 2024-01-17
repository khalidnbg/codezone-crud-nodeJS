const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const mongoose = require("mongoose");
const httpStatusText = require("./utils/httpStatusText");
const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
  console.log("mongoos server started");
});

app.use(cors());

app.use(express.json());

const coursesRouter = require("./routes/courses_route");
const usersRouter = require("./routes/users_route");
const { statusCode } = require("./utils/appError");

app.use("/api/courses", coursesRouter); //localhost / ==> /api/courses
app.use("/api/users", usersRouter); // /api/users

// global middleware for not found router
app.all("*", (req, res, next) => {
  res.status(404).json({
    statusbar: httpStatusText.ERROR,
    message: "This ressource is not available",
  });
});

// global error handler
app.use((error, req, res, next) => {
  res.status(statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});

app.listen(4001, () => {
  console.log("listening on port 4001");
});
