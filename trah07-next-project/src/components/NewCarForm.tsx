'use client';

import { useState } from 'react';

const NewCarForm = () => {
  const [brandName, setBrandName] = useState('');
  const [modelName, setModelName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [color, setColor] = useState('');
  const [year, setYear] = useState<number | undefined>(undefined);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const carData = {
      brandName,
      modelName,
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
        setBrandName('');
        setModelName('');
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
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input
        type="text"
        placeholder="Brand Name"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Model Name"
        value={modelName}
        onChange={(e) => setModelName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price !== undefined ? price : ''}
        onChange={(e) =>
          setPrice(e.target.value ? Number(e.target.value) : undefined)
        }
        required
      />
      <input
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Year"
        value={year !== undefined ? year : ''}
        onChange={(e) =>
          setYear(e.target.value ? Number(e.target.value) : undefined)
        }
        required
      />
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Car
      </button>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default NewCarForm;
