const express = require("express");
const { authController, logout}= require("../controllers/authController");

const authRoute = express.Router();

authRoute.post("/login",authController);

authRoute.post("/logout",logout);

module.exports = {
    authRoute,
}