const {getCartByUser} = require("../services/cartService");
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
            res.status(error.statusCode).json({
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
}