import { Combine } from "./Combine";

export type TruthTable = {
    readonly headers: string[];
    readonly body: (0 | 1)[][];
    readonly variables: string[];
}

export function createTruthTable(variables: string[], combines: Combine[], results: boolean[]): TruthTable {
    const body = [];
    for (let i = 0; i < results.length; i++) {
        const combine: (0 | 1)[] = [];
        for (const variable in combines[i])
            combine.push(Number(combines[i][variable]) as 0 | 1);
        body.push([...combine, Number(results[i]) as 0 | 1]);
    }

    return {
        variables,
        headers: [...variables, "result"],
        body
    };
}