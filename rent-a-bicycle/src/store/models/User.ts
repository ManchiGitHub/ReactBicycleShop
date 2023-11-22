import { Instance, applySnapshot, flow, types } from "mobx-state-tree";
import userService from "../../api/UsersAPI";

export const User = types.model("User", {
    id: types.number,
    name: types.string,
    funds: types.number
}).actions(self => {
    // Helper function to fetch and apply user data
    function fetchAndUpdateUser(userId: string) {
        return userService.fetchUser(userId)
            .then((result: any) => {
                if (result) {
                    applySnapshot(self, result);
                }
            });
    }

    return {
        loadUser: flow(function* (userId: string) {
            yield fetchAndUpdateUser(userId);
        }),

        addFunds: flow(function* (funds: string) {
            yield userService.addFundsToUser(self.id.toString(), parseInt(funds, 10));
            yield fetchAndUpdateUser(self.id.toString());
        })
    };
});

type IUser = Instance<typeof User>;
export type { IUser }