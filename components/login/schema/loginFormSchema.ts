import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Email không được trống" })
      .regex(/^[a-zA-Z0-9._%+-]+@student\.ctuet\.edu\.vn$/, {
        message: "Địa chỉ email không hợp lệ",
      }),
    password: z.string().min(1, {message: "Mật khẩu không được trống"})
})

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>