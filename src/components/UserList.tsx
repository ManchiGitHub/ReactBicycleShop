import { observer } from "mobx-react-lite";
import { IUser } from "../store/models/User";

interface UserListProps {
    handleRowClick: (bicycle: IUser) => void;
    users: IUser[];
}

export const UserList: React.FC<UserListProps> = observer(({ handleRowClick, users }) => {
    return (
        <div className="bg-gray-100 sticky top-0 p-2 mb-4">
            <div className="max-h-[500px] overflow-y-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-200">
                        <tr >
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (
                            <tr className="cursor-pointer"
                                onClick={() => handleRowClick(user)}
                                key={user.id}>
                                <td className="px-6 py-4 text-start whitespace-nowrap">{user.id}</td>
                                <td className="px-6 py-4 text-start whitespace-nowrap">{user.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
});