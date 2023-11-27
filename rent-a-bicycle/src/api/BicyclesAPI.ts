import { IBicycle } from "../store/models/Bicycle";
import { Network, RequestHeaders } from "./APIUtils";

const fetchBicycles = async () => {
    try {
        const response = await fetch(Network.BicyclesEndpoint);
        const bicycles: IBicycle[] = await response.json()
        console.log(`Server returned ${bicycles.length} bicycles`)
        return bicycles;
    } catch (error) {
        console.log("error fetching bicycles", error)
        throw error;
    }
}

const fetchLastBicyleId = async () => {
    try {
        const response = await fetch(`${Network.BicyclesEndpoint}/last-bicycle-id`);
        const lastBicycleId = await response.json()
        return lastBicycleId.lastId;
    } catch (error) {
        console.log("error fetching bicycles", error)
        throw error;
    }
}

const addBicycle = async (id: number, location: string, ip: string) => {
    try {
        const response = await fetch(`${Network.BicyclesEndpoint}/addBicycle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newBicycle: {
                    id: id,
                    lights: false,
                    status: "free",
                    location,
                    ip,
                    currentUserId: null
                }
            })
        });
        const result = await response.json();
        console.log('Bicycle added:', result);
        return response;
    } catch (error) {
        console.error('Error adding bicycle:', error);
        throw error;
    }
};

const operateBicycle = async (bicycleId: number, userId: number, isLock: boolean) => {
    try {
        console.log("attempt lock")
        const response = await fetch(`${Network.BicyclesEndpoint}/lock-bicycle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bicycleId: bicycleId,
                userId: userId,
                lockBicycle: isLock
            })
        });

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        return true
    } catch (error) {
        console.error(`Error locking bicycle with ID ${bicycleId}`, error);
        return false;
    }
};

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
    fetchBicycles,
    updateBicycleLights,
    fetchLastBicyleId,
    addBicycle, operateBicycle
};

export default bicycleService;
export type { };