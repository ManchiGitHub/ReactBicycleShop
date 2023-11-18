import { flow } from "mobx";
import { Instance, applySnapshot, types } from "mobx-state-tree";
import { array } from "mobx-state-tree/dist/internal";

const Status = {
    FREE: "free",
    BUSY: "busy",
    BROKEN: "broken"
};

const bicycleStatus = types.enumeration("status", Object.values(Status));

export const Bicycle = types.model("Bicycle", {
    id: types.identifierNumber,
    lights: types.boolean,
    status: bicycleStatus,
    location: types.string,
    ip: types.string
}).actions(self => ({
    turnLightsOn() {

        self.lights = true;
    },
    turnLightsOff() {
        self.lights = false;
    },
    lock() {
        if (self.status === Status.BROKEN) {
            console.log(`can't lock bicycle ${self.id} because its broken.`);
            return;
        }

        if (self.status === Status.BUSY) {
            console.log(`this bicycle is busy and cannot be locked.`);
            return;
        }

        if (self.status === Status.FREE) {
            self.status = Status.BUSY;
        }
    },
    unlock() {
        if (self.status === Status.BROKEN) {
            console.log(`can't lock bicycle ${self.id} because its broken. bicycle id = ${self.id}`);
            return;
        }

        if (self.status === Status.FREE) {
            console.log(`this bicycle is not in use. bicycle id = ${self.id}`);
            return;
        }

        if (self.status === Status.BUSY) {
            self.status = Status.FREE;
        }
    },
    getStatus(): string {
        return self.status
    }
}))

export const BicycleStore = types.model({
    bicycles: types.array(Bicycle),
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
            console.log(results);

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

type IBicycle = Instance<typeof Bicycle>;
type IBicycleStore = Instance<typeof BicycleStore>;

export type { IBicycle, IBicycleStore };