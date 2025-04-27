import express from "express";
import errorHandler from "../services/errorHandler";
import visitorController from "../controllers/visitor.controller";
import AuthMiddleware, { Role } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/visitor", errorHandler(visitorController.trackVisitor));
router.get(
  "/visitor",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.restrictTo(Role.Admin),
  errorHandler(visitorController.getTotalVisitor)
);

// router.get(
//   "/last-7-days",
//   AuthMiddleware.isAuthenticated,
//   AuthMiddleware.restrictTo(Role.Admin),
//   errorHandler(visitorController.getLast7DaysVisitor)
// );
// router.get(
//   "/last-month",
//   AuthMiddleware.isAuthenticated,
//   AuthMiddleware.restrictTo(Role.Admin),
//   errorHandler(visitorController.getLast3MonthsVisitor)
// );
// router.get(
//   "/last-3-month",
//   AuthMiddleware.isAuthenticated,
//   AuthMiddleware.restrictTo(Role.Admin),
//   errorHandler(visitorController.getLastMonthVisitor)
// );

export default router;
