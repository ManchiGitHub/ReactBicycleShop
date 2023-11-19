import { Instance, applySnapshot, flow, types } from "mobx-state-tree";
import userService from "../../api/UsersAPI";

export const User = types.model("User", {
    id: types.identifierNumber,
    name: types.string,
    funds: types.number
}).actions(self => ({
    loadUser: flow(function* (userId: string) {
        yield userService.fetchUser(userId)
            .then((result: any) => {
                if (result) {
                    applySnapshot(self, result);
                }
            })
    })

}))

type IUser = Instance<typeof User>;
export type { IUser }