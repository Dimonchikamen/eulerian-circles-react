import useLocalStorage from "use-local-storage";
import { EulerCirclesPage } from "Components/EulerCirclesPage/EulerCirclesPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LogicalSolverPage from "Components/LogicalSolverPage/LogicalSolverPage";
import s from "./App.module.css";
import Navbar from "Components/Navbar/Navbar";

function App() {
    const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [theme, setTheme] = useLocalStorage(
        "theme",
        defaultDark ? "dark" : "light"
    );

    const switchTheme = (theme: string) => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    return (
        <div className={s.app} data-theme={theme}>
            <BrowserRouter>
                <Navbar switchTheme={switchTheme} theme={theme} />
                <div className={s.content}>
                    <Routes>
                        <Route path="/Eulerian_Circles" element={<EulerCirclesPage theme={theme} />} />
                        <Route path="/Logical_Solver" element={<LogicalSolverPage theme={theme} />} />
                        <Route path="*" element={<Navigate to="/Euler_Circles" />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
