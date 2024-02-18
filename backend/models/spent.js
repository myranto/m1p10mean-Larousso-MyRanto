const mongoose = require('mongoose');
const spentSchema = new mongoose.Schema({
    type : { type:String, required:true },
    label: { type:String, required:true },
    date : { type: Date,required:true },
    amount : {type: Number, required:true}
});

module.exports = mongoose.model('spent',spentSchema);