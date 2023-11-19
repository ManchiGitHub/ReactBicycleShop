import { useEffect, useState } from "react";
import { userRootStore } from "../store/common/RootStoreContext"
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Searchbar } from "../components/Searchbar";
import { IUser } from "../store/models/User";
import { UserList } from "../components/UserList";
import { Dropdown, Ripple, initTE, Input } from "tw-elements";

export const Users = observer(() => {

    const { bicycleStore } = userRootStore();
    const navigate = useNavigate();

    const handleRowClick = (user: IUser) => {
        navigate(`/users/${user.id}`)
    };

    const [searchTerm, setSearchTerm] = useState('');
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    useEffect(() => {
        bicycleStore.setUserSearchQuery(searchTerm);
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
                <Searchbar
                    hintText="Search users"
                    handleInputChangeEvent={handleInputChange} />
            </div>
            <UserList
                handleRowClick={handleRowClick}
                users={bicycleStore.filteredUsers} />
        </>
    )
});