import { Chip } from "@nextui-org/react";
import { ConfirmReturnRegistration } from "../confirm-return-registration";
import { DetailRegistration } from "../detail-registration";
import { Registration } from "./data";
import { format } from "date-fns";
import { RegistrationStatus, RegistrationStatusNames } from "@/enums/registration-status";

interface Props {
  registration: Registration;
  columnKey: string | React.Key;
}

export const RenderCell = ({ registration, columnKey }: Props) => {
  //@ts-ignore
  const cellValue = registration[columnKey];

  switch (columnKey) {
    case "actions":
      return (
        <div className="flex gap-4 ">
          <DetailRegistration registration={registration} />
        </div>
      );
      break;

    case "createdAt":
      const formattedDate = format(new Date(registration.createdAt), "dd/MM/yyyy");
      return formattedDate;
      break;
    case "name":
      return registration.user.firstName + " " + registration.user.lastName;
      break;
    case "email":
      return registration.user.email;
      break;
    case "status":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={cellValue === RegistrationStatus.PENDING ? "warning" : "success"}>
          <span className="capitalize text-xs">{RegistrationStatusNames[cellValue]}</span>
        </Chip>
      );
    default:
      return cellValue;
      break;
  }
};
