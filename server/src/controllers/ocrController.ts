import { Request, Response } from "express";
import { IOcrService } from "../services/IOcrService";


export class OcrController {
    private ocrService : IOcrService 
    constructor(ocrService: IOcrService) {
        this.ocrService = ocrService
    }

    async uploadImages(req: Request, res: Response):Promise<void> {
        const {front, back} = req.files as {[fieldName: string]: Express.Multer.File[]}

        if(!front || !back) {
             res.status(400).send('Both front and back are required')
        }

        try {

            const data = await this.ocrService.extractData(
              front[0].buffer,
              back[0].buffer
            );
            // console.log('data is', data)
             res.json(data)
        } catch (error) {
            res.status(500).json({error: 'OCR processing failed'})
        }
    }
}