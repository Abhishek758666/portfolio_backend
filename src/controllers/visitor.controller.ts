import { Request, Response } from "express";
import Visitor from "../database/models/visitor.model";
import { Op } from "sequelize";
class VisitorController {
  async trackVisitor(req: Request, res: Response): Promise<void> {
    try {
      await Visitor.create({
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"] || "",
        visitedAt: new Date().toISOString(),
      });

      res.status(200).send({ message: "visitor tracked" });
    } catch (err: any) {
      throw Error(err);
    }
  }

  async getTotalVisitor(req: Request, res: Response): Promise<void> {
    try {
      const visitors = await Visitor.findAll();
      const visitorData = visitors.reduce(
        (acc: Record<string, { date: string; visitor: number }>, visitor) => {
          const date = new Date(visitor.createdAt).toISOString().split("T")[0];

          if (!acc[date]) {
            acc[date] = { date, visitor: 0 };
          }

          acc[date].visitor += 1;

          return acc;
        },
        {}
      );

      const result = Object.values(visitorData);
      res.status(200).send(result);
    } catch (err: any) {
      throw Error(err);
    }
  }

  // async getLast7DaysVisitor(req: Request, res: Response): Promise<void> {
  //   try {
  //     const sevenDaysAgo = new Date();
  //     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  //     sevenDaysAgo.setHours(0, 0, 0, 0);

  //     const count = await Visitor.count({
  //       where: {
  //         visitedAt: {
  //           [Op.gte]: sevenDaysAgo,
  //         },
  //       },
  //     });

  //     res.status(200).send({ data: count });
  //   } catch (err: any) {
  //     console.error(err);
  //     res.status(500).send({ message: "Error fetching last 7 days visitors" });
  //   }
  // }

  // async getLastMonthVisitor(req: Request, res: Response): Promise<void> {
  //   try {
  //     const oneMonthAgo = new Date();
  //     oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  //     oneMonthAgo.setHours(0, 0, 0, 0);

  //     const count = await Visitor.count({
  //       where: {
  //         visitedAt: {
  //           [Op.gte]: oneMonthAgo,
  //         },
  //       },
  //     });

  //     res.status(200).send({ data: count });
  //   } catch (err: any) {
  //     console.error(err);
  //     res.status(500).send({ message: "Error fetching last month's visitors" });
  //   }
  // }

  // async getLast3MonthsVisitor(req: Request, res: Response): Promise<void> {
  //   try {
  //     const threeMonthsAgo = new Date();
  //     threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  //     threeMonthsAgo.setHours(0, 0, 0, 0);

  //     const count = await Visitor.count({
  //       where: {
  //         visitedAt: {
  //           [Op.gte]: threeMonthsAgo,
  //         },
  //       },
  //     });

  //     res.status(200).send({ data: count });
  //   } catch (err: any) {
  //     console.error(err);
  //     res
  //       .status(500)
  //       .send({ message: "Error fetching last 3 months' visitors" });
  //   }
  // }
}

export default new VisitorController();
