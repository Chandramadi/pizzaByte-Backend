/**
 * The config folder contains configuration related things.
 */

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    PORT : process.env.PORT,
}