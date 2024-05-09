import crypto from "crypto";

export const generateSHA1 =(data: any) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
}