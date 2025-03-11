const express = require("express");
const {isLoggedIn, isAdmin} = require("../validation/authValidator");
const {createOrder,getAllOrders,getOrdersById,cancelOrder,updateStatus} = require("../controllers/orderController");

const orderRoute = express.Router();

orderRoute.post("/",isLoggedIn,createOrder);

orderRoute.get("/",isLoggedIn,getAllOrders);

orderRoute.get("/:orderId",isLoggedIn,getOrdersById);

orderRoute.put("/:orderId/cancel",isLoggedIn,cancelOrder);

orderRoute.put("/:orderId/status",isLoggedIn,isAdmin, updateStatus);

module.exports = {
    orderRoute,
}
