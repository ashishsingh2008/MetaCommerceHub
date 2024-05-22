const router = require("express").Router();
const Product = require("../models/productModel");

const {
  CreateProduct,
  findByName,
  filterByPrice,
} = require("./../controllers/product");

router.get("/", async (_, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
router.post("/create", async (req, res) => {
  const results = await CreateProduct(req.body);
  res.status(200).json(results);
});

router.post("/findByName", async (req, res) => {
  const results = await findByName(req.body.name);
  res.json(results);
});

router.post("/filterByPrice", async (req, res) => {
  const results = await filterByPrice(req.body.price);
  res.send(results);
});

module.exports = router;
