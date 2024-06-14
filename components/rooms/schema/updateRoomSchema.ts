import z from "zod";

export const UpdateRoomSchema = z.object({
    roomId: z.number(),
    name: z.string().min(1, {message: "Trường này là bắt buộc"}),
    status: z.number(),
    remark: z.string().optional()
})

export type UpdateRoomSchemaType = z.infer<typeof UpdateRoomSchema>