import { useState } from 'react';
import { toast } from 'react-toastify';

const CreateNewFolder = () => {
  const [folderName, setFolderName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await fetch('/api/folder/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: folderName })
      });

      if (data.ok) {
        toast.success(data.message || 'Folder created successful');
      } else {
        toast.error(data.error || 'Folder creation failed');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='m-auto max-w-lg my-10 px-6'>
      <form onSubmit={handleSubmit}>
        <div className='flex items-center justify-evenly mb-4'>
          <label htmlFor='folderName' className='text-lg font-medium'>
            Name:  
          </label>
          <input
            type='text'
            id='folderName'
            name='folderName'
            value={folderName}
            onChange={handleInputChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
            required
          />
        </div>
        <button
          type='submit'
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Folder'}
        </button>
      </form>
    </section>
  );
};

export default CreateNewFolder;
