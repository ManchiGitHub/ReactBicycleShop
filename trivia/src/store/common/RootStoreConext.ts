import { Instance } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { RootStore } from "../RootStore";

const RootStoreContext = createContext<Instance<typeof RootStore> | null>(null);

export const RootStoreProvider = RootStoreContext.Provider;

export const useRootStore = () => {
    const store = useContext(RootStoreContext);
    if (store == null) {
        throw new Error("Store cannot be null, please add a context provider");
    }
    return store;
}

export default RootStoreContext;