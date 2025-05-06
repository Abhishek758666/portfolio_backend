import { Request, Response } from "express";
import Note from "../database/models/note.model";
import nodeMailer, { NoteVerificationTemplate } from "../services/nodeMailer";

class NoteController {
  async getNotes(req: Request, res: Response): Promise<void> {
    const data = await Note.findAll();
    res.status(200).json({ data });
  }

  async getVerifiedNotes(req: Request, res: Response): Promise<void> {
    const data = await Note.findAll({
      where: {
        verified: true,
      },
    });
    res.status(200).json({ data });
  }

  async addNotes(req: Request, res: Response): Promise<void> {
    const { name, message, imageUrl } = req.body;
    if (!name || !message) {
      res.status(400).json({
        message: "please provide all the fields",
      });
      return;
    }

    const createdNote = await Note.create({
      image: imageUrl,
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

  async updateNotes(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { status } = req.body;

    const noteExist = await Note.findByPk(id);

    if (!noteExist) {
      res.status(400).json({ message: "Note not found" });
      return;
    }

    await noteExist.update({ verified: status });
    res.status(201).json({ message: "Note updated successfully" });
  }

  async deleteNotes(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const noteExist = await Note.findByPk(id);

      if (!noteExist) {
        res.status(404).json({ message: "Note doesn't exist" });
        return;
      }

      await noteExist.destroy();
      res.status(200).json({ message: "Note deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: "An error occurred", error: error });
    }
  }
}

export default new NoteController();
