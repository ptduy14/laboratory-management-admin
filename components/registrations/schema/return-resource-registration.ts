import { z } from "zod";

export const ReturnResourceRegistrationchema = z.object({
  itemRegistrationId: z.number(),
  registrationId: z.number(),
  uid: z.number(),
  quantity: z.number({invalid_type_error: "Trường nãy phải là số"}).min(1, {message: "Trường này không được trống"}),
  status: z.number(),
  itemStatus: z.number(),
  remark: z.string().optional(),
});

export type ReturnResourceRegistrationchemaType = z.infer<typeof ReturnResourceRegistrationchema>;
