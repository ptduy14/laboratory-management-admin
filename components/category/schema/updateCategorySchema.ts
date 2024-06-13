import z from "zod";

export const UpdateCategorySchema = z.object({
    categoryId: z.number(),
    name: z.string().min(1, {message: "Trường này là bắt buộc"}),
    status: z.number()
})

export type UpdateCategorySchemaType = z.infer<typeof UpdateCategorySchema>