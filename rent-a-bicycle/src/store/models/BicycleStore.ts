import { Instance, applySnapshot, flow, types } from "mobx-state-tree";
import { Bicycle, IBicycle } from "./Bicycle";
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
        }
    }))
    .actions(self => {

        function fetchAndUpdateBicycles() {
            return bicycleService.fetchBicycles().then((bicycles: any) => {
                if (bicycles) {
                    applySnapshot(self.bicycles, bicycles);
                }
            })
                .catch(error => console.error("Error fetching bicycles:", error));
        }

        return {
            fetchBicycles: flow(function* () {
                yield fetchAndUpdateBicycles();
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


        // fetchBicycles: flow(function* () {
        //     yield bicycleService.fetchBicycles().then((bicycles: any) => {
        //         try {
        //             if (bicycles) {
        //                 applySnapshot(self.bicycles, bicycles);
        //             }
        //         } catch (eror) {

        //         }
        //     })
        // }),
        // fetchUsers: flow(function* () {
        //     yield userService.fetchUsers().then((users: any) => {
        //         try {
        //             if (users) {
        //                 applySnapshot(self.users, users)
        //             }
        //         } catch (error) {

        //         }
        //     })
        // }),
        // turnLightsOff: flow(function* (bicycles: IBicycle[]) {
        //     try {
        //         yield bicycleService.updateBicycleLights(bicycles, false);
        //         yield bicycleService.fetchBicycles().then((bicycles: any) => {
        //             try {
        //                 if (bicycles) {
        //                     applySnapshot(self.bicycles, bicycles);
        //                 }
        //             } catch (eror) {

        //             }
        //         })
        //     } catch (error) {
        //         console.error("Failed to turn on all lights:", error);
        //     }
        // }),
        // turnLightsOn: flow(function* (bicycles: IBicycle[]) {
        //     try {
        //         yield bicycleService.updateBicycleLights(bicycles, true);
        //         yield bicycleService.fetchBicycles().then((bicycles: any) => {
        //             try {
        //                 if (bicycles) {
        //                     applySnapshot(self.bicycles, bicycles);
        //                 }
        //             } catch (error) {
        //                 console.log("Error while turning lights on", error);
        //             }
        //         })
        //     } catch (error) {
        //         console.error("Failed to turn on all lights:", error);
        //     }
        // }),
        // setBicycleSearchQuery(query: string) {
        //     self.searchBicycleQuery = query;
        // },
        // setUserSearchQuery(query: string) {
        //     self.searchUserQuery = query;
        // },
        // setNavtitle(title: string) {
        //     self.navigationTitle = title;
        // }
    });

type IBicycleStore = Instance<typeof BicycleStore>;
export type { IBicycleStore };