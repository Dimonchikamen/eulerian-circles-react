import { useContext } from "react";
import useLocalStorage from "use-local-storage";
import { EulerCirclesPage } from "Components/EulerCirclesPage/EulerCirclesPage";
import LogicalSolverPage from "Components/LogicalSolverPage/LogicalSolverPage";
import s from "./App.module.css";
import Navbar from "Components/Navbar/Navbar";
import { TabContent} from "react-bootstrap";
import TabPane from "react-bootstrap/esm/TabPane";
import TabContainer from "react-bootstrap/esm/TabContainer";
import { TabContext } from "providers/TabProvider/TabContext";

function App() {
    const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [theme, setTheme] = useLocalStorage(
        "theme",
        defaultDark ? "dark" : "light"
    );
    const {tab} = useContext(TabContext);

    const switchTheme = (theme: string) => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    return (
        <div className={s.app} data-theme={theme}>
            <Navbar switchTheme={switchTheme} theme={theme} />
            <div className={s.content}>
                <TabContainer defaultActiveKey={0} activeKey={tab}>
                    <TabContent>
                        <TabPane title={"Эйлеровые круги"} eventKey={0}>
                            <EulerCirclesPage theme={theme} />
                        </TabPane>
                        <TabPane title={"Логический решатель"} eventKey={1}>
                            <LogicalSolverPage theme={theme} />
                        </TabPane>
                    </TabContent>
                </TabContainer>
            </div>
        </div>
    );
}

export default App;
