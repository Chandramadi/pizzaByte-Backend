const express = require("express");
const serverConfig = require("./config/serverConfig");

const app = express();

app.listen(serverConfig.PORT, ()=>{
    console.log(`Server started on port number ${serverConfig.PORT}.`);
})

