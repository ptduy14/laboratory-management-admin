import { ResourcesFromCategory } from "@/components/category/resources-from-category";
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: "Resources From Category",
   description: "Laboratory management for CTUT Lab",
}

const resourcesFromCategory = ({ params }: { params: { id: string } }) => {
  return <ResourcesFromCategory id={params.id}/>;
};

export default resourcesFromCategory;
