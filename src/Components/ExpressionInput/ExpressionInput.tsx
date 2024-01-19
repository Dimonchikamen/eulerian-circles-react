import React, { type FC, useRef, useState, useEffect, useCallback, useMemo } from "react";
import { OperationType } from "../../Shared/OrepationType";
import styles from "./ExpressionInput.module.css";
import SymbolButton from "../../UiKit/SymbolButton/SymbolButton";
import SavePDFButton from "UiKit/SavePDFButton/SavePDFButton";

interface IExpressionInput {
    title: string;
    onSubmit: (expression: string) => void;
    theme: string;
}

const ExpressionInput: FC<IExpressionInput> = ({ title, onSubmit, theme }) => {
    const [inputValue, setValue] = useState("");
    const [cursorPosition, setCursorPosition] = useState(0);
    const inputRef = useRef<HTMLInputElement>();

    useEffect(() => {
        inputRef.current.selectionStart = cursorPosition;
        inputRef.current.selectionEnd = cursorPosition;
        inputRef.current.focus();
    }, [inputValue, cursorPosition]);

    const insertSymbol = useCallback((symbol: string) => {
        const cursor = inputRef.current.selectionStart;
        setValue((prevValue) => {
            const leftPart = prevValue.substring(0, cursor);
            const rightPart = prevValue.substring(cursor);
            return leftPart + symbol + rightPart;
        });
        setCursorPosition(cursor + 1);
        inputRef.current?.focus();
    }, []);

    const handleSubmit = () => {
        const result = inputValue.replace(/[ ]/g, "");
        onSubmit(result.toLowerCase());
    };

    const handleChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCursorPosition(e.target.selectionStart);
        setValue(e.target.value);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            handleSubmit();
        }
    };

    const clearInput = useCallback(() => {
        setValue("");
        inputRef.current?.focus();
    }, []);

    const actionButtons = useMemo(() => (
        <div className={styles.header}>
            <SymbolButton onClick={insertSymbol} title={OperationType.NOT} />
            <SymbolButton onClick={insertSymbol} title={OperationType.OR} />
            <SymbolButton onClick={insertSymbol} title={OperationType.AND} />
            <SymbolButton
                onClick={insertSymbol}
                title={OperationType.IMPLICATION}
            />
            <SymbolButton onClick={insertSymbol} title={OperationType.EQUALITY} />
            <SymbolButton onClick={insertSymbol} title={OperationType.XOR} />
            <SymbolButton onClick={insertSymbol} title="(" />
            <SymbolButton onClick={insertSymbol} title=")" />
        </div>
    ), [insertSymbol]);

    return (
        <div className={styles.container}>
            <div className={styles.headerTitle}>{title}</div>
            <div className={styles.instruction}>ВВЕДИТЕ ВЫРАЖЕНИЕ</div>
            {actionButtons}
            <div className={styles.inputContainer}>
                <div style={{ width: "100%" }}>
                    <input
                        id="input"
                        className={styles.input}
                        ref={inputRef}
                        value={inputValue}
                        onKeyDown={handleKeyDown}
                        onChange={handleChangeValue}
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
                <SavePDFButton theme={theme} />
            </div>
        </div>
    );
};

export default ExpressionInput;
