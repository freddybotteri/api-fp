const mongoose = require('mongoose');
const {FKHelper} = require('../utils/foreightKey_preDelete');
const db  = mongoose.models;

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique:true,
            min: 2,
            max: 100
        },
        description: {
            type: String,
            min: 10,
            max: 200
        },
        tag: {
            type: String,
            min: 2,
            max: 100,
            index: true,
            text: true,
            default: 'none'
        },
        created		  : {type: Date,default: Date.now},
    },
    { timestamps: false },
);

categorySchema.statics.countFindAll = function () {
    return this.countDocuments();
};

categorySchema.pre('deleteOne',function(next){
    return FKHelper().simpleVerification(db.Functional,{'category_id':this._conditions._id} ,'category','category-in-use').then(r  =>{
        next();
    });
});


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;