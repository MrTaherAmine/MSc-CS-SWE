const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const { passport } = require("./config/passport");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Security headers.
app.use(helmet());

// Request parsing with a modest body limit.
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(cookieParser());

// Input sanitization.
// Note: xss-clean is included because the checkpoint explicitly requests it.
app.use(mongoSanitize());
app.use(xss());

// Passport is only used for Google OAuth in this checkpoint.
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.status(200).json({
    name: "Secure Task Manager API",
    routes: {
      signup: "POST /auth/signup",
      login: "POST /auth/login",
      googleLogin: "GET /auth/google",
      logout: "POST /auth/logout",
      createTask: "POST /tasks",
      listTasks: "GET /tasks",
      deleteTask: "DELETE /tasks/:id"
    }
  });
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
