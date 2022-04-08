import { createRef, useState } from "react";
import { Operation } from "../../Shared/Orepations";
import styles from "./PageHeader.module.css";
import SymbolButton from "../../UiKit/SymbolButton/SymbolButton";
import { Button } from "react-bootstrap";
import { TruthTable } from "../../Types/TruthTable";
import { Interpretator } from "../../Helpers/Interpretator";

interface IPageHeader {
  onSubmit: (table: TruthTable) => void;
}

const PageHeader = (props: IPageHeader) => {
  const [inputValue, setValue] = useState("");
 // const [isValidate, setValidate] = useState(false);
  const input = createRef<HTMLInputElement>();

  const handleClick = (symbol: string) => {
    setValue(prevValue => prevValue + symbol);
    input.current!.focus();
  }

  const handleSubmit = () => {
    try {
      const truthTable = Interpretator.getTruthTable(inputValue.toLowerCase());
      props.onSubmit(truthTable);
    }
    catch (e: any) {
      alert(e.message);
    }
  }

  const clear = () => {
    setValue("");
    input.current!.focus();
  }

  return (
    <>
      <div className={styles.header}>
        <SymbolButton onClick={handleClick} title={Operation.NOT} />
        <SymbolButton onClick={handleClick} title={Operation.OR} />
        <SymbolButton onClick={handleClick} title={Operation.AND} />
        <SymbolButton onClick={handleClick} title={Operation.IMPLICATION} />
        <SymbolButton onClick={handleClick} title={Operation.EQUALITY} />
        <SymbolButton onClick={handleClick} title={Operation.XOR} />
        <SymbolButton onClick={handleClick} title="(" />
        <SymbolButton onClick={handleClick} title=")" />
        <SymbolButton onClick={clear} title="clear" />
      </div>
      <div className={styles.inputContainer}>
        <input id="input" className={styles.input} ref={input} value={inputValue} onChange={e => setValue(e.target.value)} autoFocus/>
      </div>
      <div className={styles.enterButtonContainer}>
        <Button onClick={handleSubmit}>Завершить</Button>
      </div>
    </>
  );
};

export default PageHeader;
