const express = require('express');
const router = express.Router();

module.exports = (categoryHandler,handlerErrors,validationData,jwt,cors)=>{

    router.post('/',
        validationData.categoryValidationRules('post'),
        validationData.validate,
        categoryHandler.post,
        handlerErrors);

    router.get('/',
        categoryHandler.get,
        handlerErrors);

    router.get('/:order/:from/:quantity',
        categoryHandler.getFilter,
        handlerErrors);

    router.get('/:category_id',
        categoryHandler.getById,
        handlerErrors);

    router.put('/:category_id',
        validationData.categoryValidationRules('put'),
        validationData.validate,
        categoryHandler.put,
        handlerErrors);

    router.delete('/:category_id',
        categoryHandler.delete,
        handlerErrors);

    return router;
};

