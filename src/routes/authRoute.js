const express = require("express");
const { authController, logout}= require("../controllers/authController");
const { isLoggedIn } = require("../validation/authValidator");

const authRoute = express.Router();

authRoute.post("/login",authController);

authRoute.post("/logout",logout);

authRoute.get("/isLoggedIn", isLoggedIn, (req, res) => {
    res.status(200).json({
        success: true,
        message: "User is logged in",
        error: {},
        data : {},
    });
});

module.exports = {
    authRoute,
}