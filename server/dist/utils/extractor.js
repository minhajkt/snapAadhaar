"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDetails = extractDetails;
const cleaner_1 = require("./cleaner");
function extractDetails(text) {
    var _a;
    const nameMatch = text.match(/(?<=\n)[A-Za-z\s]+(?=\n)/);
    const dobMatch = text.match(/\b(\d{2}\/\d{2}\/\d{4})\b/);
    const genderMatch = text.match(/\b(Male|Female|Other)\b/i);
    const aadhaarMatch = text.match(/\d{4}\s\d{4}\s\d{4}/);
    const addressMatch = text.match(/(?:Address|Add|Addr)[\s:]+([\s\S]*?)(?=\n\d{4}|\n{2,}|$)/i);
    return {
        name: ((_a = nameMatch === null || nameMatch === void 0 ? void 0 : nameMatch[0]) === null || _a === void 0 ? void 0 : _a.trim()) || "",
        dob: (dobMatch === null || dobMatch === void 0 ? void 0 : dobMatch[1]) || "",
        gender: (genderMatch === null || genderMatch === void 0 ? void 0 : genderMatch[0]) || "",
        aadhaarNumber: (aadhaarMatch === null || aadhaarMatch === void 0 ? void 0 : aadhaarMatch[0]) || "",
        address: addressMatch ? (0, cleaner_1.cleanAddress)(addressMatch[1]) : "",
    };
}
