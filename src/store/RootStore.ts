import { Instance, types } from "mobx-state-tree";
import { BicycleStore } from "./models/BicycleStore";
import { User } from "./models/User";

const RootStore = types.model("RootStore", {
    bicycleStore: BicycleStore,
    currentUser: types.optional(User, {id:-1, name:"", funds:-1, currentBicycleId: 0}),
})

export interface IRootStore extends Instance<typeof RootStore> { }
export { RootStore };