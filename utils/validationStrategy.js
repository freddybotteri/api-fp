const unique = {
    strategies: {
        post: function(model,property,type,body) {
            return body(property).custom(value => {
                let query = {};
                query[property] = value;
                return model.findOne(query).then(data => {
                    if (data) {
                        return Promise.reject(type);
                    }
                });
            });
        },
        put: function(model,property,type,body,key) {
            return body(property).custom((value, { req }) => {
                let query = {};
                query[property] = value;
                return model.findOne(query).then(data => {
                    if (data) {
                        if(data._id.toString() !== req.params[key].toString()) {
                            return Promise.reject(type);
                        }
                    }
                });
            });
        },
    },
    action: function(strategy,model,property,type,body,key){
        return this.strategies[strategy](model,property,type,body,key);
    }
};

const required = {
    strategies: {
        post: function(property,type,body) {
            return body(property).not().isEmpty().withMessage(type);
        },
        put: function(property,type,body) {
            return body();
        }
    },
    action: function(strategy,property,type,body){
        return this.strategies[strategy](property,type,body);
    }
};



module.exports = {
    unique,
    required
};