import { Instance, applySnapshot, flow, types } from "mobx-state-tree";
import userService from "../../api/UsersAPI";

export const User = types.model("User", {
    id: types.number,
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
    }),
    addFunds: flow(function* (funds: string) {
        yield userService.addFundsToUser(self.id.toString(), parseInt(funds, 10))
        yield userService.fetchUser(self.id.toString())
            .then((results: any) => {
                if (results) {
                   applySnapshot(self,results);
                }
            })

    })
}))

type IUser = Instance<typeof User>;
export type { IUser }