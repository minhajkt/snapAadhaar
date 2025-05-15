import { Request, Response } from "express";
import { IOcrService } from "../services/IOcrService";
import { HttpStatus } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";

export class OcrController {
  private ocrService: IOcrService;
  constructor(ocrService: IOcrService) {
    this.ocrService = ocrService;
  }

  async uploadImages(req: Request, res: Response): Promise<void> {
    const { front, back } = req.files as {
      [fieldName: string]: Express.Multer.File[];
    };

    if (!front || !back) {
      res.status(HttpStatus.BAD_REQUEST).send(MESSAGES.FRONTANDBACK);
    }

    try {
      const data = await this.ocrService.extractData(
        front[0].buffer,
        back[0].buffer
      );
      // console.log('data is', data)
      res.json(data);
    } catch (error: any) {
      const message =
        error instanceof Error ? error.message : MESSAGES.OCR_FAILED;
      res.status(400).json({ error: message });
    }
  }
}
