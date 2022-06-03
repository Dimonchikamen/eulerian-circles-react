import EulerCircles from "./EulerCircles/EulerCircles";
import PageHeader from "../PageHeader/PageHeader";
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
              <SavePDFButton theme={theme} />
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
