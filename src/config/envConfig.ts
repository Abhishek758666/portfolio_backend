import { config } from "dotenv";
config();

export const envConfig = {
  PORT: process.env.PORT,
  GEMINI_KEY: process.env.GEMINI_KEY,
};
