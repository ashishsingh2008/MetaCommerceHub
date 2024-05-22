import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Customers from "./components/customers/Customers";
import Navbar_ from "./components/layout/Navbar";
import AuthContext from "./context/AuthContext";
import Cart from "./components/Cart/Cart";
import ItemLayout from "./components/layout/ItemLayout";
import ViewProduct from "./components/Items/ViewProduct";
import Profile from "./components/layout/Profile";
import CreateAvatar from "./components/avatar/CreateAvatar";
import ViewAvatar from "./components/avatar/ViewAvatar";
import Metaverse from "./Metaverse";
import Home from "./Home";
import axios from "axios";
import ViewVR from "./components/Items/ViewVR";

function Router() {
  const { loggedIn } = useContext(AuthContext);
  const [CartSize, setCartSize] = useState(0);

  useEffect(() => {
    axios
      .post("https://metacommercehub.onrender.com/api/user/getCartItems", {})
      .then((res) => {
        setCartSize(res.data.cartItems.length);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Navbar_ badgeValue={CartSize} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/CreateAvatar" element={<CreateAvatar />} />
        <Route path="/ViewAvatar" element={<ViewAvatar />} />
        <Route path="/Cart" element={<Cart cartItemsSize={CartSize} />} />
        <Route path="/Item" element={<ItemLayout />} />
        <Route path="/ViewProduct/:product" element={<ViewProduct />} />
        <Route path="/ViewVR" element={<ViewVR />} />
        <Route path="/Metaverse" element={<Metaverse />} />
        {loggedIn && (
          <>
            <Route path="/customer" element={<Customers />} />
            <Route path="/Profile" element={<Profile />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
