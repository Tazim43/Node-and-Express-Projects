const express = require("express");
const router = express.Router();

const {
   getAllProductStatic,
   getAllProduct,
} = require("../controllers/products");

router.get("/", getAllProduct);
router.get("/static", getAllProductStatic);

module.exports = router;
