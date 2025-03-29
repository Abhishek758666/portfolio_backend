import express from "express";
import { storage, multer } from "../middleware/multer.middleware";
import noteController from "../controllers/note.controller";
import errorHandler from "../services/errorHandler";

const router = express.Router();
const upload = multer({ storage });

router.post(
  "/notes",
  upload.single("noteImage"),
  errorHandler(noteController.addNotes)
);
router.get("/notes", errorHandler(noteController.getNotes));
router.patch("/notes/:id", errorHandler(noteController.verifyNotes));

export default router;
