import { z } from "zod";

export const noteSchema = z.object({
  id: z.string().uuid(),
  image: z.string(),
  name: z.string(),
  message: z.string(),
  verified: z.boolean(),
});

export const addNoteSchema = noteSchema.omit({
  id: true,
  verified: true,
});
