import { Input } from "@nextui-org/react";
import { Category } from "../../category/category-table/data";
import { UnitEnum, UnitEnumNames } from "@/enums/unit";
import { ResourceStatus, ResourceStatusName } from "@/enums/resource-status";
import { useFormContext } from "react-hook-form";

export const AddResourceCommonForm = ({
  categories,
}: {
  categories: Category[];
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
          htmlFor="category"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Danh mục
        </label>
        <select
          defaultValue={categories[0].id}
          id="category"
          className="mb-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("categoryId", { valueAsNumber: true })}
        >
          {categories.map((category: any) => {
            if (category.status !== 0) return;
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>
      <Input
        className="mb-7"
        label="Tên"
        variant="bordered"
        errorMessage={errors.name?.message?.toString()}
        isInvalid={errors.name?.message ? true : false}
        {...register("name")}
      />
      <Input
        className="mb-7"
        label="Xuất xứ"
        variant="bordered"
        {...register("origin")}
      />
      <Input
        className="mb-7"
        label="Số lượng"
        variant="bordered"
        errorMessage={errors.quantity?.message?.toString()}
        isInvalid={errors.quantity?.message ? true : false}
        {...register("quantity")}
      />
      <Input
        className="mb-7"
        label="Dung tích"
        variant="bordered"
        errorMessage={errors.specification?.message?.toString()}
        isInvalid={errors.specification?.message ? true : false}
        {...register("specification")}
      />
      <Input
        className="mb-7"
        label="Số seri"
        variant="bordered"
        {...register("serial_number")}
      />
      <Input
        className="mb-7"
        label="Chú thích"
        variant="bordered"
        {...register("remark")}
      />
      <div className="mb-7">
        <label
          htmlFor="units"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Đơn vị tính
        </label>
        <select
          defaultValue={UnitEnum.BOTTLE}
          id="units"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("unit")}
        >
          <option value={UnitEnum.BOTTLE}>
            {UnitEnumNames[UnitEnum.BOTTLE]}
          </option>
          <option value={UnitEnum.PEACE}>
            {UnitEnumNames[UnitEnum.PEACE]}
          </option>
          <option value={UnitEnum.SET}>{UnitEnumNames[UnitEnum.SET]}</option>
          <option value={UnitEnum.BOX}>{UnitEnumNames[UnitEnum.BOX]}</option>
          <option value={UnitEnum.BAG}>{UnitEnumNames[UnitEnum.BAG]}</option>
          <option value={UnitEnum.PACK}>{UnitEnumNames[UnitEnum.PACK]}</option>
          <option value={UnitEnum.SACHET}>
            {UnitEnumNames[UnitEnum.SACHET]}
          </option>
        </select>
      </div>
      <div className="mb-7">
        <label
          htmlFor="status"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Trạng thái
        </label>
        <select
          defaultValue={ResourceStatus.NORMAL_OPERATION}
          id="status"
          className="mb-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("status")}
        >
          <option value={ResourceStatus.NORMAL_OPERATION}>
            {ResourceStatusName[ResourceStatus.NORMAL_OPERATION]}
          </option>
          <option value={ResourceStatus.STILL_IN_GOOD_USE}>
            {ResourceStatusName[ResourceStatus.STILL_IN_GOOD_USE]}
          </option>
          <option value={ResourceStatus.AWAITING_REPAIR}>
            {ResourceStatusName[ResourceStatus.AWAITING_REPAIR]}
          </option>
          <option value={ResourceStatus.MALFUNCTIONING}>
            {ResourceStatusName[ResourceStatus.MALFUNCTIONING]}
          </option>
        </select>
      </div>
    </>
  );
};
