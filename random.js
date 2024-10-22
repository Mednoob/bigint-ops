// Pseudorandom bigint between two bigints (inclusive left and right)

/**
 * @param {BigInt} low Lower bound
 * @param {BigInt} up Upper bound
 * @returns {BigInt} Pseudorandom bigint between `low` and `up`
 */
function random(low, up) {
  if (typeof low !== "bigint") throw new TypeError("Lower bound must a bigint");
  if (typeof up !== "bigint") throw new TypeError("Upper bound must a bigint");
  if (low > up) throw new TypeError("Lower bound must be less than or equal to upper bound");

  const mult = `${Math.random()}`.slice(2); // Math.random() with only the fraction part
  const str = `${(up - low + (up < 0n ? -1n : 1n)) * BigInt(mult)}`.slice(0, -mult.length);
  return BigInt(str === "-" ? "0" : str) + low;
}
