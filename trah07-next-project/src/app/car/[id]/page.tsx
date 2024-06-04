import prisma from '@/utils/prisma';
import Link from 'next/link';

const fetchCarDetail = async (id: string) => {
  const car = await prisma.car.findUnique({
    where: {
      id: id,
    },
    include: {
      model: true,
      brand: true,
    },
  });
  return car;
};

const CarDetailPage = async ({ params }: { params: { id: string } }) => {
  const car = await fetchCarDetail(params.id);

  return (
    <div className="w-3/4 mx-auto">
      <h1 className="text-3xl font-bold my-4 text-center text-sky-500">
        {car?.brand.name} {car?.model.name}
      </h1>
      <div className="text-lg my-2">
        <strong>Year:</strong> {car?.year}
      </div>
      <div className="text-lg my-2">
        <strong>Location:</strong> {car?.location}
      </div>
      <div className="text-lg my-2">
        <strong>Color:</strong> {car?.color}
      </div>
      <div className="text-lg my-2">
        <strong>Description:</strong> {car?.description}
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

export default CarDetailPage;
