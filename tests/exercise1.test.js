const exercise1 = require("../exercise1");

describe("fizzBuzz", () => {
  it("should throw error if input is not a number", () => {
    expect(() =>  exercise1.fizzBuzz("String")).toThrow();
    expect(() =>  exercise1.fizzBuzz(null)).toThrow();
    expect(() =>  exercise1.fizzBuzz(undefined)).toThrow();
    expect(() =>  exercise1.fizzBuzz({})).toThrow();
  });

  it("should return fizzBuzz if a input is divisible by 3 and 5", () => {
    const result = exercise1.fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });

  it("should return Fizz if a input is only divisible by 3 ", () => {
    const result = exercise1.fizzBuzz(9);
    expect(result).toBe("Fizz");
  });

  it("should return Buzz if a input is only divisible by 5", () => {
    const result = exercise1.fizzBuzz(10);
    expect(result).toBe("Buzz");
  });

  it("should return same input if a input is not divisible by 3 or 5", () => {
    const result = exercise1.fizzBuzz(1);
    expect(result).toBe(1);
  });
});