// Defined a custom error class called AppError, by extending Error class of js.
class AppError extends Error{

    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }

}

module.exports = AppError;