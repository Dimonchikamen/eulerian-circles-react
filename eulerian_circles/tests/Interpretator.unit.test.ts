import { Interpretator } from "../src/Helpers/Interpretator";
import { params, suite, test } from "@testdeck/mocha";
import * as _chai from "chai";
import { expect } from "chai";
import { TruthTable } from "../src/Types/TruthTable";

_chai.should();
_chai.expect;

@suite class InterpreterModuleTest {

    @params({exp: "a∨b", expected: "ab∨" }, "simple expression")
    convertToPolishNotationIsCorrectly({exp, expected}) {        
        expect(expected).equal(Interpretator.convertToPolishNotation(exp));
    }

    @params({expression: "a∨a", expected: ["a"]}, "expression have 2 same variables")
    @params({expression: "a∨b", expected: ["a", "b"]}, "simbple expression")
    getVariablesIsCorrectly({expression, expected}) {
        expect(expected).eql(Interpretator.getVariables(expression));
    }

    @params({
        expression: "a∨b", 
        expectedTable: new TruthTable(
            ["a", "b"],
            [
                {a: false, b: false},
                {a: false, b: true},
                {a: true, b: false},
                {a: true, b: true}
            ],
            [false, true, true, true]
            )})
    getTrurhTableIsCorrectly({expression, expectedTable}: {expression: string, expectedTable: TruthTable}) {
        const actualTable = Interpretator.getTruthTable(expression);
        expect(expectedTable).eql(actualTable, "actual TruthTable is not equal to expected");

    }
}