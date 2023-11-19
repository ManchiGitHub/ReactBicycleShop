import { Instance, applySnapshot, flow, types } from "mobx-state-tree";
import { Bicycle } from "./Bicycle";
import { User } from "./User";

export const BicycleStore = types.model({
    bicycles: types.array(Bicycle),
    users: types.array(User),
    searchQuery: types.optional(types.string, ''),
    navigationTitle: types.string
})
    .views(self => ({
        get filteredBicycles() {
            const results = self.bicycles.filter(bicycle =>
                bicycle.status.toLocaleLowerCase().includes(self.searchQuery.toLocaleLowerCase()))

            if (results.length === 0) {
                return [...self.bicycles].sort((a, b) => a.id - b.id);
            }

            return results.sort((a, b) => a.id - b.id);
        }
    }))
    .actions(self => ({
        loadBicycles: flow(function* () {
            try {
                const response = yield fetch('./bicycles.json');
                const bicycles = yield response.json();
                applySnapshot(self.bicycles, bicycles);
            } catch (error) {
                console.log("error", error);
            }
        }),
        loadUsers: flow(function* () {
            try {
                const response = yield fetch('./users.json');
                const users = yield response.json();
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
        setSearchQuery(query: string) {
            self.searchQuery = query;
        },
        setNavtitle(title: string) {
            self.navigationTitle = title;
        }
    }))

type IBicycleStore = Instance<typeof BicycleStore>;
export type { IBicycleStore };