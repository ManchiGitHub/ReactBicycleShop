import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userRootStore } from '../store/common/RootStoreContext';
import { Input, initTE } from "tw-elements";
import { observer } from 'mobx-react-lite';


const UserPage: React.FC = observer(() => {
  const params = useParams<{ userId: string }>();
  const userId = params.userId;
  const { currentUser, bicycleStore } = userRootStore();

  useEffect(() => {
    if (userId) {
      currentUser.loadUser(userId).then(() => {
        bicycleStore.setNavtitle(currentUser.name);
      });
    }
  }, [currentUser, userId]);

  useEffect(() => {
  }, [currentUser]);

  useEffect(() => {
    initTE({ Input });
  }, []);

  return (
    <div className="p-4">
      <p>User ID: {currentUser.id}</p>
      <p>Funds: {currentUser.funds}</p>
      <p>Funds: {currentUser.name}</p>
    </div>
  );
});

export default UserPage;