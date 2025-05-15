import { REGEX } from "../constants/regex";
import { cleanAddress } from "./cleaner";

export function extractDetails(text: string) {
  const nameMatch = text.match(REGEX.NAME);
  const dobMatch = text.match(REGEX.DOB);
  const genderMatch = text.match(REGEX.GENDER);
  const aadhaarMatch = text.match(REGEX.AADHAAR_NUMBER);
  const addressMatch = text.match(
    REGEX.ADDRESS
  );

  return {
    name: nameMatch?.[0]?.trim() || "",
    dob: dobMatch?.[1] || "",
    gender: genderMatch?.[0] || "",
    aadhaarNumber: aadhaarMatch?.[0] || "",
    address: addressMatch ? cleanAddress(addressMatch[1]) : "",
  };
}
