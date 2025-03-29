const mongoose = require("mongoose");

const serverConfig = require('./serverConfig');

async function connectDb() {
    try{
        await mongoose.connect(serverConfig.DB_URL);
    }
    catch(error){
        throw error;
    }
}

module.exports = {
    connectDb,
}