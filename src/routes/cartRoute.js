const express = require("express");
const {isLoggedIn} = require("../validation/authValidator");
const { getCart,modifyProduct,clearCart} = require("../controllers/cartController");

const cartRoute = express.Router();

// Only loggedIn user can access it's cart.
cartRoute.get("/",isLoggedIn,getCart);

cartRoute.post("/:operation/:productId",isLoggedIn,modifyProduct);

cartRoute.delete("/products",isLoggedIn,clearCart);

module.exports = {
    cartRoute,
}