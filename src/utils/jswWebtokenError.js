const AppError = require("./AppError");

class JswWebtokenError extends AppError{

    constructor(){
        super("Token Error",401);
    }
}

module.exports = JswWebtokenError;