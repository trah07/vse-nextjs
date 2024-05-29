import { Brand, Car, CarModel } from '@prisma/client';

export interface CarWithDeps extends Car {
  model: CarModel;
  brand: Brand;
}
