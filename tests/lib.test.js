const lib = require('../lib')
const db = require('../db')
const mail = require('../mail')

describe('absolute', () => {
	it('should return a positive number if input is positive', () => {
		const result = lib.absolute(2)
		expect(result).toBe(2)
	})

	it('should return a positive number if input is negative', () => {
		const result = lib.absolute(-2)
		expect(result).toBe(2)
	})

	it('should return 0 number if input is 0', () => {
		const result = lib.absolute(0)
		expect(result).toBe(0)
	})
})

describe('greet', () => {
	it('should return the greeting message', () => {
		const result = lib.greet('Node')
		expect(result).toBe('Welcome Node') // - Too specific
		expect(result).toMatch(/Node/)
		expect(result).toContain('Node')
	})
})

describe('getCurrencies', () => {
	it('should return supported currencies', () => {
		const result = lib.getCurrencies()

		// Too general
		expect(result).toBeDefined()
		expect(result).not.toBeNull()

		// Too Specific
		expect(result[0]).toBe('USD')
		expect(result[1]).toBe('AUD')
		expect(result[2]).toBe('EUR')
		expect(result.length).toBe(3)

		// Proper way
		expect(result).toContain('USD')
		expect(result).toContain('AUD')
		expect(result).toContain('EUR')

		// Cleaner way
		expect(result).toEqual(expect.arrayContaining(['AUD', 'USD', 'EUR']))
	})
})

describe('getProduct', () => {
	it('should return the product with the given id', () => {
		const result = lib.getProduct(1)
		expect(result).toEqual({ id: 1, price: 10 })
		expect(result).toMatchObject({ id: 1, price: 10 })
		expect(result).toHaveProperty('id', 1)
	})
})

describe('registerUser', () => {
	it('should throw if username is falsy', () => {
		const args = [null, undefined, NaN, '', 0, false]
		args.forEach(a => {
			expect(() => {
				lib.registerUser(a)
			}).toThrow()
		})
	})

	it('should return if valid username is passed', () => {
		const result = lib.registerUser('Node')
		expect(result).toMatchObject({ username: 'Node' })
		expect(result.id).toBeGreaterThan(0)
	})
})

describe('applyDiscount', () => {
	it('should apply 10% discount if customer has more than 10 points', () => {
		db.getCustomerSync = function(customerId) {
			return { id: customerId, points: 20 }
		}

		const order = { customerId: 1, totalPrice: 10 }
		lib.applyDiscount(order)
		expect(order.totalPrice).toBe(9)
	})
})

describe('notifyCustomer', () => {
	it('should send an email to the customer', () => {
		// METHOD: 1

		// db.getCustomerSync = function(customerId) {
		// 	return { email: 'e' }
		// }

		// let mailSent = false
		// mail.send = function(email, message) {
		// 	mailSent = true
		// }

		// const order = { customerId: 1 }
		// lib.notifyCustomer(order)
		// expect(mailSent).toBe(true)

		// METHOD: 2 - JEST MOCK

		db.getCustomerSync = jest.fn().mockReturnValue({ email: 'e' })
		mail.send = jest.fn()

		const order = { customerId: 1 }
		lib.notifyCustomer(order)

		expect(mail.send).toHaveBeenCalled()
		expect(mail.send.mock.calls[0][0]).toBe('e')
		expect(mail.send.mock.calls[0][1]).toMatch(/order/)
	})
})
