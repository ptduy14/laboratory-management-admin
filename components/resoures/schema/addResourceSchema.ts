import { z } from "zod";

// common schema
export const AddResourceCommonSchema = z.object({
  name: z.string().min(1, { message: "Trường này không được trống" }),
  origin: z.string().optional(),
  serial_number: z.string().optional(),
  status: z.coerce.number(),
  unit: z.coerce.number(),
  remark: z.string().optional(),
  quantity: z.coerce
    .number({ invalid_type_error: "Trường này phải là số" })
    .min(1, { message: "Trường này không được rộng" }),
  categoryId: z.coerce.number(),
});

// chemical schema
export const AddResourceChemicalSchema = AddResourceCommonSchema.extend({
  volume: z.coerce
    .number({ invalid_type_error: "Trường này phải là số" })
    .min(1, { message: "Trường này không được rộng" }),
  specification: z.coerce.number(),
});

export type AddResourceCommonSchemaType = z.infer<typeof AddResourceCommonSchema>;
export type AddResourceChemicalSchemaType = z.infer<typeof AddResourceChemicalSchema>;
export type AddResourceSchemaUnionType =
  | AddResourceCommonSchemaType
  | AddResourceChemicalSchemaType;
