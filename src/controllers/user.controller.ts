import { Request, Response } from "express";
import User from "../database/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig";

class UserController {
  public static async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        res.status(400).json({
          message: "please provide all the credentials",
        });
        return;
      }

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
        username,
        email,
        password: bcrypt.hashSync(password, 10),
      });

      res.status(200).json({
        message: "user registered successfully",
      });
    } catch (error: any) {
      throw Error(error);
    }
  }

  public static async loginUser(req: Request, res: Response): Promise<void> {
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
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "logged in successfully",
      email: userExist.email,
      userImage: userExist.userImage,
      username: userExist.username,
    });
  }

  public static async logoutUser(req: Request, res: Response): Promise<void> {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Logged out successfully",
    });
  }
}

export default UserController;
