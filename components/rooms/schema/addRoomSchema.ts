import z from "zod";

export const AddRoomSchema = z.object({
    name: z.string().min(1, {message: "Trường này là bắt buộc"}),
    status: z.number(),
    remark: z.string().optional()
})

export type AddRoomSchemaType = z.infer<typeof AddRoomSchema>