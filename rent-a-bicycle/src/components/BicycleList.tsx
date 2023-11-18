import { observer } from "mobx-react-lite";
import { IBicycle } from "../store/models/Bicycle";

interface BicycleListProps {
    handleRowClick: (bicycle: IBicycle) => void;
    bicycles: IBicycle[];
}

export const BicycleList: React.FC<BicycleListProps> = observer(({ handleRowClick, bicycles }) => {
    return (
        <div className="bg-gray-100 sticky top-0 p-2 mb-4">
            <div className="max-h-[500px] overflow-y-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-200">
                        <tr >
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Lights</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {bicycles.map(bicycle => (
                            <tr className="cursor-pointer"
                                onClick={() => handleRowClick(bicycle)}
                                key={bicycle.id}>
                                <td className="px-6 py-4 text-start whitespace-nowrap">{bicycle.id}</td>
                                <td className="px-6 py-4 text-start whitespace-nowrap">{bicycle.status}</td>
                                <td className="px-6 py-4 text-start whitespace-nowrap">{bicycle.location}</td>
                                <td className="px-6 py-4 text-start whitespace-nowrap">{bicycle.lights ? 'On' : 'Off'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
});