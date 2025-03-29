const Cart = require("../schema/cartSchema");
const InternalServerError = require('../utils/internalServerError');
const BadRequestError = require("../utils/badRequestError");
const NotFoundError = require("../utils/notFoundError");

async function createCart(userId) {
    try{
        const createdCart = await Cart.create(userId);
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
        const cart = await Cart.findOne(user);
        return cart;
    }
    catch(error){
        throw new InternalServerError();
    }
}

async function deleteProductFromCart(userId){
    try{
        const cart = await Cart.findOne(userId);
        
        // If the cart doesnot exists throw an error.
        if(!cart){
            throw new NotFoundError("cart");
        }

        // else make it empty.
        cart.items = [];

        await cart.save();

        return cart;

    }
    catch(error){
        throw new InternalServerError();
    }
}

module.exports = {
    createCart,
    getCart,
    deleteProductFromCart,
}