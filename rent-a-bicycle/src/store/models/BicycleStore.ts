import { Instance, applySnapshot, flow, types } from "mobx-state-tree";
import { Bicycle, IBicycle, Status } from "./Bicycle";
import { User } from "./User";
import userService from "../../api/UsersAPI";
import bicycleService from "../../api/BicyclesAPI";

export const BicycleStore = types.model({
    bicycles: types.array(Bicycle),
    users: types.array(User),
    searchBicycleQuery: types.optional(types.string, ''),
    searchUserQuery: types.optional(types.string, ''),
    navigationTitle: types.string
})
    .views(self => ({
        get filteredBicycles() {
            console.log("Calculating filteredBicycles");
            const results = self.bicycles.filter(bicycle =>
                bicycle.status.toLocaleLowerCase().includes(self.searchBicycleQuery.toLocaleLowerCase()));

            if (results.length === 0) {
                return [...self.bicycles].sort((a, b) => a.id - b.id);
            }

            return results.sort((a, b) => a.id - b.id);
        },
        get filteredUsers() {
            const results = self.users.filter(user =>
                user.name.toLocaleLowerCase().includes(self.searchUserQuery.toLocaleLowerCase()));

            return results;
        },
        get freeBicycles() {
            const results = self.bicycles.filter(bicycle => bicycle.status.toLocaleLowerCase() == Status.FREE);
            return results;
        }
    }))
    .actions(self => {

        const fetchAndUpdateBicycles = async () => {
            try {
                const bicycles = await bicycleService.fetchBicycles();
                if (bicycles) {
                    applySnapshot(self.bicycles, bicycles);
                } else {
                    throw new Error("bicycles not found");
                }
            } catch (error) {
                console.error("Error fetching bicycles:", error);
            }
        };

        const getnewBicycleID = async () => {
            const lastBicycleId: number = await bicycleService.fetchLastBicyleId();
            return lastBicycleId + 1;
        }

        return {
            fetchBicycles: flow(function* () {
                yield fetchAndUpdateBicycles();
            }),
            addBicycle: flow(function* (location: string, ip: string) {
                try {
                    const lastBicycleId = yield getnewBicycleID();
                    if (lastBicycleId) {
                        const addResult = yield bicycleService.addBicycle(lastBicycleId, location, ip);
                        if (addResult.ok) {
                            // Fetch and update the bicycles list after successful addition
                            yield fetchAndUpdateBicycles();
                        }
                    }
                } catch (error) {
                    console.error("Error adding bicycle:", error);
                }
            }),
            turnLightsOff: flow(function* (bicycles: IBicycle[]) {
                try {
                    yield bicycleService.updateBicycleLights(bicycles, false);
                    yield fetchAndUpdateBicycles();
                } catch (error) {
                    console.error("Failed to turn off lights:", error);
                }
            }),
            turnLightsOn: flow(function* (bicycles: IBicycle[]) {
                try {
                    yield bicycleService.updateBicycleLights(bicycles, true);
                    yield fetchAndUpdateBicycles();
                } catch (error) {
                    console.error("Failed to turn on lights:", error);
                }
            }),
            fetchUsers: flow(function* () {
                yield userService.fetchUsers().then((users: any) => {
                    try {
                        if (users) {
                            applySnapshot(self.users, users)
                        }
                    } catch (error) {
                        console.log("error", error);
                    }
                })
            }),
            setBicycleSearchQuery(query: string) {
                self.searchBicycleQuery = query;
            },
            setUserSearchQuery(query: string) {
                self.searchUserQuery = query;
            },
            setNavtitle(title: string) {
                self.navigationTitle = title;
            }
        }
    });

type IBicycleStore = Instance<typeof BicycleStore>;
export type { IBicycleStore };