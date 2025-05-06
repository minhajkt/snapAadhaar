import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export async function uploadAadhaarImages(front: File, back: File) {
  const formData = new FormData();
  formData.append("front", front);
  formData.append("back", back);

  const res = await axios.post(apiUrl, formData);
  return res.data;
}
