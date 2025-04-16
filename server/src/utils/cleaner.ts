
export function cleanAddress(raw: string): string {
    const englishOnly = raw.replace(/[\u0D00-\u0D7F]+/g, "");


  let cleaned = englishOnly
    .replace(/[^\w\s,.:/-]/g, "") 
    .replace(/\s{2,}/g, " ")  
    .replace(/\n/g, ", ") 
    .replace(/,\s*,/g, ",") 
    .replace(/,\s*$/, "")  
    .trim();

    cleaned = cleaned.replace(/^[^A-Za-z]+/, "");

    return cleaned
}
