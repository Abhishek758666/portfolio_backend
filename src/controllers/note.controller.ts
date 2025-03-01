import { Request, Response } from "express";
import generateContext from "../services/ai.service";
import Note from "../database/models/note.model";

class NoteController {
  async getNotes(req: Request, res: Response): Promise<void> {
    const data = await Note.findAll();

    res.status(200).json({ data });
  }
  async addNotes(req: Request, res: Response): Promise<void> {
    const fileName = req?.file?.filename;
    const { name, message } = req.body;
    if (!name || !message) {
      res.status(400).json({
        message: "please provide all the fields",
      });
      return;
    }

    await Note.create({
      image: fileName,
      name: name,
      message: message,
    });

    res.status(201).json({ message: "Note added" });
  }
}

export default new NoteController();
