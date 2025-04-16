import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { OcrService } from './services/ocrService'
import { OcrController } from './controllers/ocrController'
import { setupRoutes } from './routes/ocrRoutes'

dotenv.config()

const app = express()

const port = process.env.PORT || 6000

app.use(cors())
app.use(express.json())


app.use('/ocr', setupRoutes())

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})