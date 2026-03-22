const axios = require("axios");

exports.convertToUSD = async (amount, currency) => {
  const res = await axios.get(
    `https://api.exchangerate.host/convert?from=${currency}&to=USD&amount=${amount}`
  );

  return res.data.result;
};