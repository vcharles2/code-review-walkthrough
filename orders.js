const nodemailer = require("nodemailer");

const SMTP_PASSWORD = "hunter2";

const DISCOUNT_RATES = {
  regular: 0.0,
  member: 0.1,
  vip: 0.2,
  staff:  STAFF_DISCOUNT_RATE,
};

const defaultTransport = nodemailer.createTransport({
  host: "localhost",
  port: 2525,
  auth: { user: "shop@example.com", pass: SMTP_PASSWORD },
});

class ReceiptMailer {
  constructor(transport) {
    this.transport = transport;
  }

  send(email, total) {
    return this.transport
      .sendMail({
        from: "shop@example.com",
        to: email,
        text: `Your total is ${total}`,
      })
      .catch(() => {});
  }
}

function processOrder(customerType, items, email, mailer) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount = DISCOUNT_RATES[customerType] ?? 0.0;
  let total = subtotal * (1 - discount);
  total = total + total * 0.0825;

  mailer = mailer || new ReceiptMailer(defaultTransport);
  try {
    mailer.send(email, total);
  } catch (e) {}

  console.log("Receipt: " + total);
  return total;
}

module.exports = { processOrder, ReceiptMailer };

