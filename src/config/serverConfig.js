/**
 * The config folder contains configuration related information.
*/

const dotenv = require("dotenv");
dotenv.config();

// Exporting all the env variables.
module.exports = {
    PORT : process.env.PORT,
    DB_URL : process.env.DB_URL,
}