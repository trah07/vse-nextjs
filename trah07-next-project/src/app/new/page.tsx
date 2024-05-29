import NewCarForm from '@/components/NewCarForm';
import prisma from '@/utils/prisma';

const fetchBrands = async () => {
  return prisma.brand.findMany();
};

const fetchModels = async () => {
  return prisma.carModel.findMany();
};

const NewCarPage = async () => {
  const brands = await fetchBrands();
  const model = await fetchModels();

  return <NewCarForm models={model} brands={brands}></NewCarForm>;
};

export default NewCarPage;
