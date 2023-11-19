import { observer } from 'mobx-react-lite';
import React from 'react';
import { useParams } from 'react-router-dom';

const Bicycle: React.FC = observer(() => {
  const params = useParams();
  const bicycleId = params.bicycleId; 

  return (
    <div>
      <h1>Bicycle Detail Page</h1>
      <p>Bicycle ID: {bicycleId}</p>
      {/* Render other bicycle details here */}
    </div>
  );
});

export default Bicycle;