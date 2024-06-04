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
    <div>
      <h1>Add New Car</h1>
      <NewCarForm brands={brands} models={models} />
      <Link href="/">
        <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded">
          Go Back to Homepage
        </button>
      </Link>
    </div>
  );
};

export default NewCarPage;
