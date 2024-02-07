const mongoose = require('mongoose');
const appointmentSchema = mongoose.Schema({
    client : {
        id :  { type : String , required : true},
        name: { type : String , required : true},
    },
    emp : {
        id: { type : String , required : true},
        name : { type : String , required : true}
    },
    meeting_date : { type : Date, required : true},
    service : [
        {
            id : { type : String , required : true},
            name : { type : String , required : true},
            dicount: { type : Number}
        }
    ],
    dicount : { type : Number}
});
module.exports = mongoose.model('appointment',appointmentSchema);