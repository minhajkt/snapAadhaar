import Tesseract from "tesseract.js";
import { IOcrService } from "./IOcrService";
import { extractDetails  } from "../utils/extractor";



export class OcrService implements IOcrService {
  async processImage(imageBuffer: Buffer): Promise<any> {
    try {
      const result = await Tesseract.recognize(imageBuffer, "eng+mal");
      const confidence = result.data.confidence
      // console.log('confidence', confidence)
      if(confidence < 50) {
        throw new Error('Image too unclear to read');
      }
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
      if(!frontText.aadhaarNumber) {
        throw new Error('Please add a Aadhaar image to process')
      }
      const backText = await this.processImage(backBuffer);
      if(!backText.address) {
        throw new Error("Please add a Aadhaar image to process");
      }

      return {
        name: frontText.name,
        dob: frontText.dob,
        gender: frontText.gender,
        aadhaarNumber: frontText.aadhaarNumber,
        address: backText.address,
      };
    } catch (error) {
      console.error("Error in processing and merging OCR data:", error);
      throw error
    }
  }
}
