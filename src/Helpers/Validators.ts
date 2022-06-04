import { isOperation, isUnarOperation } from "Shared/Operations";
import { ValidateType } from "Types/ValidateType";
import { isConstant, isVariable } from "./Interpretator";

export const isValidate = (exp: string, type: ValidateType) => {
    if (exp.length === 0) return false;
    if ((type === ValidateType.LOGICAL_SOLVER && exp.indexOf("=") === -1) ||
        (type === ValidateType.EULER_CIRCLES && exp.indexOf("=") !== -1)) {
        return false;
    }

    const stack = [];
    for (let i = 0; i < exp.length; i++) {
        const symbol = exp[i];
        const previousSymbol = i === 0 ? null : exp[i - 1];
        const nextSymbol = i === exp.length - 1 ? null : exp[i + 1];

        if (symbol === "=" && !equalSymbolIsValid(previousSymbol, nextSymbol)) {
            return false;
        }

        if (isOperation(symbol) && !operationIsValid(previousSymbol, nextSymbol)) {
            return false;
        }

        if (isUnarOperation(symbol) && !unarOperationIsValid(previousSymbol, nextSymbol)) {
            return false;
        }

        if (symbol === "(") {
            stack.push(symbol);
        }

        if (symbol === ")") {
            const top = stack.pop();
            if (!top) {
                return false;
            }
        }

        if (isVariable(symbol) && !variableIsValid(previousSymbol, nextSymbol)) {
            return false;
        }
    }
    if (stack.length !== 0) {
        return false;
    }
    return true;
};

const equalSymbolIsValid = (previousSymbol: string | null, nextSymbol: string | null) => {
    const previousSymbolIsValid = previousSymbol ? isVariable(previousSymbol) || isConstant(previousSymbol) : false;
    const nextSymbolIsValid = nextSymbol ? isVariable(nextSymbol) || isConstant(nextSymbol) || isUnarOperation(nextSymbol) : false;
    return previousSymbolIsValid && nextSymbolIsValid;
};

const variableIsValid = (previousSymbol: string | null, nextSymbol: string | null) => {
    const previousSymbolIsValid = previousSymbol ? isUnarOperation(previousSymbol) || isOperation(previousSymbol) || previousSymbol === "(" || previousSymbol === "=" : true;
    const nextSymbolIsValid = nextSymbol ? isUnarOperation(nextSymbol) || isOperation(nextSymbol) || nextSymbol === ")" || nextSymbol === "=" : true;
    return previousSymbolIsValid && nextSymbolIsValid;
};

const operationIsValid = (previousSymbol: string | null, nextSymbol: string | null) => {
    const previousSymbolIsValid = previousSymbol ? isVariable(previousSymbol) || isConstant(previousSymbol) || previousSymbol === ")" : false;
    const nextSymbolIsValid = nextSymbol ? isVariable(nextSymbol) || isUnarOperation(nextSymbol) || isConstant(nextSymbol) || nextSymbol === "(" : false;
    return previousSymbolIsValid && nextSymbolIsValid;
};

const unarOperationIsValid = (previousSymbol: string | null, nextSymbol: string | null) => {
    const previousSymbolIsValid = previousSymbol ? isOperation(previousSymbol) || isUnarOperation(previousSymbol) || previousSymbol === "(" || previousSymbol === "=" : true;
    const nextSymbolIsValid = nextSymbol ? isVariable(nextSymbol) || isConstant(nextSymbol) || nextSymbol === "(" : false;
    return previousSymbolIsValid && nextSymbolIsValid;
};
