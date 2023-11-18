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

export const Users = observer(() => {

    const userActions = [
        { label: "Action 1", action: () => console.log("User Action 1") },
        { label: "Action 2", action: () => console.log("User Action 2") }
    ];

    const { bicycleStore } = userRootStore();
    const navigate = useNavigate();

    const handleRowClick = (item: IBicycle) => {
        console.log('Row clicked', item);
        navigate(`/bicycles/${item.id}`)
    };

    const [searchTerm, setSearchTerm] = useState('');
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    useEffect(() => {
        bicycleStore.setSearchQuery(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        initTE({ Dropdown, Ripple, Input });
    }, []);

    useEffect(() => {
        bicycleStore.setNavtitle("Users");
    }, []);



    return (
        <>
            <div className="flex">
                <ActionDropDown actions={userActions} />
                <Searchbar
                    handleInputChangeEvent={handleInputChange} />
            </div>
            <BicycleList
                handleRowClick={handleRowClick}
                bicycles={bicycleStore.filteredBicycles} />
        </>
    )
});