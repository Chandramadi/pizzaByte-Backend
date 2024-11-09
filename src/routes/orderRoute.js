const express = require("express");
const {isLoggedIn} = require("../validation/authValidator");
const {createOrder} = require("../controllers/orderController");

const orderRoute = express.Router();

orderRoute.post("/",isLoggedIn,createOrder);

module.exports = {
    orderRoute,
}