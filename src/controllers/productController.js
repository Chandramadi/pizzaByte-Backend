const {addProducts,getProductById,deleteProductById} = require("../services/productServices");
const AppError = require("../utils/AppError"); 

async function productController(req,res){
    try{
        const productAdded = await addProducts({
            productName:req.body.productName,
            description:req.body.description,
            productImage:(req.file)?req.file.path:req.file, // check if the image is provided.
            price:req.body.price,
            category:req.body.category,
            inStock:req.body.inStock,
        });
        return res.status(201).json({
            message:"Successfully added the product.",
            success:true,
            error:{},
            data:productAdded,
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

async function getProductController(req, res){

    try{
        const response = await getProductById(req.params.id);
        return res.status(200).json({
            success: true,
            message:"Successfully retrived the product.",
            data: response,
            error:{},
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
            success: false,
            data:{},
        })
    }
}

async function deleteProductController(req, res){

    try{
        const response = await deleteProductById(req.params.id);
        return res.status(200).json({
            success: true,
            message:"Successfully deleted the product.",
            data: response,
            error:{},
        });
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
            success: false,
            data:{},
        });
    }
}

module.exports = {
    productController,
    getProductController,
    deleteProductController,
}