import styles from "./SymbolButton.module.css";

interface ISymbolButton {
  title: string;
  onClick: (symbol: string) => void;
}

const SymbolButton = (props: ISymbolButton) => {
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={(e) => props.onClick(props.title)}
      >
        {props.title}
      </button>
    </div>
  );
};

export default SymbolButton;
