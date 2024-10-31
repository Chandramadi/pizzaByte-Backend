const Product = require('../schema/productSchema');

async function createProduct(productData){
    try{
        const product = await Product.create(productData);
        return product;
    }
    catch(error){
        return error;
    }
}

module.exports = {
    createProduct,
}