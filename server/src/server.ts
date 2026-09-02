import express from "express";
import cookieParser from "cookie-parser";
import env from "./config/env.config.js";
import connectDB from "./config/db.config.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import taskRouter from "./routes/tasks.routes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.route("/").get((req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "ToDo API is working" });
});

// other routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/user", userRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(env.port, () => {
      console.log(`App is working at port: ${env.port}`);
    });
  } catch (error) {
    console.error(`Unable to start server: ${error}`);
  }
};

startServer();
