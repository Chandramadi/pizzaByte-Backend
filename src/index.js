const express = require("express");
const serverConfig = require("./config/serverConfig");
const dbConfig = require("./config/dbConfig");

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
// Extended true means that the express uses query String (qs) library to parse the url.

app.listen(serverConfig.PORT, async()=>{
    await dbConfig.connectDb();
    console.log(`Server started on port number ${serverConfig.PORT}.`);
})
