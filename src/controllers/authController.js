const { authServices } = require("../services/authServices");

async function authController(req,res){
    const loginDetails = req.body;

    try{
        // Generate the token
        const response = await authServices(loginDetails);

        return res.status(200).json({
            message:"Successfully created the token",
            success: true,
            token:response,
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