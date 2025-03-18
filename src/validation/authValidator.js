const jswWebtoken = require("jsonwebtoken");
const {Secret_key, jwt_expiry} = require("../config/serverConfig");
const UnauthorisedError = require("../utils/unauthorisedError");

// This is a middleware for isLoggedIn check.
// It is using the auth cookie for verification.
async function isLoggedIn(req,res,next){

    const authToken = req.cookies['auth'];

    if(!authToken){
        return res.status(401).json({
            success : false,
            message : "No auth token provided.",
            error : "Not authenticated",
            data : {},
        })
    }

    try{
        const verifyToken = jswWebtoken.verify(authToken,Secret_key);
        // jwt.verify() function returns the decoded payload of the JWT
        // if the signature is valid and any optional expiration, audience, or issuer checks pass.

        if(!verifyToken){
            throw new UnauthorisedError();
        }

        // setting a user property in req object.
        // To know the details of the user that sent 
        // the cookie.
        req.user = {
            email : verifyToken.email,
            userId : verifyToken.userId,
            userRole:verifyToken.role,
        }
        /**
         * In JavaScript, objects are dynamic in nature, meaning  
         * you can add, modify, or remove properties
         * at any time, even after the object has been created.
         * const req = {
            hello: "bye",
            };
            // Adding a new property to the object
            req.user = 'chal';
            console.log(req.user);  // Outputs: 'chal'
         */

        next();
        
    }catch(error){
        if(error.name==="TokenExpiredError") {
            return res.status(401).json({
                success : false,
                message : "No auth token provided.",
                error : "Not authenticated",
                data : {},
            })
        }
        return res.status(400).json({
            success : false,
            message : "Invalid token provided.",
            error:error,
            data:{},
        })
    }
    
}

/** 
 * This func checks if the authenticated user is admin or not.
 * Because we will call isAdmin after isLoggedIn and as isLoggedIn's
 * req object is modified, we will receive the modified req object in
 * isAdmin middleware also.
*/
function isAdmin(req,res,next){

    try{
        const loggedIn = req.user.userRole;
        if(loggedIn==='ADMIN'){
            next();
        }
    }
    catch(error){
        return res.status(401).json({
            success:false,
            data:{},
            message:"You are not authorised for this action.",
            error:{
                status:401,
                reason:"Unauthorised user for this action."
            }
        });
    }
    
}

module.exports = {
    isLoggedIn,
    isAdmin,
}