const lib = require("../lib");

describe("absolute", () => {
  it("should return a positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });
  
  it("should return a positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });
  
  it("should return a zero if input is zero", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});


describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Bipin");
    expect(result).toMatch(/Bipin/);
    expect(result).toContain("Bipin");
  });
});


describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();

    // too genera
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    // too specific
    expect(result[0]).toBe("USD");
    expect(result[1]).toBe("AUD");
    expect(result[2]).toBe("EUR");
    expect(result.length).toBe(3);

    // Proper way
    expect(result).toContain("USD");
    expect(result).toContain("AUD");
    expect(result).toContain("EUR");

     // Ideal way
     expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));

  }); 
});