const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : [true, "Product name is required"],
        minLength : [6,"Product description must be at least 6 characters."],
        trim:true,
    },
    description : {
        type : String,
        minLength : [6,"Product description must be at least 6 characters."],
        required:true,
    },
    productImage : {
        type : String,
        required:true,
    },
    price : {
        type : Number,
        required : [true, "Product price is required"]
    },
    category : {
        type : String,
        enum : ['veg','non-veg','drinks','slides'],
        default : 'veg',
    },
    inStock : {
        type : Boolean,
        required : [true, "In stock staus is required."],
        default : true,
    },
    quantity:{
        type:Number,
        default:10,
        required:true,
    },
},{
    timestamps:true,
})


const Product = mongoose.model("Product",productSchema);

module.exports = Product;