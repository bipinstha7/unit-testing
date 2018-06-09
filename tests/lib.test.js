const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

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


describe("getProduct", () => {
  it("should return the product with the given id", () => {
    const result = lib.getProduct(1);
    expect(result).toEqual({id: 1, price: 10});

    expect(result).toMatchObject({id: 1, price: 10});

    // expect(result).toHaveProperty({id: 1, price: 10});
    
  });
});

describe('registerUser', () => {
  it("should throw error if username is falsy", () => {
    //  NULL undefined NaN '' 0 false --> falsy values

    const falsyValues = [null, undefined, NaN, '', 0, false];
    falsyValues.map(falsyValue => {
      expect(() => {lib.registerUser(falsyValue)}).toThrow();
    });
  });

  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("Bipin");
    expect(result).toMatchObject({username: "Bipin"});

    // date can't be compared or matched because the time when
    // registerUser is invoked and the test code is always different
    expect(result.id).toBeGreaterThan(0);
  });
});


describe('applyDisount', () => {
  it("should apply 10% discount if customer has more than 10 points", () => {
    db.getCustomerSync = (customerId) => {
      console.log("Fake Reading Customer...");
      return {
        id: customerId,
        points: 20
       };
    }
    const order = {
      customerId: 1, 
      totalPrice: 10
    }
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});


describe('notifyCustomer', () => {
  it("should send an email to the customer", () => {

    db.getCustomerSync = jest.fn().mockReturnValue({email: "Hello"});

    mail.send = jest.fn();
    
    lib.notifyCustomer({customerId: 1});
    expect(mail.send).toHaveBeenCalled();
  });
})
