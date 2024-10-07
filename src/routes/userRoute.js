const express = require("express");
const {createUser} = require("../controllers/userController");
const userRoute = express.Router();

// Defining an user route
userRoute.post("/",createUser); // user controller

module.exports = {
    userRoute,
}
