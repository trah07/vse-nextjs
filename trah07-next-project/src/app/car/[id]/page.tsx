import prisma from '@/utils/prisma';
import Link from 'next/link';
import CarLoader from '@/components/Loading';
import { Suspense } from 'react';

const fetchCarDetail = async (id: string) => {
  try {
    const car = await prisma.car.findUnique({
      where: {
        id: id,
      },
      include: {
        model: true,
        brand: true,
      },
    });
    if (!car) {
      throw new Error('Car not found');
    }
    return car;
  } catch (error) {
    console.error('Error fetching car details:', error);
    throw new Error('Failed to fetch car details');
  }
};

const CarDetail = async ({ id }: { id: string }) => {
  try {
    const car = await fetchCarDetail(id);
    return (
      <div className="w-3/4 mx-auto">
        <h1 className="text-3xl font-bold my-4 text-center">
          {car.brand.name} {car.model.name}
        </h1>
        <div className="text-lg my-2">
          <strong>Year:</strong> {car.year}
        </div>
        <div className="text-lg my-2">
          <strong>Location:</strong> {car.location}
        </div>
        <div className="text-lg my-2">
          <strong>Color:</strong> {car.color}
        </div>
        <div className="text-lg my-2">
          <strong>Description:</strong> {car.description}
        </div>
        <Link
          href="/"
          className="mt-4 px-4 py-2 bg-black text-white rounded block w-32 text-center"
        >
          Go Back
        </Link>
      </div>
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return (
      <div className="w-3/4 mx-auto text-center">
        <h1 className="text-3xl font-bold my-4 text-center">Error</h1>
        <p className="text-lg my-2 text-red-600">{errorMessage}</p>
        <Link
          href="/"
          className="mt-4 px-4 py-2 bg-black text-white rounded block w-32 text-center"
        >
          Go Back
        </Link>
      </div>
    );
  }
};

const CarDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<CarLoader />}>
      <CarDetail id={params.id} />
    </Suspense>
  );
};

export default CarDetailPage;
