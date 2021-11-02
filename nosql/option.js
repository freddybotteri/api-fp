const mongoose = require('mongoose');
const {FKHelper} = require('../utils/foreightKey_preDelete');
const db  = mongoose.models;

const optionSchema = new mongoose.Schema(
    {
        order:{
            type: Number
        },
        text:{
            type: String,
            max: 500,
        },
        total_votes:{
            type: Number,
            default: 0
        },
        tag:{
            type: String,
            min: 2,
            max: 100,
            index: true,
            text: true,
            default: 'none'
        },
        multimedia: {
            type: {
                type: String,
                required: true,
            },
            video: {
                type: {type: String},
                id: {type: String}
            },
            image: {
                path: {type: String},
                alt: {type: String},
            }
        },
        created: {
            type: Date,
            default: Date.now
        },
    },
    { timestamps: false },
);

optionSchema.statics.countFindAll = function () {
    return this.countDocuments();
};

optionSchema.statics.totalCount = function (id) {
    return this.find({_id:id}).select('total_votes');
};

optionSchema.pre('deleteOne',async function(next){

    const data = await db.Functional.find({})
        .select('content -_id')
        .populate({
            path: 'content',
            populate: {path: 'options', select: 'text', match: {_id:this._conditions._id}}
        });

    if(data.length > 0){
        for(let i in data){
            if(data[i].content[0].options.length === 1){
                return FKHelper().verificationOption('option','option-in-use');
            }
        }
    }

    next();
});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;