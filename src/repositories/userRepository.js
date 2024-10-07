const User = require("../schema/userSchema");

// Find the user function
async function findUser(userData){
    try{
        const user = await User.findOne(userData);
        return user;
    }catch(error){
        return error;
    }
}

// Create an user Function
async function createUser(userData){
    try{
        const user = await User.create(userData);
        return user;
    }catch(error){
        return error;
    }
}   

module.exports = {
    findUser,
    createUser
}