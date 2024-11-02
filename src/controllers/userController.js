const {registerUser} = require("../services/userService");

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
        
        if(response.success){
            return res.status(201).json({
                message:"Successfully created the user.",
                success:true,
                data:response.data,
            })
        }

        // if(response.data.name=="ValidationError"){
        //     return res.status(500).json({
        //         message:"Internal Server Error",
        //         success:true,
        //         data:response.data,
        //     })
        // }
        
    }catch(error){
        return res.status(error.statusCode || 500).json({
            message:error.reason || "Internal Server Error",
            success:false,
            error:error,
        })
    }
}

module.exports = {
    createUser,
}
