import { PendingRegistrations } from "@/components/registrations/pending-registration";
import { CanceledRegistrations } from "@/components/registrations/canceled-registration";
import { ApprovedRegistrations } from "@/components/registrations/approved-registration";
import { ReturnedRegistration } from "@/components/registrations/returned-registration";

const registrations = ({ params }: { params: { slug: string } }) => {
  switch (params.slug) {
    case "pending":
      return <PendingRegistrations />;
      break;

    case "canceled":
      return <CanceledRegistrations />;
      break;

    case "approved":
      return <ApprovedRegistrations />;
      break;

    case "returned":
      return <ReturnedRegistration />;
      break;

    default:
      break;
  }
};

export default registrations;
