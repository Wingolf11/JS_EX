/*
 * JS FUNDAMENTALS - 2026-10-07 - Day 1 - Level 1 (easy)
 * Topic: Operators and type coercion
 *
 * TITLE: The Checkout Form Cleaner
 *
 * PROBLEM
 * Your web shop's checkout form sends EVERYTHING as strings: "12.5", " 3 ", "", "abc"...
 * Write three small helpers that safely convert and compare these values.
 *
 * 1. parsePrice(text)  -> number, or null if the text is not a valid number.
 *      parsePrice("12.5") -> 12.5     parsePrice("  7 ") -> 7
 *      parsePrice("")     -> null     parsePrice("abc")  -> null
 *      (watch out: Number("") is 0, which would be a free item!)
 *
 * 2. isSameValue(a, b) -> true only if a and b have the same value AND type.
 *      isSameValue("5", 5) -> false    isSameValue(5, 5) -> true
 *
 * 3. cartTotal(items)  -> sum of price * qty for each item {price, qty} (both strings).
 *      Items with an invalid price or qty are ignored. Round to 2 decimals (return a number).
 *      cartTotal([{price:"10", qty:"2"}, {price:"abc", qty:"1"}]) -> 20
 *
 * HINTS
 * - Number(x) converts to a number; Number.isNaN() checks for NaN. Trim first with .trim().
 * - Use === instead of == to avoid hidden coercion.
 * - Reuse parsePrice inside cartTotal. For rounding: Math.round(x * 100) / 100.
 *
 * Run: node exercise-2026-10-07.js
 */

function parsePrice(text) {
	// TODO
	const str = text.trim();
	if (!text || !str) return null;
	const num = Number(str);
	if (Number.isNaN(num) === true) return null;
	else return num;
}

function isSameValue(a, b) {
	// TODO
	return a === b;
}

function cartTotal(items) {
	// TODO

	let total = 0;
	if (!items) return total;
	for (const item of items) {
		const price = parsePrice(item.price);
		const quantity = parsePrice(item.qty);
		if (price === null || quantity === null) continue;
		total += price * quantity;
		
	}
  return Math.round(total * 100) / 100;
}

// ---------- TESTS ----------
console.assert(parsePrice("12.5") === 12.5, "parsePrice('12.5')");
console.assert(parsePrice("  7 ") === 7, "parsePrice('  7 ')");
console.assert(parsePrice("") === null, "parsePrice('') should be null");
console.assert(parsePrice("   ") === null, "parsePrice(spaces) should be null");
console.assert(parsePrice("abc") === null, "parsePrice('abc') should be null");
console.assert(parsePrice("0") === 0, "parsePrice('0') should be 0");

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
console.assert(
	cartTotal([{ price: "0.1", qty: "3" }]) === 0.3,
	"rounding 0.1*3",
);
console.assert(cartTotal([{ price: "5", qty: "" }]) === 0, "empty qty ignored");
console.assert(cartTotal([]) === 0, "empty cart");
console.log("Done - no 'Assertion failed' lines above means all tests passed!");
