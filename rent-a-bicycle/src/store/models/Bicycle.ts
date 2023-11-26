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
    ip: types.string,
    currentUserId: types.number
}).actions(self => {

    const lock = async (userId: number): Promise<boolean> => {
        return await bicycleService.operateBicycle(self.id, userId, true);
    }

    const unlock = async (userId: number): Promise<boolean> => {
        return await bicycleService.operateBicycle(self.id, userId, false);
    }

    return {
        turnLightsOn() {
            self.lights = true;
        },
        turnLightsOff() {
            self.lights = false;
        },
        start: flow(function* (userId: any) {
            if (userId) {
                const isSuccessfulLock = yield lock(parseInt(userId));
                self.status = isSuccessfulLock ? Status.BUSY : self.status
            }
        }),
        stop: flow(function* (userId: any) {
            if (userId) {
                const isSuccessfulLock = yield unlock(parseInt(userId));
                self.status = isSuccessfulLock ? Status.BUSY : self.status
            }
        }),
        getStatus(): string {
            return self.status
        }
    }
});


type IBicycle = Instance<typeof Bicycle>;
export type { IBicycle };