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

export const Bicycles = observer(() => {

    const { bicycleStore } = userRootStore();

    const bicycleActions = [
        { label: "Turn Lights on", action: bicycleStore.turnAllLightsOn },
        { label: "Turn lights off", action: bicycleStore.turnAllLightsOff }
    ];

    const navigate = useNavigate();
    const handleRowClick = (item: IBicycle) => {
        console.log('Row clicked', item);
        navigate(`/bicycles/${item.id}`)
    };

    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        bicycleStore.setNavtitle("Bicycles");
    }, []);

    useEffect(() => {
        bicycleStore.setBicycleSearchQuery(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        initTE({ Dropdown, Ripple, Input });
    }, []);

    return (
        <>
            <div className="flex">
                <ActionDropDown actions={bicycleActions} />
                <Searchbar hintText="Search bicycles by state" handleInputChangeEvent={handleSearchKeyChange} />
            </div>
            <BicycleList handleRowClick={handleRowClick} bicycles={bicycleStore.filteredBicycles} />
        </>
    )
});