import { Request, Response } from "express";

import Tag from "../database/models/tag.model";

class TagController {
  async getTags(req: Request, res: Response): Promise<void> {
    const data = await Tag.findAll();
    res.status(200).json({ data });
  }

  async addTag(req: Request, res: Response): Promise<void> {
    const { title } = req.body;
    if (!title) {
      res.status(400).json({
        message: "please provide all the fields",
      });
      return;
    }

    const data = await Tag.create({
      title: title,
    });

    res.status(201).json({ message: "tag added", data });
  }

  async editTag(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title } = req.body;

      if (!title) {
        res.status(400).json({ message: "Please provide all the fields" });
        return;
      }

      const tag = await Tag.findByPk(id);

      if (!tag) {
        res.status(404).json({ message: "Tag doesn't exist" });
        return;
      }

      tag.title = title;
      await tag.save();

      res.status(200).json({ message: "Tag updated successfully", tag });
    } catch (error: any) {
      throw Error(error);
    }
  }

  async deleteTag(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const tagExist = await Tag.findByPk(id);

      if (!tagExist) {
        res.status(404).json({ message: "Tag doesn't exist" });
        return;
      }

      await tagExist.destroy();
      res.status(200).json({ message: "tag deleted successfully" });
    } catch (error: any) {
      throw Error(error);
    }
  }
}

export default new TagController();
