const express = require('express');
const router = express.Router();

module.exports = (cloneHandler,handlerErrors,validationData,jwt,cors)=>{

    router.get('/functionals/:_id',
        cors,
        cloneHandler.get,
        handlerErrors);



    return router;
};

