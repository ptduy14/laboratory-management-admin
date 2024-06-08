import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

export const AddResourceEquipmentField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return <Input className="mb-7" label="Số seri" variant="bordered"  {...register("serial_number")}/>;
};
