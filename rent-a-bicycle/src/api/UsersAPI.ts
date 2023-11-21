import { IUser } from "../store/models/User";

const fetchUsers = async () => {
    try {
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();
        console.log("server returned users", users);
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
        const response = await fetch('http://localhost:3000/users');
        const users: UserDTO[] = await response.json();
        const user = users.find(user => user.id.toString() === id);
        console.log("server returned user", user);
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
