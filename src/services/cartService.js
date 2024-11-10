const {getCart,deleteProductFromCart} = require("../repositories/cartRepository");
const NotFoundError = require("../utils/notFoundError");
const { getProduct } = require("../repositories/productRepository");
const BadRequestError = require("../utils/badRequestError");
const AppError = require("../utils/appError");

async function getCartByUser(userId){
    
    const userCart = await getCart({
        user:userId,
    })
    if(!userCart){
        throw new NotFoundError("cart");
    }
    return userCart;
    
}

// modifyProductToCart -> performs both addition and removing of product from the cart.
async function modifyProductToCart(userId, productId, shouldAdd=true){
    const quantityValue = (shouldAdd)?1:-1;
    const cart = await getCart({
        user:userId,
    });
    const product = await getProduct(productId);

    // If the product is not available
    if(!product){
        throw new NotFoundError("Product");
    }

    // If the product is not in stock
    if(product.quantity<=0 || !product.inStock){
        throw new BadRequestError(["Product is out of stock."]);
    }

    // check if the product is already in the cart
    let flag = false;
    if(cart.items.length>0 && cart.items[0].product._id == productId){
        if(shouldAdd){
            // add product
            if(product.quantity >= cart.items[0].quantity+1){
                cart.items[0].quantity+=quantityValue;
                flag = true;
            }
            else{
                throw new AppError("The quantity of the item requested is not found",404);
            }
        }
        else{
            // remove product
            if(cart.items[0].quantity>0){
                flag = true;
                cart.items[0].quantity+=quantityValue;
                // if the product in the cart is zero, then do not display the product.
                if(cart.items[0].quantity==0){
                    cart.items = cart.items.filter(item => item.product._id != productId);
                }
            }
            else{
                throw new AppError("The quantity of the item requested is not found",404);
            }
        }
    }
            
    // If the product is not in the cart, then add it in the cart.
    if(!flag){
        if(shouldAdd) {
            cart.items.push({
                product: productId,
                quantity: 1
            })
        } else {
            throw new NotFoundError("Product in the cart");
        }
    }

    await cart.save();

    await cart.populate("items.product");

    return cart;

}

async function clearProductFromCart(userId){
    // userId will be received from the isLoggedIn middleware.

    const cart = await deleteProductFromCart({
        user:userId,
    });
    if(!cart){
        throw new NotFoundError("cart");
    }
    return cart;

}

module.exports = {
    getCartByUser,
    modifyProductToCart,
    clearProductFromCart,
}