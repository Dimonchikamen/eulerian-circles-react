import { css } from "@emotion/css";
import ExpressionInput from "../ExpressionInput/ExpressionInput";
import TableConstructor from "Components/Table/TableConstructor";
import { FC, useState } from "react";
import { createTruthTable, TruthTable } from "Types/TruthTable";
import {
    calculate,
    convertToPolishNotation,
    getVariables,
} from "Helpers/Interpretator";
import { getVariablesCombines } from "Helpers/CombineHelper";
import { Combine } from "Types/Combine";
import { isValidate } from "Helpers/Validators";
import { ValidateType } from "Types/ValidateType";
import SavePDFButton from "UiKit/SavePDFButton/SavePDFButton";

const LogicalSolverPage: FC<{ theme: string }> = ({ theme }) => {
    const [table, setTable] = useState<TruthTable | null>(null);

    const handleSubmit = (exp: string) => {
        try {
            if (!isValidate(exp, ValidateType.LOGICAL_SOLVER)) {
                throw Error("Выражение составлено неверно");
            }
            const equalIndex = exp.indexOf("=");
            const leftPart = exp.substring(0, equalIndex);
            const rightPart = exp.substring(equalIndex);
            const variables = getVariables(exp);
            const leftPartpolishString = convertToPolishNotation(leftPart);
            const rightPartpolishString = convertToPolishNotation(rightPart);
            const combines = getVariablesCombines(variables);
            const resultcombines: Combine[] = [];
            const results: boolean[] = [];
            for (const combine of combines) {
                const leftPartResult = calculate(leftPartpolishString, combine);
                const rightPartResult = calculate(rightPartpolishString, combine);
                if (leftPartResult === rightPartResult) {
                    resultcombines.push(combine);
                    results.push(leftPartResult);
                }
            }
            const truthTable = createTruthTable(variables, resultcombines, results);
            setTable(truthTable);
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div className={styles.wrapper}>
            <ExpressionInput
                title={"ЛОГИЧЕСКИЙ РЕШАТЕЛЬ"}
                onSubmit={handleSubmit}
                theme={theme}
            />
            {!table && (
                <div className={styles.infoHelp}>
                    <span style={{ fontSize: "19px", textTransform: "none" }}>
                        &#x24D8;
                    </span>
                    &#xA0; Введите что-нибудь, чтобы получить круги Эйлера (до 4-х
                    переменных) и таблицу истинности
                </div>
            )}
            {table && (
                <>
                    <TableConstructor
                        title={"РЕШЕНИЕ"}
                        headers={table.headers}
                        data={table.body}
                        isLogicalSolver={true}
                    />
                </>
            )}
        </div>
    );
};

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

export default LogicalSolverPage;
