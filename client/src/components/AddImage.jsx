import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddImage = () => {
  const [imageName, setImageName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const { id } = useParams();

  const handleInputChange = (e) => {
    setImageName(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', imageName);
      formData.append('folderId', id);
      formData.append('image', selectedFile);

      const data = await fetch('/api/image/add', {
        method: 'POST',
        body: formData
      });

      if (data.ok) {
        toast.success(data.message || 'Image uploaded');
      } else {
        toast.error(data.error || 'Image upload fail');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section className='bg-blue-50 px-4 py-6'>
      <h2 className='text-2xl font-bold mb-4'>Add Image</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='imageName' className='block text-sm font-medium text-gray-700'>
            Image Name
          </label>
          <input
            id='imageName'
            name='imageName'
            type='text'
            value={imageName}
            onChange={handleInputChange}
            className='mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='image' className='block text-sm font-medium text-gray-700'>
            Image
          </label>
          <input
            id='image'
            name='image'
            type='file'
            onChange={handleFileChange}
            className='mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400'
            required
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
        >
          Upload Image
        </button>
      </form>
    </section>
  );
};

export default AddImage;
