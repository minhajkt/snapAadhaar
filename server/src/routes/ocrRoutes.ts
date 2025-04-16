import { Router } from "express";
import multer from 'multer'
import { OcrController } from "../controllers/ocrController";
import { createDependencies } from "../container/container";
import upload from "../middlewares/uploadMiddleware";
// import { upload } from "../middlewares/uploadMiddleware";


export function setupRoutes() {
    const router = Router()
    const {ocrController} =  createDependencies()

    router.post('/uploads', upload, ocrController.uploadImages.bind(ocrController))

    return router;
}

