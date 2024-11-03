const { findUser } = require("../repositories/userRepository");
const bcrypt = require("bcrypt"); // for 
const jswWebtoken = require("jsonwebtoken");
const { Secret_key ,jwt_expiry} = require("../config/serverConfig");
const BadRequestError = require("../utils/badRequestError");
const AppError = require("../utils/AppError");
const JswWebtokenError = require("../utils/jswWebtokenError");

async function authServices(loginDetails){
    // if the body is empty
    if(!loginDetails.email || !loginDetails.password){
        throw new BadRequestError(["Missing required fields: email,password"]);
    }

    const loginEmail = loginDetails.email;
    const loginPassword = loginDetails.password;

    // Check if the user is registered.
    // Cannot send password because it is hashed.
    try{
        var user = await findUser({
            email:loginEmail,
        })
    }
    catch(error){
        throw new BadRequestError(["The user is not registered"]);
    }

    // check if the password is same as the one given at the time of registration.
    // compare() method returns a boolean
    // try catch will not work as the method returns a boolean.
    const password = await bcrypt.compare(loginPassword,user.password);
    if(!password){
        throw new BadRequestError(["The password is incorrect"]);
    }
        
    try{
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
        throw new JswWebtokenError();
    }
  
}

module.exports = {
    authServices,
}