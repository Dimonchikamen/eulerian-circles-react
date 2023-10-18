import { createContext } from "react";

export type TabContextProps = {
    tab: number;
    setTab: (newActiveTab: number) => void;
};

export const TabContext = createContext<TabContextProps>({
    tab: 0,
    setTab: () => {},
});