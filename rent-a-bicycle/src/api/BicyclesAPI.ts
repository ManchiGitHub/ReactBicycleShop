import { IBicycle } from "../store/models/Bicycle";
import { Network, RequestHeaders } from "./APIUtils";

const fetchBicycles = async () => {
    try {
        const response = await fetch(Network.BicyclesEndpoint, RequestHeaders.BypassGrokLandingPageHeader);
        const bicycles: IBicycle[] = await response.json()
        console.log(`Server returned ${bicycles.length} bicycles`)
        return bicycles;
    } catch (error) {
        console.log("error fetching bicycles", error)
        throw error;
    }
}

const updateBicycleLights = async (bicycles: IBicycle[] ,lightsOn: Boolean) => {
    try {
        for (const bicycle of bicycles) {
            const promise = fetch(`${Network.BicyclesEndpoint}/${bicycle.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({ lights: lightsOn })
            })
            await promise;
        }
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