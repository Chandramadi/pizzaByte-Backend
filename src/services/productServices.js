const {createProduct} = require("../repositories/productRepository");
const cloudinary = require("../config/cloudinaryConfig");
const fs = require("fs/promises");

async function addProducts(productDetails){
    // upload the image in cloudinary only if provided
    if(productDetails.productImage){
        try{
            const uploadResult = await cloudinary.uploader.upload(productDetails.productImage);
            var productUrl = uploadResult.secure_url;
            await fs.unlink(productDetails.productImage);
        }
        catch(error){
            throw {
                reason : "Unable to upload image.",
                statusCode: 500,
            }
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
        throw {
            reason : "Not able to create product.",
            statusCode: 500,
        }
    }
    
}

module.exports = {
    addProducts,
}