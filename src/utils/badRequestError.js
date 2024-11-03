const AppError = require("./AppError");

class BadRequestError extends AppError{

    constructor(invalidParams){
        // invalidParams = []
        let message = "";
        invalidParams.forEach(params=>message=message+`${params}\n`);
        super(`BadRequestError: \n${invalidParams}`, 400)
    }

}

module.exports = BadRequestError;