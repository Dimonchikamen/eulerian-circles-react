import PageHeader from "./Components/PageHeader/PageHeader";
import { css } from "@emotion/css";
import { useState } from "react";
import TableConstructor from "./Components/Table/Table";
import { TruthTable } from "./Types/TruthTable";
import { EulerCirclesPage } from "Components/EulerCirclesPage/EulerCirclesPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";

function App() {
  const [table, setTable] = useState<TruthTable | null>(null);

  const handleSubmit = (truthTable: TruthTable) => {
    setTable(truthTable);
  };

  return (
    <>
    <Tabs>
      <Tab title="Эйлеровые круги"></Tab>
      <Tab title='Логический решатель'></Tab>
    </Tabs>
    <BrowserRouter>
      <Routes>
        <Route path="/euler_circle" element={<EulerCirclesPage />} />
        <Route path="/logical_solver"  element={<EulerCirclesPage />}  />
        <Route path='*' element={<Navigate to='/euler_circle' />} />
      </Routes>
    </BrowserRouter>
    </>
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
    color: rgb(91, 91, 91);
    margin-top: 1rem;
    display: inline-block;
    @media (max-width: 600px) {
      font-size: 16px;
    }
  `,
};
export default App;
