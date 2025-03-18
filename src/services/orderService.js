const NotFoundError = require("../utils/notFoundError")
const BadRequestError = require("../utils/badRequestError");
const {findUser} = require("../repositories/userRepository");
const InternalServerError = require("../utils/internalServerError");
const {getCart,deleteProductFromCart} = require("../repositories/cartRepository");
const {createNewOrder,getAllOrders,updateStatus,getOrdersById} = require("../repositories/orderRepository");

async function createOrderByUserId(userId,paymentMethod){

    const cart = await getCart({
        user:userId,
    })
    
    const user = await findUser({ _id: cart.user});
    
    // If cart is not present throw an error.
    if(!cart){
        throw new NotFoundError("Cart");
    }

    // If there are no items in the cart.
    if(cart.items.length===0){
        throw new BadRequestError(["Cart is empty, please add some items to the cart"])
    }

    // If the cart is present, add 'user' and the 'item' in the order.
    const orderObject = {};
    orderObject.user = cart.user;
    orderObject.items = cart.items.map(cartitem => {
        return {product: cartitem.product._id, quantity: cartitem.quantity}
    });
    orderObject.status = "ORDERED";
    orderObject.totalPrice = 0;

    cart.items.forEach(item => {
        orderObject.totalPrice+=item.quantity*item.product.price;
    });

    orderObject.paymentMethod = paymentMethod;
    orderObject.address = user.address;

    // create the new order
    const order = await createNewOrder(orderObject);

    if(!order) {        
        throw new InternalServerError();
    }

    await order.populate("items.product");

    // clear cart after order is placed.
    await deleteProductFromCart({
        user : userId,
    });

    // return the order.
    return order;

}

async function getAllOrdersByUserId(userId){

    const order  = await getAllOrders({
        user:userId,
    });
    if(!order){
        throw new NotFoundError("Order");
    }
    return order;
}

async function getOrdersByOrderId(orderId){

    const order = await getOrdersById(orderId);
    if(!order) {
        throw new NotFoundError("Orders");
    }
    return order;

}

async function updateOrderStatus(orderId,status){

    const order = await updateStatus(orderId, {status:status});
    if(!order) {
        throw new NotFoundError("Orders");
    }
    return order;
}

module.exports = {
    createOrderByUserId,
    getAllOrdersByUserId,
    getOrdersByOrderId,
    updateOrderStatus
}