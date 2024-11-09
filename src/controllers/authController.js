const { authServices } = require("../services/authServices");
const AppError = require("../utils/AppError");

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
            error:{},
        })

    }catch(error){
        console.log(error);
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                data:{},
                error:error,
            })
        }
        return res.status(500).json({
            success:false,
            message:"Internal server error.",
            error:error,
            data:{},
        })
    }
}

function logout(req,res){
    
    res.cookie("auth","");
    return res.status(200).json({
        success:true,
        message:"Logout successfull",
        data:{},
        error:{},
    })
}

module.exports = {
    authController,
    logout
}