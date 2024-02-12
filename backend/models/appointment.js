const mongoose = require('mongoose');
const appointmentSchema = mongoose.Schema({
    customer : {
        id :  { type : String , required : true},
        name: { type : String , required : true},
    },
    date : { type : Date, required : true,validate:{
        validator:function(value){
            return value > new Date();
        },
        message:'La doit être antérieur au date d\' aujourd\'hui'
    }},
    services : [
        {
            id: {type:String,required:true},
            name:{type: String, required: true, unique:true},
            price:{type: Number, required: true, min:0},
            committee:{type: Number, required: true, min:0,max:100},
            duration:{type:Number, required:true,min:0},
            dicount: { type : Number},
            emp : {
                id : {type : String},
                name : {type : String},
                price : {type : Number}
            }
        }
    ],
    discount : { type : Number}
});
module.exports = mongoose.model('appointment',appointmentSchema);