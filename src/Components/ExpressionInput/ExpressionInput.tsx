import React, { FC, useRef, useState } from "react";
import { OperationType } from "../../Shared/OrepationType";
import styles from "./ExpressionInput.module.css";
import SymbolButton from "../../UiKit/SymbolButton/SymbolButton";

interface IExpressionInput {
    title: string;
    onSubmit: (expression: string) => void;
}

const ExpressionInput: FC<IExpressionInput> = ({ title, onSubmit }) => {
    const [inputValue, setValue] = useState("");
    const input = useRef<HTMLInputElement>();
    
    const InsertSymbol = (symbol: string) => {
        const cursor = input.current.selectionStart
        setValue((prevValue) => {
            const leftPart = prevValue.substring(0, cursor);
            const rightPart = prevValue.substring(cursor);
            return leftPart + symbol + rightPart;
        });
        input.current!.focus();
    };

    const handleSubmit = () => {
        onSubmit(inputValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            handleSubmit();
        }
    };

    const clearInput = () => {
        setValue("");
        input.current!.focus();
    };

    return (
        <div className={styles.container}>
            <div className={styles.headerTitle}>{title}</div>
            <div className={styles.instruction}>ВВЕДИТЕ ВЫРАЖЕНИЕ</div>
            <div className={styles.header}>
                <SymbolButton onClick={InsertSymbol} title={OperationType.NOT} />
                <SymbolButton onClick={InsertSymbol} title={OperationType.OR} />
                <SymbolButton onClick={InsertSymbol} title={OperationType.AND} />
                <SymbolButton onClick={InsertSymbol} title={OperationType.IMPLICATION} />
                <SymbolButton onClick={InsertSymbol} title={OperationType.EQUALITY} />
                <SymbolButton onClick={InsertSymbol} title={OperationType.XOR} />
                <SymbolButton onClick={InsertSymbol} title="(" />
                <SymbolButton onClick={InsertSymbol} title=")" />
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
                        onClick={clearInput}
                        style={{ marginLeft: "-44px" }}
                    >
                        &#10006;
                    </button>
                </div>
                <div className={styles.enterButtonContainer}>
                    <button className={styles.enterButton} onClick={handleSubmit}>
                        НАЧАТЬ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExpressionInput;
