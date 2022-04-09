import React, { createRef, useState } from "react";
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
 // const [caretPositionIndex, setCaretPosition] = useState<number>(0);
  const input = createRef<HTMLInputElement>();

  const handleClick = (symbol: string) => {
   // console.log(caretPositionIndex);
    setValue(prevValue => prevValue + symbol); //{
     // const left = prevValue.slice(0, caretPositionIndex!);
     // const right = prevValue.slice(caretPositionIndex!);
     // setCaretPosition(input.current!.selectionStart!);
     // return left + symbol + right;
   // });
    //setCaretPosition(input.current!.selectionStart!);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // if (e.key === "ArrowRight") {
    //   setCaretPosition(input.current!.selectionStart!);
    // } else if (e.key === "ArrowLeft") {
    //   setCaretPosition(input.current!.selectionEnd!);
    // } else if (e.code === "enter") {
    //   handleSubmit();
    // } 
    // if (e.code === "backspace") {
    //   setCaretPosition(input.current!.selectionEnd!);
    // } else if (caretPositionIndex !== inputValue.length + 1) {
    //   setCaretPosition(input.current!.selectionStart!);
    // }
  }

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    // console.log(e);
  }

  const clear = () => {
    setValue("");
    input.current!.focus();
  }

  return (
    <div className={styles.container}>
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
        <input id="input" className={styles.input} ref={input} value={inputValue} onClick={handleInputClick} onKeyDown={handleKeyDown} onChange={e => setValue(e.target.value)} autoFocus/>
      </div>
      <div className={styles.enterButtonContainer}>
        <Button onClick={handleSubmit}>Завершить</Button>
      </div>
    </div>
  );
};

export default PageHeader;
