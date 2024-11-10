const AppError = require("./appError");

class JswWebtokenError extends AppError{

    constructor(){
        super("Token Error",401);
    }
}

module.exports = JswWebtokenError;