const {createProduct,getProduct, getAllProducts, deleteProduct} = require("../repositories/productRepository");
const cloudinary = require("../config/cloudinaryConfig");
const fs = require("fs/promises");
const InternServerError = require("../utils/internalServerError");
const NotFoundError = require("../utils/notFoundError");

async function addProducts(productDetails){
    // upload the image in cloudinary only if provided
    if(productDetails.productImage){
        try{
            const uploadResult = await cloudinary.uploader.upload(productDetails.productImage);
            var productUrl = uploadResult.secure_url;
            await fs.unlink(productDetails.productImage);
        }
        catch(error){
            throw new InternServerError();
        }
    }

    // create the product
    try{
        const productAdded = await createProduct({
            ...productDetails,
            productImage:productUrl,
        })
        return productAdded;
    }
    catch(error){
        throw new InternServerError();
    }
    
}

async function getProductById(productId){

    if(productId){
        const receivedProduct = await getProduct(productId);
        if(!receivedProduct){
            throw new NotFoundError('Product');
        }
        return receivedProduct;
    }
}

async function getProductsAll(){

    const receivedProduct = await getAllProducts();
    if(!receivedProduct){
        throw new NotFoundError('Product');
    }
    return receivedProduct;
}

async function deleteProductById(productId){

    const deletedProduct = await deleteProduct(productId);
    if(!deletedProduct){
        throw new NotFoundError("Product");
    }
    return deletedProduct;
}

module.exports = {
    addProducts,
    getProductById,
    deleteProductById,
    getProductsAll,
}