import multer, { Multer } from "multer";
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";
import sharp from "sharp";
import { Request, Response, NextFunction } from "express";
import { envConfig } from "../config/envConfig";

cloudinary.config({
  cloud_name: envConfig.CLOUDINARY_CLOUD_NAME,
  api_key: envConfig.CLOUDINARY_API_KEY,
  api_secret: envConfig.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
export const upload: Multer = multer({ storage });

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const uploadToCloudinaryPromise = (
  buffer: Buffer
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "your-cloudinary-folder-name",
      },
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined
      ) => {
        if (error) reject(error);
        else if (result) resolve(result);
        else reject(new Error("Cloudinary upload result is undefined"));
      }
    );
    uploadStream.end(buffer);
  });
};

export const uploadToCloudinary: any = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const resizedBuffer = await sharp(req.file.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .jpeg({ quality: 80 })
      .toBuffer();

    const result = await uploadToCloudinaryPromise(resizedBuffer);

    req.body.imageUrl = result.secure_url;

    next();
  } catch (error) {
    console.error("Error in uploadToCloudinary middleware:", error);
    res.status(500).json({ error: "Failed to process image upload" });
  }
};
