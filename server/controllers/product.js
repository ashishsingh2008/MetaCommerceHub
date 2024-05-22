const Product = require("./../models/productModel");

const findByName = async (name) => {
  const results = await Product.find({ name: { $regex: new RegExp(name, 'i') } });
  return results;
};

const filterByPrice = async (price) => {
  const objs = await Product.find({
    price: {
      $lte: price,
    },
  });
  return objs;
};

const CreateProduct = async (obj) => {
  const entry = new Product(obj);
  try {
    await entry.save();
  } catch (err) {
    res.status(500).json({ err });
  }
  return entry;
};

const findByID = async (list) => {
  const obj = await Product.find({
    _id: {
      $in: list,
    },
  });
  return obj;
};

module.exports = {
  findByName,
  CreateProduct,
  filterByPrice,
  findByID,
};
