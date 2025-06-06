import { z } from "zod";

export const VisitorSchema = z.object({
  id: z.string().uuid(),
  ipAddress: z.string(),
  userAgent: z.string(),
  visitedAt: z.coerce.date(),
});
