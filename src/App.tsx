import EulerCircles from "./Components/EulerCircles/EulerCircles";
import PageHeader from "./Components/PageHeader/PageHeader";
import { css } from "@emotion/css";
import { useState } from "react";
import TableConstructor from "./Components/Table/Table";
import { TruthTable } from "./Types/TruthTable";

function App() {
  const [table, setTable] = useState<TruthTable|null>(null);

  const handleSubmit = (truthTable: TruthTable) => {
    setTable(truthTable);
  }

  return (
    <>
      <div className={styles.wrapper}>
        <PageHeader onSubmit={handleSubmit} />
        {table && table.variables.length > 0 && table.variables.length <= 4 &&  <EulerCircles table={table} />}
        {table && <TableConstructor headers={table.headers} data={table.body} />}
      </div>
    </>
  );
}

const styles = {
  wrapper: css`
    width: 90%;
    margin: 0 auto;
    height: 100vh;
  `,
};
export default App;
