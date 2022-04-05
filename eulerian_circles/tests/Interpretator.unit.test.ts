import { Interpretator } from "../src/Helpers/Interpretator";
import { params, suite, test } from "@testdeck/mocha";
import * as _chai from "chai";
import { expect } from "chai";

_chai.should();
_chai.expect;

@suite class InterpreterModuleTest {

    @params({exp: "a∨b", expected: "ab∨" }, "simple expression")
    convertToPolishNotationTest({exp, expected}) {        
        expect(expected).equal(Interpretator.convertToPolishNotation(exp));
    }

    @params({expression: "a∨b", expected: ["a", "b"]}, "simbple expression")
    getVariablesTest({expression, expected}) {
        expect(expected).eql(Interpretator.getVariables(expression));
    }

}