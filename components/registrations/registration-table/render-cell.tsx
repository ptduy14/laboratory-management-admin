import { ConfirmReturnRegistration } from "../confirm-return-registration";
import { DetailRegistration } from "../detail-registration";
import { Registration } from "./data";
import { format } from "date-fns";

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
        <div className="flex items-center gap-4 ">
          <DetailRegistration registrationId={registration.id} />
          <ConfirmReturnRegistration registrationId={registration.id} />
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
    default:
      return cellValue;
      break;
  }
};
