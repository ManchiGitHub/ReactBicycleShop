import React from 'react';
import { useParams } from 'react-router-dom';

const Bicycle: React.FC = () => {
  const params = useParams();
  const bicycleId = params.bicycleId; // This should match the dynamic segment in your route

  // Fetch bicycle data using bicycleId or any other logic you need

  return (
    <div>
      <h1>Bicycle Detail Page</h1>
      <p>Bicycle ID: {bicycleId}</p>
      {/* Render other bicycle details here */}
    </div>
  );
};

export default Bicycle;