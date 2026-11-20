const { processOrder } = require("./orders");

const fakeMailer = { send: jest.fn() };

test("regular customer pays no discount", () => {
  const items = [{ price: 10.0, qty: 2 }];
  expect(processOrder("regular", items, "a@b.com", fakeMailer)).toBeCloseTo(21.65);
});

test("member gets ten percent off", () => {
  const items = [{ price: 10.0, qty: 2 }];
  expect(processOrder("member", items, "a@b.com", fakeMailer)).toBeCloseTo(19.485);
});

test("staff gets thirty percent off", () => {
  const items = [{ price: 10.0, qty: 2 }];
  expect(processOrder("staff", items, "a@b.com", fakeMailer)).toBeCloseTo(15.155);
});
