import { OcrController } from "../controllers/ocrController"
import { OcrService } from "../services/ocrService"

export function createDependencies() {
    const ocrService = new OcrService()
    const ocrController = new OcrController(ocrService)

    return {
        ocrController
    }
}