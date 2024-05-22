const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// function runUpdate(condition, updateData) {
//   return new Promise((resolve, reject) => {
//     //you update code here
//     Cart.findOneAndUpdate(condition, updateData, { upsert: true })
//       .then((result) => resolve())
//       .catch((err) => reject(err));
//   });
// }
// Function to perform the update
const runUpdate = async (condition, update) => {
  return await Cart.findOneAndUpdate(condition, update, { new: true }).exec();
};

const addItemToCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.cookies.user });

    if (cart) {
      // If cart already exists, update cart by quantity
      for (const cartItem of req.body.cartItems) {
        const { product } = cartItem;
        const item = cart.cartItems.find((c) => c.product._id.toString() === product._id.toString());

        let condition, update;
        if (item) {
          condition = {
            user: req.cookies.user,
            "cartItems.product": product._id,
          };

          update = {
            $set: {
              "cartItems.$": cartItem,
            },
          };
        } else {
          condition = { user: req.cookies.user };
          update = {
            $push: {
              cartItems: cartItem,
            },
          };
        }

        await runUpdate(condition, update);
      }

      return res.status(201).json({ message: 'Cart updated successfully' });
    } else {
      // If cart does not exist, create a new cart
      const newCart = new Cart({
        user: req.cookies.user,
        cartItems: req.body.cartItems,
      });

      const savedCart = await newCart.save();
      return res.status(201).json({ cart: savedCart });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.cookies.user });

    if (!cart) {
      return res.status(404).json({ message: 'Cart Empty!!' });
    }

    const cartItems = cart.cartItems.map((item) => ({
      _id: item.product._id.toString(),
      qty: item.quantity,
      name: item.name,
      imageLink: item.imageLink,
      price: item.price,
      tagsUI: item.tagsUI,
    }));

    res.status(200).json({ cartItems });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// new update remove cart items
const removeCartItems = async (req, res) => {
  const productId = req.body.payload;

  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  try {
    const result = await Cart.updateOne(
      { user: req.cookies.user },
      {
        $pull: {
          cartItems: {
            product: productId,
          },
        },
      }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    res.status(202).json({ message: 'Product removed from cart', result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addItemToCart,
  removeCartItems,
  getCartItems
};