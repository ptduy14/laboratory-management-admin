import { Input, Avatar } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { AccountStatus, AccountStatusNames } from "@/enums/account-status";
import { RoleEnum, RoleNames } from "@/enums/role";

interface UpdateAccountFormProps {
  previewImage: string | null;
  currentAccountPhoto: string;
  handlePreviewImage: (e: any) => void;
}

export const UpdateAccountForm = ({
  previewImage,
  currentAccountPhoto,
  handlePreviewImage,
}: UpdateAccountFormProps) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();
  return (
    <>
      <div className="w-1/3 pr-5">
        <Avatar
          className="w-full h-48"
          radius="sm"
          src={previewImage ? previewImage : currentAccountPhoto || ""}
        />
        <div className="mt-3">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="small_size"
          >
            Avata
          </label>
          <input
            className="block w-full mb-2 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="small_size"
            type="file"
            {...register("photo")}
            onChange={handlePreviewImage}
          ></input>
          {errors.photo?.message ? (
            <span className="text-xs text-danger">
              {errors?.photo?.message.toString()}
            </span>
          ) : null}
        </div>
      </div>
      <div className="w-2/3 max-h-80">
        <Input
          className="mb-7"
          label="First Name"
          placeholder="Enter your first name"
          variant="bordered"
          errorMessage={errors.firstName?.message?.toString()}
          isInvalid={errors.firstName?.message ? true : false}
          defaultValue={getValues("firstName")}
          {...register("firstName")}
        />
        <Input
          className="mb-7"
          label="Last Name"
          variant="bordered"
          errorMessage={errors.lastName?.message?.toString()}
          isInvalid={errors.lastName?.message ? true : false}
          defaultValue={getValues("lastName")}
          {...register("lastName")}
        />
        <Input
          className="mb-7"
          label="address"
          variant="bordered"
          errorMessage={errors.address?.message?.toString()}
          isInvalid={errors.address?.message ? true : false}
          defaultValue={getValues("address")}
          {...register("address")}
        />
        <div className="mb-7">
          <label
            htmlFor="status"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select status
          </label>
          <select
            id="status"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={getValues("status")}
            {...register("status")}
            onChange={(e) => console.log(typeof e.target.value)}
          >
            <option value={AccountStatus.ACTIVE}>
              {AccountStatusNames[AccountStatus.ACTIVE]}
            </option>
            <option value={AccountStatus.INACTIVE}>
              {AccountStatusNames[AccountStatus.INACTIVE]}
            </option>
          </select>
        </div>
        <div className="mb-7">
          <label
            htmlFor="roles"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an role
          </label>
          <select
            id="roles"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={getValues("role")}
            {...register("role")}
            onChange={(e) => console.log(typeof e.target.value)}
          >
            <option value={RoleEnum.ADMIN}>{RoleNames[RoleEnum.ADMIN]}</option>
            <option value={RoleEnum.MANAGER}>
              {RoleNames[RoleEnum.MANAGER]}
            </option>
            <option value={RoleEnum.USER}>{RoleNames[RoleEnum.USER]}</option>
          </select>
        </div>
      </div>
    </>
  );
};
