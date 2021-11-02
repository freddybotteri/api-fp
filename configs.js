module.exports = {
    corsConfig: {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        headers: 'Origin, X-Requested-With, Content-Type, Accept',
        optionsSuccessStatus: 200
    }
};