import { Instance, applySnapshot, flow, types } from "mobx-state-tree";
import userService from "../../api/UsersAPI";

export const User = types.model("User", {
    id: types.number,
    name: types.string,
    funds: types.number,
    currentBicycleId: types.number
})
    .views(self => ({
        get currentBicycle() {
            console.log("wht??")
            return self.currentBicycleId
        }
    }))
    .actions(self => {

        const fetchAndUpdateUser = async (userId: string) => {
            const result = await userService.fetchUser(userId);
            try {
                if (result) {
                    applySnapshot(self, result);
                }
            } catch (error) {
                console.log("error applying snapshot", error);
            }
        };

        return {
            loadUser: flow(function* (id: number) {
                yield fetchAndUpdateUser(id.toString());
            }),

            addFunds: flow(function* (funds: string) {
                yield userService.addFundsToUser(self.id.toString(), parseInt(funds, 10));
                yield fetchAndUpdateUser(self.id.toString());
            })
        };
    });

type IUser = Instance<typeof User>;
export type { IUser }