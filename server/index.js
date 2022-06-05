const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const corsMiddleware = require("./middlewares/cors-middleware");
const authRouter = require("./routes/auth-router");
const taskRouter = require("./routes/task-router");
const miniTaskRouter = require("./routes/mini-task-router");
const labelRouter = require("./routes/label-router");
const commentRouter = require("./routes/comment-router");
const categoryRouter = require("./routes/category-router");
const kanbanRouter = require("./routes/kanban-router");

const app = express();
const PORT = process.env.PORT || config.get("serverPort");

app.use(corsMiddleware);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/tasks/mini", miniTaskRouter);
app.use("/api/labels", labelRouter);
app.use("/api/comments", commentRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/kanbans", kanbanRouter);

const start = async () => {
  try {
    mongoose.connect(config.get("DBURL"));
    app.listen(PORT, () => {
      console.log("Сервер запущен на порту " + PORT);
    });
  } catch (e) {
    console.log(e); 
  }
};

start();
