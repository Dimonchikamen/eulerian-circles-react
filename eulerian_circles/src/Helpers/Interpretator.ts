import { Operation } from "../Shared/Orepations";
import { Combine } from "../Types/Combine";
import { TruthTable } from "../Types/TruthTable";

export class Interpretator {
    private static unaryOperations = new Map([
        [Operation.NOT, (a: boolean) => !a],
    ]);

    private static operations = new Map([
        [Operation.OR, (a: boolean, b: boolean) => a || b],
        [Operation.AND, (a: boolean, b: boolean) => a && b],
        [Operation.IMPLICATION, (a: boolean, b: boolean) => !a || b],
        [Operation.EQUALITY, (a: boolean, b: boolean) => (!a && !b) || (a && b)],
        [Operation.XOR, (a: boolean, b: boolean) => (!a && b) || (a && !b)]
    ]);

    static getTruthTable(exp: string) {
        if (!this.isValidate(exp)) {
            throw Error("Выражение составлено неверно");
        }
        const [variables, polishString] = this.convertToPolishNotation(exp);
        const combines = this.getVariablesCombines(variables);
        const results: boolean[] = [];
        for (let combine of combines) {
            results.push(this.calculate(polishString, combine)!);
        }
        return new TruthTable(variables, combines, results);
    }

    private static isValidate(expression: string) {
        const stack = [];
        const variables = [];
        for (let i = 0; i < expression.length; i++) {
            const symbol = expression[i];
            const previousSymbol = i === 0 ? null : expression[i - 1];
            const nextSymbol = i === expression.length - 1 ? null : expression[i + 1];

            if (this.isOperation(symbol) && !this.operationIsValid(previousSymbol, nextSymbol)) {
                console.log("INVALID UNAR ORERATION");
                return false;
            }

            if (this.isUnarOperation(symbol) && !this.unarOperationIsValid(previousSymbol, nextSymbol)) {
                console.log("OPERATION");
                return false;
            }

            if (symbol === "(") {
                stack.push(symbol);
            }

            if (symbol === ")") {
                console.log("INVALID )");
                const top = stack.pop();
                if (!top) {
                    return false;
                }
            }

            if (this.isVariable(symbol) && !this.variableIsValid(previousSymbol, nextSymbol)) {
                return false;
            }
        }
        if (variables.length === 0 || stack.length !== 0) return false;
        return true;
    }

    private static variableIsValid(previousSymbol: string|null, nextSymbol: string|null) {
        const previousSymbolIsValid = previousSymbol ? !this.isVariable(previousSymbol) : true;
        const nextSymbolIsValid = nextSymbol ? !this.isVariable(nextSymbol) : true;
        return previousSymbolIsValid && nextSymbolIsValid;
    }

    private static operationIsValid(previousSymbol: string|null, nextSymbol: string|null) {
        const previousSymbolIsValid = previousSymbol ? this.isVariable(previousSymbol) || previousSymbol === ")" : false;
        const nextSymbolIsValid = nextSymbol ? this.isVariable(nextSymbol) || nextSymbol === "(" : false;
        return previousSymbolIsValid && nextSymbolIsValid;
    }

    private static unarOperationIsValid(previousSymbol: string|null, nextSymbol: string|null) {
        const previousSymbolIsValid = previousSymbol ? this.isOperation(previousSymbol) || previousSymbol === "(" : true; 
        const nextSymbolIsValid = nextSymbol ? this.isVariable(nextSymbol) || nextSymbol === "(" : false;
        return previousSymbolIsValid && nextSymbolIsValid;
    }

    private static calculate(polishString: string, combine: Combine) {
        const stack: boolean[] = [];
        for (let symbol of polishString) {

            if (this.isVariable(symbol)) {
                stack.push(combine[symbol]);
            }

            if (this.isUnarOperation(symbol)) {
                const top = stack.pop();
                const operationResult = this.unaryOperations.get(symbol as Operation)!(top!);
                stack.push(operationResult);
            }

            if (this.isOperation(symbol)) {
                const second = stack.pop();
                const first = stack.pop();
                const operationResult = this.operations.get(symbol as Operation)!(first!, second!);
                stack.push(operationResult);
            }
        }
        return stack.pop();
    }

