import prisma from '@/utils/prisma';
import CarSearchForm from '@/components/CarSearchForm';

const CarSearchPage = async () => {
  const cars = await prisma.car.findMany();
  const brands = await prisma.brand.findMany();
  const models = await prisma.carModel.findMany();

  return (
    <div>
      <h1>Car Search</h1>
      <CarSearchForm cars={cars} brands={brands} models={models} />
    </div>
  );
};

export default CarSearchPage;
