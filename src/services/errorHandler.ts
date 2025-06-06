import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const errorHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch((err: Error) => {
      console.log(err);
      res.status(500).json({
        message: "internal server error",
        error:
          err instanceof ZodError
            ? "zod error"
            : err.message || "something went wrong",
      });
    });
  };
};

export default errorHandler;
