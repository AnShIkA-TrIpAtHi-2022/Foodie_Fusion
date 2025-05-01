import React, { useEffect, useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:4000/uploads');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="gallery">
      {images.map((image, index) => (
        <img key={index} src={`http://localhost:4000/uploads/${image}`} alt="Uploaded" />
      ))}
    </div>
  );
};

export default Gallery;