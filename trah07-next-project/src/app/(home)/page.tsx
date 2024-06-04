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
      <h1 className="text-center text-xl font-bold my-2">Home Page</h1>
      <div className="flex flex-row gap-4 justify-center my-4">
        <Link
          href="/car/new"
          className=" px-4 py-2 text-center bg-black text-white rounded block w-32"
        >
          Add New Car
        </Link>
        <Link
          href="/car/search"
          className=" py-2 text-center bg-sky-500 text-white rounded block w-32"
        >
          Search Car
        </Link>
      </div>

      <CarList cars={cars} />
    </Suspense>
  );
};

export default HomePage;
