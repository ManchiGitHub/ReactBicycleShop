import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { IBicycle } from "../store/models/Bicycle";

interface BicycleListProps {
    handleRowClick: (bicycle: IBicycle) => void;
    updateSelectedBicycles: (bicycles: IBicycle[]) => void
    bicycles: IBicycle[];
}

export const BicycleList: React.FC<BicycleListProps> = observer(({ handleRowClick, updateSelectedBicycles, bicycles }) => {

    const {
        selectedBicycles,
        handleCheckBoxChange,
        handleAllCheckBoxChange,
        isBicycleSelected,
        isAllChecked
    } = useBicycleSelection(bicycles);

    useEffect(() => {
        if (selectedBicycles.length > 0) {
            updateSelectedBicycles(selectedBicycles);
        }
    }, [selectedBicycles])

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
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <input
                                    type="checkbox"
                                    onChange={handleAllCheckBoxChange}
                                    checked={isAllChecked} />
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {bicycles.map(bicycle => (
                            <tr
                                key={bicycle.id}>
                                <td
                                    onClick={() => handleRowClick(bicycle)}
                                    className="px-6 py-4 text-start whitespace-nowrap cursor-pointer">{bicycle.id}</td>
                                <td className="px-6 py-4 text-start whitespace-nowrap">{bicycle.status}</td>
                                <td className="px-6 py-4 text-start whitespace-nowrap">{bicycle.location}</td>
                                <td className="px-6 py-4 text-start whitespace-nowrap">{bicycle.lights ? 'On' : 'Off'}</td>
                                <td className="px-6 py-4 text-start whitespace-nowrap">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => handleCheckBoxChange(bicycle, e.target.checked)}
                                        checked={isBicycleSelected(bicycle)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
});


const useBicycleSelection = (bicycles: IBicycle[]) => {
    const [selectedBicycles, setSelectedBicycles] = useState<IBicycle[]>([]);
    const [isAllChecked, setAllChecked] = useState(false);

    const handleCheckBoxChange = (bicycle: IBicycle, isChecked: boolean) => {
        setSelectedBicycles(prev =>
            isChecked ? [...prev, bicycle] : prev.filter(b => b.id !== bicycle.id)
        );
    };

    const handleAllCheckBoxChange = () => {
        setSelectedBicycles(selectedBicycles.length === bicycles.length ? [] : [...bicycles]);
    };

    const isBicycleSelected = (bicycle: IBicycle) => selectedBicycles.some(b => b.id === bicycle.id);

    useEffect(() => {
        setAllChecked(selectedBicycles.length === bicycles.length && bicycles.length !== 0);
    }, [selectedBicycles, bicycles]);

    return { selectedBicycles, handleCheckBoxChange, handleAllCheckBoxChange, isBicycleSelected, isAllChecked };
};