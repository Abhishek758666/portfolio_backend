import express from "express";
import noteController from "../controllers/note.controller";
import errorHandler from "../services/errorHandler";
import {
  upload,
  uploadToCloudinary,
} from "../middleware/cloudinary.middleware";
import AuthMiddleware, { Role } from "../middleware/auth.middleware";
const router = express.Router();

router.post(
  "/notes",
  upload.single("noteImage"),
  uploadToCloudinary,
  errorHandler(noteController.addNotes)
);
router.get("/notes/verified", errorHandler(noteController.getVerifiedNotes));

router.get(
  "/notes",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.restrictTo(Role.Admin),
  errorHandler(noteController.getNotes)
);
router.patch(
  "/notes/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.restrictTo(Role.Admin),
  errorHandler(noteController.verifyNotes)
);
router.delete(
  "/notes/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.restrictTo(Role.Admin),
  errorHandler(noteController.deleteNotes)
);

export default router;
