const Cart = require("../schema/cartSchema");
const InternalServerError = require('../utils/internalServerError');
const BadRequestError = require("../utils/badRequestError");

async function createCart(userId) {
    try{
        const createdCart = await Cart.create(userId);
        // console.log(createdCart);
        return createdCart;
    }
    catch(error){
        if(error.name === 'ValidationError'){
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            })
            throw new BadRequestError(errorMessageList);
        }
        throw new InternalServerError();
    }
}

// Only loggedIn user can get the cart.
async function getCart(user){
    try{
        const cart = await Cart.findOne(user).populate("user");
        return cart;
    }
    catch(error){
        throw new InternalServerError();
    }
}

module.exports = {
    createCart,
    getCart,
}