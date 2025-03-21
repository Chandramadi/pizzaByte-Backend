/**
 * The config folder contains configuration related information.
*/

const dotenv = require("dotenv");
dotenv.config();

// Exporting all the env variables.
module.exports = {
    PORT : process.env.PORT || 4000,
    DB_URL : process.env.DB_URL,
    Secret_key:process.env.Secret_key, 
    jwt_expiry: process.env.jwt_expiry,
    cloudinary_name : process.env.cloudinary_name,
    cloudinary_key : process.env.cloudinary_key,
    cloudinary_secret : process.env.cloudinary_secret,
    frontend_url : process.env.frontend_url,
}