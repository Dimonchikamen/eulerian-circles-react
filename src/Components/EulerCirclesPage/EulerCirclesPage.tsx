import EulerCircles from "./EulerCircles/EulerCircles";
import PageHeader from "../PageHeader/PageHeader";
import { css } from "@emotion/css";
import { useState } from "react";
import TableConstructor from "../Table/Table";
import { TruthTable } from "Types/TruthTable";
import SavePDFButton from "../../UiKit/SavePDFButton/SavePDFButton";
import info_img from "../../static/images/info.svg";
import s from "./EulerCirclesPage.module.css";

export function EulerCirclesPage({ theme }: { theme: string }) {
  const [table, setTable] = useState<TruthTable | null>(null);
  const [filterValue, setFilterValue] = useState<boolean>();

  const handleSubmit = (truthTable: TruthTable) => {
    setTable(truthTable);
  };

  return (
    <>
      <div className={s.wrapper}>
        <PageHeader
          onSubmit={handleSubmit}
          onFilterValueChange={setFilterValue}
        />
        <div
          id="capture"
          className={
            table && table.variables.length > 0 && table.variables.length <= 4
              ? s.circles
              : ""
          }
        >
          {!filterValue &&
            table &&
            table.variables.length > 0 &&
            table.variables.length <= 4 && (
              <EulerCircles table={table} theme={theme} />
            )}
          {table && (
            <>
              <TableConstructor
                headers={table.headers}
                data={table.body}
                filterValue={filterValue}
              />
              <div onClick={() => {}}>
                <SavePDFButton theme={theme} />
              </div>
            </>
          )}
          {!table && (
            <div className={s.info_help}>
              <img src={info_img} alt="" className={s.info_img} />
              <div className={s.text}>
                Введите что-нибудь, чтобы получить круги Эйлера (до 4-х
                переменных) и таблицу истинности
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// const styles = {
//   wrapper: css`
//     min-height: calc(100vh - 60px);
//     margin: 0 auto;
//     width: 80%;
//   `,
//   circles: css`
//     @media (min-width: 1000px) {
//       display: flex;
//       gap: 20px;
//     }
//   `,
//   noCircles: css``,
//   infoHelp: css`
//     font-size: 18px;
//     color: var(--text-secondary);
//     text-transform: uppercase;
//     margin-top: 1rem;
//     display: flex;
//     @media (max-width: 600px) {
//       font-size: 16px;
//     }
//   `,
//   info_img: css`
//     width: 18px;
//     height: 20px;
//   `,
//   text: css`
//     line-height: 20px;
//   `,
// };
