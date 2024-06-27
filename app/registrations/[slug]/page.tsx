import { PendingRegistrations } from "@/components/registrations/pending-registration";

const registrations = ({ params }: { params: { slug: string } }) => {
  return <PendingRegistrations registrationsStatus={params.slug}/>
};

export default registrations;
