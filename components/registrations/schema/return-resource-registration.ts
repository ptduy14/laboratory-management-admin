import { z } from "zod";

export const ReturnRegistrationchema = z.object({
  uid: z.number(),
  status: z.number(),
  items: z.object({
    registrationId: z.number(),
    itemRegistrationId: z.number(),
    remaining_volume: z.preprocess(
      (val) => (val === undefined || val === null || val === '') ? null : Number(val),
      z.union([z.number().nullable(), z.string().nullable()])
    ),
    quantity: z.number({invalid_type_error: "Trường nãy phải là số"}).min(1, {message: "Trường này không được trống"}),
    remark: z.string().optional(),
    itemStatus: z.number(),
  }).array()
});

export type ReturnRegistrationchemaType = z.infer<typeof ReturnRegistrationchema>;
