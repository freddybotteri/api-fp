const express = require('express');
const router = express.Router();

module.exports = (publicHandler,handlerErrors,validationData,jwt,cors)=>{

    router.get('/functionals/:url',
        publicHandler.get,
        handlerErrors);

    router.get('/preview/functionals/:url',
        publicHandler.getPreview,
        handlerErrors);

    return router;
};

