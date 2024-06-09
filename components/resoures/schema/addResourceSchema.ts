import { OK, z } from "zod";

// common schema
export const AddResourceSchema = z.object({
    name: z.string().min(1, {message: "Trường này không được trống"}),
    origin: z.string().optional(),
    quantity: z.number({message: "Trường này không được trống"}),
    remark: z.string().optional(),
    unit: z.number(),
    status: z.number(),
    categoryId: z.number()
})

// equipment schema
export const AddResourceEquipmentSchema = AddResourceSchema.extend({
    serial_number: z.string().optional(),
})

// tool schema
export const AddResourceToolSchema = AddResourceSchema.extend({
    specification_tool: z.string().optional(),
})

// chemical schema
export const AddResourceChemicalSchema = AddResourceSchema.extend({
    specification: z.string().min(1, {message: "Trường này không được trống"}),
    ok: z.string().min(1, {message: "Trường này không được trống"}),
})

export type AddResourceChemicalSchemaType = z.infer<typeof AddResourceChemicalSchema>
export type AddResourceEquipmentSchemaType = z.infer<typeof AddResourceEquipmentSchema>
export type AddResourceToolSchemaType = z.infer<typeof AddResourceToolSchema>
export type AddResourceSchemaUnion = AddResourceEquipmentSchemaType | AddResourceToolSchemaType | AddResourceChemicalSchemaType;