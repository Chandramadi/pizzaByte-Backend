const cloudinary = require("cloudinary").v2;

const serverConfig = require("./serverConfig");

cloudinary.config({ 
    cloud_name: serverConfig.cloudinary_name,
    api_key: serverConfig.cloudinary_key, 
    api_secret: serverConfig.cloudinary_secret,
});

module.exports = cloudinary;
