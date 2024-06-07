import { z } from "zod";

export const AddAccountSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Trường này không được trống" })
      .regex(/^[a-zA-Z0-9._%+-]+@student\.ctuet\.edu\.vn$/, {
        message: "Địa chỉ email không hợp lệ",
      }),
    firstName: z.string().min(1, { message: "Trường này không được trống" }),
    lastName: z.string().min(1, { message: "Trường này không được trống" }),
    address: z.string().min(1, { message: "Trường này không được trống" }),
    password: z
      .string()
      .min(8, { message: "Mật khẩu phải lớn hơn 8 ký tự" })
      .max(32)
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/, {
        message: "Mật khẩu phải chứa ít nhất một chữ cái và một số",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Trường này không được trống" }),
    role: z.string().min(1, { message: "Trường này không được trống" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export type AddAccountSchemaType = z.infer<typeof AddAccountSchema> & {status: number};
