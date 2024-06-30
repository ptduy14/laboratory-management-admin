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

  const getColorStatusRegistration = (cellValue: number) => {
    switch (cellValue) {
      case RegistrationStatus.PENDING:
        return "warning";
        break;

      case RegistrationStatus.CANCELED:
        return "danger";
        break;

      case RegistrationStatus.RETURNED:
        return "success";
        break;

      default:
        return "primary"
        break;
    }
  };

  switch (columnKey) {
    case "actions":
      return (
        <div className="flex gap-4 ">
          
          <DetailRegistration registration={registration} />
          {RegistrationStatusNames[registration.status] === 'Đã duyệt' && <ConfirmReturnRegistration registration={registration}/>}
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
          color={getColorStatusRegistration(cellValue)}>
          <span className="capitalize text-xs">{RegistrationStatusNames[cellValue]}</span>
        </Chip>
      );
    default:
      return cellValue;
      break;
  }
};
