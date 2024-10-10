const {findUser,createUser} = require("../repositories/userRepository");
 
async function registerUser(userDetails){

    // Manual validation of required fields
    if (!userDetails.email || !userDetails.phoneNumber || !userDetails.password || !userDetails.firstName || !userDetails.lastName) {
        throw {
            reason: "Missing required fields: email, phoneNumber, password, firstName, lastName",
            statusCode: 400
        };
    }

    try{
        const user = await findUser({ // find the user if already exists.
            email:userDetails.email,
            phoneNumber:userDetails.phoneNumber
        });

        if(user){
            throw {
                reason:"User with the given email and mobile number already exits.",
                statusCode:400,
            }
        }

        // If the user doesnot exists create one.
        const newUser = await createUser({
            email:userDetails.email,
            phoneNumber:userDetails.phoneNumber,
            password:userDetails.password,
            firstName:userDetails.firstName,
            lastName:userDetails.lastName,
        });

        // Return the created user( success response)
        return{
            success:true,
            data:newUser,
        }
    }
    catch(error){
        // Throw error to be caught by the controller
        throw {
            reason: error.reason || error.message || "Internal error",
            statusCode: error.statusCode || 500
        };
    }
}    


module.exports = {
    registerUser,
}