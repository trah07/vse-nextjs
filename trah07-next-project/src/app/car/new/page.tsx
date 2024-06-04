import NewCarForm from '@/components/NewCarForm';
import Link from 'next/link';

const NewCarPage = () => {
  return (
    <div>
      <h1>Add New Car</h1>
      <NewCarForm />
      <Link href="/">
        <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded">
          Go Back to Homepage
        </button>
      </Link>
    </div>
  );
};

export default NewCarPage;
