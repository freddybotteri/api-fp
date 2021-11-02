const mongoose = require('mongoose');
const FKHelper = require('../utils/foreightKey_preDelete');
const db  = mongoose.models;

const functionalSchema = new mongoose.Schema(
    {
        name:{
            type: String,
        },
    },
    { timestamps: false },
);

functionalSchema.statics.countFindAll = function () {
    return this.countDocuments();
};

functionalSchema.statics.addOptionInQuestion = async function (functional_id,question_id,option_id,next) {

    let data = await this.find({
        _id:functional_id
    });

    const functionalQuestion = data[0].content;

    for(let i in functionalQuestion){
        if(functionalQuestion[i].id === question_id){
            const exist = functionalQuestion[i].options.find(element => element.toString() === option_id.toString());
            if(!exist || exist === undefined){
                functionalQuestion[i].options.push(option_id);
            }else{
                throw new Error('Error, option already in this question.');
            }

            break;
        }
    }
    return data;
};

functionalSchema.statics.findOneAnSaveToClone = async function (params) {

    const data = await this.findOne({_id:params.functional_id});
    data._id = mongoose.Types.ObjectId();
    data.isNew = true;
    const inserted = await data.save();
    return  inserted;

};

const Functional = mongoose.model('Functional', functionalSchema);

module.exports = Functional;