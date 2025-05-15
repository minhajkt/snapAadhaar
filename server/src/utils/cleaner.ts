import { REGEX } from "../constants/regex";

export function cleanAddress(raw: string): string {
    const englishOnly = raw.replace(REGEX.LANGUAGE, "");


  let cleaned = englishOnly
    .replace(REGEX.SPECIAL_CHAR, "") 
    .replace(REGEX.MULTIPLE_SPACE, " ")  
    .replace(REGEX.NEW_LINE, ", ") 
    .replace(REGEX.MULTIPLE_COMMA, ",") 
    .replace(REGEX.TRAILING_COMMA, "")  
    .trim();

    cleaned = cleaned.replace(REGEX.NON_LETTERS, "");

    return cleaned
}
