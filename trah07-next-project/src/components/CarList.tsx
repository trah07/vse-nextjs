import { Car } from '@prisma/client';
import CarItem from './CarItem';

type Props = {
  cars: Car[];
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
