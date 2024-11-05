const {findUserRegistration,createUser} = require("../repositories/userRepository");
const {createCart} = require("../repositories/cartRepository");
const BadRequestError = require("../utils/badRequestError");

async function registerUser(userDetails){

    // Manual validation of required fields
    if (!userDetails.email || !userDetails.phoneNumber || !userDetails.password || !userDetails.firstName || !userDetails.lastName) {
        throw new BadRequestError(["Missing required fields: email, phoneNumber, password, firstName, lastName"]);
    }

    const user = await findUserRegistration({ // find the user if already exists.
        email:userDetails.email,
        phoneNumber:userDetails.phoneNumber
    });
    if(user){
        throw new BadRequestError(["User with the given email and mobile number already exits."]);
    }

    try{
        console.log("hi");
        // If the user doesnot exists create one.
        const newUser = await createUser({
            email:userDetails.email,
            phoneNumber:userDetails.phoneNumber,
            password:userDetails.password,
            firstName:userDetails.firstName,
            lastName:userDetails.lastName,
            role:userDetails.role,
        });
        console.log(newUser);
        // create a cart for every newly created user.
        await createCart({
            user:newUser._id,
        });

        // Return the created user( success response)
        return newUser;
    }
    catch(error){
        // Throw error to be caught by the controller
        throw error;
    }
}    


module.exports = {
    registerUser,
}