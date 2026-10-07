/*
 * V-CLEAN - 2026-10-07 - The Checkout Form Cleaner (Operators & type coercion)
 *
 * WHAT CHANGED vs exercise-2026-10-07.js
 * - parsePrice no longer crashes on null/undefined/non-strings: the original called
 *   text.trim() BEFORE checking `!text`, so parsePrice(undefined) threw a TypeError.
 * - Number.isFinite() replaces Number.isNaN(): it also rejects "Infinity", which is
 *   not a valid price, and reads as one clear check.
 * - `if (x) return a; else return b;` -> a single ternary; `=== true` removed.
 * - cartTotal uses reduce() with a default parameter instead of a manual guard + loop.
 * - Rounding lives in its own helper and adds Number.EPSILON so values like 1.005
 *   round to 1.01 instead of 1.
 *
 * Run: node V-exercise-2026-10-07.js
 */

/**
 * Converts a form value to a number.
 * @param {unknown} text
 * @returns {number | null} the number, or null if the value is not a valid number
 */
function parsePrice(text) {
	if (typeof text !== "string") return null;
	const trimmed = text.trim();
	if (trimmed === "") return null; // Number("") is 0, which would be a free item
	const value = Number(trimmed);
	return Number.isFinite(value) ? value : null;
}

/**
 * Strict comparison: same type AND same value (no coercion).
 * @param {unknown} a
 * @param {unknown} b
 * @returns {boolean}
 */
const isSameValue = (a, b) => a === b;

/**
 * Rounds a money amount to 2 decimals.
 * @param {number} amount
 * @returns {number}
 */
const roundMoney = (amount) => Math.round((amount + Number.EPSILON) * 100) / 100;

/**
 * Sums price * qty for each item, skipping items with an invalid price or qty.
 * @param {{ price: string, qty: string }[]} [items]
 * @returns {number}
 */
function cartTotal(items = []) {
	const total = items.reduce((sum, { price, qty }) => {
		const p = parsePrice(price);
		const q = parsePrice(qty);
		return p === null || q === null ? sum : sum + p * q;
	}, 0);
	return roundMoney(total);
}

// ---------- TESTS ----------
console.assert(parsePrice("12.5") === 12.5, "parsePrice('12.5')");
console.assert(parsePrice("  7 ") === 7, "parsePrice('  7 ')");
console.assert(parsePrice("") === null, "parsePrice('') should be null");
console.assert(parsePrice("   ") === null, "parsePrice(spaces) should be null");
console.assert(parsePrice("abc") === null, "parsePrice('abc') should be null");
console.assert(parsePrice("0") === 0, "parsePrice('0') should be 0");
// extra edge cases
console.assert(parsePrice(undefined) === null, "parsePrice(undefined) should be null");
console.assert(parsePrice("Infinity") === null, "parsePrice('Infinity') should be null");

console.assert(isSameValue("5", 5) === false, "'5' vs 5");
console.assert(isSameValue(5, 5) === true, "5 vs 5");
console.assert(isSameValue(null, undefined) === false, "null vs undefined");
console.assert(isSameValue(NaN, NaN) === false, "NaN vs NaN (NaN !== NaN)");

console.assert(
	cartTotal([
		{ price: "10", qty: "2" },
		{ price: "abc", qty: "1" },
	]) === 20,
	"skip invalid",
);
console.assert(cartTotal([{ price: "0.1", qty: "3" }]) === 0.3, "rounding 0.1*3");
console.assert(cartTotal([{ price: "5", qty: "" }]) === 0, "empty qty ignored");
console.assert(cartTotal([]) === 0, "empty cart");
// extra edge cases
console.assert(cartTotal() === 0, "missing cart");
console.assert(cartTotal([{ price: "1.005", qty: "1" }]) === 1.01, "rounding 1.005");
console.log("Done - no 'Assertion failed' lines above means all tests passed!");
