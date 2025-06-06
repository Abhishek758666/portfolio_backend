import { Request, Response } from "express";
import Blog from "../database/models/blog.model";
import { blogSchema } from "../schema/blog.schema";
import { UserRequestType } from "../middleware/auth.middleware";
import User from "../database/models/user.model";
import { Op } from "sequelize";
import Tag from "../database/models/tag.model";

class BlogController {
  async getAllBlogs(req: Request, res: Response): Promise<void> {
    try {
      const { search, sort, tags } = req.query;
      const parsedTags = tags ? tags.toString().split(",") : null;

      const queryOptions: any = {
        include: [
          { model: User },
          parsedTags
            ? { model: Tag, where: { title: { [Op.in]: parsedTags } } }
            : { model: Tag },
        ],
        where: {},
        order: [],
      };

      if (search) {
        queryOptions.where = { title: { [Op.like]: `%${search}%` } };
      }

      if (sort === "NEWEST") {
        queryOptions.order = [["createdAt", "DESC"]];
      }
      if (sort === "OLDEST") {
        queryOptions.order = [["createdAt", "ASC"]];
      }
      if (sort === "A-Z") {
        queryOptions.order = [["title", "ASC"]];
      }
      if (sort === "Z-A") {
        queryOptions.order = [["title", "DESC"]];
      }
      console.log(queryOptions);

      const data = await Blog.findAll(queryOptions);
      res.status(200).json(data);
    } catch (error: any) {
      throw Error(error);
    }
  }

  async getBlogById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = await Blog.findByPk(id);
      if (!data) {
        res.status(404).json({ message: "blog not found" });
        return;
      }

      res.status(200).json(data);
    } catch (error: any) {
      throw Error(error);
    }
  }

  async addBlog(req: UserRequestType, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { title, excerpt, description, heroImage, tags } = blogSchema.parse(
        req.body
      );
      await Blog.create({
        userId,
        title,
        excerpt,
        description,
        heroImage,
        tags,
      });
      res.status(201).json({ data: "Blog created successfully" });
    } catch (error: any) {
      throw Error(error);
    }
  }

  async deleteBlog(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const blogExist = await Blog.findByPk(id);

      if (!blogExist) {
        res.status(404).json({ message: "blog not found" });
        return;
      }

      await Blog.destroy({ where: { id } });
      res.status(200).json({ message: "blog deleted successfully", blogExist });
    } catch (error: any) {
      throw Error(error);
    }
  }

  async updateBlog(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, excerpt, description, heroImage } = blogSchema.parse(
        req.body
      );

      const blogExist = await Blog.findByPk(id);

      if (!blogExist) {
        res.status(404).json({ message: "blog not found" });
        return;
      }

      await Blog.update(
        {
          title,
          excerpt,
          description,
          heroImage,
        },
        { where: { id } }
      );
      res.status(201).json({ data: "Blog created successfully" });
    } catch (error: any) {
      throw Error(error);
    }
  }
}

export default new BlogController();
