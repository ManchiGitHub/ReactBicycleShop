import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userRootStore } from '../store/common/RootStoreContext';
import { Input, initTE } from "tw-elements";
import { observer } from 'mobx-react-lite';
import { onSnapshot } from 'mobx-state-tree';
import { RentBicycleDialog } from '../components/RentBicycleDialog';
import { IBicycle } from '../store/models/Bicycle';

interface UserPageParams {
  onAddFunds: () => void;
}

const UserPage: React.FC = observer(() => {
  const params = useParams<{ userId: string }>();
  const userId = params.userId;
  const { currentUser, bicycleStore } = userRootStore();

  const [fundsValue, setFundsValue] = useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFundsValue(event.target.value);
  };

  const handleRentBicyleClick = (bicycle: IBicycle) => {
    bicycle.use();
  }

  useEffect(() => {
    if (userId) {
      currentUser.loadUser(parseInt(userId, 10)).then(() => {
        bicycleStore.setNavtitle(currentUser.name);
      });
    }
  }, [currentUser, userId]);

  useEffect(() => {
    initTE({ Input }, { allowReinits: true });
  }, []);

  return (
    <div className='p-4'>
      <div>
        <p>User ID: {currentUser.id}</p>
        <p>Funds: {currentUser.funds}</p>
        <p>{currentUser.name} is using bicycle 2 (mock)</p>
      </div>
      <div className='flex items-center my-3'>
        <button
          onClick={() => currentUser.addFunds(fundsValue)}
          type="button"
          className="inline-block rounded bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
          Add
        </button>
        <div className="relative mx-3 " data-te-input-wrapper-init>
          <input
            type="number"
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="fundsInput"
            placeholder="Example label"
            onChange={handleInputChange}
          />
          <label
            htmlFor="exampleFormControlInputNumber"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >Add funds
          </label>
        </div>
      </div>
      <button
        type="button"
        data-te-toggle="modal"
        data-te-target="#rentBicycleModel"
        data-te-ripple-init
        data-te-ripple-color="light"
        className="inline-block rounded bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
        Rent a bicycle
      </button>
      <RentBicycleDialog
        bicycles={bicycleStore.freeBicycles}
        onRent={handleRentBicyleClick} />
    </div>

  );
});

export default UserPage;