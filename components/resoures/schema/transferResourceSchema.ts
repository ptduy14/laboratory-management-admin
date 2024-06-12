import { z } from "zod";

const currentYear = new Date().getFullYear();
const earliestYear = 2010;

export const transferResourceSchema = z.object({
  roomId: z.number(),
  itemId: z.number(),
  quantity: z.coerce
    .number({ invalid_type_error: "Trường này phải là kiểu số" })
    .min(1, { message: "Sô lượng phải lớn hơn 1" }),
  year: z
    .string()
    .min(1, { message: "Trường này không được trống" })
    .refine((val) => /^\d{4}$/.test(val), { message: "Năm phải là chuỗi gồm 4 chữ số" })
    .refine(
      (val) => {
        const yearNum = Number(val);
        return yearNum >= earliestYear && yearNum <= currentYear;
      },
      { message: `Năm phải nằm trong khoảng từ ${earliestYear} đến ${currentYear}` }
    ),
    status: z.number()
});

export type transferResourceSchemaType = z.infer<typeof transferResourceSchema>;
