import React, { useEffect, useId, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userRootStore } from '../store/common/RootStoreContext';
import { Input, initTE, Button } from "tw-elements";
import { observer } from 'mobx-react-lite';

const defaultUser = {
  id: 0,
  name: 'Loading...',
  funds: 0,
};

const UserPage: React.FC = observer(() => {
  const params = useParams<{ userId: string }>();
  const userId = params.userId;
  const { currentUser } = userRootStore();
  const [user, setUser] = useState(defaultUser);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (userId) {
      // const foundUser = bicycleStore.users.find(user => user.id.toString() === userId);
      currentUser.loadUser(userId);
      setUser(currentUser);
    }
  }, [userId]);


  if (!user) {
    return <div>Loading or user not found...</div>;
  }

  useEffect(() => {
    initTE({ Input });
  }, []);


  const handleAddFunds = () => {
    if (amount) {
      console.log(`Adding funds: ${amount}`);
    }
  };

  return (
    <div className="p-4">
      <h1>User Detail Page</h1>
      <p>User ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Funds: {user.funds}</p>

      {/* //TODO: input & button to capture funds input */}
    </div>
  );
});

export default UserPage;