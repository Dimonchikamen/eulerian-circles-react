import { isOperation, isUnarOperation, operations, unaryOperations } from "Shared/Operations";
import { ValidateType } from "Types/ValidateType";
import { OperationType } from "../Shared/OrepationType";
import { Combine } from "../Types/Combine";
import { createTruthTable } from "../Types/TruthTable";
import { getVariablesCombines } from "./CombineHelper";
import { isValidate } from "./Validators";

export const getTruthTable = (exp: string, type: ValidateType) => {
    if (!isValidate(exp, type)) {
        throw Error("Выражение составлено неверно");
    }
    const variables = getVariables(exp);
    const polishString = convertToPolishNotation(exp);
    const combines = getVariablesCombines(variables);
    const results: boolean[] = [];
    for (const combine of combines) {
        results.push(calculate(polishString, combine)!);
    }
    return createTruthTable(variables, combines, results);
};

export const convertToPolishNotation = (exp: string) => {
    const input = exp.concat().toLocaleLowerCase();
    const stack = [];
    const result: string[] = [];
    for (let i = 0; i < input.length; i++) {
        const currSymbol = input[i];

        if (isVariable(currSymbol) || isConstant(currSymbol)) {
            result.push(currSymbol);
            continue;
        }

        if (isUnarOperation(currSymbol)) {
            stack.push(currSymbol);
        }

        if (currSymbol === "(") {
            stack.push(currSymbol);
        }

        if (currSymbol === ")") {
            while (true) {
                const nexChar = stack.pop();
                if (!nexChar) {
                    throw Error("Неверное выражение");
                }

                if (nexChar === "(") {
                    break;
                }
                result.push(nexChar);
            }
        }

        if (isConstant(currSymbol)) {
            stack.push(currSymbol);
        }

        if (isOperation(currSymbol)) {
            while (stack.length > 0) {
                const top = stack[stack.length - 1];
                if (!(isUnarOperation(top) || isPriorityThen(top, currSymbol))) break;

                result.push(top);
                stack.pop();
            }
            stack.push(currSymbol);
        }
    }

    while (stack.length > 0) {
        result.push(stack.pop()!);
    }

    return result.join("");
};

export const calculate = (polishString: string, combine: Combine) => {
    const stack: boolean[] = [];
    for (const symbol of polishString) {

        if (isConstant(symbol)) {
            if (symbol === "0") {
                stack.push(false);
            } else {
                stack.push(true);
            }
        }

        if (isVariable(symbol)) {
            stack.push(combine[symbol]);
        }

        if (isUnarOperation(symbol)) {
            const top = stack.pop();
            const operationResult = unaryOperations.get(symbol as OperationType)!(top!);
            stack.push(operationResult);
        }

        if (isOperation(symbol)) {
            const second = stack.pop();
            const first = stack.pop();
            const operationResult = operations.get(symbol as OperationType)!(first!, second!);
            stack.push(operationResult);
        }
    }
    return stack.pop();
};

export const isConstant = (symbol: string) => symbol === "1" || symbol === "0";

export const isVariable = (symbol: string | null) => {
    if (!symbol) return false;
    const str = "абвгдеёжзийклмнопрстуфхцчшщъыьэюяabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < str.length; i++) {
        if (str[i] === symbol) {
            return true;
        }
    }
    return false;
};

export const getVariables = (exp: string) => {
    const result: string[] = [];
    for (const symbol of exp) {
        if (isVariable(symbol) && !result.includes(symbol)) {
            result.push(symbol);
        }
    }
    return result;
};

const isPriorityThen = (top: string, current: string) => {
    switch (top) {
    case OperationType.EQUALITY:
        return current === OperationType.EQUALITY;
    case OperationType.IMPLICATION:
        return current === OperationType.IMPLICATION;
    case OperationType.OR || OperationType.OR_PLUS || OperationType.XOR:
        return current === OperationType.OR || current === OperationType.OR_PLUS || current === OperationType.XOR;
    case OperationType.AND || OperationType.AND_MULTI:
        return current !== OperationType.NOT;
    case OperationType.NOT || OperationType.NOT_EXL:
        return true;
    default:
        return false;
    }
};
