import { createTruthTable } from '../Types/TruthTable';
import {
    convertToPolishNotation,
    getTruthTable,
    getVariables,
} from '../Helpers/Interpretator';
import { ValidateType } from '../Types/ValidateType';

describe('Проверка интерпретатора', () => {
    it('Проверка польской нотации', () => {
        const res = convertToPolishNotation('a∨b');
        expect(res).toEqual('ab∨');
    });

    it('getVariableIsCorrectly 1 переменная', () => {
        const res = getVariables('a∨a');
        expect(res).toEqual(['a']);
    });

    it('getVariableIsCorrectly 2 переменных', () => {
        const res = getVariables('a∨b');
        expect(res).toEqual(['a', 'b']);
    });

    it('Таблица истинности', () => {
        const res = getTruthTable('a∨b', ValidateType.EULER_CIRCLES);
        const answ = createTruthTable(
            ['a', 'b'],
            [
                { a: false, b: false },
                { a: false, b: true },
                { a: true, b: false },
                { a: true, b: true },
            ],
            [false, true, true, true]
        );

        expect(res).toEqual(answ);
    });
});
