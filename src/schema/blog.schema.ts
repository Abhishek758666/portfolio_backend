import z from "zod";

export const blogSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  description: z.string(),
  heroImage: z.string(),
  tags: z.array(z.string()).optional(),
});

export const blogResponseSchema = blogSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
});
