const {registerUser} = require("../services/userService");
const AppError = require("../utils/AppError");

// UserRoute controller 
async function createUser(req,res){

    try{
        const userDataBody = req.body;
        const len = Object.keys(userDataBody).length;

        if(len==0){
            return res.status(400).json({
                message:"Empty input",
                success:false
            })
        }
        const response = await registerUser(userDataBody);
        return res.status(201).json({
            message:"Successfully created the user.",
            success:true,
            error:{},
            data:response,
        })

    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                data:{},
                error:error,
            })
        }
        return res.status(500).json({
            message:"Something went wrong",
            success:false,
            error:error,
            data:{},
        })
    }
}

module.exports = {
    createUser,
}
