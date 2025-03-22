const { authServices } = require("../services/authServices");
const AppError = require("../utils/appError");

async function authController(req, res) {
    // The user must provide email and password to login.
    const loginDetails = req.body;

    try {
        // Generate the token
        const response = await authServices(loginDetails);

        res.cookie('auth', response.jwt, {
            maxAge: 24 * 60 * 1000,
            httpOnly: true,
            secure: true,               // required for cross-origin cookie (HTTPS)
            sameSite: "Lax",           // allow across origins
            path: '/',
        })

        console.log(response.jwt);

        return res.status(200).json({
            message: "Login successfully",
            success: true,
            data: {
                userRole: response.userRole,
                userData: response.userData,
            },
            error: {},
        })

    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error,
            })
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error,
            data: {},
        })
    }
}

function logout(req, res) {

    res.cookie("auth", "");
    return res.status(200).json({
        success: true,
        message: "Logout successfull",
        data: {},
        error: {},
    })
}

module.exports = {
    authController,
    logout
}