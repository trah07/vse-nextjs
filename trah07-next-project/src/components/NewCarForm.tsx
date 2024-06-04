'use client';

import { useState } from 'react';
import BrandAndModelFormFields from './BrandAndModelFormFields';
import { Brand, CarModel } from '@prisma/client';
import CarLoader from './Loading';

const NewCarForm = ({
  brands,
  models,
}: {
  brands: Brand[];
  models: CarModel[];
}) => {
  const [brandId, setBrandId] = useState('');
  const [modelId, setModelId] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [color, setColor] = useState('');
  const [year, setYear] = useState<number | undefined>(undefined);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    const carData = {
      brandId,
      modelId,
      description,
      location,
      price,
      color,
      year,
    };

    try {
      const response = await fetch('/api/addCar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });

      if (response.ok) {
        setMessage('Car added successfully!');
        setBrandId('');
        setModelId('');
        setDescription('');
        setLocation('');
        setPrice(undefined);
        setColor('');
        setYear(undefined);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to add car.');
      }
    } catch (error) {
      setError('Failed to add car.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-md"
    >
      <BrandAndModelFormFields
        models={models}
        brands={brands}
        onBrandChange={setBrandId}
        onModelChange={setModelId}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="p-2 mb-3 rounded-md border"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        className="p-2 mb-3 rounded-md border"
      />
      <input
        type="number"
        placeholder="Price"
        value={price !== undefined ? price : ''}
        onChange={(e) =>
          setPrice(e.target.value ? Number(e.target.value) : undefined)
        }
        required
        className="p-2 mb-3 rounded-md border"
      />
      <input
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        required
        className="p-2 mb-3 rounded-md border"
      />
      <input
        type="number"
        placeholder="Year"
        value={year !== undefined ? year : ''}
        onChange={(e) =>
          setYear(e.target.value ? Number(e.target.value) : undefined)
        }
        required
        className="p-2 mb-3 rounded-md border"
      />
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-700 transition duration-200"
        disabled={loading}
      >
        Add New Car
      </button>
      {message && <p className="text-green-500 mt-3">{message}</p>}
      {error && <p className="text-red-500 mt-3">{error}</p>}
      {loading && <CarLoader />}
    </form>
  );
};

export default NewCarForm;
