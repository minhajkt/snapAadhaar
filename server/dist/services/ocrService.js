"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcrService = void 0;
const tesseract_js_1 = __importDefault(require("tesseract.js"));
const extractor_1 = require("../utils/extractor");
class OcrService {
    processImage(imageBuffer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield tesseract_js_1.default.recognize(imageBuffer, "eng+mal");
                const extracted = (0, extractor_1.extractDetails)(result.data.text);
                return extracted;
            }
            catch (error) {
                console.error("OCR processing error:", error);
                throw new Error("OCR Process Failed");
            }
        });
    }
    extractData(frontBuffer, backBuffer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const frontText = yield this.processImage(frontBuffer);
                const backText = yield this.processImage(backBuffer);
                return {
                    name: frontText.name,
                    dob: frontText.dob,
                    gender: frontText.gender,
                    aadhaarNumber: frontText.aadhaarNumber,
                    address: backText.address,
                };
            }
            catch (error) {
                console.error("Error in processing and merging OCR data:", error);
                throw new Error("OCR Process Failed");
            }
        });
    }
}
exports.OcrService = OcrService;
