const bcrypt = require('bcrypt');

const salt = async()=>{
    return await bcrypt.genSalt(12);
};
const generate = async(data) => {
    return await bcrypt.hash(data, process.env.HASH_SECRET);
};
const compare = async(password,inStorePassword)=>{
    return await bcrypt.compare(password, inStorePassword);
};

module.exports = {
    generate,
    compare,
    salt
};