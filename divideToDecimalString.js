// Divide bigint with bigint, with the result is a string representing the quotient / result in a certain precision

/**
 * @param {BigInt} dividend Dividend
 * @param {BigInt} divisor Divisor
 * @param {boolean} fixed Setting this to true means that trailing zeros will be added to the result so that the decimal part has the same length as precision
 * @param {BigInt | number} precision The decimal precision of the result
 * @returns {string} The result of the division
 */
function divideToDecimalString(dividend, divisor, fixed=false, precision=16n) {
  if (typeof dividend !== "bigint") throw new TypeError("The dividend must be a bigint");
  if (typeof divisor !== "bigint") throw new TypeError("The divisor must be a bigint");
  if (typeof precision !== "bigint" && typeof precision !== "number") throw new TypeError("The precision must be a bigint or a number");
  if (precision < 0 || (typeof precision === "number" && !Number.isInteger(precision))) throw new TypeError("The precision must be a non-negative integer");

  const min = (dividend < 0) !== (divisor < 0);

  // If the result is negative, then the sign of one of the integer must be changed
  if (min) dividend = -dividend;

  const integerPart = (dividend / divisor).toString();
  let decimalPart = "";

  let remainder = dividend % divisor;
  for (let x = 1; (fixed || remainder !== 0n) && x <= precision; x++) {
    remainder *= 10n;
    decimalPart += remainder / divisor;
    remainder %= divisor;
  }

  return (min ? "-" : "") + (decimalPart ? `${integerPart}.${decimalPart}` : integerPart);
}
