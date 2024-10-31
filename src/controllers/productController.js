const {addProducts} = require("../services/productServices");

async function productController(req,res){
    try{
        const productAdded = await addProducts({
            productName:req.body.productName,
            description:req.body.description,
            productImage:req.file.path,
            price:req.body.price,
            category:req.body.category,
            inStock:req.body.inStock,
        });
        return res.status(201).json({
            message:"Successfully added the product.",
            success:true,
            data:productAdded,
        })
    }
    catch(error){
        return res.status(error.statusCode).json({
            message:"Error",
            error: error,
            success: false,
        })
    }
}

module.exports = {
    productController,
}