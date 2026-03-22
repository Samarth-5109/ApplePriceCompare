const express = require("express");
const router = express.Router();

const { comparePrices } = require("../controllers/compareController");

router.get("/", comparePrices);

module.exports = router;