import { z } from "zod";

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const UpdateAccountSchema = z.object({
  firstName: z.string().min(1, { message: "Trường này không được trống" }),
  lastName: z.string().min(1, { message: "Trường này không được trống" }),
  address: z.string().min(1, { message: "Trường này không được trống" }),
  photo: z
    .any()
    .nullable()
    .refine(
      (files) => {
        if (!Array.isArray(files)) return true;
        return ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type);
      },
      {
        message: ".jpg, .jpeg, .png and .webp files are accepted.",
      }
    ),
  status: z.coerce.number(),
  role: z.coerce.number(),
});

export type UpdateAccountSchemaType = z.infer<typeof UpdateAccountSchema>;
