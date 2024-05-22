const express = require("express");
const {
  addItemToCart,
  getCartItems,
  removeCartItems,
} = require("../controllers/cart");
const auth = require("../middleware/auth.js");
const router = express.Router();

router.post(
  "/user/cart/addtocart",
  auth,
  addItemToCart
);
router.post(
  "/user/getCartItems",
  auth,
  getCartItems
);
router.post(
  "/user/cart/removeItem",
  auth,
  removeCartItems
);
module.exports = router;
