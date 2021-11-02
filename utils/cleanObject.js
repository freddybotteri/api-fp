const { pickBy,identity } =  require('lodash');

const clean = (data)=>{
    return pickBy(data, identity);
};

module.exports = {
    clean
};