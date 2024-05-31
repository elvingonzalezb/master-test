// Ejercicio 2
/** 
 * function f(x, y, z) {
 * let a = x + y;
 * let b = a * z;
 * let c = Math.sin(b);
 * return c;
* } 
*/

/**
 * Se agrego documentacion basada en JSDoc
 * Se cambio los nombres de argumentos y parametros para sser mas descriptivos y apropiados
 * Se agrego validacion en caso de no ser un tipo number
 * Se agrego una excepcion. NOTA aqui dependera del contexto general y uso si se require retornar otro valor un bool
 */


/**
 * Calcula el seno del producto de la suma de dos angulos con un factor de escala.
 *
 * @param {number} angle1 - El primer angulo.
 * @param {number} angle2 - El segundo ángulo.
 * @param {number} scaleFactor - El factor de escala.
 * @returns {number} - El seno del resultado del producto.
 */
export const calculateSinOfProductOfSum = (angle1, angle2, scaleFactor) => { 
    if (typeof angle1 !== 'number'
        || typeof angle2 !== 'number'
        || typeof scaleFactor !== 'number'
    ) {
        return false;
        //throw new TypeError('Todos los argumentos deben ser números.');
    }
    const sumAngles = angle1 + angle2;
    const product = sumAngles * scaleFactor;
    if (isNaN(product)) {
        throw new Error('El resultado del producto no es un número.');
    }
    return Math.sin(product);
}

// Ejercicio 3

/**
 * Escribe una función que tome un número entero como entrada y devuelva un array con
 * todos los números enteros impares desde 1 hasta el número de entrada. Por ejemplo, si el
 * número de entrada es 9, la función debería devolver [1, 3, 5, 7, 9].
 */

/**
 * Se agrego documentacion basada en JSDoc
 * Se creo funcion que recibe un numero y valida sea numero, entero y positivo
 * Recorre verifica sea numero impar y agrega a un array
 * Se agrego una excepcion. NOTA aqui dependera del contexto general y uso si se require retornar otro valor un bool
 */


/** 
 * Retorna una matrix de numeros menores del numero proporcionado
 * 
 * @param {number} number - El numero a evaluar.
* @returns {Array} - El resultado en un array
*/
export const processMatrixOddNumbers = (number) => {
    // Validar que el argumento sea un número
    if (typeof number !== 'number') {
        throw new TypeError('El argumento debe ser un número.');
    }

    // Validar que el número sea positivo
    if (number < 0) {
        throw new Error('El número debe ser positivo.');
    }

    // Validar que el número sea entero
    if (!Number.isInteger(number)) {
        throw new Error('El número debe ser un entero.');
    }

    const oddNumbers = [];
    for (let i = 1; i <= number; i++) {
        if (i % 2 !== 0) {
            oddNumbers.push(i);
        }
    }
    return oddNumbers;
}

