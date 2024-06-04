import prisma from '@/utils/prisma';
import CarSearchForm from '@/components/CarSearchForm';
import Link from 'next/link';

const CarSearchPage = async () => {
  const cars = await prisma.car.findMany();
  const brands = await prisma.brand.findMany();
  const models = await prisma.carModel.findMany();

  return (
    <div>
      <h1>Car Search</h1>
      <CarSearchForm cars={cars} brands={brands} models={models} />
      <Link href="/">
        <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded">
          Go Back to Homepage
        </button>
      </Link>
    </div>
  );
};

export default CarSearchPage;
