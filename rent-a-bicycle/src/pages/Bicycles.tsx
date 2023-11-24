import { useEffect, useState } from "react";
import { userRootStore } from "../store/common/RootStoreContext"
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Dropdown, Ripple, initTE, Input } from "tw-elements";
import { IBicycle } from "../store/models/Bicycle";
import { ActionDropDown } from "../components/DropDownActions";
import { Searchbar } from "../components/Searchbar";
import { BicycleList } from "../components/BicycleList";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AddBicycleDialog } from "../components/AddBicycleDialog";

export const Bicycles = observer(() => {
    // State Hooks
    const { bicycleStore } = userRootStore();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBicycles, setSelectecBicycles] = useState<IBicycle[]>([]);

    // Effect Hooks
    useEffect(() => {
        bicycleStore.setNavtitle("Bicycles");
        initTE({ Dropdown, Ripple, Input });
    }, []);

    useEffect(() => {
        bicycleStore.setBicycleSearchQuery(searchTerm);
    }, [searchTerm]);

    // Event Handlers
    const handleRowClick = (item: IBicycle) => {
        navigate(`/bicycles/${item.id}`)
    };

    const handleSearchKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (searchTerm !== event.target.value) {
            setSearchTerm(event.target.value);
        }
    };

    const handleAddBicycles = () => {
        // for triggering the modal
        const modalTrigger = document.getElementById('modalTrigger');
        if (modalTrigger) {
            modalTrigger.click();
        } else {
            console.error('Modal trigger not found');
        }
    };

    const handleDialogSubmit = (location: string, ip: string) => {
        bicycleStore.addBicycle(location, ip);
    };

    return (
        <>
            <div className="flex">
                <ActionDropDown
                    turnOn={() => selectedBicycles.length === 0
                        ? toast.warning("Please first select the bicycles you want their lights turned on.")
                        : bicycleStore.turnLightsOn(selectedBicycles)}
                    turnOff={() => selectedBicycles.length === 0
                        ? toast.warning("Please first select the bicycles you want their lights turned off.")
                        : bicycleStore.turnLightsOff(selectedBicycles)}
                    addBicycles={handleAddBicycles}
                />
                <div id="modalTrigger" data-te-toggle="modal" data-te-target="#exampleModal" style={{ display: 'none' }}></div>
                <AddBicycleDialog onSubmit={handleDialogSubmit} />
                <ToastContainer position="top-center" hideProgressBar />
                <Searchbar hintText="Search bicycles by state" handleInputChangeEvent={handleSearchKeyChange} />
            </div>
            <BicycleList handleRowClick={handleRowClick} bicycles={bicycleStore.filteredBicycles} updateSelectedBicycles={setSelectecBicycles} />
        </>
    );
});
