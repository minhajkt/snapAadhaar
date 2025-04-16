"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const ocrRoutes_1 = require("./routes/ocrRoutes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 6000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/ocr', (0, ocrRoutes_1.setupRoutes)());
app.get('/', (req, res) => {
    res.send('hello');
});
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
