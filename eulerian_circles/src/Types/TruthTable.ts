import { Combine } from "./Combine";

export class TruthTable {
    private _headers: string[];
    private _body: (0|1)[][];

    constructor(variables: string[], combines: Combine[], results: boolean[]) {
        this._headers = [...variables, "result"];
        this._body = [];
        for (let i = 0; i < results.length; i++) {
            const combine: (0|1)[] = [];
            for (let variable in combines[i]) {
                combine.push(Number(combines[i][variable]) as 0|1);
            }
            this._body.push([...combine, Number(results[i]) as 0|1]);
        }
    }

    get headers() {
        return this._headers;
    }

    get body() {
        return this._body;
    }

    get variables() {
        return this._headers.slice(0, this._headers.length - 1);
    }
}