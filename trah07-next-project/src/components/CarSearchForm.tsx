'use client';

import { useState, useMemo, useEffect } from 'react';
import { Brand, CarModel, Car } from '@prisma/client';

const CarSearchForm = ({
  cars,
  brands,
  models,
}: {
  cars: Car[];
  brands: Brand[];
  models: CarModel[];
}) => {
  const [selectedBrandId, setSelectedBrandId] = useState<string>('');
  const [selectedModelId, setSelectedModelId] = useState<string>('');

  const filteredModels = useMemo(() => {
    return models.filter((model) => model.brandId === selectedBrandId);
  }, [selectedBrandId, models]);

  const filteredCars = useMemo(() => {
    return cars.filter(
      (car) =>
        (selectedBrandId ? car.brandId === selectedBrandId : true) &&
        (selectedModelId ? car.modelId === selectedModelId : true),
    );
  }, [selectedBrandId, selectedModelId, cars]);

  return (
    <div>
      <form className="flex flex-col">
        <select
          name="brandId"
          value={selectedBrandId}
          onChange={(e) => {
            setSelectedBrandId(e.target.value);
            setSelectedModelId('');
          }}
        >
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
        <select
          name="modelId"
          value={selectedModelId}
          onChange={(e) => setSelectedModelId(e.target.value)}
          disabled={!selectedBrandId}
        >
          <option value="">Select Model</option>
          {filteredModels.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </form>
      <div>
        <h2>Filtered Cars</h2>
        <ul>
          {filteredCars.map((car) => (
            <li key={car.id}>
              {car.color} - {car.description} - {car.year}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarSearchForm;
