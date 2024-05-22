const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();


// connect to mongoDB
mongoose.connect(process.env.MDB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

// set up routes

app.use("/auth", require("./routers/userRouter"));
app.use("/customer", require("./routers/customerRouter"));

app.use("/product", require("./routers/productRouter"));

app.use("/tags", require("./routers/tagsRouter.js"));
app.use("/wishlist", require("./routers/wishlistRouter.js"));
app.use("/api", require("./routers/addToCartRouter"));
