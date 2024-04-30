import { z } from "zod";

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const UpdateAccountSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Trường này không được trống" })
    .regex(/^[a-zA-Z0-9._%+-]+@student\.ctuet\.edu\.vn$/, {
      message: "Địa chỉ email không hợp lệ",
    }),
  firstName: z.string().min(1, { message: "Trường này không được trống" }),
  lastName: z.string().min(1, { message: "Trường này không được trống" }),
  address: z.string().min(1, { message: "Trường này không được trống" }),
  photo: z.any().optional().refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
    message: '.jpg, .jpeg, .png and .webp files are accepted.',
  }),
  status: z.number(),
  role: z.number(),
});

export type UpdateAccountSchemaType = z.infer<typeof UpdateAccountSchema>;
