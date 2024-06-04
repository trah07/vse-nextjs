import NewCarForm from '@/components/NewCarForm';
import prisma from '@/utils/prisma';
import Link from 'next/link';

const fetchBrandsAndModels = async () => {
  const brands = await prisma.brand.findMany();
  const models = await prisma.carModel.findMany();
  return { brands, models };
};

const NewCarPage = async () => {
  const { brands, models } = await fetchBrandsAndModels();

  return (
    <div className="w-3/4 mx-auto">
      <h1 className="text-center text-xl font-bold my-2">Add New Car</h1>
      <div className="bg-gray-200 p-2 rounded-xl">
        <NewCarForm brands={brands} models={models} />
      </div>
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-black text-white rounded block w-32 text-center"
      >
        Go Back
      </Link>
    </div>
  );
};

export default NewCarPage;
