"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = setupRoutes;
const express_1 = require("express");
const container_1 = require("../container/container");
const uploadMiddleware_1 = __importDefault(require("../middlewares/uploadMiddleware"));
// import { upload } from "../middlewares/uploadMiddleware";
function setupRoutes() {
    const router = (0, express_1.Router)();
    const { ocrController } = (0, container_1.createDependencies)();
    router.post('/uploads', uploadMiddleware_1.default, ocrController.uploadImages.bind(ocrController));
    return router;
}
