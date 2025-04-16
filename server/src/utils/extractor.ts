import { cleanAddress } from "./cleaner";

export function extractDetails(text: string) {
    const nameMatch = text.match(/(?<=\n)[A-Za-z\s]+(?=\n)/);
    const dobMatch = text.match(/\b(\d{2}\/\d{2}\/\d{4})\b/);
    const genderMatch = text.match(/\b(Male|Female|Other)\b/i);
    const aadhaarMatch = text.match(/\d{4}\s\d{4}\s\d{4}/);
    const addressMatch = text.match(
        /(?:Address|Add|Addr)[\s:]+([\s\S]*?)(?=\n\d{4}|\n{2,}|$)/i
    );

    return {
        name: nameMatch?.[0]?.trim() || "",
    dob: dobMatch?.[1] || "",
    gender: genderMatch?.[0] || "",
    aadhaarNumber: aadhaarMatch?.[0] || "",
    address: addressMatch ? cleanAddress(addressMatch[1]) : "",
};
}