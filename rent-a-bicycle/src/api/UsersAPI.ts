import { Network, RequestHeaders } from "./APIUtils";

const fetchUsers = async () => {
    try {
        const response = await fetch(Network.UsersEndpoint);
        const users = await response.json();
        console.log(`Server returned ${users.length} users`)
        return users;
    } catch (error) {
        console.log("error", error)
    }
}

interface UserDTO {
    id: number,
    name: string,
    funds: number
}

const fetchUser = async (userId: string) => {
    try {
        const response = await fetch(`${Network.UsersEndpoint}/${userId}`);
        const user: UserDTO = await response.json();
        console.log(`Server returned user ${user.name}`)
        return user;
    } catch (error) {
        console.log("error", error)
    }
}

const addFundsToUser = async (userId: string, fundsToAdd: number) => {
    try {
        const response = await fetch(`${Network.UsersEndpoint}/${userId}/addFunds`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fundsToAdd })
        });

        if (!response.ok) {
            console.log(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.log("error", error)
    }
}

const userService = {
    fetchUser, fetchUsers, addFundsToUser
}

export default userService;
export type { };
