import { Instance, applySnapshot, flow, types } from "mobx-state-tree";
import { Bicycle } from "./Bicycle";
import BicyclesAPI from "../../api/BicyclesAPI";
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
    .actions(self => ({
        fetchBicycles: flow(function* () {
            yield bicycleService.fetchBicycles().then((bicycles: any) => {
                try {
                    if (bicycles) {
                        applySnapshot(self.bicycles, bicycles);
                    }
                } catch (eror) {

                }
            })
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
        turnAllLightsOff() {
            const turnedOffBicycles = self.bicycles.map(bicycle => ({
                ...bicycle,
                lights: false
            }));
            applySnapshot(self.bicycles, turnedOffBicycles);
        },
        turnAllLightsOn: flow(function* () {
            const turnedOffBicycles = self.bicycles.map(bicycle => ({
                ...bicycle,
                lights: true
            }));
            applySnapshot(self.bicycles, turnedOffBicycles);
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
    }))

type IBicycleStore = Instance<typeof BicycleStore>;
export type { IBicycleStore };