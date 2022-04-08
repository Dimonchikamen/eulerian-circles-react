import { params, suite } from "@testdeck/mocha";
import * as _chai from "chai";
import { expect } from "chai";
import { Combine } from "../src/Types/Combine";
import { TruthTable } from "../src/Types/TruthTable";

_chai.should();
_chai.expect;

type TruthTableTestsParameters = {
    variables: string[];
    combines: Combine[];
    results: boolean[];
    expectedHeaders: string[];
    expectedBody: (0|1)[][];
}


@suite class TruthTableModuleTest {

    @params({
        variables: ["a"],
        combines: [{a: false}, {a: true}],
        results: [false, true],
        expectedHeaders: ["a", "result"],
        expectedBody: [[0, 0], [1, 1]]
    } as TruthTableTestsParameters, 
    "one variable")
    truthTableTests({variables, combines, results, expectedHeaders, expectedBody}: TruthTableTestsParameters) {
        const table = new TruthTable(variables, combines, results);
        expect(variables).eql(table.variables, "actual variables is not equal to expected");
        expect(expectedHeaders).eql(table.headers, "actual headers is not equal to expected");
        expect(expectedBody).eql(table.body, "actual body is not equal to expected");
    }
}