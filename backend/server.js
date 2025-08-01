require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRouter = require("./routers/task_router");
const userRouter = require("./routers/user_router");
const verifyToken = require("./middleware/verifyToken");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/user", userRouter);
app.use("/tasks", verifyToken, taskRouter);

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
