const { UnprocessableEntity } = require('./errors');

const FKHelper = () => ({
    simpleVerification : (model,query,NameSchema,type)=> {

        return new Promise((resolve, reject) => {

            model.findOne(query, (err, result) => {
                if (result) {
                    return reject(new UnprocessableEntity(`FK Constraint ,'${NameSchema}' is used`,type));
                }
                else return resolve(true);
            });
        });
    },
    verificationOption: (NameSchema,type)=> {
        return new Promise((resolve, reject) => {
            return reject(new UnprocessableEntity(`FK Constraint ,'${NameSchema}' is used`,type));
        });
    }
});

module.exports = {
    FKHelper
};