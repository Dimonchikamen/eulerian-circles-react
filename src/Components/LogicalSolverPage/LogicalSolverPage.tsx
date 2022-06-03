import { css } from "@emotion/css";
import PageHeader from "Components/PageHeader/PageHeader";
import TableConstructor from "Components/Table/Table";
import { useState } from "react";
import { TruthTable } from "Types/TruthTable";
import info_img from "../../static/images/info.svg";
import s from "./LogicalSolverPage.module.css";

const LogicalSolverPage = () => {
  const [table, setTable] = useState<TruthTable | null>(null);

  const handleSubmit = (truthTable: TruthTable) => {
    setTable(truthTable);
  };

  return (
    <>
      <div className={s.wrapper}>
        <PageHeader onSubmit={handleSubmit} />
        {table}
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
    </>
  );
};

export default LogicalSolverPage;
