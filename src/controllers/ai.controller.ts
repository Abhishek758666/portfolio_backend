import { Request, Response } from "express";
import generateContext from "../services/ai.service";

class AiController {
  async getResponse(req: Request, res: Response): Promise<void> {
    const prompt = req.body.prompt;

    if (!prompt) {
      res.status(400).json({
        error: "no prompt is sent",
      });
      return;
    }

    const response = await generateContext(prompt as string);

    res.send({ data: response });
  }
}

export default new AiController();
