const express = require("express");
const {productController,getProductController, getAllProductsController, deleteProductController} = require("../controllers/productController");
const productRoute = express.Router();
const upload = require("../middlewares/multermiddleware"); // multer for file upload.
const { isLoggedIn, isAdmin } = require("../validation/authValidator");

// Only the admin is allowed to post and delete products
productRoute.post("/",
    isLoggedIn,
    isAdmin,
    upload.single("productImage"),
    productController
);

productRoute.get("/:id", // get products by id
    // isLoggedIn,
    // isAdmin,
    getProductController
);

productRoute.get("/", // get all the products
    // isLoggedIn,
    // isAdmin,
    getAllProductsController
);

productRoute.delete("/:id",
    isLoggedIn,
    isAdmin,
    deleteProductController
);

module.exports = {
    productRoute,
}