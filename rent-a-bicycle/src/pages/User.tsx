import React, { useEffect, useId, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userRootStore } from '../store/common/RootStoreContext';
import { Input, initTE, Button } from "tw-elements";
import { observer } from 'mobx-react-lite';
import { autorun } from 'mobx';

const defaultUser = {
  id: 0,
  name: 'Loading...',
  funds: 0,
};

const UserPage: React.FC = observer(() => {
  const params = useParams<{ userId: string }>();
  const userId = params.userId;
  const { currentUser, bicycleStore } = userRootStore();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (userId) {
      currentUser.loadUser(userId);
      autorun(() => {
        bicycleStore.setNavtitle(currentUser.name);
      })
    }
  }, [currentUser]);

  useEffect(() => {
  }, [currentUser]);

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
      <p>User ID: {currentUser.id}</p>
      <p>Funds: {currentUser.funds}</p>
      <p>Funds: {currentUser.name}</p>

      {/* //TODO: input & button to capture funds input */}
    </div>
  );
});

export default UserPage;