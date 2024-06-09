import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

export const AddResourceToolField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Input
      className="mb-7"
      label="Dung tích"
      variant="bordered"
      {...register("specification_tool", {valueAsNumber: true})}
    />
  );
};
