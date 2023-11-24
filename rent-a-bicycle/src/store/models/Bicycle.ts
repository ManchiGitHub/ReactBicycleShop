import { Instance, applySnapshot, flow, types } from "mobx-state-tree";
import bicycleService from "../../api/BicyclesAPI";

export const Status = {
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
}).actions(self => {

    const lock = async (): Promise<boolean> => {
        const isSuccessfulLock: boolean = await bicycleService.lockBicycle(self.id, true);
        return isSuccessfulLock;
    }

    return {
        turnLightsOn() {
            self.lights = true;
        },
        turnLightsOff() {
            self.lights = false;
        },
        use: flow(function* () {

            if (self.status === Status.BROKEN) {
                console.log(`can't lock bicycle ${self.id} because its broken.`);
                return;
            }

            if (self.status === Status.BUSY) {
                console.log(`this bicycle is busy and cannot be locked.`);
                return;
            }

            if (self.status === Status.FREE) {
                const isSuccessfulLock = yield lock();
                self.status = isSuccessfulLock? Status.BUSY : self.status
            }
        }),
        stopUse() {
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
    }
});


type IBicycle = Instance<typeof Bicycle>;
export type { IBicycle };