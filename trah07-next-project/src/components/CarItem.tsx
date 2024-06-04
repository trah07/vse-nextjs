import { CarWithDeps } from '@/types/prismaTypes';
import Link from 'next/link';

const CarItem = ({ car }: { car: CarWithDeps }) => {
  return (
    <Link
      href={`car/${car.id}`}
      className="cursor-pointer my-2 block bg-white rounded-xl p-2"
    >
      <div>{car.model.name}</div>
    </Link>
  );
};

export default CarItem;
