"use strict";
exports.__esModule = true;
exports.power = exports.double = void 0;
/**
 * Multiplies a value by 2. (Also a full example of TypeDoc's functionality.)
 *
 * ### Example (es module)
 * ```js
 * import { double } from 'typescript-starter'
 * console.log(double(4))
 * // => 8
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var double = require('typescript-starter').double;
 * console.log(double(4))
 * // => 8
 * ```
 *
 * @param value - Comment describing the `value` parameter.
 * @returns Comment describing the return type.
 * @anotherNote Some other value.
 */
var double = function (value) {
    return value * 2;
};
exports.double = double;
/**
 * Raise the value of the first parameter to the power of the second using the
 * es7 exponentiation operator (`**`).
 *
 * ### Example (es module)
 * ```js
 * import { power } from 'typescript-starter'
 * console.log(power(2,3))
 * // => 8
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var power = require('typescript-starter').power;
 * console.log(power(2,3))
 * // => 8
 * ```
 * @param base - the base to exponentiate
 * @param exponent - the power to which to raise the base
 */
var power = function (base, exponent) {
    /**
     * This es7 exponentiation operator is transpiled by TypeScript
     */
    return Math.pow(base, exponent);
};
exports.power = power;
