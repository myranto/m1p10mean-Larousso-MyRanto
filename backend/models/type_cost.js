const mongoose = require('mongoose');

const typeCostSchema = new mongoose.Schema({
    name:{type: String, required: true, unique:true},
});

module.exports = mongoose.model('typeCost',typeCostSchema);