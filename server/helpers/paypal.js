const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "ATCxpAe-1Jh60opist5YzFHN1b5nghZ1DszpnLp8NPEoAy_00BEaRjXiwOWYqgeo1NpjGIM4e2KUmXWZ",
  client_secret:
    "EODHg8IG_Qk1cJR5dOaq4T4rJt_GYqyQW-0pHjXMhTFMEN9LUNmC-bAMidldWRAbI6K501OzsO_pqqu7",
});
module.exports = paypal;
