'use client';

import { Brand, CarModel } from '@prisma/client';
import { Fragment, useMemo, useState } from 'react';

const BrandAndModelFormFields = ({
  models,
  brands,
  onBrandChange,
  onModelChange,
}: {
  models: CarModel[];
  brands: Brand[];
  onBrandChange: (brandId: string) => void;
  onModelChange: (modelId: string) => void;
}) => {
  const [brandId, setBrandId] = useState('');

  const filteredModels = useMemo(() => {
    return models.filter((model) => model.brandId === brandId);
  }, [brandId, models]);

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBrandId(e.target.value);
    onBrandChange(e.target.value);
  };

  return (
    <Fragment>
      <label className="font-semibold mb-1">Brand</label>
      <select
        name="brandId"
        required={true}
        value={brandId}
        onChange={handleBrandChange}
        className="p-2 mb-3 rounded-md border"
      >
        <option value="">Select Brand</option>
        {brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>

      <label className="font-semibold mb-1">Model</label>
      <select
        name="modelId"
        required={true}
        disabled={!brandId}
        onChange={(e) => onModelChange(e.target.value)}
        className="p-2 mb-3 rounded-md border"
      >
        <option value="">Select Model</option>
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
