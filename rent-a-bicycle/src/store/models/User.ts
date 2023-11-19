import { Instance, applySnapshot, types } from "mobx-state-tree";

export const User = types.model("User", {
    id: types.identifierNumber,
    name: types.string
})

type IUser = Instance<typeof User>;
export type { IUser };