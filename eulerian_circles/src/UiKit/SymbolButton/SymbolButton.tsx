import styles from "./SymbolButton.module.css";

interface ISymbolButton {
    symbol: string;
    title?: string;
    onClick: (symbol: string) => void;
}

const SymbolButton = (props: ISymbolButton) => {
    return (
        <div className={styles.container}>
            <button className={styles.button} title={props.title} onClick={e => props.onClick(props.symbol)}>{props.symbol}</button>
        </div>
    );
}

export default SymbolButton;
