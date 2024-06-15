import { Input } from "@nextui-org/react";
import { RoomType } from "@/types/room";
import { useFormContext } from "react-hook-form";

export const ReTransferResourceForm = ({
  currentRoom,
  rooms,
}: {
  currentRoom: number;
  rooms: RoomType[];
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  console.log(errors);

  return (
    <>
      <div className="mb-7">
        <label
          htmlFor="roomId"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Phòng
        </label>
        <select
          id="roomId"
          className="mb-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("roomId", { valueAsNumber: true })}>
          {/* {rooms.map((room) => {
            
            return (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            );
          })} */}
          {rooms.filter((room) => {
              return room.id !== currentRoom;
            })
            .map((room) => {
              return (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              );
            })}
        </select>
      </div>
      <Input
        className="mb-7"
        label="Số lượng"
        variant="bordered"
        errorMessage={errors.quantity?.message?.toString()}
        isInvalid={errors.quantity?.message ? true : false}
        {...register("quantity")}
      />
    </>
  );
};
