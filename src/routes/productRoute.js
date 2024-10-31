const express = require("express");
const {productController} = require("../controllers/productController");
const productRoute = express.Router();
const upload = require("../middlewares/multermiddleware"); // multer for file upload.

productRoute.post("/",upload.single("productImage"),productController);

module.exports = {
    productRoute,
}