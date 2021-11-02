
const clean = (data)=>{
    if(data){
        let text = data.toLowerCase();
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    return;
};

module.exports = {
    clean
};