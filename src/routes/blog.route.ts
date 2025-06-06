import express from "express";
import aiController from "../controllers/ai.controller";
import blogController from "../controllers/blog.controller";
import errorHandler from "../services/errorHandler";
import authMiddleware, { Role } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/blogs", errorHandler(blogController.getAllBlogs));
router.get(
  "/blogs/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.restrictTo(Role.Admin),
  errorHandler(blogController.getBlogById)
);
router.post(
  "/blogs",
  authMiddleware.isAuthenticated,
  authMiddleware.restrictTo(Role.Admin),
  errorHandler(blogController.addBlog)
);
router.patch(
  "/blogs/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.restrictTo(Role.Admin),
  errorHandler(blogController.updateBlog)
);
router.delete(
  "/blogs/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.restrictTo(Role.Admin),
  errorHandler(blogController.deleteBlog)
);

export default router;
