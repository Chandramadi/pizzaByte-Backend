const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true, // with this a user can only have one cart.
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
                default:1,
            }
        }
    ]
},{
    timestamps:true,
})

// When you define pre hooks like pre('find') and pre('findOne') 
// in Mongoose, they intercept the query before it’s executed.
// So, every time you call find or findOne on the Cart model, 
// these hooks automatically trigger.
cartSchema.pre("findOne",function(next){
    this.populate("items.product");
    next();
})

cartSchema.pre("find",function(next){
    this.populate("items.product");
    next();
})

const Cart = mongoose.model('Cart',cartSchema);

module.exports = Cart;