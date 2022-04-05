import { params, suite, test } from "@testdeck/mocha";
import * as _chai from "chai";
import { expect } from "chai";
import { TruthTable } from "../src/Types/TruthTable";

_chai.should();
_chai.expect;

@suite class TruthTableModuleTest {

    @params({
        variables: ["a"],
        combines: [{a: false}, {a: true}],
        results: [false, true],
        expectedHeaders: ["a", "result"],
        expectedBody: [[0, 0], [1, 1]]
    }, "one variable")
    truthTableTests({variables, combines, results, expectedHeaders, expectedBody}) {
        const table = new TruthTable(variables, combines, results);
        expect(variables).eql(table.variables, "actual variables is not equal to expected");
        expect(expectedHeaders).eql(table.headers, "actual headers is not equal to expected");
        expect(expectedBody).eql(table.body, "actual body is not equal to expected");
    }
}