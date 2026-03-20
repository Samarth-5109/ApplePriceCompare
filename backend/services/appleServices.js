const productTypes = ["iphone", "ipad", "macbook"];

const models = {
  iphone: [
    "iPhone 15",
    "iPhone 15 Plus",
    "iPhone 15 Pro",
    "iPhone 15 Pro Max"
  ],
};

const priceData = {
  "iPhone 15 Pro": {
    US: 999,
    IN: 134900,
    GB: 999
  },
  "iPhone 15": {
    US: 799,
    IN: 79900,
    GB: 799
  }
};

exports.getProductTypes = (req, res) => {
  res.json(productTypes);
};

exports.getProductModels = (req, res) => {
  const { type } = req.query;
  res.json(models[type] || []);
};

exports.getPrice = (model, country) => {
  return priceData[model]?.[country] || null;
};