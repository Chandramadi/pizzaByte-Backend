const {findUser,createUser} = require("../repositories/userRepository");
 
async function registerUser(userDetails){

    // Manual validation of required fields
    if (!userDetails.email || !userDetails.phoneNumber || !userDetails.password || !userDetails.firstName || !userDetails.lastName) {
        throw {
            reason: "Missing required fields: email, phoneNumber, password, firstName, lastName",
            statusCode: 400
        };
    }

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

    // If for any reason, unable to create user throw an error.
    if(!newUser){
        throw {
            reason:"Something went wrong, cannot create user.",
            statusCode:500,
        }
    }

    return newUser;
}    


module.exports = {
    registerUser,
}