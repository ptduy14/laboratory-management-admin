import { Input } from "@nextui-org/react";
import { CategoryStatus, CategoryStatusNames } from "@/enums/category-status";
import { useFormContext } from "react-hook-form";

export const AddCategoryForm = () => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();

  return (
    <>
      <Input
        className="mb-7"
        label="Tên danh mục"
        variant="bordered"
        errorMessage={errors.name?.message?.toString()}
        isInvalid={errors.name?.message ? true : false}
        {...register("name")}
      />
      <div className="mb-7">
        <label
          htmlFor="status"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Trạng thái
        </label>
        <select
          id="status"
          className="mb-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("status", { valueAsNumber: true })}>
          <option value={CategoryStatus.ACTIVE}>
            {CategoryStatusNames[CategoryStatus.ACTIVE]}
          </option>
          <option value={CategoryStatus.INACTIVE}>
            {CategoryStatusNames[CategoryStatus.INACTIVE]}
          </option>
        </select>
      </div>
    </>
  );
};
