const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    profile: { type: String, required: false },
    prefered_service: { type: String, required:false},
    prefered_emp:{type: String, required:false},
    start_time: { type: String, required: false},
    end_time: { type: String, required: false }
});
// check if start_time is a valid date
function validateStartTime(startTime) {
    return !isNaN(new Date(startTime));
}
// verification que endTime est après startTime
function validateEndTime(endTime) {
    return this.start_time && endTime > this.start_time;
}


module.exports = mongoose.model('User', userSchema);
