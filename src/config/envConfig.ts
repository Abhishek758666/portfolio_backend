import { config } from "dotenv";
config();

export const envConfig = {
  PORT: process.env.PORT,
  GEMINI_KEY: process.env.GEMINI_KEY,
  CONNECTION_STRING: process.env.CONNECTION_STRING,
  JWT_SECRET: process.env.JWT_SECRET as string,

  SMTP_HOST: process.env.SMTP_HOST as string,
  SMTP_PORT: process.env.SMTP_PORT as string,
  SMTP_USER: process.env.SMTP_USER as string,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD as string,
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME as string,
  EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS as string,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL as string,
};
