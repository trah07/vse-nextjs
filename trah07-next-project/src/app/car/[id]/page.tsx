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
      <div>{car?.brand.name}</div>
      <div>{car?.model.name}</div>
      <div>{car?.year}</div>
      <div>{car?.location}</div>
      <div>{car?.color}</div>
      <div>{car?.description}</div>
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
