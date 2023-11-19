import { Instance, types } from "mobx-state-tree";
import { BicycleStore } from "./models/BicycleStore";
import { User } from "./models/User";

const RootStore = types.model("RootStore", {
    bicycleStore: BicycleStore,
    currentUser: User,
})

export interface IRootStore extends Instance<typeof RootStore> { }
export { RootStore };