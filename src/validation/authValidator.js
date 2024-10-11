const jswWebtoken = require("jsonwebtoken");
const {Secret_key} = require("../config/serverConfig");

async function isLoggedIn(req,res,next){

    const authToken = req.cookies['auth'];

    if(!authToken){
        return res.status(401).json({
            success: false,
            message : "No auth token provided.",
            error:"Not authenticated",
            data:{},
        })
    }

    try{
        const verifyToken = jswWebtoken.verify(authToken,Secret_key);
        // jwt.verify() function returns the decoded payload of the JWT
        // if the signature is valid and any optional expiration, audience, or issuer checks pass.

        // setting a use property in req object.
        // To know the details of the user that sent 
        // the cookie.
        req.user = {
            email : verifyToken.email,
            userId : verifyToken.userId,
        }
        
    }catch(error){
        return res.status(400).json({
            success : false,
            message : "Invalid token provided.",
            error:error,
            data:{},
        })
    }
    
    next();
}

module.exports = {
    isLoggedIn,
}