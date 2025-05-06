import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig";
import User from "../database/models/user.model";

export interface UserRequestType extends Request {
  user?: {
    id?: string;
    username?: string;
    role?: string;
  };
}

export enum Role {
  Admin = "admin",
  Customer = "user",
}

class AuthMiddleware {
  async isAuthenticated(
    req: UserRequestType,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // const token = req.headers.authorization?.split(" ")[1];
    const token = req.cookies.token;

    if (!token) {
      res.status(403).json({
        message: "Token not provided",
      });
      return;
    }

    jwt.verify(
      token,
      envConfig.JWT_SECRET as string,
      async (err: any, decoded: any) => {
        if (err) {
          res.status(403).json({
            message: "Token verification error",
            error: err,
          });
          return;
        }

        try {
          const [userData] = await User.findAll({
            where: {
              id: decoded.id,
            },
          });

          if (!userData) {
            res.status(404).json({
              message: "user not found",
            });
            return;
          }

          req.user = userData;
          next();
        } catch (error: any) {
          res.status(500).json({
            message: "internal server error",
            error: error.message,
          });
        }
      }
    );
  }

  restrictTo(...roles: Role[]) {
    return (req: UserRequestType, res: Response, next: NextFunction) => {
      let userRole = req.user?.role as Role;
      console.log(userRole);

      if (!roles.includes(userRole)) {
        res.status(403).json({
          message: "you don't have permission",
        });
      } else {
        next();
      }
    };
  }
}

export default new AuthMiddleware();
