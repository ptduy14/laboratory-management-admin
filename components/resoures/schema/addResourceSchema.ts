import { z } from "zod";

export const AddResourceSchema = z.object({
    name: z.string().min(1, {message: "Trường này không được trống"}),
    origin: z.string().min(1, {message: "Trường này không được trống"}),
    serial_number: z.string().optional(),
    specification: z.string().min(1, {message: "Trường này không được trống"}),
    quantity: z.number({message: "Trường này không được trống"}),
    remark: z.string().optional(),
    unit: z.number(),
    status: z.number(),
    categoryId: z.number()
})

export type AddResourceSchemaType = z.infer<typeof AddResourceSchema>