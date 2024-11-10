const {createOrderByUserId,getAllOrdersByUserId,getOrdersByOrderId,updateOrderStatus}  = require("../services/orderService");
const AppError = require("../utils/appError");

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

async function getAllOrders(req,res){
    try{
        const order = await getAllOrdersByUserId(req.user.userId);
        return res.status(200).json({
            success:true,
            data:order,
            error:{},
            message:"Successfully fetched the orders.",
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

async function getOrdersById(req,res){

    try{
        const order = await getOrdersByOrderId(req.params.orderId);
        return res.status(200).json({
            success: true,
            message: "Successfully fetched the order",
            error: {},
            data: order
        })
    }
    catch(error){
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

// Only admin can change the order status
async function updateStatus(req,res){
    try{
        const order = await updateOrderStatus(req.params.orderId,req.body.status);
        return res.status(200).json({
            success: true,
            message:  "Successfully updated the order",
            error: {},
            data: order
        })
    }
    catch(error){
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

async function cancelOrder(req,res){

    try{
        const order = await updateOrderStatus(req.params.orderId,"CANCELLED");
        return res.status(200).json({
            success: true,
            message:  "Successfully cancelled the order",
            error: {},
            data: order
        })
    }
    catch(error){
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrdersById,
    updateStatus,
    cancelOrder,
}