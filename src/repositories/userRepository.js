const User = require("../schema/userSchema");
const InternalServerError = require('../utils/internalServerError');
const BadRequestError = require("../utils/badRequestError");

// Find the user function for authentication
// Only authenticat user if the user is registered( the user should exists in the database.)
async function findUser(userData){
    // the findOne() returns null if the user doesnot exists.
    // So, using try catch will not work, it will not throw 
    // any error in case of null.
    const user = await User.findOne(userData);
    if(!user){
        throw new InternalServerError();
    }
    return user;
}

// findUser function for registration
// Only create user if the user doesnot exists.
async function findUserRegistration(userData){

    const user = await User.findOne(userData);
    if(user){
        throw new InternalServerError();
    }
    return user;
    
}

// Create an user Function
async function createUser(userData){
    try{
        console.log("bye");
        const user = await User.create(userData);
        return user;
    }catch(error){
        if(error.name === "ValidationError"){
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            })
            throw new BadRequestError(errorMessageList);
        }
        throw new InternalServerError();
    }
}   

module.exports = {
    findUser,
    createUser,
    findUserRegistration,
}
