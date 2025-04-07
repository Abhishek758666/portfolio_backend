import express from "express";
import noteController from "../controllers/note.controller";
import errorHandler from "../services/errorHandler";
import {
  upload,
  uploadToCloudinary,
} from "../middleware/cloudinary.middleware";

const router = express.Router();

router.post(
  "/notes",
  upload.single("noteImage"),
  uploadToCloudinary,
  errorHandler(noteController.addNotes)
);
router.get("/notes", errorHandler(noteController.getNotes));
router.patch("/notes/:id", errorHandler(noteController.verifyNotes));

export default router;
