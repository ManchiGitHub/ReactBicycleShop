import { useEffect, useState } from "react";
import { userRootStore } from "../store/common/RootStoreContext"
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import {
    Dropdown,
    Ripple,
    initTE,
    Input
} from "tw-elements";
import { IBicycle } from "../store/models/Bicycle";
import { ActionDropDown } from "../components/DropDownActions";
import { Searchbar } from "../components/Searchbar";
import { BicycleList } from "../components/BicycleList";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Bicycles = observer(() => {

    useEffect(() => {
        bicycleStore.setNavtitle("Bicycles");
    }, []);

    const { bicycleStore } = userRootStore();
    const navigate = useNavigate();
    const handleRowClick = (item: IBicycle) => {
        navigate(`/bicycles/${item.id}`)
    };

    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        bicycleStore.setBicycleSearchQuery(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        initTE({ Dropdown, Ripple, Input }, { alowReinits: true });
    }, []);

    const [selectedBicycles, setSelectecBicycles] = useState<IBicycle[]>([]);

    return (
        <>
            <div className="flex">
                <ActionDropDown
                    turnOn={() => {
                        if (selectedBicycles.length === 0) {
                            toast.warning("Please first select the bicycles you want their lights turned on.");
                        }
                        bicycleStore.turnLightsOn(selectedBicycles);
                    }}
                    turnOff={() => {
                        if (selectedBicycles.length === 0) {
                            toast.warning("Please first select the bicycles you want their lights turned off.");
                        }
                        bicycleStore.turnLightsOff(selectedBicycles);
                    }}
                />
                <ToastContainer
                    position="top-center"
                    hideProgressBar
                />
                <Searchbar hintText="Search bicycles by state" handleInputChangeEvent={handleSearchKeyChange} />
            </div>

            <BicycleList handleRowClick={handleRowClick} bicycles={bicycleStore.filteredBicycles} updateSelectedBicycles={setSelectecBicycles} />
        </>
    )
});