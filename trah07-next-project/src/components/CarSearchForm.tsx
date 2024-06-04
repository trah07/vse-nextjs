'use client';

import { useState, useMemo } from 'react';
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
  const [location, setLocation] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [color, setColor] = useState<string>('');
  const [year, setYear] = useState<number | undefined>(undefined);
  const [showFilteredCars, setShowFilteredCars] = useState<boolean>(false);

  const locations = Array.from(new Set(cars.map((car) => car.location))).filter(
    Boolean,
  ) as string[];
  const colors = Array.from(new Set(cars.map((car) => car.color))).filter(
    Boolean,
  ) as string[];
  const years = Array.from(new Set(cars.map((car) => car.year))).filter(
    Boolean,
  ) as number[];

  const filteredModels = useMemo(() => {
    return models.filter((model) => model.brandId === selectedBrandId);
  }, [selectedBrandId, models]);

  const filteredCars = useMemo(() => {
    return cars.filter(
      (car) =>
        (selectedBrandId ? car.brandId === selectedBrandId : true) &&
        (selectedModelId ? car.modelId === selectedModelId : true) &&
        (location
          ? car.location?.toLowerCase().includes(location.toLowerCase())
          : true) &&
        (minPrice ? car.price && car.price >= minPrice : true) &&
        (maxPrice ? car.price && car.price <= maxPrice : true) &&
        (color ? car.color?.toLowerCase() === color.toLowerCase() : true) &&
        (year ? car.year === year : true),
    );
  }, [
    selectedBrandId,
    selectedModelId,
    location,
    minPrice,
    maxPrice,
    color,
    year,
    cars,
  ]);

  const handleSearch = () => {
    setShowFilteredCars(true);
  };

  return (
    <div>
      <form className="flex flex-col">
        <select
          name="brandId"
          value={selectedBrandId || ''}
          onChange={(e) => {
            setSelectedBrandId(e.target.value);
            setSelectedModelId(''); // Reset model selection when brand changes
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
          value={selectedModelId || ''}
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
        <select
          name="location"
          value={location || ''}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Select Location</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Price ($)"
          value={minPrice !== undefined ? minPrice : ''}
          onChange={(e) =>
            setMinPrice(e.target.value ? Number(e.target.value) : undefined)
          }
        />
        <input
          type="number"
          placeholder="Max Price ($)"
          value={maxPrice !== undefined ? maxPrice : ''}
          onChange={(e) =>
            setMaxPrice(e.target.value ? Number(e.target.value) : undefined)
          }
        />
        <select
          name="color"
          value={color || ''}
          onChange={(e) => setColor(e.target.value)}
        >
          <option value="">Select Color</option>
          {colors.map((col, index) => (
            <option key={index} value={col}>
              {col}
            </option>
          ))}
        </select>
        <select
          name="year"
          value={year !== undefined ? year : ''}
          onChange={(e) =>
            setYear(e.target.value ? Number(e.target.value) : undefined)
          }
        >
          <option value="">Select Year</option>
          {years.map((yr, index) => (
            <option key={index} value={yr}>
              {yr}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </form>
      {showFilteredCars && (
        <div>
          <h2>Filtered Cars</h2>
          <ul>
            {filteredCars.map((car) => (
              <li key={car.id}>
                {car.description} - {car.location} - ${car.price} - {car.color}{' '}
                - {car.year}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CarSearchForm;
