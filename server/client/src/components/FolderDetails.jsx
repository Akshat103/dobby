import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';

const FolderDetails = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/image/all?folderId=${id}`);
        if (response.ok) {
          const data = await response.json();
          setImages(data.images);
        } else {
          console.error('Failed to fetch images');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      setLoading(true);
      fetchImages();
    }
  }, [id]);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Folder Images</h2>
      {loading ? (
        <Spinner loading={loading} /> 
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map(image => (
            <div key={image._id} className="border border-gray-200 rounded overflow-hidden shadow-lg">
              <img className="w-full" src={`/api/${image.imageUrl}`} alt={image.name} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{image.name}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FolderDetails;
