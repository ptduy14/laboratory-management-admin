import { Registrations } from "@/components/registrations";

const registrations = ({ params }: { params: { slug: string } }) => {
  return <Registrations registrationsStatus={params.slug}/>
};

export default registrations;
