const productTypes = ["iphone", "ipad", "mac"];

const models = {
  iphone: ["iPhone 15", "iPhone 15 Pro", "iPhone 15 Pro Max"],
  mac: ["MacBook Air M3", "MacBook Pro M3"],
  ipad: ["iPad Pro", "iPad Air"]
};

exports.getProductTypes = (req, res) => {
  res.json(productTypes);
};

exports.getProductModels = (req, res) => {
  const { product } = req.query;
  res.json(models[product] || []);
};