const {createOrderByUserId}  = require("../services/orderService");
const AppError = require("../utils/AppError");

async function createOrder(req,res){
    try{
        const order = await createOrderByUserId(req.user.userId,req.body.paymentMethod);
        return res.status(200).json({
            success:true,
            data:order,
            error:{},
            message:"Successfully created the order.",
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
    createOrder,
}