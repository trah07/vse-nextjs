'use client';
import createCar from '@/utils/actions';
import { CarModel, Brand } from '@prisma/client';
import { useMemo, useState } from 'react';

const NewCarForm = ({
  models,
  brands,
}: {
  models: CarModel[];
  brands: Brand[];
}) => {
  const [brandId, setBrandId] = useState('');

  const filteredModels = useMemo(() => {
    return models.filter((model) => model.brandId === brandId);
  }, [brandId, models]);

  return (
    <div>
      <form action={createCar} className="flex flex-col">
        <select
          name="brandId"
          id=""
          value={brandId}
          onChange={(e) => {
            setBrandId(e.target.value);
          }}
        >
          {brands.map((brand) => {
            return (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            );
          })}
        </select>
        <select name="modelId">
          {filteredModels.map((model) => {
            return (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            );
          })}
        </select>
        <input type="text" name="description"></input>
      </form>
    </div>
  );
};

export default NewCarForm;
