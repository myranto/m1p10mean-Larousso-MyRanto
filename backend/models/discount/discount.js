const mongoose = require('mongoose')

const discountSchema = new mongoose.Schema({
    name:{type:String,require:true},
    percent:{type:String,require:true},
    is_service:{type:String,default:true,require:true},
    date_start:{type:Date,require:true,validate: {
        validator: function(value) {
            return this.date_end > value;
        },
        message: 'date_start doit être dans le passé par rapport à date_end'
    }},
    date_end:{type:Date,require:true},
})
module.exports = mongoose.model('Discount',discountSchema)