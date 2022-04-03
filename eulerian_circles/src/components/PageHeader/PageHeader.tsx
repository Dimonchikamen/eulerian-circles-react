import { useState, createRef } from "react";
import { Operation } from "../../Shared/Orepations";
import { Interpretator } from "../../Helpers/ExpressionInterpretator";
import styles from "./PageHeader.module.css";
import SymbolButton from "../../UiKit/SymbolButton/SymbolButton";

interface IPageHeader {
  inputValue: string;
  onChange: (newValue: string) => void;
}

const PageHeader = (props: IPageHeader) => {
  const input = createRef<HTMLInputElement>();

  const handleClick = (symbol: string) => {
    props.onChange(props.inputValue + symbol);
    input.current!.focus();
  }

  const clear = () => {
    props.onChange("");
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
        <input id="input" className={styles.input} ref={input} value={props.inputValue} onChange={e => props.onChange(e.target.value)} autoFocus/>
      </div>
    </>
  );
};

export default PageHeader;
