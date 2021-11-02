const  mongoose = require('mongoose');

const Option = require('./option');
const Functional = require('./functional');
const Category = require('./category');

const { DATABASE_URL } = process.env;
const connectDb = () => {
    return mongoose.connect(DATABASE_URL,{
        useNewUrlParser: true ,
        useUnifiedTopology: true,
        useCreateIndex: true
    } );
};

module.exports = {
    connectDb ,
    Option,
    Functional,
    Category
};