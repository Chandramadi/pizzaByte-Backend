const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"First Name should be provided"],
        minlength:[4,"First Name must be atleast 4 character long"],
        maxlength:[20,"First Name should be less than or equal to 20 characters"],
        lowercase:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:[true,"Last Name should be provided"],
        minlength:[4,"Last Name must be atleast 4 character long"],
        maxlength:[20,"Last Name should be less than or equal to 20 characters"],
        lowercase:true,
        trim:true,
    },
    phoneNumber:{
        type:String,
        minlength:[10,"Phone number should be of 10 digits"],
        maxlength:[10, "Phone number should be of 10 digits only"],
        required:[true,"Phone number should be provide"],
        trim:true,
        unique:[true,"Phone number is already in use"]
    },
    email:{
        type:String,
        trim:true,
        required:[true,"Email should be provided"],
        unique:[true,"Email is already in use"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        trime:true,
        required:[true,"Password should be provided"],
        minlength:[8,"Password should be atleast 8 character long"]
    }
},{
    timestamps:true,
})

const User = mongoose.model("User",userSchema);
module.exports = User;