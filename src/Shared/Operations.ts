import { OperationType } from "./OrepationType";

export const unaryOperations = new Map([
    [OperationType.NOT, (a: boolean) => !a],
    [OperationType.NOT_EXL, (a: boolean) => !a],
]);

export const operations = new Map([
    [OperationType.OR, (a: boolean, b: boolean) => a || b],
    [OperationType.OR_PLUS, (a: boolean, b: boolean) => a || b],
    [OperationType.AND, (a: boolean, b: boolean) => a && b],
    [OperationType.AND_MULTI, (a: boolean, b: boolean) => a && b],
    [OperationType.IMPLICATION, (a: boolean, b: boolean) => !a || b],
    [OperationType.EQUALITY, (a: boolean, b: boolean) => (!a && !b) || (a && b)],
    [OperationType.XOR, (a: boolean, b: boolean) => (!a && b) || (a && !b)]
]);

export const isOperation = (operation: string) => {
    return operations.has(operation as OperationType) as boolean;
};

export const isUnarOperation = (operation: string) => {
    return unaryOperations.has(operation as OperationType) as boolean;
};