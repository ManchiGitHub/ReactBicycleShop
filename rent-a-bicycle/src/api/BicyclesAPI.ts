import { IBicycle } from "../store/models/Bicycle";

const BicyclesAPI = {
    fetchBicycles: function* (): Generator<Promise<Response>, IBicycle[], any> {
        try {
            const response = yield fetch('./bicycles.json') as Promise<Response>;
            console.log(response);
            const bicycles: IBicycle[] = (yield response.json()) as IBicycle[];
            return bicycles;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};

export default BicyclesAPI;