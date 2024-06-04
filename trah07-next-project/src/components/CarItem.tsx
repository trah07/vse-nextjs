import { CarWithDeps } from '@/types/prismaTypes';
import Link from 'next/link';

const CarItem = ({ car }: { car: CarWithDeps }) => {
  return (
    <Link
      href={`car/${car.id}`}
      className="cursor-pointer my-2 block bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-200 hover:bg-sky-100"
    >
      <div className="text-lg font-bold text-sky-500">{car.model.name}</div>
      <div className="text-sm font-semibold text-gray-600">
        {car.brand.name}
      </div>
      <div className="text-sm text-gray-600">Location: {car.location}</div>
      <div className="text-sm text-gray-600">Price: ${car.price}</div>
      <div className="text-sm text-gray-600">Year: {car.year}</div>
      <div className="text-sm text-gray-600">Color: {car.color}</div>
    </Link>
  );
};

export default CarItem;
