'use client';

import { useState, useMemo } from 'react';
import { Brand, CarModel, Car } from '@prisma/client';
import CarLoader from './Loading';

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
  const [loading, setLoading] = useState(false);

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

  const getModelNameById = (modelId: string) => {
    const filteredModel = models.find((model) => model.id === modelId);
    return filteredModel ? filteredModel.name : '';
  };

  const getBrandNameById = (brandId: string) => {
    const filteredBrand = brands.find((brand) => brand.id === brandId);
    return filteredBrand ? filteredBrand.name : '';
  };

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
    setLoading(true);
    setShowFilteredCars(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <form className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-md">
        <label className="font-semibold mb-1">Brand</label>
        <select
          name="brandId"
          value={selectedBrandId || ''}
          onChange={(e) => {
            setSelectedBrandId(e.target.value);
            setSelectedModelId('');
          }}
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
          value={selectedModelId || ''}
          onChange={(e) => setSelectedModelId(e.target.value)}
          disabled={!selectedBrandId}
          className="p-2 mb-3 rounded-md border"
        >
          <option value="">Select Model</option>
          {filteredModels.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>

        <label className="font-semibold mb-1">Location</label>
        <select
          name="location"
          value={location || ''}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 mb-3 rounded-md border"
        >
          <option value="">Select Location</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <label className="font-semibold mb-1">Color</label>
        <select
          name="color"
          value={color || ''}
          onChange={(e) => setColor(e.target.value)}
          className="p-2 mb-3 rounded-md border"
        >
          <option value="">Select Color</option>
          {colors.map((col, index) => (
            <option key={index} value={col}>
              {col}
            </option>
          ))}
        </select>

        <label className="font-semibold mb-1">Year</label>
        <select
          name="year"
          value={year !== undefined ? year : ''}
          onChange={(e) =>
            setYear(e.target.value ? Number(e.target.value) : undefined)
          }
          className="p-2 mb-3 rounded-md border"
        >
          <option value="">Select Year</option>
          {years.map((yr, index) => (
            <option key={index} value={yr}>
              {yr}
            </option>
          ))}
        </select>

        <label className="font-semibold mb-1">Minimum Price ($)</label>
        <input
          type="number"
          id="minPrice"
          placeholder="Min Price ($)"
          value={minPrice !== undefined ? minPrice : ''}
          onChange={(e) =>
            setMinPrice(e.target.value ? Number(e.target.value) : undefined)
          }
          className="p-2 mb-3 rounded-md border"
        />

        <label className="font-semibold mb-1">Maximum Price ($)</label>
        <input
          type="number"
          id="maxPrice"
          placeholder="Max Price ($)"
          value={maxPrice !== undefined ? maxPrice : ''}
          onChange={(e) =>
            setMaxPrice(e.target.value ? Number(e.target.value) : undefined)
          }
          className="p-2 mb-3 rounded-md border"
        />

        <button
          type="button"
          onClick={handleSearch}
          className="mt-4 px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-700 transition duration-200"
          disabled={loading}
        >
          Search
        </button>
      </form>
      {loading && <CarLoader />} {/* Show loader while loading */}
      {showFilteredCars && !loading && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Filtered Cars</h2>
          <ul className="space-y-4">
            {filteredCars.map((car) => (
              <li key={car.id} className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-bold">
                  {getBrandNameById(car.brandId)}{' '}
                  {getModelNameById(car.modelId)}
                </h3>
                <p>
                  <strong>Description:</strong> {car.description}
                </p>
                <p>
                  <strong>Location:</strong> {car.location}
                </p>
                <p>
                  <strong>Price:</strong> ${car.price}
                </p>
                <p>
                  <strong>Color:</strong> {car.color}
                </p>
                <p>
                  <strong>Year:</strong> {car.year}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CarSearchForm;
