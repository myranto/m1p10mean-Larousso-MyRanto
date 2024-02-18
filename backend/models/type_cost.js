const mongoose = require('mongoose');

const typeCostSchema = new mongoose.Schema({
    name:{type: String, required: true, unique:true,validate:{
        validator:function(value){
            return value.trim() !== "";
        },
        message:"Le nom est invalide"
    }},
});

module.exports = mongoose.model('typeCost',typeCostSchema);