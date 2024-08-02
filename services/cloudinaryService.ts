import { generateSHA1 } from "@/utils/generateSHA1";
import { generateSignature } from "@/utils/generateSignature";
import axios from "axios";

export const CloudinaryService = {
  uploadImg: async (file: any) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!);
    data.append("folder", "Account-Photo");

    return await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/image/upload`,
      data
    );
  },

  deleteImg: async (publicId: string) => {
    const timestamp = new Date().getTime();
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const signature = generateSHA1(generateSignature(publicId));
    const payload = {
      public_id: publicId,
      signature: signature,
      api_key: apiKey,
      timestamp: timestamp,
    }
    return await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/image/destroy`, payload)
  }
};
