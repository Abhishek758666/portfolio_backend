import { Request, Response } from "express";
import User from "../database/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig";
import Blog from "../database/models/blog.model";
import { userSchema } from "../schema/user.schema";

class UserController {
  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password, userImage } = userSchema.parse(
        req.body
      );

      const [userExist] = await User.findAll({
        where: {
          email: email,
        },
      });

      if (userExist) {
        res.status(400).json({
          message: "user already exist",
        });
        return;
      }

      await User.create({
        userImage,
        username,
        email,
        password: bcrypt.hashSync(password as string, 10),
      });

      res.status(200).json({
        message: "user registered successfully",
      });
    } catch (error: any) {
      throw Error(error);
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "please enter all the fields",
      });
      return;
    }

    const [userExist] = await User.findAll({
      where: {
        email: email,
      },
    });

    if (!userExist) {
      res.status(404).json({
        message: "invalid credentials",
      });
      return;
    }

    const checkPassword = bcrypt.compareSync(password, userExist.password);

    if (!checkPassword) {
      res.status(404).json({
        message: "invalid credentials",
      });
      return;
    }

    const token = jwt.sign(
      { id: userExist.id },
      envConfig.JWT_SECRET as string,
      {
        expiresIn: "24h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "logged in successfully",
      email: userExist.email,
      userImage: userExist.userImage,
      username: userExist.username,
    });
  }

  async logoutUser(req: Request, res: Response): Promise<void> {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      message: "Logged out successfully",
    });
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const data = await User.findAll();
      res.status(200).json(data);
    } catch (error: any) {
      throw Error(error);
    }
  }

  async changeRole(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const data = await User.findByPk(id);
      if (!data) {
        res.status(404).json({
          message: "user not found",
        });
        return;
      }

      data.update({ role: role });

      res.status(200).json({ message: "user role changed" });
    } catch (error: any) {
      throw Error(error);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userExist = await User.findByPk(id);

      if (!userExist) {
        res.status(404).json({
          message: "user not found",
        });
        return;
      }

      await userExist.destroy();
      res.status(200).json({
        message: "user deleted successfully",
      });
    } catch (error: any) {
      throw Error(error);
    }
  }
}

export default new UserController();
