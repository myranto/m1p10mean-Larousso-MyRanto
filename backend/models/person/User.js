const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    profile: { type: String, required: false },
    prefered_service: { type: String, required:false},
    prefered_emp:{type: String, required:false},
    start_time: { type: { hours:Number,minutes:Number }, required: false},
    end_time: { type: { hours:Number,minutes:Number }, required: false }
});



module.exports = mongoose.model('User', userSchema);
