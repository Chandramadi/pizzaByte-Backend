const {getCart} = require("../repositories/cartRepository");
const NotFoundError = require("../utils/notFoundError");

async function getCartByUser(userId){
    
    const userCart = await getCart({
        user:userId,
    })
    if(!userCart){
        throw new NotFoundError("cart");
    }
    return userCart;
    
}

module.exports = {
    getCartByUser,
}