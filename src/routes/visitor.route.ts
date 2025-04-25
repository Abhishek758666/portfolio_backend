import express from "express";
import noteController from "../controllers/note.controller";
import errorHandler from "../services/errorHandler";
import {
  upload,
  uploadToCloudinary,
} from "../middleware/cloudinary.middleware";
import visitorController from "../controllers/visitor.controller";

const router = express.Router();

router.post("/visitor", errorHandler(visitorController.trackVisitor));
router.get("/visitor", errorHandler(visitorController.getTotalVisitor));

router.get("/last-7-days", errorHandler(visitorController.getLast7DaysVisitor));
router.get(
  "/last-month",
  errorHandler(visitorController.getLast3MonthsVisitor)
);
router.get(
  "/last-3-month",
  errorHandler(visitorController.getLastMonthVisitor)
);

export default router;
