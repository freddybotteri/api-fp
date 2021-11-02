const { GeneralError,	BadRequest, NotFound, UnprocessableEntity } = require('../utils/errors');

const handleErrors = (err, req, res, next) => {

    if (err instanceof GeneralError) {
        return res.status(err.getCode()).json({
            status: 'error',
            message: err.message,
            type: err.type
        });
    }

    if (err instanceof UnprocessableEntity) {
        return res.status(err.getCode()).json({
            status: 'error',
            message: err.message,
            type: err.type
        });
    }

    return res.status(500).json({
        status: 'error',
        message: err.message
    });
};


module.exports = handleErrors;