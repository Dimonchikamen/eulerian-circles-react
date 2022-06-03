import EulerCircles from "./EulerCircles/EulerCircles";
import ExpressionInput from "../ExpressionInput/ExpressionInput";
import { useState } from "react";
import TableConstructor from "../Table/TableConstructor";
import { TruthTable } from "Types/TruthTable";
import SavePDFButton from "../../UiKit/SavePDFButton/SavePDFButton";
import info_img from "../../static/images/info.svg";
import s from "./EulerCirclesPage.module.css";
import { ValidateType } from "Types/ValidateType";
import { getTruthTable } from "Helpers/Interpretator";

export function EulerCirclesPage({ theme }: { theme: string }) {
    const [table, setTable] = useState<TruthTable | null>(null);

    const handleSubmit = (exp: string) => {
        const truthTable = getTruthTable(exp, ValidateType.EULER_CIRCLES);
        setTable(truthTable);
    };

    return (
        <>
            <div className={s.wrapper}>
                <ExpressionInput
                    title={"КРУГИ ЭЙЛЕРА"}
                    onSubmit={handleSubmit}
                />
                <div
                    id="capture"
                    className={
                        table && table.variables.length > 0 && table.variables.length <= 4
                            ? s.circles
                            : ""
                    }
                >
                    {table &&
                        table.variables.length > 0 &&
                        table.variables.length <= 4 && (
                            <EulerCircles table={table} theme={theme} />
                        )
                    }
                    {table && (
                        <>
                            <TableConstructor
                                title={"ТАБЛИЦА ИСТИННОСТИ"}
                                headers={table.headers}
                                data={table.body}
                                isLogicalSolver={false}
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
