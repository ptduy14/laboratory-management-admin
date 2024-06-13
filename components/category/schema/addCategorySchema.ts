import z from "zod";

export const AddCategorySchema = z.object({
    name: z.string().min(1, {message: "Trường này là bắt buộc"}),
    status: z.number()
})

export type AddCategorySchemaType = z.infer<typeof AddCategorySchema>