import { IUser } from "../store/models/User";


const UsersAPI = {
    fetchUsers: function* (): Generator<Promise<Response>, IUser[], any> {
        try {
            const response = yield fetch('./users.json') as Promise<Response>;
            const users: IUser[] = (yield response.json()) as IUser[];
            return users;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }
};

export default UsersAPI;