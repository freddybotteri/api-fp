const express = require('express');
const router = express.Router();

module.exports = (optionHandler,handlerErrors,validationData,jwt,cors)=>{

    router.post('/',
        validationData.optionValidationRules('post'),
        validationData.validate,
        optionHandler.post,
        handlerErrors);

    router.put('/:option_id',
        validationData.optionValidationRules('put'),
        validationData.validate,
        optionHandler.put,
        handlerErrors);


    router.put('/:option_id/addVote',
        optionHandler.putResult,
        handlerErrors);

    router.delete('/:option_id',
        optionHandler.delete,
        handlerErrors);

    return router;
};

