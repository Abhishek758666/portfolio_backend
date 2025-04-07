import express from "express";
import "./database/connection";
import aiRoute from "./routes/ai.route";
import noteRoute from "./routes/note.route";
import path from "path";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", aiRoute);
app.use("/api/v1", noteRoute);

app.get("/", (req, res) => {
  console.log(path.join(__dirname, "./uploads"));
  res.send("i am alive");
});

export default app;
