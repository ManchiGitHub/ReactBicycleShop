import { IBicycle } from "../store/models/Bicycle";
import { Network, RequestHeaders } from "./APIUtils";

const fetchBicycles = async () => {
    try {
        const response = await fetch(Network.BicyclesEndpoint);
        const bicycles: IBicycle[] = await response.json()
        console.log(`Server returned ${bicycles.length}/bicycles`)
        return bicycles;
    } catch (error) {
        console.log("error fetching bicycles", error)
        throw error;
    }
}

const updateBicycleLights = async (bicycles: IBicycle[], lightsOn: Boolean) => {
    try {
        const bicycleIds = bicycles.map(bicycle => bicycle.id);
        await fetch(`${Network.BicyclesEndpoint}/updateLights`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify({ bicycles: bicycleIds, lightsOn })
        });
    } catch (error) {
        console.error('Error updating bicycles:', error);
        throw error;
    }
};

const bicycleService = {
    fetchBicycles, updateBicycleLights
}

export default bicycleService;
export type { };