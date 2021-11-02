const express = require('express');
const axios = require('axios');
const parser = require('body-parser');
const configs = require('./configs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const cors = require('cors');
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
const { body, validationResult } = require('express-validator');

const { categories, options, functionals, clone, _public } = require('./endPoints');
const {

    handlerErrors,


    validationData,
} = require('./middlewares');
const {
    routerCategory,
    routerOption,
    routerFunctional,
    routerClone,
    routerPublic,
} = require('./routers');
const { BadRequest } = require('./utils/errors');

const { connectDb, Category, Option, Functional } = require('./nosql');
const { bcryptGenerator, converter } = require('./services');
const cleanString = require('./utils/cleanString');
const cleanObject = require('./utils/cleanObject');
const validationStrategy = require('./utils/validationStrategy');

const validationDataHandler = validationData({
    Category,
    Option,
    Functional,
    body,
    validationResult,
    BadRequest,
    validationStrategy,
});
const categoryHandler = categories({ Category, cleanString });
const optionHandler = options({ Option, cleanString });
const functionalHandler = functionals({ Functional, cleanString, cleanObject, converter });
const cloneHandler = clone({ Functional, cleanString, cleanObject, converter });
const publicHandler = _public({ Functional, cleanString, cleanObject, converter });

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api.yaml');

app.use(cors());
app.options('*', cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
    '/categories',
    routerCategory(
        categoryHandler,
        handlerErrors,


        validationDataHandler,

        jwt,
        cors(configs.corsConfig),
        bcryptGenerator
    )
);
app.use(
    '/options',
    routerOption(
        optionHandler,
        handlerErrors,


        validationDataHandler,

        jwt,
        cors(configs.corsConfig),
        bcryptGenerator
    )
);
app.use(
    '/functionals',
    routerFunctional(
        functionalHandler,
        handlerErrors,


        validationDataHandler,

        jwt,
        cors(configs.corsConfig),
        bcryptGenerator
    )
);
app.use(
    '/clone',
    routerClone(
        cloneHandler,
        handlerErrors,


        validationDataHandler,

        jwt,
        cors(configs.corsConfig),
        bcryptGenerator
    )
);
app.use(
    '/public',
    routerPublic(
        publicHandler,
        handlerErrors,


        validationDataHandler,

        jwt,
        cors(configs.corsConfig),
        bcryptGenerator
    )
);

app.get('*', function (req, res) {
    res.status(404).send({ error: 'Not found' });
});

const server = app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
);
connectDb().then(async () => {
    console.log('Moongo connect');
});

module.exports = server;
