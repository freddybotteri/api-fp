const express = require('express');
const router = express.Router();

module.exports = (functionalHandler,handlerErrors,validationData,jwt,cors)=>{

    router.post('/',
        validationData.validate,
        functionalHandler.post,
        handlerErrors);

    return router;
};

