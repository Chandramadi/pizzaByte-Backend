const express = require("express");
const cookie_parser = require("cookie-parser");

const serverConfig = require("./config/serverConfig");
const { connectDb } = require("./config/dbConfig");
const {userRoute}  = require("./routes/userRoute");
const {authRoute}  = require("./routes/authRoute");
const { isLoggedIn } = require("./validation/authValidator");

const app = express();

app.use(cookie_parser()); // cookie parser
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
// Extended true means that the express uses query String (qs) library to parse the url.

// User Route middleware
app.use("/user",userRoute);
app.use("/auth",authRoute);

// Testing route
app.get("/",isLoggedIn, (req,res)=>{
    console.log(req.cookies);
    return res.send({
        message:"Hello",
        email : req.user.email,
        userId : req.user.userId,
    })
})

app.listen(serverConfig.PORT, async()=>{
    await connectDb();
    console.log(`Server started on port number ${serverConfig.PORT}.`);
})


