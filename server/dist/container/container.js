"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDependencies = createDependencies;
const ocrController_1 = require("../controllers/ocrController");
const ocrService_1 = require("../services/ocrService");
function createDependencies() {
    const ocrService = new ocrService_1.OcrService();
    const ocrController = new ocrController_1.OcrController(ocrService);
    return {
        ocrController
    };
}