    private static convertToPolishNotation(exp: string): [variables: string[], polishString: string] {
        const input = exp.concat().toLocaleLowerCase();
        const stack = [];
        const result: string[] = [];
        const variables: string[] = [];
        for (let i = 0; i < input.length; i++) {
            let currSymbol = input[i];

            if (this.isVariable(currSymbol)) {
                result.push(currSymbol);
                if (!variables.includes(currSymbol)) {
                    variables.push(currSymbol);
                }
                continue;
            }

            if (this.isUnarOperation(currSymbol)) {
                stack.push(currSymbol);
            }

            if (currSymbol === "(") {
                stack.push(currSymbol);
            }

            if (currSymbol === ")") {
                while (true) {
                    let nexChar = stack.pop();

                    if (!nexChar) {
                        throw Error("Неверное выражение");
                    }

                    if (nexChar === "(") {
                        break;
                    }
                    result.push(nexChar);
                }
            }

            if (this.isOperation(currSymbol)) {
                while (stack.length > 0) {
                    let top = stack[stack.length - 1];
                    if (!(this.isUnarOperation(top) || this.isPriorityThen(top, currSymbol))) break;

                    result.push(top);
                    stack.pop();
                }
                stack.push(currSymbol);
            }
        }

        while (stack.length > 0) {
            result.push(stack.pop()!);
        }

        return [variables, result.join("")];
    }

    private static getVariablesCombines(variables: string[]): Combine[] {
        const result: Combine[] = [];
        const startCombine = this.getStartStringCombine(variables);
        for (let i = 0; i < Math.pow(2, variables.length); i++) {
            let stringCombine = (parseInt(startCombine, 2) + i).toString(2);
            stringCombine = this.addZeros(variables, stringCombine);
            const combine = this.getCombine(variables, stringCombine);
            result.push(combine);
        }
        return result;
    }

    private static addZeros(variables: string[], stringCombine: string) {
        if (stringCombine.length === variables.length) {
            return stringCombine;
        } else {
            let zeros = this.getStringZeros(variables.length - stringCombine.length);
            return zeros + stringCombine;
        }
    }

    private static getStringZeros(count: number) {
        let result = "";
        for (let i = 0; i < count; i ++) {
            result += "0";
        }
        return result;
    }

    private static getCombine(variables: string[], combineString: string): Combine {
        const result: Combine = {};
        for (let i = 0; i < variables.length; i++) {
            result[variables[i]] = Boolean(parseInt(combineString[i]));
        }
        return result;
    }

    private static getStartStringCombine(variables: string[]): string {
        let result = "";
        variables.forEach(variable => { result += "0" });
        return result;
    }

    private static isVariable(symbol: string|null) {
        if (!symbol) return false;
        const str = "абвгдеёжзийклмнопрстуфхцчшщъыьэюяabcdefghijklmnopqrstuvwxyz";
        for (let i = 0; i < str.length; i++) {
            if (str[i] === symbol) {
                return true;
            }
        }
        return false;
    }

    private static isOperation(operation: string) {
        return this.operations.has(operation as Operation) as boolean;
    }

    private static isUnarOperation(operation: string) {
        return this.unaryOperations.has(operation as Operation) as boolean;
    }

    private static isPriorityThen(top: string, current: string) {
        switch (top) {
            case Operation.EQUALITY:
                return current === Operation.EQUALITY;
            case Operation.IMPLICATION:
                return current === Operation.IMPLICATION;
            case Operation.OR || Operation.XOR:
                return current === Operation.OR || current === Operation.XOR;
            case Operation.AND:
                return current !== Operation.NOT;
            case Operation.NOT:
                return true;
            default:
                return false;
        }
    }
}