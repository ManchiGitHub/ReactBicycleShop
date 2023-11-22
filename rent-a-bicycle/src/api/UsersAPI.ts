import { Network, RequestHeaders } from "./APIUtils";

const fetchUsers = async () => {
    try {
        const response = await fetch(Network.UsersEndpoint, RequestHeaders.BypassGrokLandingPageHeader);
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

const fetchUser = async (id: string) => {
    try {
        const response = await fetch(`${Network.UsersEndpoint}/${id}`, RequestHeaders.BypassGrokLandingPageHeader);
        const user: UserDTO = await response.json();
        console.log(`Server returned user ${user.name}`)
        return user;
    } catch (error) {
        console.log("error", error)
    }
}

const userService = {
    fetchUser, fetchUsers
}

export default userService;
export type { };
