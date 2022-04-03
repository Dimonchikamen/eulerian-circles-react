import "./App.css";
import EulerCircles from "./Components/EulerCircles/EulerCircles";
import PageHeader from "./Components/PageHeader/PageHeader";
import { css } from "@emotion/css";
import { useState } from "react";
import { Interpretator } from "./Helpers/ExpressionInterpretator";
import TableConstructor from "./Components/Table/Table";

function App() {
  const [inputValue, setValue] = useState("");
  const [table, setTable] = useState<any>(null);
  const handleChange = (newValue: string) => {
    try {
      const a = Interpretator.getTruthTable(newValue);
      setTable(a);
      console.log(a);
    }
    catch (e)
    {
      console.log(e);
    }
    setValue(newValue);

  }

  return (
    <>
      <div className={styles.wrapper}>
        <PageHeader inputValue={inputValue} onChange={handleChange}/>
        <EulerCircles /> 
        {table &&<TableConstructor headers={table.slice(0,1)[0]} data={table.slice(1)}/>} 
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
