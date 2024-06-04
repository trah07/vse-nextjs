import CarList from '@/components/CarList';
import CarLoader from '@/components/Loading';
import prisma from '@/utils/prisma';
import Link from 'next/link';
import { Suspense } from 'react';

const getCars = async () => {
  const cars = await prisma.car.findMany({
    include: {
      model: true,
      brand: true,
    },
  });
  return cars;
};

const HomePage = async () => {
  const cars = await getCars();
  return (
    <Suspense fallback={<CarLoader />}>
      <div className="container mx-auto p-4">
        <h1 className="text-center text-3xl font-bold my-4 text-gray-800">
          Home Page
        </h1>
        <div className="flex flex-row gap-4 justify-center my-6">
          <Link
            href="/car/new"
            className="px-4 py-2 text-center bg-black text-white rounded hover:bg-gray-700 transition duration-200 block w-32"
          >
            Add New Car
          </Link>
          <Link
            href="/car/search"
            className="px-4 py-2 text-center bg-sky-500 text-white rounded hover:bg-sky-700 transition duration-200 block w-32"
          >
            Search Car
          </Link>
        </div>

        <div>
          <CarList cars={cars} />
        </div>
      </div>
    </Suspense>
  );
};

export default HomePage;
