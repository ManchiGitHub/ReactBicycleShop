import { IBicycle } from "../store/models/Bicycle";

const fetchBicycles = async () => {
    try {
        const response = await fetch('http://localhost:3000/bicycles');
        console.log("server returned response", response.ok)
        const bicycles: IBicycle[] = await response.json()
        console.log("server returned bicycles", bicycles)
        return bicycles;
    } catch (error) {
        console.log("error:", error)
        throw error;
    }
}

const bicycleService = {
    fetchBicycles
}

export default bicycleService;
export type {};