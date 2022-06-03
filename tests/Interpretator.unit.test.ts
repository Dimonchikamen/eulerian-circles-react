import { params, suite } from "@testdeck/mocha";
import * as _chai from "chai";
import { expect } from "chai";
import { createTruthTable, TruthTable } from "../src/Types/TruthTable";
import { convertToPolishNotation, getTruthTable, getVariables } from "../src/Helpers/Interpretator";
import { ValidateType } from "../src/Types/ValidateType";

_chai.should();
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
_chai.expect;

type ConvertToPolishNotationIsCorrectlyParameters = {
    expression: string;
    expected: string;
}

type GetVariablesIsCorrectpyParameters = {
    expression: string;
    expected: string[];
}

type GetTruthTableIsCorretrlyParametes = {
    expression: string;
    expectedTable: TruthTable;
}

@suite class InterpreterModuleTest {

    @params({ expression: "a∨b", expected: "ab∨" } as ConvertToPolishNotationIsCorrectlyParameters, "simple expression")
    convertToPolishNotationIsCorrectly({ expression, expected }: ConvertToPolishNotationIsCorrectlyParameters) {
        expect(expected).equal(convertToPolishNotation(expression));
    }

    @params({ expression: "a∨a", expected: ["a"] } as GetVariablesIsCorrectpyParameters, "expression have 2 same variables")
    @params({ expression: "a∨b", expected: ["a", "b"] } as GetVariablesIsCorrectpyParameters, "simbple expression")
    getVariablesIsCorrectly({ expression, expected }: GetVariablesIsCorrectpyParameters) {
        expect(expected).eql(getVariables(expression));
    }

    @params({
        expression: "a∨b",
        expectedTable: createTruthTable(
            ["a", "b"],
            [
                { a: false, b: false },
                { a: false, b: true },
                { a: true, b: false },
                { a: true, b: true }
            ],
            [false, true, true, true]
        )
    } as GetTruthTableIsCorretrlyParametes)
    getTruthTableIsCorrectly({ expression, expectedTable }: GetTruthTableIsCorretrlyParametes) {
        const actualTable = getTruthTable(expression, ValidateType.EULER_CIRCLES);
        expect(expectedTable).eql(actualTable, "actual TruthTable is not equal to expected");
    }
}

