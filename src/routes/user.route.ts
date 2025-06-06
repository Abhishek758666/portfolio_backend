import Express, { Router } from "express";
import errorHandler from "../services/errorHandler";
import UserController from "../controllers/user.controller";
import AuthMiddleware, { Role } from "../middleware/auth.middleware";

const router: Router = Express.Router();

router.route("/register").post(errorHandler(UserController.registerUser));
router.route("/login").post(errorHandler(UserController.loginUser));
router.route("/logout").post(errorHandler(UserController.logoutUser));
router
  .route("/login/admin")
  .post(
    AuthMiddleware.isAuthenticated,
    AuthMiddleware.restrictTo(Role.Admin),
    errorHandler(UserController.loginUser)
  );

router
  .route("/users")
  .get(
    AuthMiddleware.isAuthenticated,
    AuthMiddleware.restrictTo(Role.Admin),
    errorHandler(UserController.getUsers)
  );
router
  .route("/users/role/:id")
  .patch(
    AuthMiddleware.isAuthenticated,
    AuthMiddleware.restrictTo(Role.Admin),
    errorHandler(UserController.changeRole)
  );
router
  .route("/users/:id")
  .delete(
    AuthMiddleware.isAuthenticated,
    AuthMiddleware.restrictTo(Role.Admin),
    errorHandler(UserController.deleteUser)
  );

export default router;
