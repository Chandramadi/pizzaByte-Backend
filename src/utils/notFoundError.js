const AppError = require("./AppError");

class NotFoundError extends AppError{

    constructor(resource){
        super(`Not able to find ${resource}`, 404);
    }

}

module.exports = NotFoundError;