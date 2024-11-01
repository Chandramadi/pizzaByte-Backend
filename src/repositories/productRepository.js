const Product = require('../schema/productSchema');
const InternalServerError = require('../utils/internalServerError');

async function createProduct(productData){
    try{
        const product = await Product.create(productData);
        return product;
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

async function getProduct(productId){

    try{
        const product = await Product.findById(productId);
        return product;
    }
    catch(error){
        throw new InternalServerError();
    }
}

async function deleteProduct(productId){

    try{
        const product = await  Product.findByIdAndDelete(productId);
        return product;
    }
    catch(error){
        throw new InternalServerError();
    }
}

module.exports = {
    createProduct,
    getProduct,
    deleteProduct
}