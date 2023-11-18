import { Instance, types } from "mobx-state-tree";
import { BicycleStore } from "./models/Bicycle";

const RootStore = types.model("RootStore", {
    bicycleStore: BicycleStore,
});

export interface IRootStore extends Instance<typeof RootStore> { }
export { RootStore };