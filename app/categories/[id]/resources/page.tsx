import { CategoryResources } from '@/components/category-resources';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: "Resources From Category",
   description: "Laboratory management for CTUT Lab",
}

const categoryResources = ({ params }: { params: { id: string } }) => {
  return <CategoryResources id={params.id}/>;
};

export default categoryResources;
