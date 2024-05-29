'use client';
import { Brand, CarModel } from '@prisma/client';
import { Fragment, useMemo, useState } from 'react';

const BrandAndModelFormFields = ({
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
    <Fragment>
      <select
        name="brandId"
        required={true}
        id=""
        value={brandId}
        onChange={(e) => {
          setBrandId(e.target.value);
        }}
      >
        {brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>
      <select name="modelId" required={true}>
        {filteredModels.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </Fragment>
  );
};

export default BrandAndModelFormFields;
