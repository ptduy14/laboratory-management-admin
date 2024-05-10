import { ResourcesFromCategory } from "@/components/category/resources-from-category";

const resourcesFromCategory = ({ params }: { params: { id: string } }) => {
  return <ResourcesFromCategory id={params.id}/>;
};

export default resourcesFromCategory;
