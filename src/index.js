const express = require("express");
const serverConfig = require("./config/serverConfig");
const connectDb = require("./config/dbConfig");

const app = express();

app.listen(serverConfig.PORT, async()=>{
    await connectDb();
    console.log(`Server started on port number ${serverConfig.PORT}.`);
})


