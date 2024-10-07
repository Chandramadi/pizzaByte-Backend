const {registerUser} = require("../services/userService");

// UserRoute controller 

async function createUser(req,res){

    try{
        const userDataBody = req.body;
        const len = Object.keys(userDataBody).length;
        if(len!=0){
            const response = await registerUser(userDataBody);
            return res.status(201).json({
                message:"Successfully created the user.",
                success:true,
                data:response,
            })
        }
        else{
            return res.status(400).json({
                message:"Empty input",
                success:false
            })
        }
    }catch(error){
        return res.status(error.statusCode).json({
            message:error.reason,
            success:false,
            error:error,
        })
    }
}

module.exports = {
    createUser,
}