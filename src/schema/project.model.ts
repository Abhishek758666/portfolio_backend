import { z } from "zod";

export const projectSchema = z.object({
  id: z.string().uuid().optional(),
  projectImage: z.string().min(1, "Project image is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  link: z.string().optional(),
});

export type ProjectSchema = z.infer<typeof projectSchema>;
