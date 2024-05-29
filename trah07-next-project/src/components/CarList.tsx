import CarItem from './CarItem';
import { CarWithDeps } from '@/types/prismaTypes';

type Props = {
  cars: CarWithDeps[];
};

const CarList = ({ cars }: Props) => {
  return (
    <div>
      {cars.map((car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
