import express from "express";
import tagController from "../controllers/tag.controller";
import errorHandler from "../services/errorHandler";
import AuthMiddleware, { Role } from "../middleware/auth.middleware";
const router = express.Router();

router.get(
  "/tags",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.restrictTo(Role.Admin),
  errorHandler(tagController.getTags)
);

router.post(
  "/tags",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.restrictTo(Role.Admin),
  errorHandler(tagController.addTag)
);

router.patch(
  "/tags/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.restrictTo(Role.Admin),
  errorHandler(tagController.editTag)
);
router.delete(
  "/tags/:id",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.restrictTo(Role.Admin),
  errorHandler(tagController.deleteTag)
);

export default router;
