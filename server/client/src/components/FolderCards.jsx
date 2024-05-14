import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

const FolderCards = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch('/api/folder/all',{
          method:"POST"
        });
        if (response.ok) {
          const data = await response.json();
          setFolders(data.folders);
        } else {
          console.error('Failed to fetch folders');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchFolders();
  }, []);

  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          {folders.map((folder) => (
            <Link
            key={folder._id}
            to={`/folder/${folder._id}`}
          >
            <Card>
              <h2 className="text-2xl font-bold">{folder.name}</h2>
            </Card>
          </Link>
          
          ))}
        </div>
      </div>
    </section>
  );
};

export default FolderCards;