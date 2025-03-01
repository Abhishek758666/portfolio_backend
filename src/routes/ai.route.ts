import express from "express";
import aiController from "../controllers/ai.controller";

const router = express.Router();

router.post("/chat", aiController.getResponse);

export default router;
