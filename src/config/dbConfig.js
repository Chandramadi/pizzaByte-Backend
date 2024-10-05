const mongoose = require("mongoose");

const serverConfig = require('./serverConfig');

async function connectDb() {
    try{
        await mongoose.connect(serverConfig.DB_URL);
        console.log("Connected to db");
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    connectDb,
}