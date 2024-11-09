const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
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
    ],
    status:{
        type:String,
        enum:["ORDERED","CANCELLED","DELIVERED","PROCESSING","OUT_FOR_DELIVERY"],
        default:"ORDERED",
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        minLength:[10,"Address should be of atleast 10 characters."],
    },
    paymentMethod:{
        type:String,
        enum:["ONLINE","CASH"],
        default:"CASH",
    }
},{
    timestamps:true,
})

// Add pre 'find' hook
orderSchema.pre("findOne",function(next){
    this.populate("items.product");
    next();
})

orderSchema.pre("find",function(next){
    this.populate("items.product");
    next();
})

orderSchema.pre("findOneAndUpdate", function(next) {
    this.populate("items.product");
    next();
});

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;