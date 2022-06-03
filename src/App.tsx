import PageHeader from "./Components/PageHeader/PageHeader";
import { css } from "@emotion/css";
import { useState } from "react";
import useLocalStorage from "use-local-storage";
import TableConstructor from "./Components/Table/Table";
import { TruthTable } from "./Types/TruthTable";
import { EulerCirclesPage } from "Components/EulerCirclesPage/EulerCirclesPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import LogicalSolverPage from "Components/LogicalSolverPage/LogicalSolverPage";
import s from "./App.module.css";
import Navbar from "Components/Navbar/Navbar";

function App() {
  const [table, setTable] = useState<TruthTable | null>(null);

  const handleSubmit = (truthTable: TruthTable) => {
    setTable(truthTable);
  };
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
            <Route
              path="/euler_circle"
              element={<EulerCirclesPage theme={theme} />}
            />
            <Route path="/logical_solver" element={<LogicalSolverPage />} />
            {/* <Route path="*" element={<Navigate to="/euler_circle" />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

const styles = {
  wrapper: css`
    width: 80%;
    margin: 0 auto;
    height: 100vh;
  `,
  circles: css`
    @media (min-width: 1000px) {
      display: flex;
      gap: 20px;
    }
  `,
  noCircles: css``,
  infoHelp: css`
    font-size: 18px;
    text-transform: uppercase;
    margin-top: 1rem;
    display: inline-block;
    @media (max-width: 600px) {
      font-size: 16px;
    }
  `,
};
export default App;
