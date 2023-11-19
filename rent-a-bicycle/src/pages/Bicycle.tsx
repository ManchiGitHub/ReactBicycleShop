import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userRootStore } from '../store/common/RootStoreContext';

const Bicycle: React.FC = observer(() => {
  const params = useParams();
  const bicycleId = params.bicycleId; 
  const { bicycleStore } = userRootStore()

useEffect(()=>{
  bicycleStore.setNavtitle(bicycleId || "some bicycle")
},[]);

  return (
    <div>
      <h1>Bicycle Detail Page</h1>
      <p>Bicycle ID: {bicycleId}</p>
      {/* Render other bicycle details here */}
    </div>
  );
});

export default Bicycle;