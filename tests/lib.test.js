const lib = require('../lib')

test('absolute - should return a positive number if input is positive', () => {
	const result = lib.absolute(2)
	expect(result).toBe(2)
})

test('absolute - should return a positive number if input is negative', () => {
	const result = lib.absolute(-2)
	expect(result).toBe(2)
})

test('absolute - should return 0 number if input is 0', () => {
	const result = lib.absolute(0)
	expect(result).toBe(0)
})