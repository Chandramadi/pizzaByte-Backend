const { findUser } = require("../repositories/userRepository");
const bcrypt = require("bcrypt"); // for 
const jswWebtoken = require("jsonwebtoken");
const { Secret_key ,jwt_expiry} = require("../config/serverConfig");

async function authServices(loginDetails){
    // if the body is empty
    if(!loginDetails.email || !loginDetails.password){
        throw {
            message: "Missing required fields: email,password",
            statusCode: 400
        };
    }

    const loginEmail = loginDetails.email;
    const loginPassword = loginDetails.password;

    try{
        // Check if the user is registered.
        // Cannot send password because it is hashed.
        const user = await findUser({
            email:loginEmail,
        })

        if(!user){
            throw {
                message:"The user is not registered",
                statusCode:400,
            }
        }

        // check if the password is same as the one given at the time of registration.
        // compare() method returns a boolean
        const userPassword = await bcrypt.compare(loginPassword,user.password);

        if(!userPassword){
            throw{
                message:"The password is incorrect",
                statusCode:400,
            }
        }

        // Check if the user role is set already else assign 'USER'.
        const userRole = user.role?user.role:'USER';
        // create the jswWebtoken
        const jwt = jswWebtoken.sign(
            {email:user.email, userId:user._id, role:userRole},
            Secret_key,
            { expiresIn: jwt_expiry }
        );
        
        return jwt;

    }catch(error){
        // Ensure that errors have proper status codes
        throw {
            message: error.message || "An error occurred during authentication",
            statusCode: error.statusCode || 500,
        };
    }
  
}

module.exports = {
    authServices,
}