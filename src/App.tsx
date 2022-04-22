import EulerCircles from "./Components/EulerCircles/EulerCircles";
import PageHeader from "./Components/PageHeader/PageHeader";
import { css } from "@emotion/css";
import { useState } from "react";
import TableConstructor from "./Components/Table/Table";
import { TruthTable } from "./Types/TruthTable";

function App() {
  const [table, setTable] = useState<TruthTable | null>(null);

  const handleSubmit = (truthTable: TruthTable) => {
    setTable(truthTable);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <PageHeader onSubmit={handleSubmit} />
        <div
          className={
            table && table.variables.length > 0 && table.variables.length <= 4
              ? styles.circles
              : styles.noCircles
          }
        >
          {table &&
            table.variables.length > 0 &&
            table.variables.length <= 4 && <EulerCircles table={table} />}
          {table && (
            <TableConstructor headers={table.headers} data={table.body} />
          )}
          {!table && (
            <div className={styles.infoHelp}>
              <span style={{ fontSize: "19px" }}>&#128712;</span> Введите
              что-нибудь, чтобы получить круги Эйлера (до 4-х переменных) и
              таблицу истинности
            </div>
          )}
        </div>
      </div>
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
