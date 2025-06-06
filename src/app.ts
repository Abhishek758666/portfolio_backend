import "./database/connection";
import cookieParser from "cookie-parser";

import express from "express";
import cors from "cors";

import aiRoute from "./routes/ai.route";
import noteRoute from "./routes/note.route";
import visitorRoute from "./routes/visitor.route";
import userRoute from "./routes/user.route";
import tagRoute from "./routes/tag.route";
import adminSeeder from "./services/adminSeeder";
import blogRoute from "./routes/blog.route";
import dashboardRoute from "./routes/dashboard.route";

const app = express();

app.set("trust proxy", 1);
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://admin.abhishekhati.com.np",
      "https://blog.abhishekhati.com.np",
      "https://abhishekhati.com.np",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

adminSeeder();

app.use("/api/v1", aiRoute);
app.use("/api/v1", noteRoute);
app.use("/api/v1", visitorRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", tagRoute);
app.use("/api/v1", blogRoute);
app.use("/api/v1", dashboardRoute);

app.get("/", (req, res) => {
  res.send("i am alive");
});

export default app;
