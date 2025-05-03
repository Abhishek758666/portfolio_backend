import "./database/connection";

import express from "express";
import path from "path";
import cors from "cors";

import aiRoute from "./routes/ai.route";
import noteRoute from "./routes/note.route";
import visitorRoute from "./routes/visitor.route";
import userRoute from "./routes/user.route";
import tagRoute from "./routes/tag.route";
import adminSeeder from "./services/adminSeeder";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true);

adminSeeder();

app.use("/api/v1", aiRoute);
app.use("/api/v1", noteRoute);
app.use("/api/v1", visitorRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", tagRoute);

app.get("/", (req, res) => {
  console.log(path.join(__dirname, "./uploads"));
  res.send("i am alive");
});

export default app;
