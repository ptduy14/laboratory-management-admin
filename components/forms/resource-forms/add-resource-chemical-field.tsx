import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

export const AddResourceChemicalField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Input
      className="mb-7"
      label="Dung tích"
      variant="bordered"
      errorMessage={errors.specification?.message?.toString()}
      isInvalid={errors.specification?.message ? true : false}
      {...register("specification")}
    />
  );
};
