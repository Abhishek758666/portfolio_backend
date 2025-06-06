import { z } from "zod";

export const userSchema = z.object({
  userImage: z.string().min(1, "userImage is required"),
  username: z.string().min(1, "username is required"),
  email: z.string().email().optional(),
  password: z.string().optional(),
  role: z.enum(["admin", "user"]).default("user"),
});

export const userResponseSchema = userSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
