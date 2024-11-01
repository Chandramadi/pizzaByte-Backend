const express = require("express");
const {productController,getProductController,deleteProductController} = require("../controllers/productController");
const productRoute = express.Router();
const upload = require("../middlewares/multermiddleware"); // multer for file upload.

productRoute.post("/",upload.single("productImage"),productController);

productRoute.get("/:id",getProductController);

productRoute.delete("/:id",deleteProductController);

module.exports = {
    productRoute,
}