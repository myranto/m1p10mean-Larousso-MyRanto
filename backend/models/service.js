const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name:{type: String, required: true, unique:true},
    price:{type: Number, required: true, min:0},
    committee:{type: Number, required: true, min:0,max:100},
    duration:{type:Number, required:true,min:0}
});

module.exports = mongoose.model('Service',serviceSchema);
