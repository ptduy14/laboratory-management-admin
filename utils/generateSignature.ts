export const generateSignature = (publicId: string) => {
	const timestamp = new Date().getTime();
	return `public_id=${publicId}&timestamp=${timestamp}${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_SECRECT}`;
};