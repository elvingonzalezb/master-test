import { calculateSinOfProductOfSum, validateNumber, processMatrixOddNumbers } from '../utils/functions'

describe('calculateSinOfProductOfSum', () => {
    test('Debe calcular el seno del producto de la suma de dos angulos con un factor de escala', () => {
        expect(calculateSinOfProductOfSum(0, 0, 1)).toBeCloseTo(0);
        expect(calculateSinOfProductOfSum(Math.PI / 2, Math.PI / 2, 1)).toBeCloseTo(0.999999, 5);
    });
    test('Debe devolver false si alguno de los argumentos no es un número', () => {
        expect(calculateSinOfProductOfSum(1, 'dos', 3)).toBe(false);
        expect(calculateSinOfProductOfSum(1, 2, 'tres')).toBe(false);
        expect(calculateSinOfProductOfSum('uno', 'dos', 'tres')).toBe(false);
    });
});

describe('processMatrixOddNumbers', () => {
    test('Retorna una matriz de números impares hasta el número dado', () => {
        expect(processMatrixOddNumbers(5)).toEqual([1, 3, 5]);
        expect(processMatrixOddNumbers(10)).toEqual([1, 3, 5, 7, 9]);
    });

    test('Lanza un error si el argumento no es un número', () => {
        expect(() => {
            processMatrixOddNumbers('abc');
        }).toThrow('El argumento debe ser un número.');
    });

    test('Lanza un error si el número es negativo', () => {
        expect(() => {
            processMatrixOddNumbers(-5);
        }).toThrow('El número debe ser positivo.');
    });

    test('Lanza un error si el número no es un entero', () => {
        expect(() => {
            processMatrixOddNumbers(5.5);
        }).toThrow('El número debe ser un entero.');
    });
});
