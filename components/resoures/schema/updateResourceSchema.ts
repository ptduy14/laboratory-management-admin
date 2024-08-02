import { z } from "zod";

// common schema
export const UpdateResourceCommonSchema = z.object({
  name: z.string().min(1, { message: "Trường này không được trống" }),
  origin: z.string().optional(),
  quantity: z.coerce
    .number({ invalid_type_error: "Trường này phải là số" })
    .min(1, { message: "Trường này không được rộng" }),
  remark: z.string().optional(),
  unit: z.coerce.number(),
  status: z.coerce.number(),
  categoryId: z.coerce.number(),
  serial_number: z.string().optional(),
});

// chemical schema
export const UpdateResourceChemicalSchema = UpdateResourceCommonSchema.extend({
  volume: z.coerce
    .number({ invalid_type_error: "Trường này phải là số" })
    .min(1, { message: "Trường này không được trống" }),
  specification: z.coerce.number(),
});

export type UpdateResourceCommonSchemaType = z.infer<
  typeof UpdateResourceCommonSchema
>;
export type UpdateResourceChemicalSchemaType = z.infer<
  typeof UpdateResourceChemicalSchema
>;
export type UpdateResourceSchemaUnionType =
  | UpdateResourceCommonSchemaType
  | UpdateResourceChemicalSchemaType;
