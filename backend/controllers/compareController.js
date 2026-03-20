const { getPrice } = require("../services/appleServices");

exports.comparePrices = async (req, res) => {
  const { model, country1, country2 } = req.query;

  const price1 = getPrice(model, country1);
  const price2 = getPrice(model, country2);

  if (!price1 || !price2) {
    return res.status(404).json({ error: "Price not found" });
  }

  const diff = Math.abs(price1 - price2);
  const cheaper = price1 < price2 ? country1 : country2;

  res.json({
    model,
    country1: {
      code: country1,
      price: price1,
    },
    country2: {
      code: country2,
      price: price2,
    },
    difference: diff,
    cheaper,
  });
};