import { FC, ReactNode, useMemo, useState } from "react";
import { TabContext } from "./TabContext";

interface ITabProviderProps {
    defaultState?: number;
    children: ReactNode;
}

export const TabProvider: FC<ITabProviderProps> = ({ defaultState = 0, children }) => {
    const [tab, setTab] = useState<number>(defaultState);
    const defaultProps = useMemo(() => ({
        tab, 
        setTab
    }), [tab]);

    return <TabContext.Provider value={defaultProps}>{children}</TabContext.Provider>;
}