import { ConfirmReturnRegistration } from "../confirm-return-registration";
import { DetailRegistration } from "../detail-registration";
import { Registration } from "./data";

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

    default:
      return cellValue;
      break;
  }
};
