import { Instance, applySnapshot, flow, types } from "mobx-state-tree";
import { Bicycle } from "./Bicycle";
import { User } from "./User";
import BicyclesAPI from "../../api/BicyclesAPI";
import UsersAPI from "../../api/UsersAPI";

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
        loadBicycles: flow(function* () {
            try {
                const bicycles = yield* BicyclesAPI.fetchBicycles();
                applySnapshot(self.bicycles, bicycles);
            } catch (error) {
                console.error("Failed to load bicycles:", error);
            }
        }),
        loadUsers: flow(function* () {
            try {
                const users = yield* UsersAPI.fetchUsers();
                applySnapshot(self.users, users);
            } catch (error) {
                console.log("error", error);
            }

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