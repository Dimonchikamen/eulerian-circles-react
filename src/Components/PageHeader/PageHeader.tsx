import React, { useEffect, useRef, useState } from "react";
import { Operation } from "../../Shared/Orepations";
import styles from "./PageHeader.module.css";
import SymbolButton from "../../UiKit/SymbolButton/SymbolButton";
import { TruthTable } from "../../Types/TruthTable";
import { Interpretator } from "../../Helpers/Interpretator";
import useLocalStorage from "use-local-storage";

interface IPageHeader {
  onSubmit: (table: TruthTable & { filterValue: any }) => void;
  onFilterValueChange?(filterValue: boolean): void;
}

const PageHeader = (props: IPageHeader) => {
  const [inputValue, setValue] = useLocalStorage("input", "");
  const input = useRef<HTMLInputElement>();

  const leftExpr = inputValue.split("=")[0];
  const rightExpr = inputValue.split("=")[1] ?? "";

  useEffect(() => {
    props.onFilterValueChange?.(
      rightExpr == "1" ? true : rightExpr == "0" ? false : null
    );
  }, [rightExpr]);

  const handleClick = (symbol: string) => {
    const cursor = input.current.selectionStart;
    setValue((prevValue) => {
      const leftPart = prevValue.substring(0, cursor);
      const rightPart = prevValue.substring(cursor);
      return leftPart + symbol + rightPart;
    });
    input.current!.focus();
  };

  const handleSubmit = () => {
    try {
      const truthTable = Interpretator.getTruthTable(inputValue.toLowerCase());
      props.onSubmit({ ...truthTable, filterValue: true });
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      handleSubmit();
    }
  };

  const clear = () => {
    setValue("");
    input.current!.focus();
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerTitle}>КРУГИ ЭЙЛЕРА</div>
      <div className={styles.instruction}>ВВЕДИТЕ ВЫРАЖЕНИЕ</div>
      <div className={styles.header}>
        <SymbolButton onClick={handleClick} title={Operation.NOT} />
        <SymbolButton onClick={handleClick} title={Operation.OR} />
        <SymbolButton onClick={handleClick} title={Operation.AND} />
        <SymbolButton onClick={handleClick} title={Operation.IMPLICATION} />
        <SymbolButton onClick={handleClick} title={Operation.EQUALITY} />
        <SymbolButton onClick={handleClick} title={Operation.XOR} />
        <SymbolButton onClick={handleClick} title="(" />
        <SymbolButton onClick={handleClick} title=")" />
      </div>
      <div className={styles.inputContainer}>
        <div style={{ width: "100%" }}>
          <input
            id="input"
            className={styles.input}
            ref={input}
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            placeholder="A v B"
            style={{ paddingRight: "44px" }}
          />
          <button
            className={styles.clearButton}
            onClick={clear}
            style={{ marginLeft: "-44px" }}
          >
            &#10006;
          </button>
        </div>
        {/* <InputGroup className="mb-3">
          <FormControl
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <Button
            variant="outline-secondary"
            className={styles.clearButton}
            id="button-addon2"
          >
            &#10006;
          </Button>
        </InputGroup> */}
        <div className={styles.enterButtonContainer}>
          <button className={styles.enterButton} onClick={handleSubmit}>
            НАЧАТЬ
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
