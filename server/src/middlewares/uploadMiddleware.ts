import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

const storage = multer.memoryStorage();

const fileFilter: (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => void = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); 
  } else {
    cb(new Error("Invalid file type. Only images are allowed.") as any, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
  fileFilter,
}).fields([
  { name: "front", maxCount: 1 },
  { name: "back", maxCount: 1 },
]);

export default upload;
