import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use((err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      type: "about:blank",
      title: "Bad Request",
      status: err.statusCode,
      detail: err.message,
      errors: err.errors || [],
      instance: req.originalUrl,
    });
  }

  return res.status(500).json({
    type: "about:blank",
    title: "Internal Server Error",
    status: 500,
    detail: "Something went wrong",
    instance: req.originalUrl,
  });
});

// Routes Import
import userRoutes from "./routes/user.routes.js";

// router declaration
app.use("/api/v1/users", userRoutes);

export { app };
