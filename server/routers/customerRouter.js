const router = require("express").Router();
const Customer = require("../models/customerModel");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { name } = req.body;
    const newCustomer = new Customer({
      name,
    });
    const savedCustomer = await newCustomer.save();
    res.json(savedCustomer);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", auth, async (_, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
