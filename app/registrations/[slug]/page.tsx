import { PendingRegistrations } from "@/components/registrations/pending-registration";
import { CanceledRegistrations } from "@/components/registrations/canceled-registration";

const registrations = ({ params }: { params: { slug: string } }) => {
  switch (params.slug) {
    case "pending":
      return <PendingRegistrations />;
      break;

    case "canceled":
      return <CanceledRegistrations />;
      break;

    default:
      break;
  }
};

export default registrations;
