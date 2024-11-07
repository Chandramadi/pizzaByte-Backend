const {getCartByUser,modifyProductToCart,clearProductFromCart} = require("../services/cartService");
const AppError = require("../utils/AppError");

async function getCart(req, res){
    try{
        const cart = await getCartByUser(req.user.userId);
        return res.status(200).json({
            success:true,
            message:"Successfully fetched the cart",
            error:{},
            data:cart,
        })
    }
    catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                data:{},
                error:error,
            })
        }
        return res.status(500).json({
            message:"Something went wrong",
            error: error,
            data:{},
            success: false,
        })
    }
}

// modifyProduct -> performs both addition and removing of product from the cart.
async function modifyProduct(req,res){
    try{
        const cart = await modifyProductToCart(req.user.userId,req.params.productId,req.params.operation=="add");
        return res.status(200).json({
            success:true,
            error:{},
            data:cart,
            message:"Successfully added the product to cart",
        })
    }
    catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                data:{},
                error:error,
            })
        }
        return res.status(500).json({
            message:"Something went wrong",
            error: error,
            data:{},
            success: false,
        })
    }
}

async function clearCart(req,res){

    try{
        const cart = await clearProductFromCart(req.user.userId);
        return res.status(200).json({
            success:true,
            data:cart,
            error:{},
            message:"Successfully cleared all products from the cart.",
        })
    }
    catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                data:{},
                error:error,
            })
        }
        return res.status(500).json({
            message:"Something went wrong",
            error: error,
            data:{},
            success: false,
        })
    }
}

module.exports = {
    getCart,
    modifyProduct,
    clearCart,
}