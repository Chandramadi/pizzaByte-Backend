const Order = require("../schema/orderSchema");
const InternalServerError = require("../utils/internalServerError");

async function createNewOrder(orderDetails){

    try{
        const order = await Order.create(orderDetails);
        return order;
    }
    catch(error){
        if(error.name === "ValidationError"){
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            })
            throw new BadRequestError(errorMessageList);
        }
        throw new InternalServerError();
    }

}

async function getAllOrders(userId){

    const order = await Order.findOne(userId);
    if(!order){
        throw new InternalServerError();
    }
    return order;

}

async function getOrdersById(orderId){

    const order = await Order.findById(orderId);
    if(!order){
        throw new InternalServerError();
    }
    return order;
}

async function updateStatus(orderId, status){

    // findByIdAndUpdate returns null if the document is not found.
    const order = await Order.findByIdAndUpdate(orderId,status,{new:true});
    // {new:true} ensures that to return the update data(after the changes).
    if(!order){
        throw new InternalServerError();
    }
    return order;
}

module.exports = {
    createNewOrder,
    getAllOrders,
    getOrdersById,
    updateStatus,
}