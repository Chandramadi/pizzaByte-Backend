const express = require("express");
const {productController,getProductController,deleteProductController} = require("../controllers/productController");
const productRoute = express.Router();
const upload = require("../middlewares/multermiddleware"); // multer for file upload.
const { isLoggedIn, isAdmin } = require("../validation/authValidator");

// Only the admin is allowed to access productRoute.
productRoute.post("/",
    isLoggedIn,
    isAdmin,
    upload.single("productImage"),
    productController
);

productRoute.get("/:id",
    isLoggedIn,
    isAdmin,
    getProductController
);

productRoute.delete("/:id",
    isLoggedIn,
    isAdmin,
    deleteProductController
);

module.exports = {
    productRoute,
}