import { Combine } from "Types/Combine";

export const getVariablesCombines = (variables: string[]): Combine[] => {
    const result: Combine[] = [];
    const startCombine = getStartStringCombine(variables);
    for (let i = 0; i < Math.pow(2, variables.length); i++) {
        let stringCombine = (parseInt(startCombine, 2) + i).toString(2);
        stringCombine = addZeros(variables, stringCombine);
        const combine = getCombine(variables, stringCombine);
        result.push(combine);
    }
    return result;
};

const addZeros = (variables: string[], stringCombine: string) => {
    if (stringCombine.length === variables.length) {
        return stringCombine;
    } else {
        const zeros = getStringZeros(variables.length - stringCombine.length);
        return zeros + stringCombine;
    }
};

const getStringZeros = (count: number) => {
    let result = "";
    for (let i = 0; i < count; i++) {
        result += "0";
    }
    return result;
};

const getCombine = (variables: string[], combineString: string): Combine => {
    const result: Combine = {};
    for (let i = 0; i < variables.length; i++) {
        result[variables[i]] = Boolean(parseInt(combineString[i]));
    }
    return result;
};

const getStartStringCombine = (variables: string[]): string => {
    let result = "";
    variables.forEach(variable => { result += "0"; });
    return result;
};