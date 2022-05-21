import { css } from "@emotion/css";
import PageHeader from "Components/PageHeader/PageHeader";
import TableConstructor from "Components/Table/Table";
import { useState } from "react";
import { TruthTable } from "Types/TruthTable";

const LogicalSolverPage = () => {
    const [table, setTable] = useState<TruthTable | null>(null);

    const handleSubmit = (truthTable: TruthTable) => {
      setTable(truthTable);
    };
  
    return (
      <>
        <div className={styles.wrapper}>
          <PageHeader onSubmit={handleSubmit} />            
            {table}
            {!table && (
              <div className={styles.infoHelp}>
                <span style={{ fontSize: "19px", textTransform: "none" }}>
                  &#x24D8;
                </span>
                &#xA0; Введите что-нибудь, чтобы получить круги Эйлера (до 4-х
                переменных) и таблицу истинности
              </div>
            )}
          </div>
      </>
    );

}

const styles = {
    wrapper: css`
      width: 80%;
      margin: 0 auto;
      height: 100vh;
    `,
    circles: css`
      @media (min-width: 1000px) {
        display: flex;
        gap: 20px;
      }
    `,
    noCircles: css``,
    infoHelp: css`
      font-size: 18px;
      text-transform: uppercase;
      color: rgb(91, 91, 91);
      margin-top: 1rem;
      display: inline-block;
      @media (max-width: 600px) {
        font-size: 16px;
      }
    `,
  };

export default LogicalSolverPage;