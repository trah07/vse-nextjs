import { createCar } from '@/utils/actions';
import { Brand, CarModel } from '@prisma/client';
import BrandAndModelFormFields from './BrandAndModelFormFields';

const NewCarForm = ({
  models,
  brands,
}: {
  models: CarModel[];
  brands: Brand[];
}) => {
  return (
    <div>
      <form action={createCar} className="flex flex-col">
        <BrandAndModelFormFields models={models} brands={brands} />
        <input type="text" name="description" required={true} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewCarForm;
