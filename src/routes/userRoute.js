const express = require("express");
const userController = require("../controllers/userController");
const userRoute = express.Router();

// Defining an user route
userRoute.post("/",userController); // user controller

module.exports = {
    userRoute,
}
