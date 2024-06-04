import CarList from '@/components/CarList';
import prisma from '@/utils/prisma';
import Link from 'next/link';

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
    <div>
      <h1>Home Page</h1>
      <Link href="/car/new">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Add New Car
        </button>
      </Link>
      <CarList cars={cars} />
    </div>
  );
};

export default HomePage;
