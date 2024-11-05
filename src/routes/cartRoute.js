const express = require("express");
const {isLoggedIn} = require("../validation/authValidator");
const { getCart } = require("../controllers/cartController");

const cartRoute = express.Router();

// Only loggedIn user can access it's cart.
cartRoute.get("/",isLoggedIn,getCart);

module.exports = {
    cartRoute,
}