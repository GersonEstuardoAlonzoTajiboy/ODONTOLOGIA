import React, { useEffect, useState } from 'react';

const ImagesPatient = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/patient/1/images', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
        });
        if (!response.ok) {
          throw new Error('Error fetching images');
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const renderImage = (imageBuffer) => {
    const base64String = btoa(
      String.fromCharCode(...new Uint8Array(imageBuffer.data))
    );
    return `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {images.map((image, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', width: '300px' }}>
          <img
            src={renderImage(image.image_base_64)}
            alt={image.description}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <p>{image.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ImagesPatient;