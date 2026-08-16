const { getProductModels, getPrice } = require("../services/appleServices");

const priceData = {
  "iPhone 15": {
    US: 799, IN: 79900, GB: 799, AE: 2999, CA: 999, JP: 89900, SG: 1499, HK: 6799, AU: 1299, DE: 899
  },
  "iPhone 15 Pro": {
    US: 999, IN: 134900, GB: 999, AE: 3949, CA: 1299, JP: 114900, SG: 1999, HK: 8499, AU: 1699, DE: 1199
  },
  "iPhone 15 Plus": {
    US: 899, IN: 89900, GB: 899, AE: 3479, CA: 1199, JP: 104900, SG: 1799, HK: 7799, AU: 1599, DE: 1099
  },
  "iPhone 15 Pro Max": {
    US: 1199, IN: 159900, GB: 1199, AE: 4599, CA: 1699, JP: 144900, SG: 2499, HK: 9999, AU: 1999, DE: 1499
  },
  "iPhone 14": {
    US: 699, IN: 69900, GB: 699, AE: 2599, CA: 899, JP: 79900, SG: 1399, HK: 5999, AU: 1199, DE: 799
  },
  "iPhone 14 Pro": {
    US: 899, IN: 119900, GB: 899, AE: 3399, CA: 1149, JP: 99900, SG: 1749, HK: 7499, AU: 1499, DE: 999
  },
  "iPhone 13": {
    US: 599, IN: 59900, GB: 599, AE: 1999, CA: 749, JP: 64900, SG: 1099, HK: 4999, AU: 999, DE: 649
  },
  "MacBook Air M3": {
    US: 1099, IN: 149900, GB: 1099, AE: 4299, CA: 1499, JP: 149900, SG: 2499, HK: 10999, AU: 2199, DE: 1499
  },
  "MacBook Pro 14-inch M3 Pro": {
    US: 1999, IN: 269900, GB: 1999, AE: 7299, CA: 2499, JP: 269900, SG: 4499, HK: 19999, AU: 3999, DE: 2699
  },
  "MacBook Pro 16-inch M3 Pro": {
    US: 2499, IN: 339900, GB: 2499, AE: 9199, CA: 3199, JP: 339900, SG: 5999, HK: 25999, AU: 4999, DE: 3299
  },
  "iPad Pro 12.9-inch M3": {
    US: 1099, IN: 149900, GB: 1099, AE: 3999, CA: 1399, JP: 149900, SG: 2499, HK: 10999, AU: 2199, DE: 1499
  },
  "iPad Air 5th Gen": {
    US: 599, IN: 84900, GB: 599, AE: 2199, CA: 749, JP: 84900, SG: 1399, HK: 5999, AU: 1199, DE: 749
  },
  "iPad 10th Gen": {
    US: 449, IN: 59900, GB: 449, AE: 1499, CA: 549, JP: 59900, SG: 1049, HK: 4919, AU: 999, DE: 549
  }
};

exports.comparePrices = async (req, res) => {
  try {
    const { model, country1, country2 } = req.query;

    if (!model || !country1 || !country2) {
      return res.status(400).json({
        error: "Missing required parameters",
        required: ["model", "country1", "country2"],
        received: ["model", "country1", "country2"]
      });
    }

    const price1 = getPrice(model, country1);
    const price2 = getPrice(model, country2);

    if (!price1 || !price2) {
      return res.status(404).json({
        error: "Price not found for the specified model and/or countries",
        model,
        requestedCountries: [country1, country2],
        availableCountries: Object.keys(priceData[model] || {}),
        hint: `Try a different country or model. Available models: ${Object.keys(priceData).join(", ")}`
      });
    }

    const diff = Math.abs(price1 - price2);
    const percentageDiff = ((diff / Math.min(price1, price2)) * 100).toFixed(1);
    const cheaper = price1 < price2 ? country1 : country2;
    const moreExpensive = price1 < price2 ? country2 : country1;
    const moreExpensivePrice = price1 < price2 ? price2 : price1;

    res.json({
      success: true,
      model,
      comparison: {
        country1: {
          code: country1,
          price: price1,
        },
        country2: {
          code: country2,
          price: price2,
        }
      },
      difference: {
        absolute: diff,
        percentage: parseFloat(percentageDiff),
        cheaperCountry: cheaper,
        moreExpensiveCountry: moreExpensive,
        moreExpensivePrice: moreExpensivePrice
      },
      savings: {
        country: moreExpensive,
        amount: moreExpensivePrice - diff,
        percentage: parseFloat(percentageDiff),
        currency: "USD"
      }
    });
  } catch (error) {
    console.error("Comparison error:", error);
    return res.status(500).json({
      error: "Comparison failed",
      message: "An unexpected error occurred during price comparison"
    });
  }
};