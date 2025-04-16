import Tesseract from "tesseract.js";
import { IOcrService } from "./IOcrService";
import { extractDetails,  } from "../utils/extractor";



export class OcrService implements IOcrService {
  async processImage(imageBuffer: Buffer): Promise<any> {
    try {
      const result = await Tesseract.recognize(imageBuffer, "eng+mal");
      const extracted = extractDetails(result.data.text);
      return extracted;
    } catch (error) {
      console.error("OCR processing error:", error);
      throw new Error("OCR Process Failed");
    }
  }

  async extractData(frontBuffer: Buffer, backBuffer: Buffer): Promise<any> {
    try {
      const frontText = await this.processImage(frontBuffer);
      const backText = await this.processImage(backBuffer);

      return {
        name: frontText.name,
        dob: frontText.dob,
        gender: frontText.gender,
        aadhaarNumber: frontText.aadhaarNumber,
        address: backText.address,
      };
    } catch (error) {
      console.error("Error in processing and merging OCR data:", error);
      throw new Error("OCR Process Failed");
    }
  }
}
