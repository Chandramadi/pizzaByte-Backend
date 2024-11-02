const { authServices } = require("../services/authServices");

async function authController(req,res){
    // The user must provide email and password to login.
    const loginDetails = req.body;

    try{
        // Generate the token
        const response = await authServices(loginDetails);

        res.cookie('auth',response,{
            maxAge:24*60*1000,
            httpOnly: true,
        })

        return res.status(200).json({
            message:"Login successfully",
            success: true,
            token:{},
        })

    }catch(error){
        return res.status(error.statusCode || 500).json({
            success:false,
            message:error.message || "Internal server error.",
            error:error,
        })
    }
}

module.exports = {
    authController,
}