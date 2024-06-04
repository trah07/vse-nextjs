import prisma from '@/utils/prisma';
import CarSearchForm from '@/components/CarSearchForm';
import Link from 'next/link';
import { Suspense } from 'react';
import CarLoader from '@/components/Loading';

const CarSearchPage = async () => {
  const cars = await prisma.car.findMany();
  const brands = await prisma.brand.findMany();
  const models = await prisma.carModel.findMany();

  return (
    <div className="w-3/4 mx-auto">
      <Suspense fallback={<CarLoader />}>
        <h1 className="text-center text-xl font-bold my-2">Car Search</h1>
        <div>
          <CarSearchForm cars={cars} brands={brands} models={models} />
        </div>
        <Link
          href="/"
          className="mt-4 px-4 py-2 bg-black text-white rounded block w-32 text-center"
        >
          Go Back
        </Link>
      </Suspense>
    </div>
  );
};

export default CarSearchPage;
