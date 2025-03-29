import { Request, Response } from "express";
import Note from "../database/models/note.model";
import nodeMailer, { NoteVerificationTemplate } from "../services/nodeMailer";

class NoteController {
  async getNotes(req: Request, res: Response): Promise<void> {
    const data = await Note.findAll({
      where: {
        verified: true,
      },
    });
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

    const createdNote = await Note.create({
      image: fileName,
      name: name,
      message: message,
    });

    const noteTemplate = NoteVerificationTemplate(
      name,
      message,
      createdNote.image,
      createdNote.id
    );
    nodeMailer
      .sendMail(
        "abhishekkhati39@gmail.com",
        noteTemplate.subject,
        noteTemplate.text,
        noteTemplate.html
      )
      .catch((err) => console.log(err));

    res.status(201).json({ message: "Note added" });
  }

  async verifyNotes(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const noteExist = await Note.findByPk(id);

    if (!noteExist) {
      res.status(400).json({ message: "Note not found" });
      return;
    }

    await noteExist.update({ verified: true });
    res.status(201).json({ message: "Note verified successfully" });
  }
}

export default new NoteController();
