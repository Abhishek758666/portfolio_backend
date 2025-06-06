import { Request, Response } from "express";
import User from "../database/models/user.model";
import Visitor from "../database/models/visitor.model";
import Note from "../database/models/note.model";
import Blog from "../database/models/blog.model";

class Dashboard {
  async getDashboardInfo(req: Request, res: Response): Promise<void> {
    try {
      const userCount = await User.count();
      const visitorCount = await Visitor.count();
      const noteCount = await Note.count();
      const blogCount = await Blog.count();

      res.status(200).json({
        data: {
          userCount,
          visitorCount,
          noteCount,
          blogCount,
        },
      });
    } catch (error: any) {
      throw Error(error);
    }
  }
}

export default new Dashboard();
