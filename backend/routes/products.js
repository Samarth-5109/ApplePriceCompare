const express = require("express");
const router = express.Router();

const {
  getProductTypes,
  getProductModels,
} = require("../controllers/productController");

router.get("/types", getProductTypes);
router.get("/models", getProductModels);

module.exports = router;