import { useState, createRef } from "react";
import styles from "./PageHeader.module.css";
import SymbolButton from "../../UiKit/SymbolButton/SymbolButton";

const PageHeader = () => {
  const [inputValue, setValue] = useState("");
  const input = createRef<HTMLInputElement>();

  const handleClick = (symbol: string) => {
    console.log(symbol);
    setValue(prevValue => prevValue + symbol);
    input.current!.focus();
  }

  const clear = () => {
    setValue("");
    input.current!.focus();
  }

  return (
    <>
      <div className={styles.header}>
        <SymbolButton onClick={handleClick} title="or" symbol="+" />
        <SymbolButton onClick={handleClick} title="and" symbol="*" />
        <SymbolButton onClick={handleClick} title="implication" symbol="->" />
        <SymbolButton onClick={handleClick} symbol="(" />
        <SymbolButton onClick={handleClick} symbol=")" />
        <SymbolButton onClick={clear} symbol="clear" />
      </div>
      <div className={styles.inputContainer}>
        <input id="input" className={styles.input} ref={input} value={inputValue} onChange={e => setValue(e.target.value)} autoFocus/>
      </div>
    </>
  );
};

export default PageHeader;
