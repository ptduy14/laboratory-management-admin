import { OK, z } from "zod";

// common schema
export const AddResourceCommonSchema = z.object({
    name: z.string().min(1, {message: "Trường này không được trống"}),
    origin: z.string().optional(),
    quantity: z.coerce.number({invalid_type_error: "Trường này phải là số"}).min(1, {message: "Trường này không được rộng"}),
    remark: z.string().optional(),
    unit: z.coerce.number(),
    status: z.coerce.number(),
    categoryId: z.coerce.number(),
    serial_number: z.string().optional(),
    specification: z.string().optional(),
})

// chemical schema
export const AddResourceChemicalSchema = AddResourceCommonSchema.extend({
    specification: z.string().min(1, {message: "Trường này không được trống"})
})

export type AddResourceCommonSchemaType = z.infer<typeof AddResourceCommonSchema>
export type AddResourceChemicalSchemaType = z.infer<typeof AddResourceChemicalSchema>
export type AddResourceSchemaUnionType = AddResourceCommonSchemaType | AddResourceChemicalSchemaType;