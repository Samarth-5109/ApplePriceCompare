const productTypes = ["iphone", "ipad", "mac"];

const models = {
  iphone: [
    "iPhone 15", "iPhone 15 Plus", 
    "iPhone 15 Pro", "iPhone 15 Pro Max",
    "iPhone 14", "iPhone 14 Plus", 
    "iPhone 14 Pro", "iPhone 14 Pro Max",
    "iPhone 13", "iPhone 13 mini", 
    "iPhone 13 Pro", "iPhone 13 Pro Max"
  ],
  mac: [
    "MacBook Air M3", "MacBook Pro 14-inch M3 Pro", "MacBook Pro 16-inch M3 Pro",
    "MacBook Pro 14-inch M3 Max", "MacBook Pro 16-inch M3 Max",
    "MacBook Air M1", "MacBook Pro 14-inch M2", "MacBook Pro 16-inch M2"
  ],
  ipad: [
    "iPad Pro 12.9-inch M3", "iPad Pro 11-inch M3",
    "iPad Air 5th Gen", "iPad Air 4th Gen",
    "iPad 10th Gen", "iPad Pro 12.9-inch M2", "iPad Pro 11-inch M2"
  ]
};

exports.getProductTypes = (req, res) => {
  res.json({ productTypes });
};

exports.getProductModels = (req, res) => {
  const { product } = req.query;
  const modelsList = models[product];

  if (!modelsList) {
    return res.status(404).json({
      error: "Product not found",
      availableProducts: Object.keys(models)
    });
  }

  res.json({ models: modelsList });
};