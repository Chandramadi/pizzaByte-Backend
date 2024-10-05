/**
 * The config folder contains configuration related information.
*/

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    PORT : process.env.PORT,
}