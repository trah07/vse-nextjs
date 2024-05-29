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
    <div>
      <Link href={'/'}>Home</Link>
      <div>{car?.brand.name}</div>
      <div>{car?.model.name}</div>
      <div>{car?.description}</div>
    </div>
  );
};

export default CarDetailPage;
