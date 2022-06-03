import EulerCircles from "./EulerCircles/EulerCircles";
import PageHeader from "../PageHeader/PageHeader";
import { css } from "@emotion/css";
import { useState } from "react";
import TableConstructor from "../Table/Table";
import { TruthTable } from "Types/TruthTable";

export function EulerCirclesPage({ theme }: { theme: string }) {
  const [table, setTable] = useState<TruthTable | null>(null);
  const [filterValue, setFilterValue] = useState<boolean>();

  const handleSubmit = (truthTable: TruthTable) => {
    setTable(truthTable);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <PageHeader
          onSubmit={handleSubmit}
          onFilterValueChange={setFilterValue}
        />
        <div
          className={
            table && table.variables.length > 0 && table.variables.length <= 4
              ? styles.circles
              : styles.noCircles
          }
        >
          {!filterValue &&
            table &&
            table.variables.length > 0 &&
            table.variables.length <= 4 && (
              <EulerCircles table={table} theme={theme} />
            )}
          {table && (
            <TableConstructor
              headers={table.headers}
              data={table.body}
              filterValue={filterValue}
            />
          )}
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
      </div>
    </>
  );
}

const styles = {
  wrapper: css`
    min-height: calc(100vh - 60px);
    margin: 0 auto;
    width: 80%;
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
    color: var(--text-secondary);
    text-transform: uppercase;
    margin-top: 1rem;
    display: inline-block;
    @media (max-width: 600px) {
      font-size: 16px;
    }
  `,
};
