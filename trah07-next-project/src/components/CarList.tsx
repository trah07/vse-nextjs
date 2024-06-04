import CarItem from './CarItem';
import { CarWithDeps } from '@/types/prismaTypes';

type Props = {
  cars: CarWithDeps[];
};

const CarList = ({ cars }: Props) => {
  return (
    <div className="bg-gray-100 rounded-xl p-8 flex flex-col flex-wrap">
      {cars.map((car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
