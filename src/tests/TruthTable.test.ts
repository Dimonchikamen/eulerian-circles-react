import { createTruthTable } from '../Types/TruthTable';

describe('TruthTable', () => {
    it('Проверка на правильную генерацию таблицы', () => {
        const table = createTruthTable(
            ['a'],
            [{ a: false }, { a: true }],
            [false, true]
        );

        expect(table.variables).toEqual(['a']);
        expect(table.headers).toEqual(['a', 'result']);
        expect(table.body).toEqual([
            [0, 0],
            [1, 1],
        ]);
    });
});
